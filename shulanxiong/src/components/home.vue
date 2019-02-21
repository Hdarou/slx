<template>
	<div>
		<div class="header">
			<img src="../../static/images/search.jpg"/>
			<span>树懒熊</span>
			<img src="../../static/images/code.jpg"/>
		</div>
		<div class="container">
			
			<scroller  :on-refresh="refresh" :on-infinite="infinite"  ref="myscroller">
				<!--100px的空白块-->
				<div class="top100"></div>
				<div class="wrap" v-for="(itemdata,index) in homeDataList" :key='index' :class="{ind3:true}" :style="{height:itemdata.modularHeight}">
					<div class="items" v-for="(item,ind) in itemdata.modularDataList" :key='ind' @click="trun(item.linkId,index)">
						<img :src="item.bannerUrl"/>	
					</div>
				</div>
				<!--底部提示信息-->
				<router-link v-show="bottomMsgIsShow" to="/sort">
					<div class="showmsg">
						<span>到底啦,逛逛别的</span>
					</div>					
				</router-link>
			</scroller>			
		</div>
		<!--一键置顶-->
		<div class="toTop">
			<img src="../../static/images/iconTopping.png"/>
		</div>

	</div>
</template>

<script>
	export default{
		name:'home',
		data(){
			return{
				homeDataList:'',
				bottomMsgIsShow:false
			}
		},
		methods:{
			//跳转
			trun(id,index){
				console.log(index)
				if(index>=2){
					this.$router.push({name:'Gooddetails',params:{localItemId:id}})
				}

			},
			//下拉刷新函数
			refresh(){
				//向后台请求新的数据--请求后停止
				this.loaddata();	
			},
			//上拉加载数据
			infinite(done){
//					console.log(this.$refs.myscroller.getPosition())
				this.$axios({
					method:'post',
					url:'/pro/product',
					data:{
						limit:10,
						skip:this.homeDataList.length
					}
				}).then(res=>{
					this.homeDataList=this.homeDataList.concat(res.data)
//					console.log(res);
					//停止上拉
					 this.$refs.myscroller.finishInfinite(false);
					 //无商品信息返回
					 if(res.data.err){
					 	this.bottomMsgIsShow=true
				      	this.$refs.myscroller.finishInfinite(1);
					 }
				}).catch(err=>{
					console.log(err)
				})

			},
			//请求列表数据的函数
			loaddata(){
				this.$axios({
					method:'post',
					url:'/pro/product',
					data:{
						limit:10,
						skip:0
					}
				}).then(res=>{
					this.homeDataList=res.data
					console.log(res.data);
					//停止下拉刷新
					this.$refs.myscroller.finishPullToRefresh();
				}).catch(err=>{
					console.log(err)
				})	
			},	
		},
		mounted(){
			//加载数据
			this.loaddata();
		}
			
	}
</script>

<style scoped>
	*{margin: 0;padding: 0;}
	.header{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		
		width: 100%;
		height: 100px;
		background:#f8f8f8;
		font-size: 36px;
		color: #2a2a2a;
		border-bottom: 1px solid #dfdfdf;
		
	}
	.header img{
		width: 40px;
		height: 40px;
	}
	
	.container{
		width: 100%;
		background: #fefefe;
	}

	.top100{
		width: 100%;
		height: 100px;
	}
	
	.wrap{
		width: 100%;
	}
	.wrap>.items{
		width: 100%;
		height: auto;
	}
	.items img{
		width:100%
	}
	.ind3{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.ind3 img{
		width: 100%;
	}
	
	.ind4{
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.ind4>.items{
		width: 25%;
	}

	.ind4 img{
		width: 100%;
	}
	
	/*到底提示信息*/
	.showmsg{
		margin: 60px auto;
		width: 360px;
		height: 74px;
		border-radius: 37px;
		text-align: center;
		color: #666666;
		font-size: 28px;
		background: #fff;
		/*border: 1px solid #000;*/
		box-shadow: 0px 0px 50px rgba(0,0,0,.1);
		line-height: 74px;
	}
	.showmsg>span{
		position: relative;
		padding-right: 20px;
	}
	.showmsg>span::after{
		position: absolute;
		content: '';
		top: 0;
		bottom: 0;
		margin: auto;
		right: 0;
		width: 15px;
		height: 28px;
		background: transparent url(../../static/images/iconTriangle.png) no-repeat center;
		background-size: contain;
		
	}
	.toTop{
		position: fixed;
		bottom: 150px;
		right: 30px;
		width: 100px;
		height: 100px;
		z-index: 999;
		border-radius: 50%;
		background: #fff;
		opacity: .8;
	}
	.toTop>img{
		width: 100px;
		height: 100px;
	}
</style>