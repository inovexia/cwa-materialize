import { useState } from 'react';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { useController } from 'react-hook-form';
import Icon from 'src/@core/components/icon';

const ContentPdf = ({ control, name }) => {
  const { field } = useController({ control, name });

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    field.onChange(selectedFile); // Update the field value in the form
  };

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
        </div>
      )}
    </Box>
  );
};

export default ContentPdf;
