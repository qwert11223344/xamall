
// 记录用户信息
[RECORD_USERINFO](state, info) {
  state.userInfo = info
  state.login = true
  setStore('userInfo', info)
},