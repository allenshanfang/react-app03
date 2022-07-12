import axios from 'axios'
import { getToken } from './token'
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000,
})
// 增加請求
http.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 增加響應
http.interceptors.response.use(
  //200~300
  (response) => {
    return response.data
  },
  //其他狀態碼
  (error) => {
    return Promise.reject(error)
  }
)

export { http }