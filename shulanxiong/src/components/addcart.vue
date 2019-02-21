<template>
	<div class="container" v-if="$store.state.addcartisshow" @click.self="x">
		<div class="content">
			<div class="tit">
				<img :src="cartgoodinfo.picurl"/>
				<div>
					<p>{{cartgoodinfo.titile}}</p>
					<p>{{cartgoodinfo.price}}</p>
					<p>{{cartgoodinfo.price}}</p>
				</div>
				<img @click="x" class="x" src="../../static/images/X.png"/>				
			</div>
			<div class="numcart">
				<p class="numtit">数量</p>
				<div class="numcontent">
					<div class="numbox">
						<input @click="reduce" class="reduce" type="button" value="-" />
						<input class="goodnum" type="text" v-model="goodnum" />
						<input @click="add" class="add" type="button" value="+" />					
					</div>
					<p>暂时有货赶紧下单</p>
					
				</div>

			</div>
			<div @click="addcart" class="btn">确定</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'addcart',
		data(){
			return{
				goodnum:1
			}
		},
		props:['cartgoodinfo'],
		methods:{
			addcart(){
				this.cartgoodinfo.num=this.goodnum
//				console.log(this.cartgoodinfo)
				this.$axios({
					url:'/pro/addcart',
					method:'post',
					data:{info:this.cartgoodinfo}
				}).then(res=>{
					console.log(res);
					if(res.data.success){
						this.goodnum=1
						this.$store.commit("changeAddcart",false)
						this.getgoodnum()
					}
				})
			},
			x(){
				this.$store.commit("changeAddcart",false)
			},
			reduce(){
				if(this.goodnum>1){
					this.goodnum--		
				}else{
					
				}

			},
			add(){
				this.goodnum++
			},
			//获取购物车商品件数
			getgoodnum(){
				this.$axios({
					url:'/pro/cartnum',
					method:'post'
				}).then(res=>{
					this.$store.commit("changeGoodnum",res.data.success)
				})
			}
		}
		
	}
</script>

<style scoped lang="less">
	.container{
		/*display: none;*/
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		background: rgba(0,0,0,.5);
		.content{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 995px;
			background: #fff;
			.tit{
				padding: 34px;
				box-sizing: border-box;
				display: flex;
				justify-content: space-around;
				align-items: center;
				img{
					width: 165px;
					height: 165px;
				}
				.x{
					width: 40px;
					height: 40px;
					align-self: flex-start;
				}
			}
			.numcart{
				padding: 30px;
				box-sizing: border-box;
				font-size: 26px;

				.numtit{
					border-top: 1px solid #ebebeb;
					line-height: 100px;
					
				}
				.numcontent{
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
					.numbox{
						font-size:0;

						
						.reduce{
							width: 72px;
							height: 72px;
							box-sizing: border-box;
							outline: none;
							border: 1px solid #e8e8e8;
							background: #fff;
							font-size: 26px;

						}
						.goodnum{
							width: 105px;
							height: 72px;
							box-sizing: border-box;
							outline: none;
							border: 1px solid #e8e8e8;
							background: #fff;			
							font-size: 26px;
							text-align: center;
											
						}
						.add{
							width: 72px;
							height: 72px;
							box-sizing: border-box;
							outline: none;
							border: 1px solid #e8e8e8;
							background: #fff;			
							font-size: 26px;
						}						
					}
				}

			}
			.btn{
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 100px;
				background: #ff5452;
				color: #fff;
				font-size: 40px;
				text-align: center;
				line-height: 100px;
				
			}
		}
	}
</style>