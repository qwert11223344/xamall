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
const OrderDetail = () => import('views/profile/children/OrderDetail.vue')
const Infomation = () => import('views/profile/children/Infomation.vue')
const Discount = () => import('views/profile/children/Discount.vue')
const ShopCart = () => import('views/shopcart/ShopCart.vue')
const Checkout = () => import('views/checkout/Checkout.vue')
const Payment = () => import('views/payment/Payment.vue')
const Alipay = () => import('views/payment/Alipay.vue')
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
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/profile',
    name: "Profile",
    component: Profile,
    redirect: '/profile/order',
    children: [
      { path: 'address', component: Address },
      { path: 'order', component: Order },
      { path: 'infomation', component: Infomation },
      { path: 'discount', component: Discount },
      { path: 'orderDetail', component: OrderDetail }
    ]
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    children: [
      { path: 'alipay', component: Alipay }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
