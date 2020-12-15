import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Task } from './Types'

interface TaskListProps {
  tasks: Task[]
}

function TaskList(props: TaskListProps) {
  handleTaskDelete() {
    
  }

  return (
    <List>
      { props.tasks.map( (task: Task) => (
          <ListItem button>
            <ListItemText primary={task.name} />
            <ListItemText primary="Delete" />
          </ListItem>
        )) }
     </List>
  );
}

export default TaskList;
