// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form';

// ** MUI Imports
import { Grid, Card, Box, Select, Button, FormLabel, Switch, FormControlLabel, Radio, RadioGroup, Typography, MenuItem, TextField, InputLabel, FormControl, FormHelperText, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Component
import PageHeader from 'src/layouts/components/page-header'
import { TestSetting } from 'src/pages/courses/_models/TestModel'
import CourseApi from 'src/pages/courses/_components/Apis';

const MyForm = () => {
  const router = useRouter()
  const { guid, testGuid } = router.query
  const [loading, setLoading] = useState(false)

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      marks_per_question: "1",
      neg_marks_per_question: "0",
      pass_marks: "0",
      pass_marks_unit: "fixed",
      time_per_question: "0",
      test_duration: "0",
      show_timer: "false",
      show_result: "immediately",
      on_date: "",
      num_attempts: "0",
      show_question_hint_on_test_page: "0",
      randomize_questions_within_test: "0",
      randomize_answer_choices: "0",
      randomize_questions_within_comprehension: "0",
      allow_bookmark_questions: "0",
      show_bookmark_question_correct_answer: "0",
      randomize_fixed_answer_choices: "0"
    }
  });

  // ** Get Current Meeting Details
  useEffect(() => {
    const fetchData = async () => {
      if (testGuid) {
        const res = await CourseApi.viewTest({ guid: testGuid })
        reset(res.payload.settings)
      }
    }
    fetchData()
  }, [testGuid])

  const onSubmit = async (formdata) => {
    const formattedData = {
      ...formdata,
      on_date: formdata.on_date.replace('T', ' '),
    };
    const response = await TestSetting({ guid: testGuid, data: formattedData })
    if (response.success === true) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  }

  return (
    <Box spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Settings</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
          buttonTitle='Back'
          buttonHref={`/courses/${guid}/test/${testGuid}/manage`}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Card style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <Controller
                    name='marks_per_question'
                    control={control}
                    defaultValue="1"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Marks/Question'
                        placeholder='1'
                        aria-describedby='validation-schema-title'
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <Controller
                    name='neg_marks_per_question'
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Negative Mark/Question'
                        aria-describedby='Use only numeric value 0-9'
                        placeholder='Use only numeric value 0-9'
                        inputProps={{
                          pattern: "[0-9]*",
                          inputMode: "numeric"
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <Controller
                    name='pass_marks'
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Passing Marks'
                        aria-describedby='Use only numeric value 0-9'
                        placeholder='Use only numeric value 0-9'
                        inputProps={{
                          pattern: "[0-9]*",
                          inputMode: "numeric"
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="pass-mark-unit">Passing Mark Unit</InputLabel>
                  <Controller
                    name="pass_marks_unit" // Replace with your field name
                    control={control}
                    defaultValue="fixed"
                    render={({ field }) => (
                      <Select
                        label='Passing Mark Unit'
                        labelId="pass-mark-unit"
                        aria-describedby='validation-schema-title'
                        {...field}
                      >
                        <MenuItem value="fixed">Fixed</MenuItem>
                        <MenuItem value="percentage">Percentage</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <Controller
                    name='time_per_question'
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Time/Question'
                        placeholder='Use only numeric value 0-9'
                        inputProps={{
                          pattern: "[0-9]*",
                          inputMode: "numeric"
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <Controller
                    name='test_duration'
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Test Duration'
                        placeholder='Use only numeric value 0-9'
                        inputProps={{
                          pattern: "[0-9]*",
                          inputMode: "numeric"
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl style={{ display: "flex" }}>
                  <FormLabel>Show Timer</FormLabel>
                  <Controller
                    name="show_timer"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Switch {...field} color="primary" />}
                      />
                    )}
                  />
                </FormControl>

              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl>
                  <FormLabel>Show Result</FormLabel>
                  <Controller
                    name="show_result"
                    control={control}
                    defaultValue="immediately"
                    render={({ field }) => (
                      <RadioGroup
                        style={{ display: "flex", flexDirection: "row", flexWrap: 'unset' }}
                        aria-label="show_result"
                        {...field}
                      >
                        <FormControlLabel value="immediately" control={<Radio />} label="Immediately" />
                        <FormControlLabel value="on_date" control={<Radio />} label="On Date" />
                        <FormControlLabel value="manually" control={<Radio />} label="Manually" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
              {watch("show_result") === "on_date" && (
                <Grid item xs={12} md={4}>
                  <Controller
                    name="on_date"
                    control={control}
                    defaultValue={getCurrentDateTime()}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="datetime-local"
                        label="Select Date for Result"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <Controller
                    name='num_attempts'
                    control={control}
                    defaultValue="0"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Attempts'
                        placeholder='Use only numeric value 0-9'
                        inputProps={{
                          pattern: "[0-9]*",
                          inputMode: "numeric"
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl style={{ display: "flex" }}>
                  <FormLabel>Show Question Hint on Test Page</FormLabel>
                  <Controller
                    name="show_question_hint_on_test_page"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value === "1"}
                            onChange={(e) => field.onChange(e.target.checked ? "1" : "0")}
                            color="primary"
                          />
                        }
                      />
                    )}
                  />
                </FormControl>

              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl style={{ display: "flex" }}>
                  <FormLabel>Randomize Questions Within Test</FormLabel>
                  <Controller
                    name="randomize_questions_within_test"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value === "1"}
                            onChange={(e) => field.onChange(e.target.checked ? "1" : "0")}
                            color="primary"
                          />
                        }
                      />
                    )}
                  />
                </FormControl>

              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl style={{ display: "flex" }}>
                  <FormLabel>Randomize Answer Choices</FormLabel>
                  <Controller
                    name="randomize_answer_choices"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value === "1"}
                            onChange={(e) => field.onChange(e.target.checked ? "1" : "0")}
                            color="primary"
                          />
                        }
                      />
                    )}
                  />
                </FormControl>

              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl style={{ display: "flex" }}>
                  <FormLabel>Randomize Questions Within Comprehension</FormLabel>
                  <Controller
                    name="randomize_questions_within_comprehension"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value === "1"}
                            onChange={(e) => field.onChange(e.target.checked ? "1" : "0")}
                            color="primary"
                          />
                        }
                      />
                    )}
                  />
                </FormControl>

              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl style={{ display: "flex" }}>
                  <FormLabel>Allow Bookmark Questions</FormLabel>
                  <Controller
                    name="allow_bookmark_questions"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value === "1"}
                            onChange={(e) => field.onChange(e.target.checked ? "1" : "0")}
                            color="primary"
                          />
                        }
                      />
                    )}
                  />
                </FormControl>

              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl style={{ display: "flex" }}>
                  <FormLabel>Show Bookmark Question Correct Answer</FormLabel>
                  <Controller
                    name="show_bookmark_question_correct_answer"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value === "1"}
                            onChange={(e) => field.onChange(e.target.checked ? "1" : "0")}
                            color="primary"
                          />
                        }
                      />
                    )}
                  />
                </FormControl>

              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl style={{ display: "flex" }}>
                  <FormLabel>Randomize Fixed Answer Choices</FormLabel>
                  <Controller
                    name="randomize_fixed_answer_choices"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            {...field}
                            checked={field.value === "1"}
                            onChange={(e) => field.onChange(e.target.checked ? "1" : "0")}
                            color="primary"
                          />
                        }
                      />
                    )}
                  />
                </FormControl>
              </Grid>

            </Grid>
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
            </Box>
          </form>
        </Card>

      </Grid>
    </Box>
  );
};

export default MyForm;
