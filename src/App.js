import React from 'react';
import './App.css';

import HttpClient from './services/http-client';
import TasksPage from './components/TasksPage/tasks-page'

class App extends React.Component {
  httpClient = new HttpClient();

  render() {
    return (
      <div className="App">
        <TasksPage client={this.httpClient} />
      </div>
    );
  }
}

export default App;