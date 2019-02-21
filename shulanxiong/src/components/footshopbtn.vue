<template>
	<div class="wrap">
		<ul class="shopbtn">
			<li>
				<img src="../../static/images/service.png"/>
				<p>客服</p>
			</li>
			<li>
				<img src="../../static/images/collection.png"/>
				<p>收藏</p>
			</li>
			<li @click="trun">
				<img src="../../static/images/detailcart.png"/>
				<span v-if="$store.state.goodnum>0" class="gsnum">{{$store.state.goodnum}}</span>
				<p>购物车</p>
			</li>
			<li @click="showaddcart">加入购物车</li>
			<li>立即购买</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'footshopbtn',
		data(){
			return{
				
			}
		},
		methods:{
			showaddcart(){
				this.$store.commit("changeAddcart",true)
			},
			trun(){
				this.$router.push({name:'Cart'})
				this.$store.commit("changeFoot",true)
				
			}
		},
		mounted(){
			this.$axios({
				url:'/pro/cartnum',
				method:'post'
			}).then(res=>{
				this.$store.commit("changeGoodnum",res.data.success)
			})
		}
	}
</script>

<style scoped>
	.wrap{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;
		background: #fff;
		z-index: 99;
		font-size: 28px;
	}
	.shopbtn{
		border-top: 2px solid #ededed;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		width: 100%;
		height: 100px;
		
	}
	.shopbtn>li{
		width: 113px;
		height: 100px;
		position: relative;
	}
	.shopbtn>li:nth-child(4){
		width: 207px;
		background: #ffa72d;
		color: #fff;
		line-height: 100px;
	}
	.shopbtn>li:nth-child(5){
		width: 207px;
		background: #ff5252;
		color: #fff;
		line-height: 100px;
	}
	.shopbtn>li:nth-child(2){
		border-left: 2px solid #ededed;
		border-right: 2px solid #ededed;
	}
	.shopbtn>li>.gsnum{
		position: absolute;
		top: 4px;
		right: 23px;
		background: #ff4f53;
		color: #FFF;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
		text-align: center;
	}
	.shopbtn>li>p{
		font-size: 20px;
		color: #414141;
	}
	.shopbtn img{
		margin-top: 8px;
		width: 42px;
		height: 42px;
	}

</style>