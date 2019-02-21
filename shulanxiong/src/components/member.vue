<template>
	<div class="bg">
		<header>
			<div class="seit">
				<ul>
					<li><img src="../../static/images/msg.png"/></li>
					<li><img src="../../static/images/code3.png"/></li>
					<li @click="setUp"><img src="../../static/images/seit.png"/></li>
				</ul>
			</div>
			<div class="userinfo">
				<div class="touxiang">
					<img src="../../static/images/userlogo.png" alt="">
				</div>
				<div class="userinfocon">
					<div class="phone">{{$store.state.User.name}}</div>
					<div class="lev">会员卡></div>
				</div>
			</div>
		</header>
		<ul class="money">
			<li>
				<p>0</p>
				<p>我的券</p>
			</li>
			<li>
				<p>0</p>
				<p>我的积分</p>
			</li>
			<li>
				<p>0.00元</p>
				<p>余额</p>
			</li>			
		</ul>
		
		<div class="order">
			<div class="header">
				<span class="tit">我的订单</span>
				<div>
					<span>查看全部</span>
					<img src="../../static/images/right.png"/>
				</div>
			</div>
			<ul class="list">
				<li>
					<img src="../../static/images/payment.png"/>
					<p>待付款</p>
				</li>
				<li>
					<img src="../../static/images/daifahuo.png"/>
					<p>待发货</p>
				</li>
				<li>
					<img src="../../static/images/yifahuo.png"/>
					<p>已发货</p>
				</li>
				<li>
					<img src="../../static/images/evaluat.png"/>
					<p>待评价</p>
				</li>
				<li>
					<img src="../../static/images/refund.png"/>
					<p>退款/退货</p>
				</li>				
			</ul>
			
		</div>
		
		<ul class="myoth">
			<li>
				<img src="../../static/images/1.png"/>
				<p>我的拼团</p>
			</li>
			<li>
				<img src="../../static/images/2.png"/>
				<p>我的砍价</p>
			</li>	
			<li>
				<img src="../../static/images/3.png"/>
				<p>我的收藏</p>
			</li>
			<li>
				<img src="../../static/images/4.png"/>
				<p>我的等级</p>
			</li>	
			<li>
				<img src="../../static/images/5.png"/>
				<p>售后服务</p>
			</li>
		</ul>
		
		<div class="share">
			<img src="../../static/images/share.png"/>
			<span>分享给好友</span>
			<span>邀请新用户即可获得1个积分</span>
			<img src="../../static/images/right.png"/>
		</div>

	</div>
</template>

<script>
	export default{
		name:'member',
		methods:{
			setUp(){
				this.$router.push({name:'Setup'})
				this.$store.commit('changeFoot',false)
			}
		}
	}
</script>

<style scoped lang="less">
.bg{
	width: 100%;
	height: 100vh;
	background: #f4f4f4;
}
	header{
		width: 100%;
		height: 300px;
		background: #ffa100;
		.seit{
			ul{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				width: 100%;
				height: 80px;
				li{
					width: 80px;
					img{
						width: 40px;
						height: 40px;
					}
				}
			}
		}
		.userinfo{
			padding: 40px;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			.touxiang{
				position: relative;
				margin-right: 30px;
				width: 115px;
				height: 115px;
				border-radius: 50%;
				background: pink;
				text-align: center;
				img{
					position: absolute;
					top: 0;
					left: 16px;
					width: 100px;
					height: 100px;	
					vertical-align: middle
				}
			}
			.userinfocon{
				color: #fff;
				.lev{
					margin-top: 20px;
					width: 120px;
					height: 40px;
					line-height: 40px;
					border-radius: 20px;
					text-align: center;
					background: #e17100;
				}
			}
		}
	}
	.money{
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		width: 100%;
		font-size: 24px;
		color: #6d6d6d;
		background: #fff;
		li{
			position: relative;
			width: 250px;
			padding: 30px 0;
			box-sizing: border-box;
			p:nth-child(1){
				margin-bottom: 20px;	
			}
		}
		li:nth-child(-n+2)::after{
			position: absolute;
			content: '';
			top: 0;
			bottom: 0;
			margin: auto;
			right: 0;
			width: 2px;
			height: 60px;
			background: #f3f3f3;
		}
	}
	.order{
		padding: 0 30px;
		box-sizing: border-box;
		margin-top: 20px;
		width: 100%;
		background: #fff;
		color: #6d6d6d;
		
		.header{
			padding: 25px 0;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			border-bottom:2px solid #F3F3F3;
			.tit{
				font-size: 28px;
			}
			div{
				display: flex;
				align-items: center;
				font-size: 20px;
				img{
					width: 32px;
					height: 32px;
				}
			}
		}
		.list{
			margin-bottom: 20px;
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 150px;
			align-items: center;
			text-align: center;
		}
		
	}
	.myoth{
		margin-bottom: 20px;
		padding-top: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		background: #FFF;
		text-align: center;
		color: #545454;
		font-size: 20px;
		li{
			margin-bottom: 50px;
			width:180px;
			img{
				width: 70px;
				height: 70px;
			}
		}
	}
	.share{
		padding: 30px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: 22px;
		color: #6d6d6d;
		background: #fff;
		img{
			width: 32px;
			height: 32px;
		}
	}
</style>