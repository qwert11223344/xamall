import {
  ADD_CART,
  GET_USERINFO,
  RECORD_USERINFO,
  DELETE_CART,
  EDIT_CART,
  REMOVE_USER,
  RESET_PROD,
  UPDATE_USERINFO
} from './mutation-types'

export default {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info
    state.login = true
  },
  // 修改用户信息
  [UPDATE_USERINFO](state, payload) {
    let column = payload.column;
    let value = payload.value
    state.userInfo[column] = value
  },
  // 获取用户信息
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = { ...info }
    } else {
      state.userInfo = null
    }
  },
  //删除用户信息
  [REMOVE_USER](state) {
    state.login = false;
    state.userInfo = null
  },
  // 进入购物车
  [ADD_CART](state, payload) {
    state.cartList = payload
  },
  //重置
  [RESET_PROD](state) {
    state.isAdd = false
  },
  // 修改购物车

  // 移除商品
  [DELETE_CART](state, { productId }) {
    let cart = state.cartList
    cart.forEach((item, i) => {
      if (item.productId === productId) {
        if (item.productNum > 1) {
          item.productNum--
        } else {
          cart.splice(i, 1)
        }
      }
    })
    state.cartList = cart
  },
  // 修改购物车
  [EDIT_CART](state, { productId, productNum, checked }) {
    let cart = state.cartList
    if (productNum) {
      cart.forEach((item, i) => {
        if (item.productId === productId) {
          item.productNum = productNum
          item.checked = checked
        }
      })
    } else if (productId) {
      cart.forEach((item, i) => {
        if (item.productId === productId) {
          cart.splice(i, 1)
        }
      })
    } else {
      cart.forEach((item) => {
        item.checked = checked ? '1' : '0'
      })
    }
    state.cartList = cart
  },
}