import React from 'react';
import '../App.css';
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import TaskSearchBar from './TaskSearchBar'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import App from '../App';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  redPaper: {
    backgroundColor: red['A200']
    // backgroundColor: grey['50']

  },
  bluePaper: {
    backgroundColor: blue['A200']
    // backgroundColor: grey['50']

  },
}));

interface TaskAppProps{
  app: App
}

function TaskApp(props: TaskAppProps) {
  const classes = useStyles()
  const getParentTasks = () => {
    return props.app.state.filtered_tasks.filter((task) => task.parent_task_id == null)
  }
  return (
    <div className="TodoApp">
      <Box color="text.primary" width="90%" maxWidth={1300} mx={"auto"} mt={3}>
        <Typography variant="h5" gutterBottom
        style={{fontFamily: 'Lato', fontWeight: 700}}>
          React Todo App
        </Typography>
        <hr/>
        <Box mb={2}>
          <Paper elevation={3} className={classes.redPaper}>
            <Box mx={2}>
              <br/>
              <TaskForm app={props.app} />
              <br/>
            </Box>
          </Paper>
        </Box>
        <Paper elevation={3} className={classes.bluePaper}>
          <Box mx={2}>
            <br/>
            <TaskSearchBar tasks={props.app.state.tasks}
            setFilteredTasks={props.app.setFilteredTasks} app={props.app}/>
            <TaskList app={props.app} tasks={getParentTasks()}/>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}

export default TaskApp;
