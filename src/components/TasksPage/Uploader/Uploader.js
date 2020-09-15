import React from "react";
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Uploader = (props) => {
  const { createTaskFromJson } = props;
  return (
    <Upload
      accept=".json"
      showUploadList={false}
      beforeUpload={file => {
        try {
          const reader = new FileReader();

          if (file.type !== 'application/json') {
            throw new Error('Wrong type of file')
          }

          reader.onload = e => {
            createTaskFromJson(e.target.result)
          };
          reader.onerror = e => {
            throw new Error(e.message)
          }
          reader.readAsText(file);

          // Prevent upload
          return false;
        } catch (err) {
          message.error(err.message)
        }
      }}
    >
      <Button icon={<UploadOutlined />} >
        Upload json file
      </Button>
    </Upload>

  )

}

export default Uploader;