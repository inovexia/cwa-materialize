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

const ContentPdf = props => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    // Implement your file upload logic here
    // You can use libraries like axios to send the file to the server
    // Update the progress as needed
  };
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
    <Drawer
      open={open}
      anchor='right'
      onClose={handleClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Upload Pdf</Typography>
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
          <input
            accept=".pdf"
            style={{ display: 'none' }}
            id="upload-pdf"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="upload-pdf">
            <Button
              variant="outlined"
              component="span"
              startIcon={<Icon icon="material-symbols:upload" />}
            >
              Upload PDF
            </Button>
          </label>
          {file && (
            <div>
              <Typography variant="subtitle1">Selected File: {file.name}</Typography>
              <LinearProgress variant="determinate" value={progress} />
              <Button onClick={handleUpload} variant="contained" color="primary">
                Upload
              </Button>
            </div>
          )}
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

export default ContentPdf
