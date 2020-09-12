import React from 'react';

import TaskList from './TaskList/TaskList';
import TaskForm from './TaskForm/TaskForm';
import { Modal, Button } from 'antd';

export default class TasksPage extends React.Component {
  state = {
    taskList: null,
    currentTask: null,
    createTsk: false
  }
  client = this.props.client;

  updatetaskList() {
    this.client.getData('tasks')
      .then((data) => {
        this.setState(() => ({
          taskList: data
        }))
      })
  }

  componentDidMount() {
    this.updatetaskList();
  }

  showCreateTask = () => {
    this.setState({
      createTask: true
    });
  };

  cancelCreateTask = () => {
    this.setState({
      createTask: false
    });
  };

  onFinish = ({ task, ...rest }) => {
    const modRest = Object.keys(rest).map(key => rest[key] ? rest[key] : null)
      .filter(el => el)
      .reduce((acc, val) => acc.concat(val), [])
    const modTask = {
      ...task,
      'startTime': task['startTime'].format('YYYY-MM-DD'),
      'endTime': task['endTime'].format('YYYY-MM-DD'),
      items: modRest
    };
    console.log(modTask)
    this.client.createData(`tasks`, modTask)
      .then(() => {
        this.updatetaskList();
        this.setState({
          createTask: false
        });
      })
  };

  deleteTask = (task) => {
    this.client.deleteData(`tasks/${task}`)
      .then(() => this.updatetaskList());
  }

  render() {
    const { taskList, createTask } = this.state;

    return (
      <div className="tasks-page">
        {taskList && <TaskList deleteTask={this.deleteTask} data={taskList} />}
        <Button type="primary" onClick={this.showCreateTask}>Create task</Button>
        {createTask && <TaskForm onFinish={this.onFinish} onCancel={this.cancelCreateTask} />}
      </div>
    )
  }
}