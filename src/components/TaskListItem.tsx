import React from 'react';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Task } from './Types'
import TaskEditDialog from './TaskEditDialog'
import TaskDeleteDialog from './TaskDeleteDialog'
import SubTaskAddDialog from './SubTaskAddDialog'
import Chip from '@material-ui/core/Chip';
import App from '../App';
import IconButton from '@material-ui/core/IconButton';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import Checkbox from '@material-ui/core/Checkbox';
import Badge from '@material-ui/core/Badge';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

interface TaskListItemProps {
  app: App
  task: Task
}

function TaskListItem(props: TaskListItemProps) {
  const [editFormOpen, setEditFormOpen] = React.useState(false)
  const handleEditFormOpen = () => {
    setEditFormOpen(true)
  }
  const handleEditFormClose = () => {
    setEditFormOpen(false)
  }

  const [deleteFormOpen, setDeleteFormOpen] = React.useState(false)
  const handleDeleteFormOpen = () => {
    setDeleteFormOpen(true)
  }
  const handleDeleteFormClose = () => {
    setDeleteFormOpen(false)
  }


  const [addSubTaskFormOpen, setAddSubTaskFormOpen] = React.useState(false)
  const handleAddSubTaskFormOpen = () => {
    setAddSubTaskFormOpen(true)
  }
  const handleAddSubTaskFormClose = () => {
    setAddSubTaskFormOpen(false)
  }

  const [subTasksOpen, setSubTasksOpen] = React.useState(false)
  const handleSubTasksToggle = () => {
    setSubTasksOpen(!subTasksOpen)
  }

  const [isTaskCompleted, setIsTaskCompleted] = React.useState(props.task.completed)
  const handleTaskCompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTaskCompleted(event.target.checked);
    props.app.axios.patch(`/tasks/${props.task.id}`, {
        task: {completed: event.target.checked}
    })
        .then((results: any) => {
            // update tasks in app
            props.app.updateTask(results.data)
        })
        .catch((data: any) => {
            alert("Failed to check task")
            console.log(data);
        })
  };

  const getTagsView = () => {
    const hasTags = props.task.tags
    if (hasTags) {
      return props.task.tags.map( (tag: any) => (
        <Box ml={1}>
          <Chip key={tag.id} label={tag.name}/>
        </Box>
      ))
    }
  }

  const getSubTasks = () => {
    return props.app.state.filtered_tasks.filter(
      (task) => task.parent_task_id == props.task.id
    )
  }

  const getIncompletedSubTasks = () => {
    const sub_tasks = props.app.state.tasks.filter(
      (task) => task.parent_task_id == props.task.id
    )
    const incomplete_sub_tasks = sub_tasks.filter((task) => !(task.completed))
    return incomplete_sub_tasks
  }

  const getShowSubTaskIcon = () => {
    const numSubTasks = getIncompletedSubTasks().length
    return <Tooltip title={subTasksOpen?"hide subtasks":`show ${numSubTasks} subtasks`}>
            <Badge badgeContent={getIncompletedSubTasks().length} color="primary">
              <IconButton onClick={handleSubTasksToggle}>
                {subTasksOpen?<ExpandLess />:<ExpandMore />}
              </IconButton>
            </Badge>
          </Tooltip>
  }

  return (
    <div>

      {/* current task item*/}
      <ListItem>
        <Grid container justify="flex-start" alignItems="center" >

          {getShowSubTaskIcon()}
          <Checkbox checked={isTaskCompleted}
          color="primary" onChange={handleTaskCompleteChange}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
          <ListItemText primary={props.task.name}/>
          {getTagsView()}


          <Tooltip title="add subtask">
            <IconButton color="primary" onClick={handleAddSubTaskFormOpen}>
              <AddBoxRoundedIcon />
            </IconButton>
          </Tooltip>
          <SubTaskAddDialog open={addSubTaskFormOpen} onClose={handleAddSubTaskFormClose}
          app={props.app} task={props.task}/>

          <Tooltip title="edit task">
            <IconButton color="primary" onClick={handleEditFormOpen}>
              <EditRoundedIcon />
            </IconButton>
          </Tooltip>
          <TaskEditDialog open={editFormOpen} onClose={handleEditFormClose}
            task={props.task} app={props.app}/>

          <Tooltip title="delete task">
            <IconButton color="secondary" onClick={handleDeleteFormOpen}>
              <DeleteRoundedIcon />
            </IconButton>
          </Tooltip>
          <TaskDeleteDialog open={deleteFormOpen} onClose={handleDeleteFormClose}
            task={props.task} app={props.app}/>

        </Grid>
      </ListItem>

      {/*sub task items*/}
      <Collapse in={subTasksOpen} timeout="auto" unmountOnExit>
        <div style={{marginLeft: 40, marginRight:10}}>
          <TaskList app={props.app} tasks={getSubTasks()}/>
        </div>
      </Collapse>
    </div>

  )
}

export default TaskListItem;
