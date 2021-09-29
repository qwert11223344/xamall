// import axios from 'axios'
// axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
// export default {
//   fetchGet(url, params = {}) {
//     return new Promise((resolve, reject) => {
//       axios.get(url, params).then(res => {
//         resolve(res)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },
//   fetchPost(url, params = {}) {
//     return new Promise((resolve, reject) => {
//       axios.post(url, params).then(res => {
//         resolve(res)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   }
// }
import axios from 'axios';

export function network(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 10000,
    headers: 'application/x-www-form-urlencoded;charset=UTF-8',

  })
  // 2. axios的请求拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    // console.log(error);
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3. 发送真正的网络请求
  return instance(config)

}