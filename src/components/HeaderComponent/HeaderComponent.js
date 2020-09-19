import React from 'react';
import { Menu } from 'antd';
import { Layout } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

const { Header } = Layout;

const HeaderComponent = (props) => {

  const { location } = props;

  return (
    <Header>
      <div className="logo" >XCheck</div>
      <Menu theme="dark" mode="horizontal"
        defaultSelectedKeys={['/']}
        selectedKeys={[location.pathname]}>
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/task-create">
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

export default withRouter(HeaderComponent);