import React from 'react';
import logo from './logo.svg';
import './App.css';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TaskSearchBar from './components/TaskSearchBar'
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { Task } from './components/Types'

interface State {
  tasks: Task[]
  filtered_tasks: Task[]
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      tasks: [],
      filtered_tasks: []
    }
    this.setTasks = this.setTasks.bind(this)
    this.setFilteredTasks = this.setFilteredTasks.bind(this)
  }

  setTasks(tasks: Task[]) {
    this.setState({
      tasks: tasks
    })
  }

  setFilteredTasks(filtered_tasks: Task[]) {
    this.setState({
      filtered_tasks: filtered_tasks
    })
  }

  addTask(task: Task) {
    // update tasks
    let tasks = this.state.tasks.slice()
    tasks.push(task)
    this.setTasks(tasks)
    // update filtered tasks
    let filtered_tasks = this.state.filtered_tasks.slice()
    filtered_tasks.push(task)
    this.setFilteredTasks(filtered_tasks)
  }

  updateTask(targetTask: Task) {
    // update tasks
    const tasks = this.state.tasks.slice();
    let targetIndex = tasks.findIndex(task => task.id === targetTask.id);
    tasks.splice(targetIndex, 1, targetTask);
    this.setTasks(tasks)
    // update filtered tasks
    const filtered_tasks = this.state.filtered_tasks.slice();
    targetIndex = filtered_tasks.findIndex(task => task.id === targetTask.id);
    filtered_tasks.splice(targetIndex, 1, targetTask);
    this.setFilteredTasks(filtered_tasks)
  }

  removeTask(targetTask: Task) {
    // update tasks
    const tasks = this.state.tasks.slice()
    let targetIndex = tasks.findIndex(task => task.id === targetTask.id)
    tasks.splice(targetIndex, 1)
    this.setTasks(tasks)
    // update filtered tasks
    const filtered_tasks = this.state.filtered_tasks.slice();
    targetIndex = filtered_tasks.findIndex(task => task.id === targetTask.id)
    filtered_tasks.splice(targetIndex, 1)
    this.setFilteredTasks(filtered_tasks)
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
              tasks: results.data,
              filtered_tasks: results.data
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
          <TaskForm app={this} />
          <div className="siimple-rule"></div>
          <TaskSearchBar tasks={this.state.tasks} setFilteredTasks={this.setFilteredTasks}/>
          <TaskList app={this} />
        </Box>
      </div>
      )
    }

}

export default App;
