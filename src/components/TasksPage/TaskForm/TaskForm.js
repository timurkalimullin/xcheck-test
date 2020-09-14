import React from 'react';
import { Form, Input, DatePicker, Button, Select } from 'antd';
import { FormList, FormListEdit } from '../FormList/FormList';
import { layout, validateMessages, config, levels } from '../constants';

const TaskForm = (props) => {
  const { data } = props;

  const scopeList = Object.keys(levels).map(key => {
    return <React.Fragment key={key}>
      <h2 style={{ color: "gray" }}>{levels[key]}</h2>
      {data && <FormListEdit category={key} data={data} removeScopeItem={props.removeScopeItem} />}
      <FormList name={key} />
    </React.Fragment>
  })

  return (
    <React.Fragment>
      <h2 style={{ fontSize: "3em" }}>Task {data ? 'edit' : 'create'}</h2>
      <Form {...layout} name="nest-messages"
        onFinish={(values) => data ? props.onFinish(values, 'edit') : props.onFinish(values, 'create')}
        validateMessages={validateMessages}>

        <Form.Item name={['task', 'taskName']} label="Name" rules={[{ required: true }]}
          initialValue={data ? data.taskName : ''}>
          <Input />
        </Form.Item>

        <Form.Item name={['task', 'description']} label="Description"
          initialValue={data ? data.description : ''}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item name={['task', 'state']} label="State"
          initialValue={data ? data.state : ''}>
          <Select>
            <Select.Option value="DRAFT">Draft</Select.Option>
            <Select.Option value="COMPLETE">Complete</Select.Option>
            <Select.Option value="ARCHEIVED">Archeived</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name={['task', 'startTime']} label="Start" {...config}>
          <DatePicker />
        </Form.Item>

        <Form.Item name={['task', 'endTime']} label="Deadline" {...config}>
          <DatePicker />
        </Form.Item>

        <Form.Item name={['task', 'author']} label="Author"
          initialValue={'Timur Kalimullin'} hidden={true}>
          <Input />
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