var express = require('express');
var router = express.Router();
var mongo=require('./mongo');


//获取购物车商品的接口##############################
router.post('/cartinfo',function(req,res){
	mongo("find","cartdata",[{},1000,0],function(data){
		if(data.length!=0){
			res.send(data);
		}else{
			res.send('{"err":"暂无品牌数据"}');
		}
	})
})



//获取购物车商品数量的接口##############################
router.post('/cartnum',function(req,res){
	mongo("find","cartdata",[{},1000,0],function(data){

		var num=0;
		for(var i=0;i<data.length;i++){
			num+=Number(data[i].num)
		}
		res.send({'success':num})
	})
})
//将购物车商品信息传入数据库的接口##############################
router.post('/addcart',function(req,res){
	console.log(req.body.info.method)
	//查找购物车中是否有该件商品
	mongo("find","cartdata",[{localItemId:req.body.info.localItemId},1000,0],function(data){
//		console.log(data[0].num+req.body.info.num)
		if(data.length!=0){
			var num='';
			if(req.body.info.method=='chagenum'){
				num=req.body.info.num
			}else{
				num=data[0].num+req.body.info.num
			}
			mongo("update","cartdata",[{localItemId:req.body.info.localItemId},{num:num}],function(data){
				if(data.result.n==1){
					res.send({'success':'存值成功'});
				}else{
					res.send('{"err":"存值失败"}');
				}
			})
		}else{
			mongo("add","cartdata",req.body.info,function(data){
				if(data.result.n==1){
					res.send({'success':'存值成功'});
				}else{
					res.send('{"err":"存值失败"}');
				}
			})
		}
	})

})





//获取发现页面的接口##############################
router.post('/find',function(req,res){
	mongo("find","finddata",[{},1000,0],function(data){
		if(data.length!=0){
			res.send(data);
		}else{
			res.send('{"err":"暂无品牌数据"}');
		}
	})
})
//获取优惠券的接口##############################
router.post('/coupon',function(req,res){
	mongo("find","coupondata",[{},1000,0],function(data){
		if(data.length!=0){
			res.send(data);
		}else{
			res.send('{"err":"暂无品牌数据"}');
		}
	})
})
//获取详情页商品的接口##############################
router.post('/detail',function(req,res){
	console.log(req.body.localItemId)
	mongo("find","productdata",[{'localItemId':Number(req.body.localItemId)},1000,0],function(data){
		if(data.length!=0){
			res.send(data);
		}else{
			res.send('{"err":"暂无品牌数据"}');
		}
	})
})
//获取分类彩妆护全部商品的接口##############################
// router.post('/allcommodity',function(req,res){
// //	console.log(req.body.likeid)
// 	mongo("find","alldata",[{},1000,0],function(data){
// 		if(data.length!=0){
// 			res.send(data);
// 		}else{
// 			res.send('{"err":"暂无品牌数据"}');
// 		}
// 	})
// })
//获取分类二级分类页面商品的接口##############################
router.post('/allcommodity',function(req,res){
	console.log(req.body.goodskey)
		console.log(/直邮/g.test(req.body.goodskey))
		let selector={};
		if(/直邮/g.test(req.body.goodskey)){
			selector={title:RegExp(req.body.goodskey,'gi')}
		}else{
			selector={brandName:RegExp(req.body.goodskey,'gi')}

		}
		// let goodskey=RegExp(req.body.goodskey,'gi')
		// if(/'直邮'/g.test(req.body.goodskey))
		mongo("find","productdata",[selector,1000,0],function(data){
			// console.log(data)
			if(data.length!=0){
				res.send(data);
			}else{
				res.send('{"err":"暂无品牌数据"}');
			}
		})
	})
//获取分类页面所有品牌的接口##############################
router.post('/secondsort',function(req,res){
	// console.log(req.body.likeid)
	mongo("find","sortdata",[{},1000,0],function(data){
		// console.log(data)
		for(var i=0;i<data.length;i++){
//			console.log(data[i].secondLevelList)
			for(var j=0;j<data[i].secondLevelList.length;j++){
				console.log(data[i].secondLevelList[j].secondLevelId)
				if(req.body.likeid==data[i].secondLevelList[j].secondLevelId){
					res.send(data[i]);
					
				}
			}
		}
//		if(data.length!=0){
//			res.send(data);
//		}else{
//			res.send('{"err":"暂无品牌数据"}');
//		}
	})
})
//获取分类页面所有品牌的接口##############################
router.post('/allbrand',function(req,res){
	mongo("find","allbranddata",[{},1000,0],function(data){
		if(data.length!=0){
			res.send(data);
		}else{
			res.send('{"err":"暂无品牌数据"}');
		}
	})
})
//获取分类页面品牌数据的接口##############################
router.post('/levelName',function(req,res){
	mongo("find","sortdata",[{},10,0],function(data){
		if(data.length!=0){
			res.send(data);
		}else{
			res.send('{"err":"暂无品牌数据"}');
		}
	})
})
//获取主页所有商品接口##############################
router.post('/product',function(req,res){
	console.log(req.body)
	var limit=req.body.limit
	var skip=req.body.skip
	mongo("find","homedata",[{},limit,skip],function(data){
		if(data.length!=0){
			res.send(data);
		}else{
			res.send('{"err":"暂无商品信息"}');
		}
	})
})
//添加商品和编辑商品接口##########################
router.post('/addproduct', function(req, res) {
	var sell={};//商品数据
		sell.pname=req.body.pname;
		sell.price=req.body.price;
		sell.imgsrc=req.body.imgsrc;
		sell.color=req.body.color;
		sell.fenlei=req.body.fenlei;
		sell.size=req.body.size;
		sell.kucun=req.body.kucun;
		sell.info={};
		sell.info.gonglv=req.body.gonglv;
		sell.info.bigimg=req.body.bigimg;
		
	//添加商品部分-----------------------------
	if(req.body.action=='add'){
		//查找所有数据
		mongo("find","product",{},function(data){
			//生成pid
			var pid=0;
			if(data.length==0){
				pid=1;
			}else{
				pid=Number(data[data.length-1].pid)+1;
			}				
			sell.pid=pid;

			//添加商品到数据库
			mongo("add","product",sell,function(data){
				if(data.result.n==1){
					res.send('{"success":"商品添加成功"}')
				}else{
					res.send('{"err":"商品添加失败"}')
				}
			})
		})
	}
	
	//编辑商品部分-------------------------------
	if(req.body.action=='edit'){
		mongo("update","product",[{"pid":Number(req.body.pid)},sell],function(data){
			if(data.result.n==1){
				res.send('{"success":"修改成功"}')
			}else{
				res.send('{"err":"修改失败"}')
			}
		})
	}
});

//删除购物车商品接口##################################
router.post('/del',function(req,res){
	console.log(req.body.localItemId)
	var count=0;

	req.body.localItemId.forEach(ele => {

		 mongo("del","cartdata",{"localItemId":Number(ele)},function(data){
			if(data.result.n==1){
				count++;
			}else{
			}
		})		


	});
	setTimeout(function(){
		if(count==req.body.localItemId.length){
			res.send('{"success":"删除成功"}')
	
		}else{
			res.send('{"err":"删除失败"}')
		}
	},1000)


})

module.exports = router;
