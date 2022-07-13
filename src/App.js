import {unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom'
import { history } from './utils/history'
//第一層
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import No404 from '@/pages/No404'
//第二層
import Home from '@/pages/Home'
import Article from './pages/Article'
import Publish from './pages/Publish'

import '@/App.css'
import { AuthComponents } from '@/components/AuthComponents'

function App () {
  return (
    <HistoryRouter history={history}>
      <div className='App'>
        <Routes>
          {/* 需要登入才能進 */}
          <Route path='/' element={
            <AuthComponents>
              <Layout />
            </AuthComponents>
          } >
            <Route index element={<Home />} ></Route>
            <Route path='/article' element={<Article />} ></Route>
            <Route path='/publish' element={<Publish />} ></Route>
          </Route>
          {/* [不]需要登入 */}
          <Route path='/login' element={<Login />} ></Route>
          <Route path='*' element={<No404 />} ></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
