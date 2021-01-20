import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Tag, Task } from './components/Types'
import TaskApp from './components/TaskApp'

interface State {
  tasks: Task[]
  filtered_tasks: Task[]
  searchWord: string
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      tasks: [],
      filtered_tasks: [],
      searchWord: ""
    }
    this.setTasks = this.setTasks.bind(this)
    this.setFilteredTasks = this.setFilteredTasks.bind(this)
  }

  setSearchWord(newWord: string) {
    this.setState({searchWord: newWord})
  }

  setTasks(tasks: Task[]) {
    this.setState({tasks: tasks})
    // update filtered tasks
    let filtered_task = this.filterTaskByTag(this.state.searchWord, tasks)
    this.setFilteredTasks(filtered_task)
  }

  setFilteredTasks(filtered_tasks: Task[]) {
    this.setState({filtered_tasks: filtered_tasks})
  }

  filterTaskByTag(keyword: string, tasks: Task[]) {
    // case-insensitive search, search tasks that have matching tag
    if (keyword != "") {
      tasks = tasks.filter((task) => this.hasMatchingTag(task.tags, keyword))
    }
    return tasks
  }

  hasMatchingTag(tags: Tag[], keyword: string) {
    return tags.some((tag) => {
      return tag.name.toLowerCase().includes(keyword.toLowerCase())
    })
  }

  addTask(task: Task) {
    // update tasks
    let tasks = this.state.tasks.slice()
    tasks.push(task)
    this.setTasks(tasks)
  }

  updateTask(targetTask: Task) {
    // update tasks
    const tasks = this.state.tasks.slice();
    let targetIndex = tasks.findIndex(task => task.id === targetTask.id);
    tasks.splice(targetIndex, 1, targetTask);
    this.setTasks(tasks)
  }

  removeTask(targetTask: Task) {
    // update tasks, remove all related sub-tasks
    const tasks = this.state.tasks.slice()
    // remove task
    let targetIndex = tasks.findIndex(task => task.id === targetTask.id)
    tasks.splice(targetIndex, 1)
    // remove all related subtasks
    let sub_tasks = this.getSubTasks(targetTask)
    while (sub_tasks.length > 0) {
      let new_sub_tasks: Task[] = []
      sub_tasks.forEach((sub_task) => {
        let targetIndex = tasks.findIndex(task => task.id == sub_task.id)
        tasks.splice(targetIndex, 1)
        // find sub_tasks of sub_tasks
        new_sub_tasks = new_sub_tasks.concat(this.getSubTasks(sub_task))
      })
      sub_tasks = new_sub_tasks.slice()
    }

    this.setTasks(tasks)
  }

  getSubTasks(parent_task: Task) {
    return this.state.tasks.filter(task => task.parent_task_id == parent_task.id)
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
        <TaskApp app={this}/>
      </div>
    )
  }

}

export default App;
