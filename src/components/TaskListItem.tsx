import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Task } from './Types'
import TaskEditModal from './TaskEditModal'
import Chip from '@material-ui/core/Chip';
import App from '../App';

interface TaskListItemProps {
  app: App
  task: Task
}

interface TaskListItemState {
  editFormOpen: boolean
}

class TaskListItem extends React.Component<TaskListItemProps, TaskListItemState> {
  constructor(props: TaskListItemProps) {
    super(props)
    this.state = {
      editFormOpen: false
    }
    this.handleEditFormOpen = this.handleEditFormOpen.bind(this)
    this.handleEditFormClose = this.handleEditFormClose.bind(this)
  }

  handleEditFormOpen() {
    this.setState({editFormOpen: true})
  }

  handleEditFormClose() {
    this.setState({editFormOpen: false})
  }

  handleTaskDelete(event:React.MouseEvent<HTMLButtonElement>, id: number) {
    event.preventDefault();
    this.props.app.axios.delete(`/tasks/${id}`)
       .then((result: any) => {
           // update tasks in App component
           this.props.app.removeTask(result.data)
       })
       .catch((data: any) => {
           console.log(data);
       });
  }

  render() {
    const hasTags = this.props.task.tags
    let tags
    if (hasTags) {
      tags = this.props.task.tags.map( (tag: any) => (
          <Chip key={tag.id} label={tag.name}/>
      ))
    }
    return (
      <ListItem button>
        <ListItemText primary={this.props.task.name} />
        {tags}

        <Button variant="contained" color="primary" onClick={this.handleEditFormOpen}>
          Edit
        </Button>
        <TaskEditModal open={this.state.editFormOpen} onClose={this.handleEditFormClose}
          task={this.props.task} app={this.props.app}/>

        <Button variant="contained" color="primary"
          onClick={(event) => this.handleTaskDelete(event, this.props.task.id)} >
          Delete
        </Button>
      </ListItem>
     )
   }

}

export default TaskListItem;
