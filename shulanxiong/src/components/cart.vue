<template>
	<div class="bg">
		<div class="header">
			购物车
			<span v-if="list.length>0" class="edit" @click="Edit">{{isShowDel?'完成':'编辑'}}</span>
		</div>
		<div class="top100">
			
		</div>
		<div class="emptycart" v-if="list.length==0">
			<img src="../../static/images/cart_03.png"/>	
			<p>不要让我独守空车嘛~</p>
			<router-link class="btn" to="/home">去逛逛</router-link>
		</div>
		<div class="cartcon" v-else>
			<div class="delivery">
				<div class="active">快递配送</div>
				<div>门店自提</div>
			</div>
			<div class="bonded" @click="CheckBonded">
				<img v-if="isCheckBonded" src="../../static/images/goucheck.png"/>
				<img v-else src="../../static/images/quan.png"/>
				保税仓发货
			</div>
			<ul class="cartitems">
				<li  v-for="(item,index) in list" :key="index">
					<div class="radiocheck" @click="radiocheck(index,item.localItemId)">
						<img v-if="item.ischeck" src="../../static/images/goucheck.png"/>
						<img v-else src="../../static/images/quan.png"/>	
					</div>
					<div class="cartinfo">
						<img class="pic" :src="item.picurl"/>
						<div class="cartinfotxt">
							<p class="tit">{{item.titile}}</p>
							<div class="priNum">
								<p>{{item.price}}</p>
								<div class="numbox">
									<input @click="reduce(index,item.localItemId)"  class="reduce" type="button" value="-" />
									<input class="goodnum" type="text"  v-model="item.num"/>
									<input @click="add(index,item.localItemId)"   class="add" type="button" value="+" />					
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
			
			<div class="total">
				<p><span>商品总额：￥</span><span>{{totalprice}}</span></p>
				<p><span>税费：￥</span><span>{{taxation}}</span></p>
				<p><span>合计（不含运费）：￥</span><span>{{figureout}}</span></p>
				<span :class="[Settlement,isActiveSett?'redcol':'huicol']">去结算</span>
			</div>

			<!-- 删除 -->
			<div v-if="isShowDel" class="delbox">
				<div class="bonded" @click="CheckBonded">
					<img v-if="isCheckBonded" src="../../static/images/goucheck.png"/>
					<img v-else src="../../static/images/quan.png"/>
					全选
				</div>
				<button @click="del" :class="[Del,isActiveDel?'redcol':'huicol']">删除</button>
			</div>
			
		</div>

	</div>
</template>

<script>
	export default{
		name:'cart',
		data(){
			return{
				Del:'del',
				Settlement:'settlement',
				isActiveSett:false,//结算按钮是否可用，样式控制
				isActiveDel:false,//删除按钮是否可用，样式控制
				isShowDel:false,//全选删除是否显示
				list:[],
				isCheckBonded:false,
				goodnum:0,
				totalprice:'0.00',//总价
				taxation:'0.00',//税费
				figureout:'0.00',//总计
				delid:[]//要删除商品的id
			}
		},
		methods:{
			// 请求购物车数据的方法
			loadCartData(){
				this.$axios({
					url:'/pro/cartinfo',
					method:'post'
				}).then(res=>{
					console.log(res)
					if(res.data.err){
						this.list=''
					}else{
						for(var i=0;i<res.data.length;i++){
							res.data[i].ischeck=false;
						}
						this.list=res.data
					}
				})
				//购物车数量
				this.$axios({
					url:'/pro/cartnum',
					method:'post'
				}).then(res=>{
					this.$store.commit("changeGoodnum",res.data.success)
				})
			},
			// 编辑按钮
			Edit(){
				// 切换编辑状态
				this.isShowDel=!this.isShowDel;
				// 初始化
				// 让各个按钮不可以，每件商品为未选中状态
				this.isActiveSett=false;
				this.isActiveDel=false;
				this.list.forEach(ele => {
					ele.ischeck=false
				});
			},
			//计算商品总额
			
			Totalprice(){
				for(var i=0;i<this.list.length;i++){
					var totalprice=0;
					if(this.list[i].ischeck){
						totalprice+=Number(this.list[i].price)*Number(this.list[i].num)
					}
					if(totalprice==0){
						this.totalprice='0.00'
					}else{
						this.totalprice=totalprice
					}
				}
				//计算税费
					if((Number(this.totalprice)*0.119).toFixed(2)==0){
						this.taxation='0.00'
					}else{
						this.taxation=(Number(this.totalprice)*0.119).toFixed(2)
					}				
				//总计
				if((Number(this.totalprice)+Number(this.taxation))==0){
						this.figureout='0.00'
					
				}else{
					this.figureout=Number(this.totalprice)+Number(this.taxation)
					
				}
			},

			// 全选
			CheckBonded(){
				this.isCheckBonded=!this.isCheckBonded
				if(!this.isCheckBonded){
					this.isActiveSett=false
				}else{
					this.isActiveSett=true
					
				}
				//全选按钮控制单选按钮
				for(var i=0;i<this.list.length;i++){
					this.list[i].ischeck=this.isCheckBonded
				}
				//调用计算总价的方法
				this.Totalprice()				
			},
			//单选
			radiocheck(index,localItemId){
				// 切换选中
				this.list[index].ischeck=!this.list[index].ischeck
				// 当是编辑状态的操作
				if(this.isShowDel){
					// 选中状态，将商品id存入数组
					if(this.list[index].ischeck){
						this.delid.push(localItemId)
					}else{
					// 未选中状态，将商品id移除数组
						this.delid.pop(localItemId)
					}
					//判断删除按钮是否可用
					if(this.delid.length==0){
						this.isActiveDel=false
					}else{
						this.isActiveDel=true
					}
				}else{
					//非编辑状态下的操作
					this.isActiveSett=!this.isActiveSett

					//判断全部选中时，全选选中
					var count=0;
					for(var i=0;i<this.list.length;i++){
						if(this.list[i].ischeck){
							count++
						}
					}
					if(count==this.list.length){
						this.isCheckBonded=true
					}else{
						this.isCheckBonded=false
						
					}
					//调用计算总价的方法
					this.Totalprice()					
				}


			},
			// 减少商品件数
			reduce(index,localItemId){
				this.list[index].ischeck=true
				this.isActiveSett=true
				if(this.list[index].num>1){
					this.list[index].num--	
					this.$axios({
						url:'/pro/addcart',
						method:'post',
						data:{info:{localItemId:localItemId,num:this.list[index].num,method:'chagenum'}}
					}).then(res=>{
						console.log(res);
					})					
				}else{
					
				}
				//调用计算总价的方法
				this.Totalprice()
			},
			// 增加商品件数
			add(index,localItemId){
				this.list[index].ischeck=true
				this.isActiveSett=true
				
				this.list[index].num++
					this.$axios({
						url:'/pro/addcart',
						method:'post',
						data:{info:{localItemId:localItemId,num:this.list[index].num,method:'chagenum'}}
					}).then(res=>{
						console.log(res);
					})
				//调用计算总价的方法
				this.Totalprice()					
			},
			// 删除
			del(){
				// 当isActiveDel为true时按钮才可用
				if(this.isActiveDel){
					console.log(this.delid)
					this.$axios({
						url:'/pro/del',
						method:'post',
						data:{
							localItemId:this.delid
						}
					}).then(res=>{
						if(res.data.success){
							// 删除成功重新加载数据
							this.loadCartData()
							// 删除后按钮变为不可用
							this.isActiveDel=false
						}
					})
				}
			}
		},
		mounted(){
			// 加载数据
			this.loadCartData()
		}
	}
</script>

<style>
	.bg{
		width: 100%;
		min-height: 100vh;
		background: #ebebeb;
		display: flex;
		flex-direction: column;
	}
	.header{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100px;
		line-height: 100px;
		font-size: 40px;
		background:#f8f8f8 ;
		text-align: center;
		border-bottom: 2px solid #ECECEC;
		z-index: 1;
	}
	.top100{
		width: 100%;
		height: 100px;
	}
	.header>.edit{
		position: absolute;
		right: 34px;
		font-size: 26px;
		
	}
	.cartcon{
		position: relative;
		width: 100%;
		height: 1100px;
		overflow-y: auto
	}
	/* 删除按钮部分 */
	
	.delbox{
		padding: 0 30px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		left: 0;
		bottom:100px;
		width: 100%;
		height: 124px;
		background: #fff;
		font-size: 28px;

	}
	.delbox>.del{
		width: 184px;
		height: 70px;
		border-radius: 10px;
		color: #fff;
		outline: none;
		border: none;
	}
	.cartcon>.delivery{
		display: flex;
		justify-content: flex-start;
		padding: 20px;
		box-sizing: border-box;
		background: #fafafa;
	}
	.cartcon>.delivery>div{
		width: 210px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		border:1px solid #e6e6e6;
		border-radius: 5px;
		background: #fff;
		color: #2b2b2b;
		font-size: 28px;
		margin-right: 20px;
	}
	.cartcon>.delivery>div.active{
		position: relative;
		padding-left: 40px;
		box-sizing: border-box;
		border: 2px solid #ff365c;
		border-radius: 5px;
		background: #fef4f3;
		
	}
	.cartcon>.delivery>div.active::before{
		position: absolute;
		top: 0;
		left:30px;
		bottom: 0;
		margin: auto;
		content: '';
		width: 32px;
		height: 32px;
		background: transparent url(../../static/images/gou.png) no-repeat center;
		background-size: contain;
	}
	.bonded{
		font-size: 27px;
		color: #212121;
		padding: 30px;
		box-sizing: border-box;
		background: #fafafa;
		margin-top: 20px;
	}
	.bonded>img{
		width: 50px;
		height: 50px;	
		vertical-align: middle;	
	}
	.cartitems{
		padding: 30px;
		box-sizing: border-box;
		background: #fafafa;
		margin: 2px 0;
	}
	.cartitems>li{
		margin-top: 25px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		
	}
	.cartitems .pic{
		width: 170px;
		height: 170px;
	}
	.cartitems .cartinfo{
		padding: 20px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
		width: 600px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0px 0px 4px rgba(0,0,0,.6);
	}
	.cartinfotxt{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.cartinfo .tit{
		font-size: 25px;
		color: #1a1a1a;
	}
	.cartinfo .priNum{
		display: flex;
		justify-content: space-between;
	}
	.priNum>.numbox{
		font-size: 0;
	}
	.priNum>.numbox>.reduce{
		width: 54px;
		height: 42px;
		line-height: 42px;
		border:1px solid #e0e0e0;
		box-sizing: border-box;
		text-align: center;
		outline: none;
		background: #fff;
		font-size: 25px;
	}
	.priNum>.numbox>.goodnum{
		width: 70px;
		height: 42px;
		line-height: 42px;
		border-top:1px solid #e0e0e0;
		border-bottom:1px solid #e0e0e0;
		box-sizing: border-box;
		text-align: center;
		outline: none;
		background: #fff;
		font-size: 25px;
		
	}
	.priNum>.numbox>.add{
		width: 54px;
		height: 42px;
		line-height: 42px;
		border:1px solid #e0e0e0;
		box-sizing: border-box;
		text-align: center;
		outline: none;
		background: #fff;
		font-size: 25px;
		
	}
	.emptycart{
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* position: absolute; */
		align-items: center;
		/* top: 50%;
		transform: translateY(-50%); */
		background: #fff;
		text-align: center;
		color: #9d9d9d;
		font-size: 24px;
		width: 100%;
		height: 1200px;

	}
	.emptycart>*{
		margin-bottom: 25px;
	}
	.emptycart>img{
		width: 234px;
		text-align: center;
		
	}
	.emptycart>.btn{
		display: inline-block;
		width: 230px;
		height: 56px;
		line-height: 56px;
		border:2px solid #9d9d9d;
		border-radius: 5px;
		font-size: 24px;
		font-weight: 700;
		color: #9d9d9d;
	}
	
	
	.total{
		position: relative;
		flex: 1;
		padding: 30px;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background: #fafafa;
		color: #9b9b9b;
		font-size: 22px;
		text-align: right;
		width: 100%;
		height: 400px;
	}
	.total>p{
		margin-bottom: 30px;
	}
	.total>.settlement{
		display: inline-block;
		position: absolute;
		top: 210px;
		right: 30px;
		width: 184px;
		height: 74px;
		line-height: 74px;
		text-align: center;
		border-radius: 10px;
		color: #fefefe;
	}
	/* 按钮不可用时样式 */
	.huicol{
		background: #cccccc;
	}
	/* 按钮可用时样式 */
	.redcol{
		background: #ff5452;
	}
</style>