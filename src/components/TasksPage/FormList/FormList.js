import React from 'react';

import { Form, Input, InputNumber, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { layout, levels, randomId } from '../constants';

const FormList = (props) => {
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
                  wrapperCol={{ offset: 2, span: 16 }}
                  name={[field.name, 'title']}
                  fieldKey={[field.fieldKey, 'title']}
                  rules={[{ required: true, message: 'Your input is required' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  wrapperCol={{ offset: 2, span: 16 }}
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
                  initialValue={randomId()}
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

const FormListEdit = (props) => {
  const { data, category, removeScopeItem } = props;
  const editedCategory = `${category}_edited`;

  const modData = data.items.filter(el => el.category === levels[category]);
  const editInputs = modData.map((data, i) => {
    const unique = randomId();
    return (
      <React.Fragment key={unique}>
        <Form.Item
          label="Title"
          wrapperCol={{ offset: 2, span: 16 }}
          name={[`${editedCategory}_${i}`, 'title']}
          rules={[{ required: true, message: 'Your input is required' }]}
          initialValue={data.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          wrapperCol={{ offset: 2, span: 16 }}
          name={[`${editedCategory}_${i}`, 'description']}
          rules={[{ required: true, message: 'Your input is required' }]}
          initialValue={data.description}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          name={[`${editedCategory}_${i}`, 'minScore']}
          label="Min score"
          rules={[
            {
              type: 'number',
              required: true
            },
          ]}
          initialValue={data.minScore}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={[`${editedCategory}_${i}`, 'maxScore']}
          label="Max score"
          rules={[
            {
              type: 'number',
              required: true
            },
          ]}
          initialValue={data.maxScore}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name={[`${editedCategory}_${i}`, 'id']}
          initialValue={data.id}
          hidden="true"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={[`${editedCategory}_${i}`, 'category']}
          initialValue={`${levels[category]}`}
          hidden="true"
        >
          <Input />
        </Form.Item>
        <MinusCircleOutlined
          style={{ marginBottom: "10px" }}
          onClick={() => {
            removeScopeItem(data.id)
          }}
        />
      </React.Fragment>
    )
  })
  return editInputs;
}

export { FormList, FormListEdit };