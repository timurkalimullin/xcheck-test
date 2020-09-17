import React from 'react';
import { Menu } from 'antd';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import './Header.css';

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header>
      <div className="logo" >XCheck</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/task-create">Task create</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/">Page</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/">Page</Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default HeaderComponent;