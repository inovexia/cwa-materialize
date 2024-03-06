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
import FileUploaderSingle from 'src/pages/courses/_components/Fileupload'
import VideoUpload from 'src/pages/courses/_components/VideoUpload'

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

const ContentVideo = props => {
  // ** Props
  const { open, toggle, setReload, doReload } = props

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
    doReload(true)
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const editorRef = useRef(null)
  return (
    <Box>
      <label
        htmlFor='description'
        style={{
          fontSize: 16,
          fontWeight: 500,
          fontFamily: 'Arial',
          marginBottom: '10px',
          display: "block"
        }}
      >
        Video Upload
      </label>
      <VideoUpload />
    </Box>
  )
}

export default ContentVideo
