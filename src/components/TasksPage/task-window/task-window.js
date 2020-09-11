import React from 'react';
import './task-window.css';

const TaskWindow = (props) => {
  const { id, author, state, items } = props.data;
  const scopeLists = ['basic', 'extra', 'fines'].map((el) => {
    const scope = items.filter(item => item.id.startsWith(el));
    const scopeItems = scope.map((el) => {
      return (
        <li key={el.title}>
          <p>Title: {el.title}</p>
          <p>Description: {el.description}</p>
        </li>
      )
    })
    return (
      <div key={el}>
        <h2>{el}</h2>
        <ol>
          {scopeItems}
        </ol>
      </div>
    );
  })

  return (
    <div className="task-window">
      <div
        className="task-window__item"
        key={id}>
        Name: {id}, Author: {author}, State: {state}
      </div>
      <div>
        {scopeLists}
      </div>
    </div>
  );
}

export default TaskWindow;