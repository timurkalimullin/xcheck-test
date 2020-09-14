import React from 'react';

import TaskList from './TaskList/TaskList';
import TaskForm from './TaskForm/TaskForm';
import { Button, message } from 'antd';

export default class TasksPage extends React.Component {
  state = {
    taskList: null,
    currentTask: null,
    taskModal: false
  }
  client = this.props.client;

  updatetaskList() {
    this.client.getData('tasks')
      .then((data) => {
        this.setState(() => ({
          taskList: data,
          currentTask: null
        }))
      }).catch((err) => message.warning(`${err.message}`))
  }

  componentDidMount() {
    this.updatetaskList();
  }

  showTaskModal = () => {
    this.setState({
      taskModal: true,
      currentTask: null
    });
  };

  showEditTask = (e, task) => {
    e.preventDefault();
    const taskEdit = this.state.taskList.filter(item => {
      return item.id === task;
    })[0]
    this.setState({
      currentTask: taskEdit,
      taskModal: true
    });
  };

  cancelTaskModal = () => {
    this.setState({
      taskModal: false
    });
  };

  onFinish = ({ task, ...rest }, type) => {
    const modRest = Object.keys(rest).map(key => rest[key] ? rest[key] : null)
      .filter(el => el)
      .reduce((acc, val) => acc.concat(val), [])
    const modTask = {
      ...task,
      'startTime': task['startTime'].format('YYYY-MM-DD'),
      'endTime': task['endTime'].format('YYYY-MM-DD'),
      items: modRest
    };

    if (type === 'create') {
      this.client.createData(`tasks`, modTask)
        .then(() => {
          this.updatetaskList();
          this.setState({
            taskModal: false
          });
        }).catch((err) => message.warning(`${err.message}`))
    } else if (type === 'edit') {
      this.client.modifyData(`tasks/${this.state.currentTask.id}`, modTask)
        .then(() => {
          this.updatetaskList();
          this.setState({
            taskModal: false,
            currentTask: null
          });
        })
        .catch((err) => message.warning(`${err.message}`))
    }
  };

  deleteTask = (task) => {
    this.client.deleteData(`tasks/${task}`)
      .then(() => this.updatetaskList())
      .catch((err) => message.warning(`${err.message}`))
  }

  removeScopeItem = (id) => {
    const newItems = [...this.state.currentTask.items].filter(el => el.id !== id)
    const newCurrentTask = { ...this.state.currentTask, items: newItems };
    console.log(newItems)

    this.setState({
      currentTask: newCurrentTask
    })
  }

  render() {
    const { taskList, taskModal, currentTask } = this.state;
    console.log('current task', currentTask)

    return (
      <div className="tasks-page">
        {taskList && <TaskList deleteTask={this.deleteTask} editTask={this.showEditTask} data={taskList} />}
        <Button type="primary" onClick={this.showTaskModal}>Create task</Button>
        {taskModal && <TaskForm
          data={currentTask}
          onFinish={this.onFinish}
          onCancel={this.cancelTaskModal}
          removeScopeItem={this.removeScopeItem}
        />}
      </div>
    )
  }
}