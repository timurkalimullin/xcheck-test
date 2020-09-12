import React from 'react';

import { Form, Input, InputNumber, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { layout, levels } from '../constants';

const FormListWData = (props) => {
  return (
    <Form.List
      {...layout}
      name={props.name}
      layout="vertical">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, ind) => (
              <div key={field.name}>
                <Form.Item
                  label="Title"
                  wrapperCol={{ offset: 2, span: 8 }}
                  name={[field.name, 'title']}
                  fieldKey={[field.fieldKey, 'title']}
                  rules={[{ required: true, message: 'Your input is required' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  wrapperCol={{ offset: 2, span: 8 }}
                  name={[field.name, 'description']}
                  fieldKey={[field.fieldKey, 'description']}
                  rules={[{ required: true, message: 'Your input is required' }]}
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
                <Form.Item
                  name={[field.name, 'id']}
                  key={[field.key, props.name]}
                  initialValue={`${props.name}_p${ind + 1}`}
                  hidden="true"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[field.name, 'category']}
                  key={[field.key, levels[props.name]]}
                  initialValue={`${levels[props.name]}`}
                  hidden="true"
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined
                  style={{ marginBottom: "10px" }}
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              </div>
            ))}

            <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
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
  )
};

export default FormListWData;