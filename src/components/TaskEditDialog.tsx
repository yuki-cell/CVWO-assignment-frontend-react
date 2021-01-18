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

interface TaskEditDialogProps {
  open: boolean
  onClose: any
  task: Task
  app: App
}

function TaskEditDialog(props: TaskEditDialogProps) {
    const [state, setState] = useState({
      name: props.task.name,
      tags_attributes: props.task.tags
    })

    const validationSchema = Yup.object().shape({
      name: Yup.string()
          .required('Name is required'),
    });


    const handleSubmit = (values: any, {resetForm}: any) => {
          props.app.axios.patch(`/tasks/${props.task.id}`, {
              task: values
          })
              .then((results: any) => {
                  // update tasks in app
                  props.app.updateTask(results.data)
                  props.onClose()
              })
              .catch((data: any) => {
                  alert("Failed to edit")
                  console.log(data);
              })
    }

    const formik = useFormik({
      initialValues: state,
      validationSchema: validationSchema,
      onSubmit: handleSubmit
    })

    const handleAddChip = (chip: any) => {
      let tags = {...formik.values}.tags_attributes
      tags.push({name: chip})
      // initialValuesを変えてしまうからresetFormに影響を与えてしまう(resetForm uses initialValues)
      formik.setFieldValue("tags_attributes", tags, true)
      console.log(formik.values)
    }
    const handleDeleteChip = (chip: any, index: any) => {
      let tags = {...formik.values}.tags_attributes
      tags.splice(index, 1)
      formik.setFieldValue("tags_attributes", tags, true)
    }

    return (
          <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <form onSubmit={formik.handleSubmit}>

              <DialogTitle id="form-dialog-title">Edit task</DialogTitle>
              <DialogContent>
                <TextField id="outlined-basic" variant="outlined" size="small"
                  fullWidth margin="dense"
                  name="name" label="Task Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <ChipInput label="Tags"
                  fullWidth margin="dense"
                  value={formik.values.tags_attributes.map((tag)=>tag.name)}
                  onAdd={chip => handleAddChip(chip)}
                  onDelete={(chip, index) => handleDeleteChip(chip, index)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={props.onClose} color="secondary">
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </DialogActions>
            </form>
          </Dialog>

    );
}

export default TaskEditDialog
