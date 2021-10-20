import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { checkLogin } from './api/index';

Vue.config.productionTip = false
Vue.use(ElementUI);
const whiteList = ['/home', '/goods', '/login', '/register', '/goodsDetail', '/search'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
  let params = {
    params: {
      token: window.localStorage.getItem('token')
    }
  }
  console.log(params.token);
  checkLogin(params).then(res => {
    if (res.code === 401) { // 没登录
      if (whiteList.indexOf(to.path) !== -1) { // 白名单
        next()
      } else {
        next('/login')
      }
    }
  })
})

Vue.use(VueLazyload, {
  loading: require('./assets/img/placeholder.png')
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

