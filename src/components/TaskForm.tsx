import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { Task, newTaskInputs } from './Types'

interface TaskFormProps {
  axios: any
  tasks: Task[]
  setTasks: any
}

interface TaskFormState {
  newTaskInputs: newTaskInputs
}

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  constructor(props: TaskFormProps) {
    super(props)
    this.state = {
      newTaskInputs: {
        name: ""
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      newTaskInputs: {
        name: event.target.value
      }
    })
  }

  handleTaskSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const inputValues = Object.values(this.state.newTaskInputs);
        // check every value is non-null
        if (inputValues.every(value => value)) {
            this.props.axios.post("/tasks", {
                task: this.state.newTaskInputs,
            })
                .then((result: any) => {
                    // update tasks in App component
                    const tasks = this.props.tasks.slice();
                    tasks.push(result.data);
                    this.props.setTasks(tasks)
                    // set input value back to null
                    this.setState({
                        newTaskInputs: {
                            name: "",
                        },
                    });
                })
                .catch((data: any) => {
                    console.log(data)
                });
        }
    }

  render() {
    return (
      <form onSubmit={this.handleTaskSubmit}>
        <InputLabel>Your todo:</InputLabel>

        <TextField id="outlined-basic" label="Task name" variant="outlined" size="small"
          value={this.state.newTaskInputs.name} onChange={this.handleChange}/>
        <Button variant="contained" color="primary" type="submit" >
          Add
        </Button>
      </form>
    );
  }

}

export default TaskForm;
