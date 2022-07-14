import axios from 'axios'
import { getToken } from './token'
import { history } from './history'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  headers: {
    'http-equiv': 'Content-Security-Policy',
    'content': 'upgrade-insecure-requests'
  },
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
    if (error.response.status === 401) {
      console.log('log')
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export { http }