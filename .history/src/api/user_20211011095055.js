import { network } from './public.js';

// 用户登录
export function userLogin(params) {
  return network({
    url: '/login',
    method: 'post',
    data: params,
  })
}
// 验证用户是否登录
export function checkLogin(params) {
  return network({
    url: '/checkLogin',
    method: 'post',
    data: params
  })
}

//获取购物车列表
export function getCartList(params) {
  return network({
    url: '/user/getCartList',
    method: 'post',
    data: params
  })
}

//添加购物车
export function addToCart(params) {
  return network({
    url: '/user/addToCart',
    method: 'post',
    data: params
  })
}

//删除购物车
export function delCartProd(params) {
  return network({
    url: '/user/delCartProd',
    method: 'post',
    data: params
  })
}

//获取地址
export function getAddressList(params) {
  return network({
    url: '/user/getAddressList',
    method: 'post',
    data: params
  })
}

//添加地址
export function addAddress(params) {
  return network({
    url: '/user/addAddress',
    method: 'post',
    data: params
  })
}

//修改地址
export function updateAddress(params) {
  return network({
    url: '/user/updateAddress',
    method: 'post',
    data: params
  })
}

//删除地址
export function delAddress(params) {
  return network({
    url: '/user/delAddress',
    method: 'post',
    data: params
  })
}

//更改默认地址
export function changeDef(params) {
  return network({
    url: '/user/changeDef',
    method: 'post',
    data: params
  })
}
