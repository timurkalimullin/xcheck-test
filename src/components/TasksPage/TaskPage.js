import React from 'react';

import TaskList from './TaskList/TaskList';
import TaskForm from './TaskForm/TaskForm';
import { taskModalConfig, importJsonModalText, checkData } from './constants';
import { Button, message, Spin, Modal } from 'antd';
import Uploader from './Uploader/Uploader';

export default class TasksPage extends React.Component {
  state = {
    taskList: null,
    currentTask: null,
    taskModal: false,
    importTaskModal: false,
    confirmLoading: false,
    isLoading: true
  }
  client = this.props.client;

  updatetaskList() {
    this.setState({
      isLoading: true
    })
    this.client.getData('tasks')
      .then((data) => {
        this.setState(() => ({
          taskList: data,
          currentTask: null
        }))
      })
      .catch((err) => message.warning(`${err.message}`))
      .finally(() => this.setState({ isLoading: false }))
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

  showEditModal = (e, task) => {
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
      taskModal: false,
      currentTask: null
    });
  };

  createTask = (data) => {
    this.client.createData(`tasks`, data)
      .then(() => {
        this.updatetaskList();
        this.setState({
          taskModal: false
        });
      }).then(() => {
        message.success('Task created');
      })
      .catch((err) => message.error(`${err.message}`))
      .finally(() => this.setState({ confirmLoading: false }))
  }

  modifyTask = (data) => {
    this.client.modifyData(`tasks/${this.state.currentTask.id}`, data)
      .then(() => {
        this.updatetaskList();
        this.setState({
          taskModal: false,
          currentTask: null
        });
      }).then(() => {
        message.success('Task modified')
      })
      .catch((err) => message.error(`${err.message}`))
      .finally(() => this.setState({ confirmLoading: false }))
  }

  createTaskFromJson = (data) => {
    try {
      const parsed = JSON.parse(data);
      checkData(parsed);
      this.createTask(parsed);
      this.setState({ importTaskModal: false })
    } catch (err) {
      message.error(err.message)
    }
  }

  exportTaskInJson = (e, data) => {
    e.preventDefault();

    let json = JSON.stringify(data);

    //Convert JSON string to BLOB.
    json = [json];
    let blob1 = new Blob(json, { type: "application/json" });


    let url = window.URL || window.webkitURL;
    let link = url.createObjectURL(blob1);
    let a = document.createElement("a");
    a.download = `${data.taskName}.json`;
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

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

    this.setState({
      confirmLoading: true
    })

    if (type === 'create') {
      this.createTask(modTask);
    } else if (type === 'edit') {
      this.modifyTask(modTask);
    }
  };

  deleteTask = (task) => {
    this.client.deleteData(`tasks/${task}`)
      .then(() => {
        this.updatetaskList();
      })
      .then(() => message.success('Task deleted'))
      .catch((err) => message.warning(`${err.message}`))
  }

  removeScopeItem = (id) => {
    const newItems = [...this.state.currentTask.items].filter(el => el.id !== id)
    const newCurrentTask = { ...this.state.currentTask, items: newItems };

    this.setState({
      currentTask: newCurrentTask
    })
  }

  render() {
    const { taskList, taskModal, currentTask, confirmLoading, isLoading, importTaskModal } = this.state;
    const form = React.createRef();

    const taskListBlock = (
      <React.Fragment>
        <TaskList deleteTask={this.deleteTask} editTask={this.showEditModal} exportTask={this.exportTaskInJson} data={taskList} />
        <Button type="primary" onClick={this.showTaskModal}>Create task</Button>
        <Button type="secondary" style={{ marginLeft: "20px" }}
          onClick={() => this.setState({ importTaskModal: true })}>Create task from json</Button>
      </React.Fragment>
    );
    return (
      <div className="tasks-page">
        {isLoading ? <Spin style={{ marginTop: "50px" }} /> : taskListBlock}

        <Modal
          {...taskModalConfig}
          title={<h2 style={{ fontSize: "3em" }}>Task {currentTask ? 'edit' : 'create'}</h2>}
          visible={taskModal}
          confirmLoading={confirmLoading}
          onCancel={this.cancelTaskModal}
          onOk={() => {
            form.current.validateFields()
              .then((values) => {
                currentTask ? this.onFinish(values, 'edit') : this.onFinish(values, 'create')
              }).catch((() => message.error('Something went wrong!')))
          }}>
          <TaskForm
            data={currentTask}
            removeScopeItem={this.removeScopeItem}
            taskModal={taskModal}
            formRef={form}
          />
        </Modal>
        <Modal
          title={<h2>Create task from json file</h2>}
          visible={importTaskModal}
          okButtonProps={{ disabled: true }}
          onCancel={() => this.setState({ importTaskModal: false })}>
          {importJsonModalText}
          <Uploader createTaskFromJson={this.createTaskFromJson} />
        </Modal>
      </div >
    )
  }
}