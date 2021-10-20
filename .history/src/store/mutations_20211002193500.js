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
  // 移除商品
  [REDUCE_CART](state, { productId }) {
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