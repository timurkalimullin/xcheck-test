import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import FormListWData from '../FormList/FormList';
import { layout, validateMessages, config, levels } from '../constants';

const TaskForm = (props) => {
  const scopeList = Object.keys(levels).map(key => {
    return <React.Fragment key={key}>
      <h2 style={{ color: "gray" }}>{levels[key]}</h2>
      <FormListWData name={key} />
    </React.Fragment>
  })

  return (
    <React.Fragment>
      <h2 style={{ fontSize: "3em" }}>Task creation</h2>
      <Form {...layout} name="nest-messages" onFinish={props.onFinish} validateMessages={validateMessages}>
        <Form.Item name={['task', 'id']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['task', 'description']} label="Description" >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name={['task', 'startTime']} label="Start" {...config}>
          <DatePicker />
        </Form.Item>
        <Form.Item name={['task', 'endTime']} label="Deadline" {...config}>
          <DatePicker />
        </Form.Item>

        <h2 >Scopes</h2>
        {scopeList}
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="secondary" htmlType="button"
            onClick={props.onCancel}>
            Cancel
        </Button>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

export default TaskForm;