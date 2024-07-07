// ** React Imports
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Drawer, useTheme, Grid, styled } from '@mui/material'
import Button from '@mui/material/Button'

// import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** API
import OnlineClassApi from '../_components/apis'
import AuthApi from 'src/configs/commonConfig'

// ** date picker component
import PickersBasic from 'src/lib/common/datepicker/PickersBasic'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))

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
  title: yup.string(),
  details: yup.string().required(),
  created_by: yup.string().required()
})

const SidebarAddMeeting = props => {
  const router = useRouter()
  const { guid } = router.query

  //popperPlacement
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  // ** Props
  const { open, toggle, setReload } = props

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date()); // Initial start date
  const [endDate, setEndDate] = useState(new Date());     // Initial end date

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


  // ** Hooks
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      details: '',
      created_on: ''

      // created_by: 'ASI8'
    },

    // mode: 'onChange',
    // resolver: yupResolver(schema)
  })

  // const handleFormSubmit = async data => {
  //   setLoading(true)
  //   const response = await MeetingApi.createMeeting(data)
  //   setLoading(false)
  //   if (!response.success) return toast.success(response.message)
  //   setReload(true)
  //   toggle()
  //   reset()
  // }

  const handleFormSubmit = async data => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    const res = await OnlineClassApi.createOnlineClass({ guid, data })
    if (res.success === true) {
      toast.success('online class created successfully')
      setTimeout(() => {
        router.push(`/courses/${guid}/onlineClass`)
      }, 500)
    } else {
      toast.error('Failed to create online class')
    }
  }



  const handleClose = () => {
    toggle()
    reset()
  }

  const editorRef = useRef(null)

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={handleClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Create Online Class</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      {responseMessage && responseMessage ? (
        <Box sx={{ p: 4 }}>
          {responseMessage && <FormHelperText sx={{ color: 'error.main' }}>{responseMessage}</FormHelperText>}
        </Box>
      ) : (
        ''
      )}
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mb: 6 }}>
                <Controller
                  name='title'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      label='Title'
                      value={value}
                      onChange={onChange}
                      placeholder='Title'
                      error={Boolean(errors.title)}
                    />
                  )}
                />
                {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <label
                htmlFor='details'
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  fontFamily: 'Arial',
                  marginBottom: '10px',
                  display: "block"
                }}
              >
                Class Details
              </label>
              <FormEditorField control={control} name='details' onInit={(evt, editor) => (editorRef.current = editor)} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={12} md={6}>
              <PickersBasic
                popperPlacement={popperPlacement}
                label='Start Date'
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PickersBasic
                popperPlacement={popperPlacement}
                label='End Date'
                value={endDate}
                onChange={handleEndDateChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px' }}>
            <LoadingButton
              type='submit'
              color='primary'
              loading={loading}
              loadingPosition='start'
              startIcon={loading ? <Icon icon='eos-icons:bubble-loading' /> : ''}
              variant='contained'
            >
              <span>SAVE</span>
            </LoadingButton>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddMeeting
