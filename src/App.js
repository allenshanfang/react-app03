import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import No404 from '@/pages/No404'
import { AuthComponents } from '@/components/AuthComponents'

function App () {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          {/* 需要登入才能進 */}
          <Route path='/' element={
            <AuthComponents>
              <Layout />
            </AuthComponents>
          } ></Route>
          {/* [不]需要登入 */}
          <Route path='/login' element={<Login />} ></Route>
          <Route path='*' element={<No404 />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
