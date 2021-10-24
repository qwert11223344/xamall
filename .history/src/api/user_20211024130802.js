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
//请求公钥
export function getPublicKey() {
  return network({
    url: 'getPublicKey'
  })
}
// 验证用户名是否被注册
export function checkRegister(params) {
  return network({
    url: '/user/checkRegister',
    method: 'post',
    data: params
  })
}
// 注册用户
export function userRegister(params) {
  return network({
    url: '/user/userRegister',
    method: 'post',
    data: params
  })
}

// 修改用户单条信息
export function updateUserOne(params) {
  return network({
    url: '/user/updateUserOne',
    method: 'post',
    data: params
  })
}

// 修改用户密码
export function updatePass(params) {
  return network({
    url: '/user/updatePass',
    method: 'post',
    data: params
  })
}

// 上传头像
// export function uploadAvatar(params) {
//   return network({
//     url: '/user/uploadAvatar',
//     method: 'post',
//     data: params
//   })
// }

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

//删除购物车数量
export function delCartProd(params) {
  return network({
    url: '/user/delCartProd',
    method: 'post',
    data: params
  })
}

// 删除整条购物车
export function delCartAll(params) {
  return network({
    url: '/user/delCartAll',
    method: 'post',
    data: params
  })
}

//修改购物车的数量
export function updateProdNum(params) {
  return network({
    url: 'user/updateProdNum',
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
