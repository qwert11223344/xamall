import { network } from './public';

// 获取全部商品
export function getAllGoods() {
  return network({
    url: '/goods'
  })
}

// 获取商品详情
export function getDetail(prodId, groupId) {
  return network({
    url: '/goods/detail',
    params: {
      productId: prodId,
      groupId,
    }
  })
}

// 搜索商品
export function searchGoods(keywords) {
  return network({
    url: '/goods/searchGoods',
    params: {
      keywords,
    }
  })
}
