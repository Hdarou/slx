<template>
	<div>
		<div class="header">
			<img src="../../static/images/left.png" @click="go"/>	
			<span>{{secondsortlist.firstLevelName}}</span>
		</div>
		<div class="swiper-container borderbottom">
			<div class="swiper-wrapper nav">
				<div class="swiper-slide" :class="isactive==-1?'active':''" @click="tit(-1)">
					全部
				</div>
				<div class="swiper-slide" :class="isactive==index?'active':''" @click="tit(index)" v-for="(item,index) in secondsortlist.secondLevelList" :key="index">
					{{item.secondLevelName}}
				</div>
			</div>
		</div>
		<div class="content">
			<ul class="thirdnav">
				<li :class="issortactive==index?'active':''" v-for="(item,index) in sortdata" :key="index" @click="issortactive=index">{{item}}</li>
			</ul>
			<ul class="conlist">
				<li v-for="(item,index) in conlist" :key="index" @click="trun(item.localItemId)">
					<img :src="item.picUrl"/>
					<p class="tit">{{item.title}}</p>
					<div class="priceCart">
						<div class="price">
							<p>￥{{item.memberPrice}}</p>
							<del>￥{{item.price}}</del>
						</div>
						<img @click.stop="joincart(item.localItemId,item.picUrl,item.title,item.memberPrice)" src="../../static/images/joincart.png" alt="">
					</div>
				</li>
			</ul>
		</div>
	</div>
	
</template>

<script>
	import Swiper from 'swiper'
	export default{
		name:'secondsort',
		data(){
			return{
				secondsortlist:{},
				selectedId: 0,
		      	isactive:-1,
		      	sortdata:['默认','销量','收藏','价格','品牌'],
		      	issortactive:0,
		      	conlist:[]
			}
		},
		methods:{
			go(){
				this.$router.go(-1)
			},
			tit(index){
				this.isactive=index
			},
			trun(localItemId){
				console.log(localItemId)
				this.$router.push({name:'Gooddetails',params:{localItemId:localItemId}})
			},
			joincart(pid,pic,tit,mpri){
				console.log(pid,pic,tit,mpri)
				var info={
					localItemId:pid,
					title:tit,
					picurl:pic,
					price:mpri,
					num:1,
					goodskey:''//商品搜索关键词
				}
				this.$axios({
					url:'/pro/addcart',
					method:'post',
					data:{info:info}
				}).then(res=>{
					console.log(res);
					if(res.data.success){
						this.getgoodnum()
					}
				})				
			},
			getgoodnum(){
				this.$axios({
					url:'/pro/cartnum',
					method:'post'
				}).then(res=>{
					this.$store.commit("changeGoodnum",res.data.success)
				})
			}
		},
		mounted(){
			if(this.$store.state.ischangeid){
				this.$store.commit('changeLikeid',this.$route.params.secondLevelId)
			}
			console.log(this.$store.state.likeid)

			// var likeid=this.$route.params.secondLevelId
			this.$axios({
//				url:'/pro/levelName',
				url:'/pro/secondsort',
				method:'post',
				data:{
					likeid:this.$store.state.likeid
				}
			}).then(res=>{
				console.log(res)
				this.secondsortlist=res.data
				this.items=res.data.secondLevelList
				for(var i=0;i<res.data.secondLevelList.length;i++){
					if(res.data.secondLevelList[i].secondLevelId==this.$route.params.secondLevelId){
						this.isactive=i
						this.goodskey=res.data.secondLevelList[i].secondLevelName
						console.log(this.goodskey)

					}
				}
				//全部商品
				this.$axios({
					url:'/pro/allcommodity',
					method:'post',
					data:{
						goodskey:this.goodskey
					}
				}).then(res=>{
					console.log(res.data)
					this.conlist=res.data
				})			
			
			})

			
			
			
			
			var mySwiper = new Swiper('.swiper-container',{
				slidesPerView :5,
				observer:true,//修改swiper自己或子元素时，自动初始化swiper
    	    	observeParents:true,//修改swiper的父元素时，自动初始化swiper

			})
		}
	}
</script>

<style scoped lang="less">
	.header{
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 110px;
		line-height: 110px;
		background: #f8f8f8;
		color: #333;
		font-size: 42px;
		text-align: center;

		img{
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			left: 46px;
			
			width: 50px;
			height: 50px;
			vertical-align: middle;
		}
	}
	/*.nav{
		width: 100%;
		overflow: scroll;
		font-size: 28px;
		color: #333;
		ul{
			width: 2000px;
			display: flex;
			border-bottom: 2px solid #f3f3f3;
			li{
				width: 150px;
				height: 90px;
				line-height: 90px;
				text-align: center;
			}
			.active{
				border-bottom: 2px solid #ff5252;
				color: #ff5252;
			}
		}
	}*/
	
	.nav{
		width: 100%;
		height: 90px;
		line-height: 90px;
		font-size: 28px;
		color: #686868;
		
		display: flex;

		text-align: center;
		li{
			width: 150px;
			text-align: center;
		}
		.active{
			border-bottom: 4px solid #ff4747;
			color: #ff4747;
		}
		
	}
	.borderbottom{
		border-bottom: 2px solid #f3f3f3;
		
	}
	.thirdnav{
		width: 100%;
		height: 100px;
		line-height: 100px;
		display: flex;
		justify-content: space-around;
		font-size: 28px;
		color: #686868;
		border-bottom: 2px solid #f3f3f3;
		.active{
			color: #ff4747;
		}
		
	}
	.conlist{
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		li{
			padding: 20px;
			width: 50%;
			border: 2px solid #f7f7f7;
			box-sizing: border-box;

			img{
				width: 200px;
				height: 200px;
			}
			.tit{
				text-align: left;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;/*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示*/
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式*/
			}
			.priceCart{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.price{
					p{
						font-size: 24px;
						color: #ff3838;
					}
					del{
						font-size: 18px;
						color: #919191;
					}
				}
				img{
					width: 52px;
					height: 52px;
				}
			}
		}
	}
</style>