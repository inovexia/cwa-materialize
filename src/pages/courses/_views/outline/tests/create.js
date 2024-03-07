import { Grid, Box, Select, Button, MenuItem, TextField, InputLabel, FormControl, FormHelperText, CircularProgress } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

// Import API
import { AddTest } from 'src/pages/courses/_models/TestModel'

const defaultValues = {
  title: '',
  type: 'evaluated',
  details: '',
  category_guid: '',
  created_by: 'ASI58'
}


const schema = yup.object().shape({
  title: yup.string().required().min(3),
  type: yup.string().required(),
  details: yup.string(),
  category: yup.string()
})


const CreateForm = ({ categories }) => {
  const router = useRouter()
  const { guid } = router.query


  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })


  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      start_date: data.start_date.replace('T', ' '),
      end_date: data.end_date.replace('T', ' '),
    };
    const response = await AddTest({ guid, data: formattedData })
    if (response.success === true) {
      toast.success(response.message)
      router.push(`/courses/${guid}/test`);
    } else {
      toast.error(response.message)
    }
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };


  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Test Name'
                    onChange={onChange}
                    placeholder='Test name'
                    error={Boolean(errors.title)}
                    aria-describedby='validation-schema-title'
                  />
                )}
              />
              {errors.title && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-title'>
                  {errors.title.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='test-type'>Test Type</InputLabel>
              <Controller
                name='type'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Select
                    fullWidth
                    value={value || ''}
                    defaultValue=''
                    label='Test Type'
                    labelId='typeLabel'
                    onChange={onChange}
                    error={Boolean(errors.type)}
                    inputProps={{ placeholder: 'Select Type' }}
                  >
                    <MenuItem value='evaluated'>Evaluated</MenuItem>
                    <MenuItem value='practice'>Practice</MenuItem>
                    <MenuItem value='quiz'>Quiz</MenuItem>
                  </Select>
                )}
              />
              {errors.type && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-test-type'>
                  {errors.type.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='details'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    rows={4}
                    multiline
                    {...field}
                    label='Details'
                    error={Boolean(errors.details)}
                    aria-describedby='validation-test-details'
                  />
                )}
              />
              {errors.details && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-test-details'>
                  {errors.details.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='test-type'>Category</InputLabel>
              <Controller
                name='category_guid'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Select
                      fullWidth
                      value={value}
                      defaultValue=''
                      label='Category'
                      labelId='categoryLabel'
                      onChange={onChange}
                      error={Boolean(errors.category_guid)}
                      inputProps={{ placeholder: 'Select Type' }}
                    >
                      {categories.length > 0 && categories.map(({ guid, title }, i) =>
                        (<MenuItem value={guid} key={i}>{title}</MenuItem>)
                      )}
                    </Select>
                  )
                }}
              />
              {errors.category_guid && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                  {errors.category_guid.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="start_date"
              control={control}
              defaultValue={getCurrentDateTime()}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="datetime-local"
                  label="Select Start Date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              name="end_date"
              control={control}
              defaultValue={getCurrentDateTime()}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="datetime-local"
                  label="Select End Date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            <Button size='large' type='submit' variant='contained'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CreateForm
