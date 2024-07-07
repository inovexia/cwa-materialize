import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Grid } from '@mui/material';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';

// API import
import TestApis from 'src/pages/tests/_components/apis';

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  type: yup.string().required(),
  details: yup.string().required(),
});

const EditTest = ({ onSubmit, isLoading, toggle }) => {
  const router = useRouter();
  const { guid } = router.query;
  const [data, setData] = useState()

  // useForm hook
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Fetch data and populate form on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (guid) {
          const res = await TestApis.viewTest({ guid });
          setData(res.payload)
          reset(res.payload); // Reset form with fetched data

        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [guid, reset]);

  console.log(data)

  // Handle form submission
  const handleFormSubmit = (data) => {
    onSubmit(data); // Handle form submission logic passed from parent component
  };

  const handleClose = () => {
    toggle(); // Close modal or navigate away
    reset(); // Reset form to default values
  };

  return (
    <>
      <Box textAlign="right"><Button size="large" variant="contained" color="secondary" component="a"
        href={`/tests`}>
        Back
      </Button>
      </Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <label>Test Name</label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.title)}
                    helperText={errors.title ? errors.title.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id="test-type">Test Type</InputLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Test Type"
                    labelId="typeLabel"
                    error={Boolean(errors.type)}
                    inputProps={{ placeholder: 'Select Type' }}
                  >
                    <MenuItem value="evaluated">Evaluated</MenuItem>
                    <MenuItem value="practice">Practice</MenuItem>
                    <MenuItem value="quiz">Quiz</MenuItem>
                  </Select>
                )}
              />
              {errors.type && (
                <FormHelperText sx={{ color: 'error.main' }} id="validation-test-type">
                  {errors.type.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <label>Details</label>
              <Controller
                name="details"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={4}
                    error={Boolean(errors.details)}
                    helperText={errors.details ? errors.details.message : ''}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size="large" type="submit" variant="contained" disabled={isLoading}>
              {isLoading && <CircularProgress color="inherit" size={20} sx={{ mr: 2 }} />}
              Submit
            </Button>
            <Button size="large" variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditTest;
