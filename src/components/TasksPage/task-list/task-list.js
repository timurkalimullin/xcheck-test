import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

const TaskList = (props) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.length - b.name.length, },
    { title: 'Author', dataIndex: 'author', key: 'author', sorter: (a, b) => a.author.length - b.author.length, },
    { title: 'State', dataIndex: 'state', key: 'state', sorter: (a, b) => a.state.length - b.state.length, },
  ];
  const data = [];
  props.data.forEach((el) => {
    const { id, author, state, items, categoriesOrder } = el;

    const scopes = categoriesOrder.map(category => {
      const singleScope = items.filter(item => item.category === category);
      const scopeItems = singleScope.map((el) => {
        return (
          <li key={el.title}>
            <p>Title: {el.title}</p>
            <p>Description: {el.description}</p>
          </li>
        )
      })
      return (
        <React.Fragment key={category}>
          <p>{category}</p>
          <ol>{scopeItems}</ol>
        </React.Fragment>
      )
    })

    data.push({
      key: id,
      name: id,
      state: state,
      author: author,
      description: <ol>{scopes}</ol>
    })
  })
  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: record => <div style={{ margin: 0 }}>{record.description}</div>
      }}
      dataSource={data}
    />
  );
};

export default TaskList;