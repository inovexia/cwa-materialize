// ** React Imports
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Drawer, useTheme, Grid, styled, TextField, Button, IconButton, Typography, Box, FormControl, FormHelperText } from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'

// ** Action Module
import { AddOnlineClass } from 'src/pages/onlineclass/_models/OnlineClassModel'

// ** date picker component
import PickersBasic from 'src/lib/common/datepicker/PickersBasic'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))

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
      created_on: '',
      created_by: '{{admin_guid}}'
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  /** Create Online Class  */
  const onSubmit = async (data) => {
    await AddOnlineClass(data)
      .then(response => {
        console.log(response)
        if (response.success === true) {
          toast.success(response.message)
        } else {
          toast.error(response.message)
        }
      })
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
