import React from 'react';

import { Form, Input, Button, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = (props) => {
  const loginFormRef = React.createRef();
  const { onLogIn } = props;

  return (
    <Form
      ref={loginFormRef}
      name="normal-login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={(values) => onLogIn(values, loginFormRef)}
    >
      <Form.Item name="role" initialValue={'STUDENT'} >
        <Radio.Group >
          <Radio value={'STUDENT'}>Student</Radio>
          <Radio value={'MENTOR'}>Mentor</Radio>
          <Radio value={'EXTENDED'}>Extended credentials</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="userName"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;