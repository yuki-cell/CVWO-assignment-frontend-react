import React, { useState } from 'react';
import { Task, Tag } from './Types'
import SearchBar from "material-ui-search-bar";

interface TaskSearchBarProps {
  tasks: Task[]
  setFilteredTasks: any
}

function TaskSearchBar(props: TaskSearchBarProps) {
  const [keyword, setKeyWord] = useState("")

  const handleChange = (newValue: string) => {
    setKeyWord(newValue)
    handleSearch(newValue)
  }

  const handleSearch = (keyword: string) => {
    let tasks = props.tasks.slice()
    // case-insensitive search, search tasks that have matching tag
    if (keyword != "") {
      tasks = tasks.filter((task) => hasMatchingTag(task.tags, keyword))
    }
    props.setFilteredTasks(tasks)
  }

  const hasMatchingTag = (tags: Tag[], keyword: string) => {
    return tags.some((tag) => {
      return tag.name.toLowerCase().includes(keyword.toLowerCase())
    })
  }

  const handleCancelSearch = () => {
    props.setFilteredTasks(props.tasks)
  }

  return (
    <div>
      <SearchBar
        value={keyword}
        onChange={handleChange}
        onCancelSearch={handleCancelSearch}
      />
    </div>
  )
}

export default TaskSearchBar
