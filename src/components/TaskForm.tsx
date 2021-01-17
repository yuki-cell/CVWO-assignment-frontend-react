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
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Your todo:</InputLabel>
            </Grid>

            <Grid item xs={12}>
              <TextField id="outlined-basic" variant="outlined" size="small"
                name="name" label="Task Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <ChipInput label="Tags"
                value={formik.values.tags_attributes.map((tag)=>tag.name)}
                onAdd={chip => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
              />
              {/*<Chip label="Add tag" color="primary" clickable/>*/}
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" >
                Create new task
              </Button>
            </Grid>
        </Grid>
      </form>
    )
}

export default TaskForm;