import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import HttpClient from './services/http-client';
import TasksPage from './components/TasksPage/TaskPage';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import FooterComponent from './components/FooterComponent/FooterComponent';


const { Content } = Layout;

class App extends React.Component {
  httpClient = new HttpClient();

  render() {
    return (
      <Router>
        <div className="App">
          <HeaderComponent />
          <Content style={{ paddingBottom: "30px" }}>
            <Switch>
              <Route path="/" exact>
                <h1>Welcome to XCheck App!</h1>
              </Route>
              <Route path="/task-create">
                <TasksPage client={this.httpClient} />
              </Route>
            </Switch>
          </Content>
          <FooterComponent />
        </div>
      </Router>
    );
  }
}

export default App;