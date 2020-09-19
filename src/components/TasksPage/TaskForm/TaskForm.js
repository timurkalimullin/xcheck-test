import React from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import { FormList, FormListEdit } from '../FormList/FormList';
import { layout, validateMessages, config, levels } from '../constants';

import './taskform.css';

const authorName = 'Timur Kalimullin';

const TaskForm = (props) => {

  const { data, removeScopeItem, formRef } = props;

  const scopeList = Object.keys(levels).map(key => {
    return <React.Fragment key={key}>
      <h2>{levels[key]}</h2>
      {data && <FormListEdit category={key} data={data} removeScopeItem={removeScopeItem} />}
      <FormList name={key} />
    </React.Fragment>
  })

  return (
    <React.Fragment>
      <Form {...layout} name="nest-messages"
        ref={formRef}
        validateMessages={validateMessages}>

        <Form.Item name={['task', 'taskName']} label="Name" rules={[{ required: true }]}
          initialValue={data ? data.taskName : ''}>
          <Input />
        </Form.Item>

        <Form.Item name={['task', 'description']} label="Description" rules={[{ required: true }]}
          initialValue={data ? data.description : ''}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item name={['task', 'state']} label="State" rules={[{ required: true }]}
          initialValue={data ? data.state : ''}>
          <Select>
            <Select.Option value="DRAFT">Draft</Select.Option>
            <Select.Option value="PUBLISHED">Published</Select.Option>
            <Select.Option value="ARCHIVED">Archived</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name={['task', 'startTime']} label="Start" {...config}>
          <DatePicker />
        </Form.Item>

        <Form.Item name={['task', 'endTime']} label="Deadline" {...config}>
          <DatePicker />
        </Form.Item>

        <Form.Item name={['task', 'author']} label="Author"
          initialValue={data ? data.author : authorName} hidden={true}>
          <Input />
        </Form.Item>

        <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>Scopes</h2>

        {scopeList}
      </Form>
    </React.Fragment>
  );
};

export default TaskForm;