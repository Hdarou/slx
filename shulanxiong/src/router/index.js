import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/components/home'
import Sort from '@/components/sort'
//sort的子组件
import Brandwall from '@/components/sort/brandwall'
import Brand from '@/components/sort/brand'
//发现组件
import Find from '@/components/find'
import Cart from '@/components/cart'
import Member from '@/components/member'
//详情页
import Gooddetails from '@/components/goodDetails'
//二级分类组件
import Secondsort from '@/components/secondsort'
//三级级分类组件
import Thirdsort from '@/components/thirdsort'
//登录组件
import Login from '@/components/login'
//账号密码登录
import Accountlogin from '@/components/accountlogin'
//注册
import Reg from '@/components/reg'
// 设置组件
import Setup from '@/components/setup'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
			redirect:'login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/accountlogin',
      name: 'Accountlogin',
      component: Accountlogin
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/sort',
      name: 'Sort',
      component: Sort,
      children:[
	      {
	      	path:'brandwall',
	      	name:'Brandwall',
	      	component:Brandwall
	      },
	      {
	      	path:'brand',
	      	name:'Brand',
	      	component:Brand
	      }
	    ],
	    redirect:'/sort/brandwall'
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    },  
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/gooddetails',
      name: 'Gooddetails',
      component: Gooddetails
    },
    {
      path: '/setup',
      name: 'Setup',
      component: Setup
    },   
    {
      path: '/secondsort',
      name: 'Secondsort',
      component: Secondsort,
      children:[
	      {
	      	path:'thirdsort',
	      	name:'Thirdsort',
	      	component:Thirdsort
	      }
	    ],
//	    redirect:'/thirdsort'      
    }
  ]
})
