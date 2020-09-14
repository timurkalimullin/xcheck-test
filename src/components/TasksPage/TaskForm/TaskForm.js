import React from 'react';
import { Form, Input, DatePicker, Select, Modal, message } from 'antd';
import { FormList, FormListEdit } from '../FormList/FormList';
import { layout, validateMessages, config, levels } from '../constants';

import './taskform.css';

const authorName = 'Timur Kalimullin'
class TaskForm extends React.Component {
  form = React.createRef();
  render() {
    const { data, taskModal, onCancel, onFinish, confirmLoading, removeScopeItem } = this.props;

    const scopeList = Object.keys(levels).map(key => {
      return <React.Fragment key={key}>
        <h2 style={{ color: "gray" }}>{levels[key]}</h2>
        {data && <FormListEdit category={key} data={data} removeScopeItem={removeScopeItem} />}
        <FormList name={key} />
      </React.Fragment>
    })

    return (
      <React.Fragment>
        <Modal
          title={<h2 style={{ fontSize: "3em" }}>Task {data ? 'edit' : 'create'}</h2>}
          minWidth={"500px"}
          style={{ textAlign: "center" }}
          width={"900px"}
          visible={taskModal}
          okText="Submit"
          confirmLoading={confirmLoading}
          cancelText="Cancel"
          destroyOnClose={true}
          onCancel={onCancel}
          onOk={() => {
            this.form.current.validateFields()
              .then((values) => {
                data ? onFinish(values, 'edit') : onFinish(values, 'create')
              }).then(() => this.form.current.resetFields())
              .catch((() => message.error('Something went wrong!')))
          }}>
          <Form {...layout} name="nest-messages"
            ref={this.form}
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
              initialValue={data ? data.author : authorName} hidden={true}>
              <Input />
            </Form.Item>

            <h2 >Scopes</h2>

            {scopeList}
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
};

export default TaskForm;