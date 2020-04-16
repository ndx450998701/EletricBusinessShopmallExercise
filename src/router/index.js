import Vue from 'vue'
import Router from 'vue-router'
import shopmall from '@/components/page/shopmall'
import register from '@/components/page/register'
import login from '@/components/page/login'
import goodsDetails from '@/components/page/goodsDetails'
import categoryList from '@/components/page/categoryList'
import cart from '@/components/page/cart'
import main from '@/components/page/main'
import member from '@/components/page/member'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {path: '/main',name: 'main',component: main,
      children:[
        {path: '/',name: 'shopmall',component: shopmall},
        {path: '/categoryList',name: 'categoryList',component: categoryList},
        {path: '/cart',name: 'cart',component: cart},
        {path: '/register',name: 'register',component: register},
        {path: '/login',name: 'login',component: login},
        {path: '/member',name: 'member',component: member}, 
      ]
  },
        
    {path: '/goodsDetails',name: 'goodsDetails',component: goodsDetails},    
  ]
}) 
