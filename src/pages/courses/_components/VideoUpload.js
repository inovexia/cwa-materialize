// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import { styled, Box, Typography } from '@mui/material'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const VideoUpload = () => {
  // ** State
  const [files, setFiles] = useState([])

  // ** Hook
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const img = files.map(file => (
    <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
  ))

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
      <input {...getInputProps()} />
      {files.length ? (
        img
      ) : (
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          {/* <Img width={300} alt='Upload img' src='/images/misc/upload.png' /> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: ['center', 'center', 'inherit'],
              color: 'black',
              border: '1px solid #f1f1f1',
              borderRadius: '4px',
              padding: '15px 10px',
              width: '100%'
            }}
          >
            <HeadingTypography variant='h6' sx={{ mb: 1 }}>Drop files here or click to upload.</HeadingTypography>
            <Typography color='textSecondary' variant='p' sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}>
              <Link href='/' onClick={e => e.preventDefault()}>
                Browse Video
              </Link>{' '}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default VideoUpload
