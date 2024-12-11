import { Layout, Menu } from 'antd'

import React from 'react'

import { Link, Outlet } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout

const AppLayout: React.FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
        <Menu.Item key='1'>
          <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key='2'>
          <Link to='/users'>Users</Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '16px' }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2024 Created by React</Footer>
    </Layout>
  </Layout>
)

export default AppLayout
