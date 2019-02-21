<template>
	<div>
		<div class="header">发现</div>
		<div class="top">
			<img :src="findlist.picUrl"/>
			<p class="tit">{{findlist.title}}</p>			
		</div>
		<!--上新推荐-->
		<p class="sorttit">-{{recommendation.modularTitle}}-</p>
		<ul class="recommendation">
			<li v-for="(subitem,subindex) in recommendation.modularDataList" :key="subindex">
				<img :src="subitem.picUrl"/>
				<p class="tit">{{subitem.title}}</p>
				<p v-if='subitem.price' class="price">￥{{subitem.price}}</p>
			</li>
		</ul>
		<p class="nodata">查看更多》</p>
		<!--门店展示-->
		<div class="store">
			<div><img :src="storelist.modularIcon" alt="" /><span>{{storelist.modularTitle}}</span></div>
			<img src="../../static/images/right.png"/>
		</div>

		<swiper class="swiper-container" :options="swiperOption">
			      <swiper-slide v-for="(item,index) in storelist.modularDataList" :key="index"><img :src="item.bannerUrl"></swiper-slide>
		</swiper>	
		<p class="nodata">没有更多数据</p>
		<div class="bottom100"></div>
	</div>
</template>

<script>
	export default{
		name:'find',
		data(){
			return{
				findlist:'',
				recommendation:'',
				storelist:'',
				swiperOption: {//swiper3
					pagination: {
				        el: '.swiper-pagination',
				        type: 'fraction'
				    },
				    speed: 1000
				}
			}
		},
		mounted(){
			this.$axios({
				url:'pro/find',
				method:'post'
			}).then(res=>{
				console.log(res.data);
				this.findlist=res.data[0].modularDataList[0]
				this.recommendation=res.data[1]
				this.storelist=res.data[2]
			})
		}
	}
</script>

<style>
	.header{
		width: 100%;
		height: 100px;
		line-height: 100px;
		font-size: 40px;
		background:#f8f8f8 ;
		text-align: center;
		border-bottom: 2px solid #ECECEC;
	}
	.sorttit{
		height: 100px;
		line-height: 100px;
		text-align: center;
		font-size: 28px;
	}
	.top{
		width: 90%;
		margin: 56px auto;
	}
	.top img{
		width: 100%;
	}
	.recommendation{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;

		
	}
	.recommendation li{
		width: 50%;
		box-sizing: border-box;
		border-bottom: 1px solid #ececec;
		background: #fafafa;
		text-align: center;
		
		
	}
	.recommendation li:nth-child(-n+2){
		border-top: 1px solid #ececec;
	}
	.recommendation li:nth-child(n+1){
		border-right: 1px solid #ececec;
	}
	.recommendation li img{
		width: 90%;
		margin: 10px 0;
		text-align: center;
	}
	.recommendation li .tit{
		padding:0 10px;
		box-sizing: border-box;
		text-align: left;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;/*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示*/
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式*/
	}
	.recommendation li .price{
		padding: 10px;
		box-sizing: border-box;
		text-align: left;
	}
	
	
	.swiper-container img{
		width: 520px;
		height: 310px;
	}
	.nodata{
		text-align: center;
		color: #a3a3a3;
		font-size: 28px;
	}
	.store{
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;		
		align-items: center;
	}
	.store>div>img{
		width: 40px;
		height: 40px;
		vertical-align: middle;
	}
	.store span{

		font-size: 30px;
		color: #232323;
	}
	.store>img{
		width: 30px;
		height: 30px;
	}
	.bottom100{
		width: 100%;
		height: 110px;
	}
</style>