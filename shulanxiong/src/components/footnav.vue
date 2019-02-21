<template>
	<div class="footnav" v-if="$store.state.footstyle">
		<ul>
			<li v-for="(item,index) in footnavData" :key="index" @click="toggleBtn(index)">
				<router-link :to="item.url">
					<div>
						<img :src="item.isactive?item.iconactive:item.icon"/>
						<div v-if="index==3" class="numshow">
							<span v-if="$store.state.goodnum>0" class="gsnum">{{$store.state.goodnum}}</span>
						</div>

					</div>
					<p>{{item.name}}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name:'footnav',
		data(){
			return{
				footnavData:[
					{name:'首页',url:'/home',icon:'./static/images/home.png',iconactive:'./static/images/home-active.png',isactive:true},
					{name:'分类',url:'/sort',icon:'./static/images/sort.png',iconactive:'./static/images/sort-active.png',isactive:false},
					{name:'发现',url:'/find',icon:'./static/images/find.png',iconactive:'./static/images/find-active.png',isactive:false},
					{name:'购物车',url:'/cart',icon:'./static/images/cart.png',iconactive:'./static/images/cart-active.png',isactive:false},
					{name:'会员',url:'/member',icon:'./static/images/member.png',iconactive:'./static/images/member-active.png',isactive:false}
				]
			}
		},
		methods:{
			toggleBtn(index){
				for(var i=0;i<this.footnavData.length;i++){
					this.footnavData[i].isactive=false;
				}
				this.footnavData[index].isactive=true;
			}
		}

	}
</script>

<style>
	.footnav{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 105px;
		border-top: 1px solid #eee;
		color: #fff;
		background: #fff;
		z-index: 999;
	}
	.footnav ul{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;	
		width: 100%;	
		height: 105px;
		
	}
	.footnav ul li{
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 105px;
	}
	.footnav a{
		color: #747474;
		font-size: 28px;
		
	}
	.footnav img{
		width: 50px;
		height: 50px;
	}
	.footnav ul .router-link-active{
		color: #ff4545;
	}
	.numshow{
		position: absolute;
		top: 0;
		right: 20px;
	}
	.numshow>.gsnum{
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
</style>