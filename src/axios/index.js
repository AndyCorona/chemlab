import axios from 'axios'

axios.defaults.baseURL = '/true/api'
axios.defaults.timeout = 8000
/**
 * 接口错误拦截
 */
axios.interceptors.response.use(function (response) {
  const res = response.data
  // 获取  hash 路由地址
  const path = location.hash
  // 成功
  if (res.status === 200) {
    return res.data
    // 未登陆
  } else if (res.status === 300) {
    if (path !== '#/home/login') {
      window.location.href = '/#/home/login'
    }
    return Promise.reject(res)
    // 报错
  } else {
    return Promise.reject(res)
  }
})
export default axios
