import {
  INIT_BUYCART,
  ADD_CART,
  GET_USERINFO,
  RECORD_USERINFO,
  ADD_ANIMATION,
  SHOW_CART,
  REDUCE_CART,
  EDIT_CART
} from './mutation-types'

export default {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info
    state.login = true
  },

  // 加入购物车
  [ADD_CART](state, { productId, salePrice, productName, productImg, productNum = 1 }) {
    let cart = state.cartList // 购物车
    let falg = true
    let goods = {
      productId,
      salePrice,
      productName,
      productImg
    }
    if (cart.length) {        // 有内容
      cart.forEach(item => {
        if (item.productId === productId) {
          if (item.productNum >= 0) {
            falg = false
            item.productNum += productNum
          }
        }
      })
    }
    if (!cart.length || falg) {
      goods.productNum = productNum
      goods.checked = '1'
      cart.push(goods)
    }
    state.cartList = cart
  },

  // 加入购物车动画
  [ADD_ANIMATION](state, { moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart }) {
    state.showMoveImg = moveShow
    if (elLeft) {
      state.elLeft = elLeft
      state.elTop = elTop
    }
    state.moveImgUrl = img
    state.receiveInCart = receiveInCart
    if (cartPositionT) {
      state.cartPositionT = cartPositionT
      state.cartPositionL = cartPositionL
    }
  },
  // 是否显示购物车
  [SHOW_CART](state, { showCart }) {
    // let timer = null
    state.showCart = showCart
    // clearTimeout(timer)
    // if (showCart) {
    //   timer = setTimeout(() => {
    //     state.showCart = false
    //   }, 5000)
    // }
  },
}