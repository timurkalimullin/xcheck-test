import React from 'react';

import { Form, Input, InputNumber, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { layout, levels } from '../constants';

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

const FormListEdit = (props) => {
  const { data, category } = props;
  const editedCategory = `${category}_edited`;

  const modData = data.items.filter(el => el.category === levels[category]);
  const editInputs = modData.map((data, i) => {
    return (
      <React.Fragment key={`${editedCategory}_${i}`}>
        <Form.Item
          label="Title"
          wrapperCol={{ offset: 2, span: 8 }}
          name={[`${editedCategory}_${i}`, 'title']}
          rules={[{ required: true, message: 'Your input is required' }]}
          initialValue={data.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          wrapperCol={{ offset: 2, span: 8 }}
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
          initialValue={`${category}_pe${i + 1}`}
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

          }}
        />
      </React.Fragment>
    )
  })
  console.log(editInputs)
  return editInputs;
}

export { FormList, FormListEdit };