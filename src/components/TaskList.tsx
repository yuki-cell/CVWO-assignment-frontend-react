import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Task } from './Types'
import TaskListItem from './TaskListItem'
import App from '../App';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';


interface TaskListProps {
  app: App
  tasks: Task[]
}

function TaskList(props: TaskListProps) {
  const body = () => {
    const hasTasks = props.tasks.length > 0
    if (hasTasks) {
      return props.tasks.map( (task: Task) => (
          <TaskListItem key={task.id} app={props.app} task={task}/>
      ))
    } else {
      return <p>No task</p>
    }
  }

  return (
    <Box my={1}>
      <Paper>
        <List>
          {body()}
         </List>
      </Paper>
      <br/>
    </Box>
   )


}

export default TaskList;
