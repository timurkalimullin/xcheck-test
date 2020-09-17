import React from 'react';

import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const FoooterComponent = () => {
  const footerConfig = {
    style: {
      position: "fixed",
      bottom: 0,
      width: "100vw"
    }
  }
  return (
    <Footer {...footerConfig}>
      <a href="" target="_blank" ><GithubOutlined style={{ marginRight: "10px", fontSize: "30px" }} />GitHub</a>
    </Footer>
  )
}

export default FoooterComponent;