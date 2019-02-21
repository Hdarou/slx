
import Vue from 'vue'
import router from './router'
import footnav from '@/components/footnav'

import 'lib-flexible/flexible.js'

//导入store
import store from './vuex/store'
//导入axios
import axios from 'axios'
//把axios挂载到vue实例
Vue.prototype.$axios=axios;
//导入上拉下拉组件
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

//可触摸滑动
import LyTab from 'ly-tab'
Vue.use(LyTab)
//引入vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

////导入vuex插件
//import Vuex from 'vuex';
//Vue.use(Vuex);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { footnav },
  methods:{

  },
  mounted(){
    this.$axios({
      url:'/users/isLogin',
      method:'get'
    }).then(res=>{
      console.log(res)
      if(!res.data.err){
        this.$router.push({name:'Home'})
        this.$store.commit('changeUser',res.data)
      }
    })
  },
  watch:{
    $route(to,from){
        // to表示的是你要去的那个组件，from 表示的是你从哪个组件过来的，它们是两个对象，你可以把它打印出来，它们也有一个param 属性
        // console.log(to);
        // console.log(from);
        if(from.name=='Brandwall' && to.name=='Secondsort'){
          this.$store.commit('changeIsid',true)
        }else{
          this.$store.commit('changeIsid',false)

        }
        
    }
}
})
