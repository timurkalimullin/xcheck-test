import React from 'react';
import { Layout, message } from 'antd';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import HttpClient from './services/http-client';
import Authorization from './components/Authorization/Authorization';
import TasksPage from './components/TasksPage/TaskPage';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import FooterComponent from './components/FooterComponent/FooterComponent';


const { Content } = Layout;

class App extends React.Component {
  httpClient = new HttpClient();

  state = {
    isLoggedIn: false,
    user: null
  }

  componentDidMount() {
    const sessionStorageUser = JSON.parse(sessionStorage.getItem('user'));
    if (sessionStorageUser) {
      this.setState(() => ({
        isLoggedIn: true,
        user: sessionStorageUser
      }))
    }
  }

  checkUserExists = (user) => {
    return this.httpClient.getData('users')
      .then((res) => {
        return res.find(item => item.userName === user.userName);
      })
  }

  onLogIn = (values, ref) => {
    this.checkUserExists(values)
      .then((res) => {
        if (res && res.password === values.password) {
          const sessionUser = { userName: values.userName, role: values.role };
          sessionStorage.setItem('user', JSON.stringify(sessionUser));
          ref.current.resetFields();
          message.success({ content: 'Successful log in', style: { marginTop: "20vh" } })
          this.setState(() => ({
            isLoggedIn: true,
            user: sessionUser
          }))
        }

        if (res && res.password !== values.password) {
          throw new Error('Wrong password');
        }

        if (!res) {
          throw new Error('No user with this name');
        }
      }).catch(err => message.error({ content: err.message, style: { marginTop: "20vh" } }))
  }

  onSignIn = (values, ref) => {
    this.checkUserExists(values)
      .then((res) => {
        if (!res) {
          this.httpClient.createData('users', values);
          ref.current.resetFields();
          message.success({ content: 'User created, you can login now', style: { marginTop: "20vh" } })
        } else {
          throw new Error('This user name is  already exists')
        }
      }).catch(err => message.error({ content: err.message, style: { marginTop: "20vh" } }))
  }

  render() {
    const { isLoggedIn, user } = this.state;
    const mainContent = (
      <React.Fragment>
        <HeaderComponent />
        <Content style={{ paddingBottom: "30px" }}>
          <Switch>
            <Route path="/" exact>
              <h1>Welcome to XCheck App!</h1>
            </Route>
            <Route path="/task-create">
              {user && user.role === 'EXTENDED' ? <TasksPage client={this.httpClient} /> : <h2>You have no permisson to create tasks</h2>}
            </Route>
          </Switch>
        </Content>
        <FooterComponent />
      </React.Fragment>
    )
    return (
      <Router basename="/" >
        <div className="App">
          {!isLoggedIn && <Authorization onLogIn={this.onLogIn} onSignIn={this.onSignIn} />}
          {isLoggedIn && mainContent}
        </div>
      </Router>
    );
  }
}

export default App;