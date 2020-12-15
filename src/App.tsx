import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { Task } from './components/Types'

interface State {
  tasks: Task[]
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      tasks: []
    }
    this.setTasks = this.setTasks.bind(this);
  }

  setTasks(tasks: Task[]) {
    this.setState({
      tasks: tasks
    })
  }

  get axios() {
       const axiosBase = require('axios');
       return axiosBase.create({
           baseURL: process.env.REACT_APP_DEV_API_URL,
           headers: {
               'Content-Type': 'application/json',
               'X-Requested-With': 'XMLHttpRequest'
           },
           responseType: 'json'
       });
   }

   // get tasks when app is first shown(= when component mounted)
  componentDidMount() {
   this.axios.get('/tasks')
      .then((results: any) => {
          console.log(results);
          this.setState({
              tasks: results.data
          });
      })
      .catch((data: any) => {
          console.log(data);
      });
  }

  render() {
    return (
      <div className="App">
        <Box color="text.primary">
          <h1 className="siimple-box-title siimple--color-white">React Todo App</h1>
          <TaskForm axios={this.axios} tasks={this.state.tasks} setTasks={this.setTasks}/>
          <div className="siimple-rule"></div>
          <TaskList tasks={this.state.tasks}/>
        </Box>
      </div>
      )
    }

}

export default App;
