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



  const editorRef = useRef(null)
  return (
    <Box>
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
    </Box>
  )
}

export default ContentPdf
