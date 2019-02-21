<template>
	<div class="container">
		<div class="header">
			<img @click="$router.go(-1)" src="../../static/images/left.png"/>
			<span>注册</span>
		</div>	
		<div class="top165">
			
		</div>
		
		<div v-if="!isshownext">
			<div class="from">
				<div class="fromgroup">
					<input ref="phone" @keyup="Phone" type="text" v-model="phone" placeholder="请输入手机号" />
					<img @click="cross('phone')" ref="cross" v-show="isforkphone" src="../../static/images/cross78.png"/>
				</div>
				<div class="fromgroup">
					<div class="fromgroup2">
						<input @keyup="Veri" type="text" v-model="veri" placeholder="请输入短信验证码" />
						<img @click="cross('pwd')"  ref="cross" v-if="isforkpwd" src="../../static/images/cross78.png"/>
					</div>
					<span @click="getVeri">获取验证码</span>
				</div>		
			</div>
			<div class="msg">
				<div @click="isAgree=!isAgree">
					<img v-if="isAgree" src="../../static/images/goucheck.png"/>
					<img v-else class="empty"  src="../../static/images/quan.png"/>				
				</div>
	
				登录即代表阅读并同意树懒熊<a href="#">用户注册协议</a>
			</div>
			<!--<div class="Inviter">
				<div  @click="IsShow">
					<span>{{isshowmsg}}</span>
					<img v-if="isshow" src="../../static/images/jtop.png"/>
					<img v-else src="../../static/images/jbottom.png"/>				
				</div>
				<div class="fromgroup" v-if="isshow">
					<input type="text" placeholder="请输入邀请码(选填)" />
					<img src="../../static/images/code.png"/>
				</div>
			</div>-->
	
			<button @click="next" :class="['btn',isred?'redcol':'huicol']">下一步</button>			
		</div>

		
		<div v-if="isshownext">
			<div class="fromgroup pwd">
				<input type="text" v-model="pwd" placeholder="请设置您的登录密码(至少六位)" />
				<img src="../../static/images/closeeyes.png"/>
			</div>
			<button @click="Reg" class="btn redcol">完成注册</button>			
		</div>

		
		
	</div>
</template>

<script>
	export default{
		name:'login',
		data(){
			return{
				isAgree:true,
				isshow:false,
				isshowmsg:'完善邀请人信息',
				phone:'',
				pwd:'',
				veri:'',
				isforkphone:false,//手机号输入框的叉显示
				isforkpwd:false,//验证码输入框的叉显示
				isshownext:false,
				isred:false//按钮是否可用
			}
		},
		methods:{
			// 清空输入框内容
			cross(e){
				if(e=='pwd'){
					this.veri=''
					this.isforkpwd=false
				}else{
					this.phone=''
					this.isforkphone=false					
				}
			},
			// 获取短信验证码
			getVeri(){
				if(/^1[2-9]\d{9}$/.test(this.phone)){
					console.log('手机号码正确')
					// 请求短信验证码

				}else  if(this.phone.length==0){
					console.log('请输入手机号')
				}else{
					console.log('手机号码不正确')

				}
			},
			// 当输入框有值时显示叉号
			Phone(){
				if(this.phone>0){
					this.isforkphone=true
				}else{
					this.isforkphone=false
				}				
			},
			Veri(){
				if(this.veri>0){
					this.isforkpwd=true
				}else{
					this.isforkpwd=false
				}
				if(this.veri=='1234'){
					this.isred=true
				}else{
					this.isred=false
				}
			},
			IsShow(){
				this.isshow=!this.isshow
				if(this.isshow){
					this.isshowmsg='收起'
				}else{
					this.isshowmsg='完善邀请人信息'
				}
			},
			next(){
				if(this.veri=='1234'){
					this.isshownext=true
				}
			},
			// 注册按钮
			Reg(){
				if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.pwd)){
					this.$axios({
						url:'/users/reg',
						method:'post',
						data:{
							phone:this.phone,
							password:this.pwd
						}
					}).then(res=>{
						console.log(res)
						if(res.data.success){
							this.$router.push({name:'Home'})

						}
					})					
				}else{
					console.log('密码为6-21位有字母和数字的组合，不能有纯数字纯字母')
				}
			}
		},
		beforeMount(){
			//页面加载前 隐藏脚步
			this.$store.commit("changeFoot",false);
		}
	}

</script>

<style scoped lang="less">
	.container{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background: #F3F3F3;
		.header{
			position: absolute;
			top: 0;
			left: 0;
			width:100%;
			height:100px;
			line-height: 100px;
			text-align: center;
			background: #f8f8f8;
			font-size: 36px;
			
			img{
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto;
				left: 30px;
				width: 42px;
				height: 42px;
				vertical-align:middle ;
			}			
		}
		.top165{
			width: 100%;
			height: 165px;
		}
		.from{
			/*margin-top: 165px;*/
			width: 700px;
			border:2px solid #ededed;
			border-radius: 10px;

		}
			.fromgroup{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 25px;
				box-sizing: border-box;
				height: 90px;
				line-height: 90px;
				background:#fff;
				color:#272727;
				border-top:1px solid #EDEDED;
				
				input{
					border: none;
					outline: none;
				}
				img{
					width: 40px;
					height: 40px;
				}	
				.fromgroup2{
					position: relative;
					width: 445px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					img{
						margin-right: 20px;
					}
				}
				.fromgroup2::after{
					position: absolute;
					content: '';
					top:0;
					bottom: 0;
					margin: auto;
					right: 0;
					width: 2px;
					height: 40px;
					background: #ededed;
				}
			}		
		.btn{
			margin-top: 35px;
			width: 700px;
			height: 90px;
			border: none;
			outline: none;


			color: #fff;
			border-radius: 10px;
			font-size: 28px;
		}	
		.huicol{
			background: #989898;
			
		}
		.redcol{
			background: #ff5353;
			
		}
		.msg{
			display: flex;
			justify-content: flex-start;
			margin-top: 10px;
			width: 700px;
			text-align: center;
			font-size: 24px;
			color: #8f8f8f;
			div{
				width: 36px;
				height: 36px;
				img{
					width: 36px;
					height: 36px;
					vertical-align: middle;
				}	
				.empty{
					width: 32px;
					height: 32px;
				}			
			}

			a{
				color: #ff5a5a;
				text-decoration: underline;
			}
		}	
		.Inviter{
			margin-top: 80px;
			width: 700px;

			color: #8f8f8f;
			font-size: 24px;
			text-align: center;
			div{
				img{
					width: 42px;
					height: 42px;
					vertical-align: middle;
				};				
				span{
					display: inline-block;
					position: relative;
					margin-bottom: 20px;
				
				}
				span::before{
					position: absolute;
					content: '';
					top: 0;
					bottom: 0;
					margin: auto;
					left: 0;
					width: 280px;
					height: 2px;
					background: #8f8f8f;
				}
				/*span::after{
					position: absolute;
					content: '';
					top: 0;
					bottom: 0;
					margin: auto;
					right: 0;
					width: 280px;
					height: 2px;
					background: #8f8f8f;
	
				}			*/				
			}

		}
		.pwd{
			width: 700px;
			input{
				width: 600px;
			}
		}
		
	}
</style>