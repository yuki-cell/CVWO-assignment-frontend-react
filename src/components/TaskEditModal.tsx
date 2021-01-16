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

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    {/*const top = 50 + rand();
    const left = 50 + rand();*/}
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 500,
        height: 500,
        backgroundColor: "#d9ded9",
        border: '0.5px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

interface TaskEditModalProps {
  open: boolean
  onClose: any
  task: Task
  app: App
}

function TaskEditModal(props: TaskEditModalProps) {
    const classes = useStyles();
    const modalStyle = getModalStyle();
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
              })
              .catch((data: any) => {
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

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form onSubmit={formik.handleSubmit}>
                <Box mb={4} justifyContent="center">
                    <TextField id="outlined-basic" variant="outlined" size="small"
                      name="name" label="Task Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                </Box>

                <Grid item xs={12}>
                  <ChipInput label="Tags"
                    value={formik.values.tags_attributes.map((tag)=>tag.name)}
                    onAdd={chip => handleAddChip(chip)}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                  />
                  {/*<Chip label="Add tag" color="primary" clickable/>*/}
                </Grid>

                <Grid item container justify="center" xs={12} spacing={3}>
                    <Grid item container xs={4} justify="center">
                      <Button size="small" variant="contained" type="submit">
                          SAVE
                      </Button>
                    </Grid>
                    <Grid item container xs={4} justify="center">
                      <Button size="small" variant="contained" onClick={props.onClose}>
                          CLOSE
                      </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            {body}
        </Modal>
    );
}

export default TaskEditModal
