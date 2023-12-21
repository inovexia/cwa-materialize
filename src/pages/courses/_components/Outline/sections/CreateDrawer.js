// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import { Drawer, Button, styled, TextField, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
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

// ** API
import CourseApi from 'src/pages/courses/_components/Apis'

import ContentPdf from './PdfContent'
import ContentUrl from './UrlContent'
import ContentVideo from './VideoContent'
import ContentYoutubeUrl from './YoutubeUrl'
import HtmlCode from './HtmlCode'
import ContentImage from './ImageContent'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))


const schema = yup.object().shape({
  title: yup.string(),
  description: yup.string().required(),
  created_by: yup.string().required()
})

const CreateSectionDrawer = props => {
  // ** Props
  const { open, toggle, contentType, setDrawerOpen } = props

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [htmlCode, setHtmlCode] = useState('');
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
    doReload(true)
    toggle()
    reset()
  }

  const handleClose = () => {
    // toggle()
    reset()
    setDrawerOpen(false)
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
        <Typography variant='h6'>Create {contentType === 'html' ? 'html' : contentType === 'image' ? 'image' : contentType === 'pdf' ? 'pdf' : contentType === 'url' ? 'url' : contentType === 'video' ? 'video' : 'youtube'}</Typography>
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
          <Box>
            {contentType === 'html' && <HtmlCode />}
            {contentType === 'image' && <ContentImage />}
            {contentType === 'pdf' && <ContentPdf />}
            {contentType === 'url' && <ContentUrl />}
            {contentType === 'video' && <ContentVideo />}
            {contentType === 'youtube' && <ContentYoutubeUrl />}
          </Box>
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

export default CreateSectionDrawer
