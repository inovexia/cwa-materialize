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


const SidebarAddTest = props => {
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
    setLoading (true)
    const response = await AddTest(data)
    setLoading (false)
    if (response.success === true) {
      toast.success (response.message)
    } else {
      toggle()
      toast.error (response.message)
    }
  }


  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Test</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 4 }}>
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
                        label='First Name'
                        onChange={onChange}
                        placeholder='Test title'
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
                        value={value}
                        label='Test Type'
                        labelId='testTypeLabel'
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
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                      This field is required
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
                        label='Bio'
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
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='category'>Test Type</InputLabel>
                  <Controller
                    name='category'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        value={value}
                        label='Category'
                        labelId='categoryLabel'
                        onChange={onChange}
                        error={Boolean(errors.category)}
                        inputProps={{ placeholder: 'Select Category' }}
                      >
                        <MenuItem value='evaluated'>Evaluated</MenuItem>
                        <MenuItem value='practice'>Practice</MenuItem>
                        <MenuItem value='quiz'>Quiz</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

    </Drawer>
  )
}

export default SidebarAddTest
