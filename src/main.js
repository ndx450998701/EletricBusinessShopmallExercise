// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)
//!全局引入的方法如上面三行代码，缺点是babel打包会非常大，不推荐，建议使用局部引入

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
// Vue.use(VueAwesomeSwiper)
//!全局引入的方法如上面三行代码，缺点是babel打包会非常大，不推荐，建议使用局部引入

import { CellGroup,Cell,Tabbar,TabbarItem,Stepper, PullRefresh, Tab, Tabs, Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar} from 'vant'
Vue.use(CellGroup).use(Cell).use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Tab).use(Tabs).use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
