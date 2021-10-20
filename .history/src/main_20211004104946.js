import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);
const whiteList = ['/home', '/goods', '/login', '/register', '/goodsDetails', '/search'] // 不需要登陆的页面
router.beforeEach(function (to, from, next) {
  let params = {
    params: {
      token: window.localStorage.getItem('token')
    }
  }
  userInfo(params).then(res => {
    if (res.result.state !== 1) { // 没登录
      if (whiteList.indexOf(to.path) !== -1) { // 白名单
        next()
      } else {
        next('/login')
      }
    } else {
      store.commit('RECORD_USERINFO', { info: res.result })
      if (to.path === '/login') { //  跳转到
        next({ path: '/' })
      }
      next()
    }
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

