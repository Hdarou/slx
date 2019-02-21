<template>
	<div>
		<div class="header">
			<p class="title">全部品牌 ></p>
		</div>
		<div class="container">
			<div class="tit">其他</div>
			<ul class="list">
				<li v-for="(item,index) in allbranddata" :key="index" @click="clcikbtn(item.brandId)">
					<img :src="item.brandLogo"/>
				</li>
			</ul>
			<div class="bottommsg">
				已经到底咯~去别处逛逛吧！
			</div>
		</div>

	</div>
</template>

<script>
	export default{
		name:'brand',
		data(){
			return{
				allbranddata:[]
			}
		},
		methods:{
			clcikbtn(id){
				console.log(id)
			}
		},
		mounted(){
			this.$axios({
				url:'/pro/allbrand',
				method:'post'
			}).then(res=>{
				console.log(res.data)
				this.allbranddata=res.data
			}).catch(err=>{
				console.log(err)
			})			
		}
	}
</script>

<style scoped lang="less">
	.header{
		width: 100%;
		padding: 20px 0;
		background: #f8f8f8;
		.title{
			margin:0 auto;
			width: 710px;
			height: 85px;
			line-height: 85px;
			text-align: center;
			font-size: 28px;
			color: #fff;
			background: #333333;
		}
	}
	.container{
		width: 100%;

		.tit{
			padding-left: 20px;
			box-sizing: border-box;
			font-size: 28px;
			width: 100%;
			height: 80px;
			line-height: 80px;
			border-bottom: 2px solid #f1f1f1;
			color: #333;
		}
		.list{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			flex-wrap: wrap;
			width: 100%;
			li{
				width: 180px;
				height: 180px;
				img{
					width: 180px;
					height: 180px;				
				}
			}
		}
		.bottommsg{
			margin: 50px auto 100px;
			width: 100%;
			height: 100px;
			text-align: center;
			font-size: 28px;
			color: #747474;
			
		}
	}
	
</style>