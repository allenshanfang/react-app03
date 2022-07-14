import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom'
import { history } from './utils/history'
import { AuthComponents } from './components/AuthComponents'
// //第一層
// import Login from '@/pages/Login'
// import Layout from '@/pages/Layout'
// import No404 from '@/pages/No404'
// //第二層
// import Home from '@/pages/Home'
// import Article from './pages/Article'
// import Publish from './pages/Publish'

import { lazy, Suspense } from 'react'
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))
const No404 = lazy(() => import('./pages/No404'))


function App () {
  return (
    <HistoryRouter history={history}>
      <div className='App'>
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
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
        </Suspense>
      </div>
    </HistoryRouter>
  )
}

export default App
