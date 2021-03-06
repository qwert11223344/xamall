import Vue from "vue";
import VueRouter from "vue-router";
import Index from "views/Index.vue";

const Login = () => import("views/login/Login.vue");
const Register = () => import("views/login/Register.vue");
const Home = () => import('views/home/Home.vue')
const Goods = () => import('views/goods/Goods.vue')
const GoodsDetail = () => import('views/goods/GoodsDetail.vue')
const Search = () => import('views/search/Search.vue')
const Profile = () => import('views/profile/Profile.vue')
const Address = () => import('views/profile/children/Address.vue')
const Order = () => import('views/profile/children/Order.vue')

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'goods', component: Goods, },
      { path: 'goodsDetail', name: 'GoodsDetail', component: GoodsDetail },
      { path: 'search', component: Search }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: '/profile',
    name: "Profile",
    component: Profile,
    redirect: '/profile/order',
    children: [
      { path: 'address', component: Address },
      { path: 'order', component: Order }

    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
