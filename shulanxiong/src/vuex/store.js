import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//公用状态管理
const state={
	count:1,
	footstyle:true,
	//加入购物车组件是否显示
	addcartisshow:false,
	//购物车数量
	goodnum:0,
	//登录的用户信息
	User:{},
	//分类二级菜单接受的id
	likeid:'',
	//分类二级菜单接受的id
	ischangeid:false
}

//公用函数 用来改变公用状态
const mutations={
	add(state,num){
		state.count+=num
	},
	//改变脚步的函数
	changeFoot(state,txt){
		state.footstyle=txt;
	},
	//改变加入购物车组件是否显示的函数
	changeAddcart(state,txt){
		state.addcartisshow=txt;
	},
	//改变购物车数量的函数
	changeGoodnum(state,num){
		state.goodnum=num;
	},
	//改变用户信息的函数
	changeUser(state,txt){
		state.User=txt;
	},
	//改变分类二级菜单接受的id的函数
	changeLikeid(state,txt){
		state.likeid=txt;
	},	
	changeIsid(state,txt){
		state.ischangeid=txt;
	},
}
//导出

export default new Vuex.Store({
	state,
	mutations
})
