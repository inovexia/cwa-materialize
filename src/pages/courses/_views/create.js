// ** React Imports
import { useState, useRef } from 'react'

// ** MUI Imports
import { Box, FormControl, FormHelperText, Drawer, Button, styled, TextField, IconButton, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API
import CourseApi from 'src/pages/courses/_components/Apis'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))


const schema = yup.object().shape({
  title: yup.string().required().min(3).max(15),
  description: yup.string().min(3).max(100),
  created_by: yup.string().required()
})

const SidebarAddCourse = props => {
  // ** Props
  const { open, toggle, doReload } = props

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      created_by: 'ASI8'
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = async data => {
    setLoading(true)
    const response = await CourseApi.createCourse(data)
    setLoading(false)
    if (!response.success) return toast.success(response.message)
    doReload()
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const editorRef = useRef(null)

  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={handleClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Create Course</Typography>
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
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label='Description'
                  value={value}
                  rows={5}
                  multiline
                  onChange={onChange}
                  placeholder='Description'
                  error={Boolean(errors.description)}
                />
              )}
            />
            {errors.description && <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px' }}>
            <LoadingButton
              type='submit'
              color='primary'
              loading={loading}
              loadingPosition='start'
              startIcon={loading ? <Icon icon='eos-icons:bubble-loading' /> : ''}
              variant='contained'
              disabled={errors.title ? true : errors.description ? true : false}
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

export default SidebarAddCourse
