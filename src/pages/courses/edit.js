// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import toast from 'react-hot-toast'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { AddTest } from 'src/pages/tests/_models/TestModel'

// ** Module Specific Imports
import FileUploaderSingle from './_components/Fileupload'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))

const defaultValues = {
  title: '',
  type: '',
  details: '',
  category: ''
}

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  type: yup.string().required(),
  details: yup.string(),
  category: yup.string()
})


const EditCourse = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [type, setType] = useState('evaluated')
  const [isLoading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState(false)

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
    setLoading(true)
    const response = await AddTest(data)
    setLoading(false)
    if (response.success === true) {
      toast.success(response.message)
    } else {
      toggle()
      toast.error(response.message)
    }
  }


  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Edit Courses</Typography>}
          subtitle={<Typography variant='body2'>Edit your Courses</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ px: 4 }}>
          {responseMessage && (
            <FormHelperText sx={{ color: 'error.main' }}>Cannot submit due to server error </FormHelperText>
          )}
        </Box>
        <Card>
          <CardContent>
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
                          label='Course Title'
                          onChange={onChange}
                          placeholder='Course title'
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
                  <FormControl fullWidth>
                    <Controller
                      name='details'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          rows={4}
                          multiline
                          {...field}
                          label='Course Description'
                          error={Boolean(errors.details)}
                          aria-describedby='validation-basic-textarea'
                        />
                      )}
                    />
                    {errors.details && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                        This field is required
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FileUploaderSingle />
                </Grid>
                <Grid item xs={12}>
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
                    Save
                  </Button>
                  <Button variant='contained' size='large' href='/courses' sx={{ ml: 3 }}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditCourse
