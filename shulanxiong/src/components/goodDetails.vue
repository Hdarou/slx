<template>
	<div class="bg">
		<div class="banner">
			<!--头部按钮-->
			<div class=" headerbtn fixedtop">
				<div class="btn ">
					<img src="../../static/images/left.png" @click="back"/>
					<span>商品详情</span>
					<img src="../../static/images/share_03.png"/>					
				</div>
			</div>		
			<div style="height: 100px;"></div>
			<!--轮播图-->
			<swiper class="swiper-container" :options="swiperOption">
		      <swiper-slide  v-for="(item,index) in list.picsPathList" :key="index"><img :src="item"></swiper-slide>
		    </swiper>
			<!--图片数量-->
		    <div class="swiper-pagination num"></div>

		</div>
		<div class="pricesale">
			<div>
				<span>￥</span>
				<span class="price">{{list.memberPrice}}</span>				
			</div>
			<span class="salenum">已售:{{list.saleNum}}件</span>
		</div>
		<p class="title">{{list.title}}</p>
		<p class="sellPointTips">{{list.sellPointTips}}</p>
		<div class="country">
			<div class="items">
				<div>
					<img :src="list.flagIconUrl"/>
					<span>{{list.country}}</span>				
				</div>
				<span>{{list.itemTaxTips}}</span>				
			</div>

			
		</div>
		<ul class="protection">
			<li v-for="(item,index) in list.itemLabelList" :key="index">
				<img :src="item.itemLabelIconUrl"/>
				<span>{{item.itemLabelName}}</span>
			</li>
		</ul>
		<div class="coupon">
			<div>
				<span>领券</span>
				<ul>
					<li v-for="(item,index) in couponlist" :key="index">
						{{item.couponTitle}}
					</li>
				</ul>
			</div>
			<img src="../../static/images/omit.png"/>
		</div>
		<!--说明-->
		<div class="caption">
			<span>说明</span>
			<ul>
				<li v-for="(item,index) in list.itemServiceTipsList" :key="index">
					
					<img src="../../static/images/dot.png"/>
					<span>{{item.itemServiceTtile}}</span>
					<!--<span>{{item.itemServiceSubTtile}}</span>-->
				</li>
			</ul>
		</div>
		<!--品牌-->
		<div class="brandName">
			<div>
				<img :src="list.brandLogo"/>
				<span>{{list.brandName}}</span>				
			</div>
			<span class="pronum">共有商品{{list.brandItemNum}}件</span>
		</div>
		<!--评价-->
		<div class="comment">
			暂无评价
			
		</div>
		<!--拖动-->
		<div class="drag">
			继续拖动,查看图文详情
		</div>
		<div id="contentddd" v-html="list.content"></div>
		<footshopbtn></footshopbtn>
		<addcart :cartgoodinfo='goodinfo'></addcart>
		<div class="bottom100">

		</div>
	</div>
</template>

<script>
	import footshopbtn from '@/components/footshopbtn'
	import addcart from '@/components/addcart'
	export default{
		name:'goodDetail',
		data(){
			return{
				goodinfo:'',
				list:{},
				couponlist:[],
				swiperOption: {//swiper3
					pagination: {
				        el: '.swiper-pagination',
				        type: 'fraction'
				    },
				    speed: 1000
				}
			}
		},
		components:{footshopbtn,addcart},
		methods:{
			back(){
				this.$router.go(-1)
				this.$store.commit("changeFoot",true)
			}
		},
		beforeMount(){
			//页面加载前 隐藏脚步
			this.$store.commit("changeFoot",false);
		},		
		mounted(){
			//请求商品数据
			this.$axios({
				url:'/pro/detail',
				method:'post',
				data:{
					localItemId:this.$route.params.localItemId
				}
			}).then(res=>{
				console.log(res.data[0]);
				this.list=res.data[0]
				this.goodinfo={
					localItemId:res.data[0].localItemId,
					price:res.data[0].memberPrice,
					titile:res.data[0].title,
					picurl:res.data[0].picUrl
				}
				
			})
			//请求优惠券
			this.$axios({
				url:'/pro/coupon',
				method:'post'
			}).then(res=>{
				// console.log(res);
				this.couponlist=res.data;

			})
		},
		watch:{
            $route(to,from){
                // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
                console.log(to);
                console.log(from);
            }
        }
	}
</script>

<style>
	.bg{
		background: #f8f8f8;
	}
	.banner{
		width: 100%;
		position: relative;

	}

	.banner img{
			width: 100%;
			height: 700px;
		}
	.headerbtn{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		font-size: 36px;

	}
	.headerbtn>.btn{
		display: flex;
		justify-content: space-between;
		padding: 50px;
		box-sizing: border-box;
		width: 100%;
	}
	.headerbtn>.btn>img{
		width: 42px;
		height: 42px;
	}
	.fixedtop{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #f8f8f8;
		z-index: 999;
	}
	.num{
		position: absolute;
		bottom: 30px;
		left: 650px;
		width: 74px;
		height: 42px;
		border-radius: 21px;
		font-size: 28px;
		color: #FFFFFF;
		text-align: center;
		line-height: 42px;
		background: rgba(233,233,233);
		z-index: 999;

	}
	.pricesale{
		padding: 30px 30px 40px;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #ff4141;
		font-size: 28px;
		border-bottom: 1px solid #f4f4f4;
		background: #fff;
		
		
	}
	.pricesale .price{
		font-size: 48px;
		
	}
	.pricesale>.salenum{
		color: #949494;
	}
	.title{
		width: 100%;
		height: 120px;
		color: #1e1e1e;
		font-size: 28px;
		padding: 0 50px;
		line-height: 60px;
		box-sizing: border-box;
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;/*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示*/
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;/*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式*/
		background: #fff;
		
	}
	.sellPointTips{
		color: #929292;
		padding: 0 50px;
		box-sizing: border-box;
		font-size: 20px;
		background: #fff;
	}
	
	/*国家*/
	.country{
		padding: 30px;
		box-sizing: border-box;
		width: 100%;
		font-size: 24px;
		background: #fff;
		
		

		
	}
	.country>.items{
		padding: 30px 0;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #9a9a9a;
		border-bottom: 1px solid #f4f4f4;
		
	}
	.country img{
		width: 30px;
		height: 20px;
		vertical-align: middle;
	}
	/*保障*/
	.protection{
		padding-left: 30px;
		box-sizing: border-box;
		width: 100%;
		height: 86px;
		line-height: 86px;
		color: #999;
		font-size: 24px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background: #fff;
	}
	.protection img{
		width: 30px;
		height: 30px;
		vertical-align: middle;
		margin-right: 18px;
	}
	/*优惠券*/
	.coupon{
		margin-top: 20px;
		width: 100%;
		height: 100px;
		/*line-height: 100px;*/
		padding: 0 30px;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #272727;
		border-bottom: 1px solid #f4f4f4;
	}
	.coupon>img{
		width: 45px;
		height: 45px;
		vertical-align: middle;
	}
	.coupon>div{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.coupon>div>ul{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 20px;
	}
	.coupon>div>ul>li{
		margin: 0 0 0 10px;
		padding: 8px;
		border-radius: 4px;
		background: #ffdddd;
		color: #ff4444;
	}

	/*说明*/
	.caption{
		margin-top: 20px;
		width: 100%;
		height: 100px;
		padding: 0 30px;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		
	}
	.caption>ul{
		display: flex;
		justify-content: flex-start;

	}

	.caption>ul>li>img{
		width: 50px;
		height:50px;
		vertical-align: middle;
	}
	/*品牌*/	
	.brandName{
		margin-top: 20px;
		padding: 0 30px;
		box-sizing: border-box;
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		
	}
	.brandName>div{
		font-size: 24px;
	}
	.brandName>div>img{
		width: 80px;
		height: 80px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.brandName>span{
		position: relative;
		font-size: 20px;
		padding-right: 30px;
		color: #959595;
	}
	.brandName>span::after{
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		right: 0;
		content: '';
		width: 30px;
		height: 30px;
		background: transparent url(../../static/images/right.png) no-repeat center;
		background-size: contain;
	}
	
	/*评论*/
	.comment{
		margin-top: 20px;
		padding: 0 30px;
		box-sizing: border-box;
		width: 100%;
		height: 100px;
		line-height: 100px;
		color: #959595;
		font-size: 28px;
		background: #fff;
		
	}
	
	/*拖动*/
	.drag{
		width: 100%;
		height: 100px;
		line-height: 100px;
		text-align: center;
		color: #959595;
		font-size: 26px;
	}
	
	#contentddd{
		width: 100%;

	} 
	/*#contentddd>>>p{
		width: 100px;
	}*/
	#contentddd img{
		width: 100%;
	}
	.bottom100{
		width: 100%;
		height: 100px;
	}
</style>