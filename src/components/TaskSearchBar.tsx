import React, { useState } from 'react';
import { Task, Tag } from './Types'
import SearchBar from "material-ui-search-bar";
import App from '../App';

interface TaskSearchBarProps {
  tasks: Task[]
  setFilteredTasks: any
  app: App
}

function TaskSearchBar(props: TaskSearchBarProps) {

  const handleChange = (newValue: string) => {
    // update search word
    props.app.setSearchWord(newValue)
    // filter task
    var filtered_task = props.app.filterTaskByTag(newValue, props.tasks)
    props.setFilteredTasks(filtered_task)
  }

  const handleCancelSearch = () => {
    props.setFilteredTasks(props.tasks)
  }

  return (
    <div>
      <SearchBar
        placeholder="Search by tag"
        value={props.app.state.searchWord}
        onChange={handleChange}
        onCancelSearch={handleCancelSearch}
      />
    </div>
  )
}

export default TaskSearchBar
