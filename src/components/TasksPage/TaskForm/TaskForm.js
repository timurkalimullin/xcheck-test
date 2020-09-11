import React from 'react';
import { Form, Input, InputNumber, DatePicker, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 4,
    offset: 2
  },
  wrapperCol: {
    span: 8,
    offset: 8
  },
};
const validateMessages = {
  required: '${label} is required!',
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const TaskForm = (props) => {

  return (
    <Form {...layout} name="nest-messages" onFinish={props.onFinish} validateMessages={validateMessages}>
      <Form.Item name={['task', 'description']} label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['task', 'startTime']} label="Start" {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item name={['task', 'endTime']} label="Deadline" {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item
        name={['task', 'minScore']}
        label="Min score"
        rules={[
          {
            type: 'number',
            required: true
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={['task', 'maxScore']}
        label="Max score"
        rules={[
          {
            type: 'number',
            required: true
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <h2>Scopes</h2>
      <Form.List
        name="scopes"
        layout="vertical">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.key} >
                  <Form.Item
                    {...field}
                    name={[field.name, 'description']}
                    fieldKey={[field.fieldKey, 'description']}
                    rules={[{ required: true, message: 'Missing first name' }]}
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                  >
                    <Input.TextArea placeholder="Description" />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'minScore']}
                    key={[field.key, 'minScore']}
                    label="Min score"
                    rules={[
                      {
                        type: 'number',
                        required: true
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'maxScore']}
                    key={[field.key, 'maxScore']}
                    label="Max score"
                    rules={[
                      {
                        type: 'number',
                        required: true
                      },
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;