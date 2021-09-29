import Vue from "vue";
import VueRouter from "vue-router";
import Index from "views/Index.vue";

const Login = () => import("views/login/Login.vue");
const Register = () => import("views/login/Register.vue");
const Home = () => import('views/home/Home.vue')
const Goods = () => import('views/goods/Goods.vue')
const GoodsDetail = () => import('views/goods/GoodsDetail.vue')
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/goods', component: Goods, },
      { path: '/goodsDetail', component: GoodsDetail }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Login",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
