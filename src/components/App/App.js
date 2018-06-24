import React from 'react'
import RouterMap from 'router'
import { Layout, Menu, Icon } from 'antd'
import { MENU } from '@/constant'
import history from 'router/history'
import './App.less'

const { Header, Footer, Sider, Content } = Layout
const menus = MENU.list

const setActiveMenu = (menus, pathname) => {
  menus.map(menu => {
    if (menu.name === pathname) {
      MENU.openNames = [menu.name]
    }
  })
}

export default class App extends React.Component {
  state = {
    collapsed: false
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  onMenuSelect = ({key}) => {
    history.push(key)
  }

  constructor (props) {
    super(props)
    const {pathname} = window.location
    setActiveMenu(MENU.list, pathname)
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            唐邦
          </div>
          <Menu theme="dark" defaultSelectedKeys={MENU.openNames} onSelect={this.onMenuSelect} mode="inline">
            { menus.map(menu =>
              <Menu.Item key={menu.name}>
                <Icon type={menu.icon} />
                <span>{menu.text}</span>
              </Menu.Item>)}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#1890ff', padding: 0 }} />
          <Content style={{ margin: '10px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <RouterMap />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
