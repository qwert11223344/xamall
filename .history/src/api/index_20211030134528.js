import { network } from './public.js';

// 首页数据
export function getHomeData() {
  return network({
    url: '/home'
  })
}

// 导航列表
export function getNav() {
  return network({
    url: '/nav',
    method: 'get',

  })
}

