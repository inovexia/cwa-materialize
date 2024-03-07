import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useController } from 'react-hook-form';
import PdfUpload from 'src/pages/courses/_components/PdfUpload';

const PdfFile = ({ control, name }) => {
  const { field } = useController({
    control,
    name,
  });

  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    field.onChange(acceptedFiles); // Update the field value in the form
  };

  return (
    <Box>
      <label
        htmlFor='description'
        style={{
          fontSize: 16,
          fontWeight: 500,
          fontFamily: 'Arial',
          marginBottom: '10px',
          display: 'block',
        }}
      >
        Image Upload
      </label>
      <PdfUpload onDrop={onDrop} files={files} />
    </Box>
  );
};

export default PdfFile;
