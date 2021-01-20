import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import ChipInput from 'material-ui-chip-input'
import Box from '@material-ui/core/Box';
import { Task } from './Types'
import TextField from '@material-ui/core/TextField';
import { useFormik, FieldArray, Field} from 'formik';
import * as Yup from 'yup';
import App from '../App';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface TaskDeleteDialogProps {
  open: boolean
  onClose: any
  task: Task
  app: App
}

function TaskDeleteDialog(props: TaskDeleteDialogProps) {
    const [state, setState] = useState({
      name: props.task.name,
      tags_attributes: props.task.tags
    })

    const handleTaskDelete = (event:React.MouseEvent<HTMLButtonElement>, id: number) => {
      event.preventDefault();
      props.app.axios.delete(`/tasks/${id}`)
         .then((result: any) => {
             // update tasks in App component
             props.app.removeTask(result.data)
         })
         .catch((data: any) => {
             console.log(data);
         });
    }

    return (
          <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Are you sure you want to delete this task?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                * This action will delete all subtasks.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.onClose}>
                Cancel
              </Button>
              <Button color="secondary"
              onClick={(event) => handleTaskDelete(event, props.task.id)}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

    );
}

export default TaskDeleteDialog
