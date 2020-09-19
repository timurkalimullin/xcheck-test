import React from 'react';

const layout = {
  labelCol: {
    span: 4,
    offset: 2
  },
  wrapperCol: {
    span: 16,
    offset: 2
  },
};

const validateMessages = {
  required: 'Your input is required!',
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

const taskModalConfig = {
  minWidth: "500px",
  style: { textAlign: "center" },
  width: "900px",
  okText: "Submit",
  cancelText: "Cancel",
  destroyOnClose: true
};

const importJsonModalText = (
  <div>
    <p>Choose json file with structure like:</p>
    <pre style={{ whiteSpace: "break-spaces" }}>"id": "task id",
    "taskName": "Task name",
    "description": "Task description",
    "author": "Task author",
    "state": "Task state",
    "startTime": "Task start",
    "endTime": "Task end",
    "items": [Array of items - each of item like:
    "item" :     "id": "id",
    "minScore": number,
    "maxScore": number,
    "category": "Category",
    "title": "Title",
    "description": "description"]
  </pre>
  </div>
)

const checkData = (data) => {
  const formatError = () => new Error('Wrong format of the file');

  if ((typeof data.taskName !== 'string'
    || typeof data.description !== 'string'
    || typeof data.author !== 'string'
    || typeof data.state !== 'string'
    || typeof data.startTime !== 'string'
    || typeof data.endTime !== 'string')
    || typeof data.items !== 'object') {
    throw formatError();
  }
  if (data.items.length > 0) {
    data.items.forEach(el => {
      if (typeof el.id !== 'string'
        || typeof el.title !== 'string'
        || typeof el.description !== 'string'
        || typeof el.category !== 'string') {
        throw formatError();
      }
      if (typeof (el.minScore || el.maxScore) !== 'number') {
        throw formatError();
      }
    })
  }
}

const pagination = {
  current: 1,
  pageSize: 10,
};

const levels = { basic: 'Basic Scope', advanced: 'Advanced Scope', extra: 'Extra Scope' };

let randomId = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4();
}

export { layout, validateMessages, config, levels, taskModalConfig, importJsonModalText, checkData, pagination, randomId };