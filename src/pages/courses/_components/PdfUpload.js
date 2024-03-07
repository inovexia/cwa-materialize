import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

const PdfUpload = ({ onDrop, files }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: '.pdf',
    onDrop,
    files
  });

  return (
    <Box {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      {files.length ? (
        files.map((file) => (
          <img
            key={file.name}
            alt={file.name}
            className='single-file-image'
            src={URL.createObjectURL(file)}
            style={{ width: 'auto', height: '100px' }}
          />
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            color: 'black',
            border: '1px solid #f1f1f1',
            borderRadius: '4px',
            padding: '15px 10px',
            width: '100%',
          }}
        >
          <Typography variant='h6' sx={{ mb: 1 }}>
            Drop files here or click to upload.
          </Typography>
          <Typography color='textSecondary' variant='p'>
            Browse Image
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PdfUpload;
