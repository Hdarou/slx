<template>
	<div class="container">
		<div class="header">
			<img @click="$router.go(-1)" src="../../static/images/left.png"/>
			<span>账号密码登录</span>
		</div>	
		<div class="from">
			<div class="fromgroup">
				<input @keyup="Phone" type="text" v-model="logphone" placeholder="请输入手机号" />
				<img @click="cross('phone')" ref="cross" v-show="isforkphone" src="../../static/images/cross78.png"/>
			</div>
			<div class="fromgroup">
				<input :type="isShowPwd?'password':'text'" v-model="logpwd" placeholder="请输入登录密码" />
				<div @click="isShowPwd=!isShowPwd">
					<img v-if="isShowPwd" src="../../static/images/closeeyes.png"/>
					<img v-else src="../../static/images/eyes.png"/>
				</div>
			</div>			
		</div>

		<div class="regAccount">
			<router-link to='#'>忘记密码</router-link>
		</div>
		<button @click="Log" class="btn">登录</button>
		
		<p class="msg">登录即代表阅读并同意<a href="#">《用户注册协议》</a></p>
		
	</div>
</template>

<script>
	export default{
		name:'login',
		data(){
			return{
				logphone:'',
				logpwd:'',
				isforkphone:false,
				isShowPwd:true//密码是否可见
			}
		},
		methods:{
			cross(e){
				if(e=='pwd'){
					this.veri=''
					this.isforkpwd=false
				}else{
					this.logphone=''
					this.isforkphone=false					
				}
			},
			// 当输入框有值时显示叉号
			Phone(){
				if(this.logphone>0){
					this.isforkphone=true
				}else{
					this.isforkphone=false
				}				
			},	
			// 登录
			Log(){
				if(/^1[2-9]\d{9}$/.test(this.logphone)){
					//密码
					if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(this.logpwd)){
						this.$axios({
							url:'/users/log',
							method:'post',
							data:{
								phone:this.logphone,
								password:this.logpwd
							}
						}).then(res=>{
							console.log(res)
							if(res.data.err){
								console.log(res.data.err)
							}else if(res.data[0].phone){
								this.$router.push({name:'Home'})
								this.$store.commit("changeFoot",true);
							}
						})
					}else{
						console.log('密码格式不对')
					}
				}else{
					console.log('手机号格式不正确')
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

		.from{
			margin-top: 165px;
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
			justify-content: flex-end;
			font-size: 28px;
			a{
			color: #666;
				
			}
		}
		.msg{
			position: absolute;
			bottom: 100px;
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