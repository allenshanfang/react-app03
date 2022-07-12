import { makeAutoObservable } from 'mobx'
import { http, setToken, getToken } from '@/utils'

class LoginStore {
  //一開始取token有就拿 沒有就空
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  setToken = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile, code
    })
    this.token = res.data.token
    //結果存token
    setToken(this.token)
  }
}
export default LoginStore