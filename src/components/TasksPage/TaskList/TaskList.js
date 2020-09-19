import React from 'react';
import 'antd/dist/antd.css';
import { Table, Popconfirm, Divider } from 'antd';
import { levels, pagination } from '../constants';

const TaskList = (props) => {
  const { deleteTask, editTask, exportTask } = props;
  const sorting = (a, b) => {
    if (a > b) { return -1; }
    if (a < b) { return 1; }
    return 0;
  }
  const findTask = (id) => {
    return props.data.filter(el => el.id === id)[0]
  }
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: { compare: (a, b) => sorting(a.name, b.name) }, },
    { title: 'Author', dataIndex: 'author', key: 'author', sorter: { compare: (a, b) => sorting(a.author, b.author) }, },
    { title: 'State', dataIndex: 'state', key: 'state', sorter: { compare: (a, b) => sorting(a.state, b.state) }, },
    { title: 'Starts', dataIndex: 'startTime', key: 'startTime', sorter: { compare: (a, b) => sorting(a.startTime, b.startTime) }, },
    { title: 'Deadline', dataIndex: 'endTime', key: 'endTime', sorter: { compare: (a, b) => sorting(a.endTime, b.endTime) }, },
    {
      title: 'Action', key: 'operation', fixed: 'right', width: 100, render: (text) =>
        <React.Fragment>
          <Popconfirm title="Sure to delete?" onConfirm={(e) => deleteTask(text.id)}>
            <a href="/">Delete</a>
          </Popconfirm>
          <a style={{ marginLeft: "20px" }} onClick={(e) => editTask(e, text.id)} href="/">Edit</a>
          <a style={{ marginLeft: "20px" }} onClick={(e) => exportTask(e, findTask(text.id))} href="/">Export</a>
        </React.Fragment>,
    },
  ];
  const data = [];
  props.data.forEach((el) => {
    const { id, author, state, items, startTime, endTime, description, taskName } = el;

    const scopes = Object.values(levels).map(category => {
      const singleScope = items.filter(item => item.category === category);
      const scopeItems = singleScope.map((el) => {
        return (
          <li key={el.title}>
            <h3>{el.title}</h3>
            <p>Min score: {el.minScore} ; Max score: {el.maxScore}</p>
            <p>{el.description || 'No scope items yet'}</p>
          </li>
        )
      })

      return (
        <React.Fragment key={category} >
          <Divider />
          <h2>{category}</h2>
          <ol>{scopeItems.length > 0 ? scopeItems : 'No scope items yet'}</ol>
        </React.Fragment>
      )
    })

    data.push({
      key: id,
      id,
      name: taskName,
      state,
      author,
      startTime,
      endTime,
      descr: (<React.Fragment>
        <div style={{ marginLeft: "30px" }}>
          <h2>Description</h2>
          {description}
        </div>
        <div style={{ paddingLeft: "30px" }}>{scopes}</div>
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
      bordered
      pagination={pagination}
      title={() => <h2>Task List</h2>}
    />
  );
};

export default TaskList;