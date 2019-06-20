import Vue from 'vue'
import App from './App.vue';
import VueRouter from  'vue-router';
// import './lib/font-awesome.css';
// import './lib/fontawesome-webfont.svg'
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';
import './lib/normalize.css'
import './css/common/global.css';

// 使用vue-ins-progress-bar组件
import VueInsProgressBar from 'vue-ins-progress-bar'

const options = {
  position: 'fixed',
  show: true,
  height: '1px'
}

Vue.use(VueInsProgressBar, options)

// 路由
Vue.use(VueRouter);
Vue.config.productionTip = false

import Home from './page/Home';
import AdminBase from './page/admin/Base'
import Stock from './page/admin/Stock'
import Trade from './page/admin/Trade'
import Account from './page/admin/Account'
import User from './page/admin/User'
import Stock_Account from './page/Stock_Account'
import Wansen from './page/wansen/Wansen'

const router = new VueRouter({
  routes:[
    {path:'/',component:Home},
    {path:'/stock_account',component:Stock_Account},
    {path:'/wansen',component:Wansen},
    {
      path:'/admin',component:AdminBase,
      children:[
        {path:'stock',component:Stock},
        {path:'trade',component:Trade},
        {path:'user',component:User},
        {path:'account',component:Account},
      ]
    }
  ]
})
new Vue({
  render: h => h(App),
  router:router,
}).$mount('#app')
