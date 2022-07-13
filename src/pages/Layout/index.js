import { Layout, Menu, Popconfirm } from 'antd'
import {Outlet,Link,useLocation,useNavigate}from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import {useStore} from '@/store'
import { useEffect } from 'react'

const { Header, Sider } = Layout

const GeekLayout = () => {
  //網址當key
  const {pathname} = useLocation()
  //User接口
  const {userStore,loginStore} = useStore()
  //UserToken
  useEffect(()=>{
    userStore.getUerInfo()
  },[userStore]
  )
  //dnt更新的寫法
  const items = [
    getItem(<Link to={'/'}>數據預覽</Link>, '/', <HomeOutlined />),
    getItem(<Link to={'/article'}>內容管理</Link>, '/article', <DiffOutlined />),
    getItem(<Link to={'/publish'}>發文</Link>, '/publish', <EditOutlined />),
  ];
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  //退出
  const navigate = useNavigate()
  const onConfirm =()=>{
    loginStore.loginOut()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.useInfo.name}</span>
          <span className="user-logout">
            <Popconfirm 
              onConfirm={onConfirm}
            title="是否要退出？" okText="退出" cancelText="不要">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {/* <Menu
            mode="inline"
            theme="dark"
            //有可能多層 所以用list
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to={'/'}>數據預覽</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to={'/article'}>內容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to={'/publish'}>發文</Link>
            </Menu.Item>
          </Menu> */}
                <Menu
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={['/']}
        mode="inline"
        theme="dark"
        items={items}
      />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)