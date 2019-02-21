<template>
	<div>
		<div class="header">
			<div class="searchBox">
				<img src="../../static/images/sort-serach.png"/>
				<input type="text" placeholder="搜索商品" />
			</div>			
		</div>
		<div class="sort">
			<span :class="{active:isactive}" @click="isactive=true"><router-link to="/sort/brandwall">分类</router-link></span>
			<span :class="{active:!isactive}" @click="isactive=false"><router-link to="/sort/brand">品牌</router-link></span>		
			
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		name:'sort',
		data(){
			return{
				isactive:true
				
			}
		}

	}
</script>

<style scoped>
	.header{
		
		width: 100%;
		height: 100px;
		background: #f8f8f8;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.searchBox{
		/*margin: 15px auto;*/
		width: 690px;
		height: 70px;
		border-radius: 35px;
		background: #ececec;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.searchBox img{
		width: 32px;
		height: 32px;
	}
	.searchBox input{
		background: #ececec;
		border: none;
		outline: none;
		width: 150px;
		padding-left: 10px;
	}
	.sort{
		width: 100%;
		height: 100px;
		background: #fafafa;
		border-top: 1px solid #ededed;
		border-bottom: 1px solid #ededed;
		font-size: 28px;
		line-height: 100px;
		display: flex;
		justify-content: space-around;
	}
	.sort a{
		color: #444444;
	}
	.sort>.active a{
		color: #ff5757;
	}
</style>