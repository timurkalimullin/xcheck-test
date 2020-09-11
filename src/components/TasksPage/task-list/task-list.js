import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

const TaskList = (props) => {
  const { handleTaskListClick } = props;
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'State', dataIndex: 'state', key: 'state' },
  ];
  const data = [];
  const list = props.data.map((el) => {
    const { id, author, state } = el;
    return <li
      className="task-list__item"
      key={id}
      onClick={() => handleTaskListClick(id)}>
      {id}, {author}, {state}
    </li>
  })
  return (
    <ol className="task-list">
      {list}
    </ol>
  );
};

export default TaskList;