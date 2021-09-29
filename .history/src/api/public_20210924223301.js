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

    /**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
    export function get(url, params){
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err.data)
      })
    });
  }

作者：愣锤
链接：https://juejin.cn/post/6844903652881072141
    来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
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