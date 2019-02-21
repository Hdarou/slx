var express = require('express');
var router = express.Router();
var mongo=require('./mongo');
var crypto=require('crypto');//加密模块

var ObjectId=require('mongodb').ObjectID;//处理mongodb中的_id格式  _id:ObjectId('a12fef')

//构造函数
function User(users){
	this.name=users.name;
	this.veri=users.veri;
	this.password=users.password;
	this.id=users.id;
}

//退出接口
router.get('/quit',function(req,res){
	if(req.session.user){
		req.session.user.name='';
		req.session.user.password='';
		res.send('{"success":"退出成功"}')
	}else{
		res.send('{"err":"未登录"}')
	}
})

//判断session中是否有用户
router.get('/isLogin',function(req,res){
	//session中是否有user
	if(req.session.user){
		//session中是否有name
		if(req.session.user.name){
			// res.send('{"success":"用户已登录"}')
			res.send(req.session.user)
		}else{
			res.send('{"err":"用户未登录"}')
		}		
	}else{
		//session中是没有user，向session中存入user
	    var newUser=new User({
	    	name:'',
	    	veri:'',
	    	password:'',
	    	id:''
	    })
	    req.session.user=newUser;	
	    res.send('{"err":"未登录"}')
	}

})

//修改密码
router.post('/editPwd',function(req,res){
	mongo("find","user",{userName:req.session.user.name},function(data){
		if(data.length!=0){
			var MD5=crypto.createHash('md5');
			oldpassword=MD5.update(req.body.oldpassword).digest('base64');
			var MD5s=crypto.createHash('md5');//每一个crypto.createHash（）产生的东西只能加密一个数据
			newpassword=MD5s.update(req.body.newpassword).digest('base64');
//			判读原密码是否正确
			if(oldpassword==data[0].password){
				//原密码正确
				mongo('update','user',[{userName:req.session.user.name},{password:newpassword}],function(data){
					if(data.result.n==1){
						res.send('{"success":"密码修改成功"}')
					}else{
						res.send('{"err":"密码修改失败"}')
					}
				})
			}else{
			res.send('{"err":"原密码错误"}')
			}
		}else{
			res.send('{"err":"修改失败"}')
		}
	})
})
//获取用户信息接口
router.post('/userInfo',function(req,res){
	if(req.body.action=="getUser"){
		mongo("find","user",{_id:ObjectId(req.body.userId)},function(data){
			if(data.length!=0){
				res.send(data);
			}else{
				res.send('{"err":"获取用户信息失败"}')
			}
		})
	}
	if(req.body.action=="editUser"){
		console.log(req.body.userName);
		var newuserInfo={};
		newuserInfo.phone=req.body.phone;
		newuserInfo.email=req.body.email;
		newuserInfo.trueName=req.body.trueName;
		newuserInfo.powerCode=req.body.powerCode;
		newuserInfo.power=req.body.powerCode=='1'?"会员":"非会员";
		mongo("update","user",[{userName:req.body.userName},newuserInfo],function(data){
			console.log(data.result.n);
			if(data.result.n==1){
				res.send('{"success":"信息修改成功"}')
			}else{
				res.send('{"err":"信息修改失败"}')
			}
		})
	}
})

//登录接口
router.post('/log',function(req,res){
	mongo("find","user",[{phone:req.body.phone},1000,0],function(data){
		if(data.length!=0){
			//用户存在，验证密码
//			console.log(data);
			//密码
			var MD5=crypto.createHash('md5');
			password=MD5.update(req.body.password).digest('base64');
			if(password==data[0].password){
//				res.send('{"sueecss":"登录成功"}')
			    var newUser=new User({
			    	name:req.body.phone,
			    	veri:'',
			    	password:password,
			    	id:data[0]._id
			    })
			    req.session.user=newUser;
			    console.log(req.session.user);
				res.send(data)
			}else{
				res.send('{"err":"密码错误"}')
			}
		}else{
			res.send('{"err":"用户不存在"}')
		}
	})
})
//注册接口
router.post('/reg', function(req, res) {
	mongo("find","user",[{phone:req.body.phone},1000,0],function(data){
		if(data.length==0){
			//注册操作
			var userInfo={};
			//用户名
//			userInfo.userName=req.body.userName==''?false:req.body.userName;
			//昵称
//			userInfo.trueName=req.body.trueName==''?false:req.body.trueName;
			//手机号
			userInfo.phone=/^1[2-9]\d{9}$/.test(parseInt(req.body.phone))?req.body.phone:false;
			//密码
			var MD5=crypto.createHash('md5');
			userInfo.password=MD5.update(req.body.password).digest('base64');
			//邮箱
//			userInfo.email=req.body.email;
			//注册时间
			userInfo.createTime=new Date().toLocaleString();
			//权限码
//			userInfo.powerCode=req.body.powerCode;
			//权限名称
//			userInfo.power=req.body.powerCode=='1'?'会员':'非会员';
			
//			if(userInfo.userName && userInfo.trueName){
				if(userInfo.phone){
					//符合条件，存入数据库
				    mongo('add','user',userInfo,function(result){
						if(result.length!=0){
							res.send('{"success":"注册成功"}')
						}else{
					        res.send('{"err":"注册失败"}')
						}
					})					
				}else{
					res.send('{"err":"手机号格式错误"}')
				}
//			}else{
//				res.send('{"err":"参数不能为空"}')
//			}
		}else{
			res.send('{"err":"用户已注册"}')
		}
	})

});



//验证码接口
router.get('/veri', function(req, res) {
	if(req.query.action=='getVeri')	{
		//产生验证码
	    var pool="ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwsyz1234567890";
	    var veriCode='';
	    for(var i=0;i<4;i++){
	    	veriCode+=pool[Math.floor(Math.random()*pool.length)];
	    }
	    var newUser=new User({
	    	name:'',
	    	veri:veriCode,
	    	password:'',
	    	id:''
	    })
	    req.session.user=newUser;
	    console.log(req.session.user);
	    res.send('{"veri":"'+veriCode+'"}')		
	}
	
	if(req.query.action=='checkVeri'){
		if(req.query.veri.toLowerCase()==req.session.user.veri.toLowerCase()){
			res.send('{"sueecss":"验证码正确"}')
		}else{
			res.send('{"err":"验证码错误"}')
		}
	}
});

module.exports = router;
