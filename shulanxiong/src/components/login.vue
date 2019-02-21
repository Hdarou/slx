<template>
	<div class="container">
		<img src="../../static/images/logo_03.png"/>
		<div class="from">
			<div class="fromgroup">
				<input type="text" placeholder="请输入手机号" />
				<!--<img src="../../static/images/cross78.png"/>-->
			</div>
			<div class="fromgroup">
				<div class="fromgroup2">
					<input type="text" placeholder="请输入短信验证码" />
					<!--<img src="../../static/images/cross78.png"/>-->
				</div>
				<span>获取验证码</span>
			</div>

		</div>
		<button class="btn">登录</button>
		<div class="regAccount">
			<router-link to='/reg'>注册</router-link>
			<router-link to='/accountlogin'>账号密码登录</router-link>
		</div>
		<p class="msg">登录即代表阅读并同意<a href="#">《用户注册协议》</a></p>
		
	</div>
</template>

<script>
	export default{
		name:'login',
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
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		background: #f8f8f8;
		img{
			width: 260px;
			height: 320px;
			text-align: center;
		}
		.from{
			width: 600px;
			border:2px solid #ededed;
			border-radius: 10px;
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
					width: 400px;
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
		}
		.btn{
			margin-top: 35px;
			width: 600px;
			height: 90px;
			border: none;
			outline: none;
			background: #ff5353;
			color: #fff;
			border-radius: 10px;
			font-size: 28px;
		}	
		.regAccount{
			margin-top: 40px;
			width: 600px;
			display: flex;
			justify-content: space-between;
			font-size: 28px;
			a{
			color: #666;
				
			}
		}
		.msg{
			margin-top: 100px;
			width: 600px;
			text-align: center;
			font-size: 24px;
			color: #8f8f8f;
			a{
				color: #ff5a5a;
				text-decoration: underline;
			}
		}	
	}
</style>