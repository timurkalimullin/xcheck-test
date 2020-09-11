import React from 'react';

import TaskList from './task-list/task-list';
import TaskWindow from './task-window/task-window';

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

  render() {
    const { taskList, currentTask } = this.state;
    const visibleTask = (taskList && taskList.filter(el => el.id === currentTask));
    return (
      <div className="tasks-page">
        {taskList && <TaskList data={taskList} handleTaskListClick={this.handleTaskListClick} />}
        {currentTask && <TaskWindow data={visibleTask[0]} />}
      </div>
    )
  }
}