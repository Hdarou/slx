<template>
	<div class="wrap">
		<div class="sidenav">
			<ul>
				<li v-for="(item,index) in levelNameList" :key="index"  @click="toggle(index)">
					<span :class="{active:index==isactiveind}">{{item.firstLevelName}}</span>
				</li>
			</ul>
		</div>
		<div class="content">
			<ul>
				<li v-for="(secitem,secindex) in secondLevelList" :key="secindex" @click="gosecsort(secitem.secondLevelId)">
					<img :src="secitem.picUrl"/>
					<p>{{secitem.secondLevelName}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:'brandwall',
		data(){
			return{
				levelNameList:{},
				secondLevelList:[],
				isactiveind:0
			}
		},
		methods:{
			toggle(index){
				this.secondLevelList=this.levelNameList[index].secondLevelList
				this.isactiveind=index
			},
			gosecsort(secondLevelId){
				this.$router.push({name:'Secondsort',params:{secondLevelId:secondLevelId}})
				
			}
		},
		mounted(){
			this.$axios({
				url:'/pro/levelName',
				method:'post'
			}).then(res=>{
				this.levelNameList=res.data
				this.secondLevelList=res.data[0].secondLevelList
				console.log(res);
			})
		}
	}
</script>

<style scoped>
	.wrap{
		display: flex;
		width: 100%;
		height: 100%;
		background: #fafafa;
		font-size: 28px;
		
	}
	.wrap>.sidenav{
		width: 210px;
		text-align: center;


	}
	.wrap>.sidenav li{
		/*margin: 40px 0;*/
		height: 110px;
		color: #2b2b2b;
		line-height: 110px;
		
	}
	.sidenav li .active{
		display: inline-block;
		/*margin: 40px auto;*/
		width: 190px;
		height: 60px;
		line-height: 60px;
		background: #f25d56;
		color: #fff;
		border-radius: 30px;

	}
	.wrap>.content{
		width: 540px;
		height: 1100px;
	}
	.wrap>.content ul{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		align-items: center;
		text-align: center;
		background: #fff;
	}
.content ul li{
	width: 180px;
	color: #a6a6a6;
}
	.content img{
		width: 150px;
		height: 150px;
	}
	.content p{
		margin: 10px 0;
	}

</style>