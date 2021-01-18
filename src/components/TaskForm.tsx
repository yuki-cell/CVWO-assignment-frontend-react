import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { Task, Tag } from './Types'
import ChipInput from 'material-ui-chip-input'
import { useFormik, FieldArray, Field} from 'formik';
import * as Yup from 'yup';
import App from '../App';
import { sizing } from '@material-ui/system';
import LabelRoundedIcon from '@material-ui/icons/LabelRounded';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import IconButton from '@material-ui/core/IconButton';

interface TaskFormProps {
  app: App
}

function TaskForm(props: TaskFormProps) {
  const tags : Tag[] = []
  const [state, setState] = useState({
      name: "",
      tags_attributes: tags
  })

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
  })

  const handleSubmit = (values: any, {resetForm}: any) => {
      props.app.axios.post("/tasks", {
          task: values,
      })
          .then((result: any) => {
              // update tasks in App component
              props.app.addTask(result.data)
              // set input value back to null
              resetForm()
              const tags : Tag[] = []
              formik.setFieldValue("tags_attributes", tags, true)
          })
          .catch((data: any) => {
              console.log(data)
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
        <Paper>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} justify="center"
              alignItems="center" direction="row">
                <Grid item xs={7}>
                  <TextField id="outlined-basic" variant="outlined" size="small"
                    name="name" label="Add new task"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    fullWidth={true}
                  />
                </Grid>

                <Grid item>
                  <ChipInput label="Tags" size="small"
                    value={formik.values.tags_attributes.map((tag)=>tag.name)}
                    onAdd={chip => handleAddChip(chip)}
                    onDelete={(chip, index) => handleDeleteChip(chip, index)}
                  />
                </Grid>

                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Add
                  </Button>
                </Grid>

            </Grid>
          </form>
        </Paper>

    )
}

export default TaskForm;
