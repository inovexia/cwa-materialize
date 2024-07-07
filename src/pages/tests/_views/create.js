import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  title: '',
  type: 'evaluated',
  details: '',
  category_guid: ''
}


const schema = yup.object().shape({
  title: yup.string().required().min(3),
  type: yup.string().required(),
  details: yup.string(),
  category: yup.string()
})


const CreateTestForm = props => {

  const { onSubmit, isLoading, toggle, categories } = props

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

  const handleClose = () => {
    toggle()
    reset()
  }


  return (

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

        <Grid item xs={12}>
          <FormControl fullWidth sx={{ mb: 6 }}>
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
                    label='Select Category'
                    labelId='categoryLabel'
                    onChange={onChange}
                    error={Boolean(errors.category_guid)}
                    inputProps={{ placeholder: 'Select Category' }}
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

        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button size='large' type='submit' variant='contained' disabled={isLoading ? true : false}>
            {isLoading ? (
              <CircularProgress
                sx={{
                  color: 'common.white',
                  width: '20px !important',
                  height: '20px !important',
                  mr: theme => theme.spacing(2)
                }}
              />
            ) : null}
            Submit
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default CreateTestForm
