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