import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.use(VueLazyload, {
  loading: require('./assets/img/placeholder.png')
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

