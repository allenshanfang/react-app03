import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthComponents ({ children }) {
  const isToken = getToken()
  if (isToken) {
    return <children />
  }
  else {
    return <Navigate to='/login' replace />
  }
}

export { AuthComponents }

//<AuthComponents> <Layout /> </AuthComponents>
//登入中(有token)可以有<><Layout /></>
//非登入<Navigate to='/login' replace />

