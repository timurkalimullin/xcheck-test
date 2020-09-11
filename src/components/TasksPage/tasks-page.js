import React from 'react';

import TaskList from './task-list/task-list';
import TaskForm from './TaskForm/TaskForm';

export default class TasksPage extends React.Component {
  state = {
    taskList: null,
    currentTask: null
  }

  componentDidMount() {
    this.props.client.getData('tasks')
      .then((data) => {
        this.setState(() => ({
          taskList: data
        }))
      })
  }

  handleTaskListClick = (id) => {
    this.setState({
      currentTask: id
    })
  }

  onFinish = ({ task, scopes }) => {
    const modTask = {
      ...task,
      'startTime': task['startTime'].format('YYYY-MM-DD'),
      'endTime': task['endTime'].format('YYYY-MM-DD'),
      items: scopes
    };
    console.log(modTask)
  };

  render() {
    const { taskList } = this.state;

    return (
      <div className="tasks-page">
        {taskList && <TaskList data={taskList} />}
        <TaskForm onFinish={this.onFinish} />
      </div>
    )
  }
}