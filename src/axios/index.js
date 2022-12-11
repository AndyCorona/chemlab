import axios from 'axios'

axios.defaults.baseURL = '/true/api'
axios.defaults.timeout = 8000
const imgUploadUrl = '/true/api/img'
const fileUploadUrl = '/true/api/file'
const downloadUrl = '/true/api/download'
/**
 * 接口错误拦截
 */
axios.interceptors.response.use(function (response) {
  // axios 响应数据
  const res = response.data
  // 当前路由地址
  const path = location.hash
  // 本次响应对应的请求地址
  const requestUrl = response.request.custom.options.url
  if (requestUrl === downloadUrl) {
    return Promise.resolve(response.data)
  }
  // 成功
  if (res.status === 200) {
    return (requestUrl === imgUploadUrl || requestUrl === fileUploadUrl) ? Promise.resolve(res) : res.data
    // 未登陆
  } else if (res.status === 300) {
    if (path !== '#/login') {
      window.location.href = '/#/login'
    }
    return (requestUrl === imgUploadUrl || requestUrl === fileUploadUrl) ? Promise.resolve(res) : Promise.reject(res)
    // 后端报错
  } else {
    return (requestUrl === imgUploadUrl || requestUrl === fileUploadUrl) ? Promise.resolve(res) : Promise.reject(res)
  }
})
export default axios
