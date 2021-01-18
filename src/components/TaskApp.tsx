import React from 'react';
import '../App.css';
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import TaskSearchBar from './TaskSearchBar'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import App from '../App';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  redPaper: {
    backgroundColor: red['500']
  },
  bluePaper: {
    backgroundColor: blue['A200']
  },
}));

interface TaskAppProps{
  app: App
}

function TaskApp(props: TaskAppProps) {
  const classes = useStyles()
  return (
    <div className="TodoApp">
      <Box color="text.primary" m={3}>
        <Box mb={2}>
          <Paper elevation={3} className={classes.redPaper}>
            <Box mx={2}>
              <Typography variant="h5" gutterBottom
              style={{fontFamily: 'Lato', fontWeight: 700}}>
                React Todo App
              </Typography>
              <TaskForm app={props.app} />
              <br/>
            </Box>
          </Paper>
        </Box>
        <Paper elevation={3} className={classes.bluePaper}>
          <Box mx={2}>
            <br/>
            <TaskSearchBar tasks={props.app.state.tasks} setFilteredTasks={props.app.setFilteredTasks}/>
            <TaskList app={props.app} />
          </Box>
        </Paper>
      </Box>
    </div>
  )
}

export default TaskApp;
