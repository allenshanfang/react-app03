const key = 'pc-key'//唯一
//存
const setToken = (token) => {
  return window.localStorage.setItem(key, token)
}
//取
const getToken = () => {
  return window.localStorage.getItem(key)
}
//刪
const removeToken = () => {
  return window.localStorage.removeItem(key)
}

export {
  setToken,
  getToken,
  removeToken
}