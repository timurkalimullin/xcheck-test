import React from 'react';
import 'antd/dist/antd.css';
import { Table, Popconfirm } from 'antd';
import { levels } from '../constants';

const TaskList = (props) => {
  const { deleteTask } = props;
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a?.name > b?.name, },
    { title: 'Author', dataIndex: 'author', key: 'author', sorter: (a, b) => a?.author > b?.author, },
    { title: 'State', dataIndex: 'state', key: 'state', sorter: (a, b) => a?.state > b?.state, },
    { title: 'Starts', dataIndex: 'startTime', key: 'startTime', sorter: (a, b) => a?.startTime > b?.startTime, },
    { title: 'Deadline', dataIndex: 'endTime', key: 'endTime', sorter: (a, b) => a?.endTime > b?.endTime, },
    {
      title: 'Action', key: 'operation', fixed: 'right', width: 100, render: (text) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => deleteTask(text.name)}>
          <a href="/">Delete</a>
        </Popconfirm>,
    },
  ];
  const data = [];
  props.data.forEach((el) => {
    const { id, author, state, items, startTime, endTime, description } = el;

    const scopes = Object.values(levels).map(category => {
      const singleScope = items.filter(item => item.category === category);
      const scopeItems = singleScope.map((el) => {
        return (
          <li key={el.title}>
            <h3>{el.title}</h3>
            <p>{el.description || 'No scope items yet'}</p>
          </li>
        )
      })

      return (
        <React.Fragment key={category}>
          <h2>{category}</h2>
          <ol>{scopeItems.length > 0 ? scopeItems : 'No scope items yet'}</ol>
        </React.Fragment>
      )
    })

    data.push({
      key: id,
      name: id,
      state,
      author,
      startTime,
      endTime,
      descr: (<React.Fragment>
        <div style={{ marginLeft: "30px" }}>
          <h2>Description</h2>
          {description}
        </div>
        <ol>{scopes}</ol>
      </React.Fragment>)
    })
  })
  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: record => <div style={{ margin: 0 }}>{record.descr}</div>
      }}
      dataSource={data}
    />
  );
};

export default TaskList;