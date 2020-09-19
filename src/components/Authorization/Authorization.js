import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './authorization.css'

export default class Authorization extends React.Component {
  state = {
    type: 'login'
  }

  typeChange = (e) => {
    e.preventDefault();
    this.setState((state) => ({
      type: state.type === 'login' ? 'signin' : 'login'
    }))
  }

  render() {
    const { onLogIn, onSignIn } = this.props;
    const { type } = this.state;
    const formRef = React.createRef();

    return (
      <Form
        ref={formRef}
        name="normal-login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => type === 'login' ? onLogIn(values, formRef) : onSignIn(values, formRef)}
      >
        {type === 'login' && <Form.Item name="role" initialValue={'STUDENT'} >
          <Radio.Group >
            <Radio value={'STUDENT'}>Student</Radio>
            <Radio value={'MENTOR'}>Mentor</Radio>
            <Radio value={'EXTENDED'}>Extended credentials</Radio>
          </Radio.Group>
        </Form.Item>}
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
            {type === 'login' ? 'Log in' : 'Sign in'}
          </Button>
        Or <a href="" onClick={(e) => this.typeChange(e)}>{type === 'login' ? 'register now' : 'log in'}</a>
        </Form.Item>
      </Form>
    );
  }
}