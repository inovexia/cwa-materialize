import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import Repeater from 'src/@core/components/repeater'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Checkbox, Divider, FormControlLabel, Radio } from '@mui/material'

const CreateQuestionForm = (props) => {

  // ** Props
  const { onSubmit, guid, question } = props

  // ** State
  const [count, setCount] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationSchema = yup.object().shape({
    question: yup.string().required().min(3),
    question_type: yup.string().required(),
    difficulty: yup.string().required(),
    marks: yup.string(),
    neg_marks: yup.string(),
    time: yup.string(),
    feedback: yup.string(),
    answer_feedback: yup.string()
  })

  const defaultValues = question

  // ** Hooks
  const { reset, control, handleSubmit, formState: { errors } } = useForm({ defaultValues, resolver: yupResolver(validationSchema) })

  const handleCancel = () => {

  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='question'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  rows={4}
                  multiline
                  label='Question'
                  value={value}
                  onChange={e => (e.target.value)}
                  error={Boolean(errors.question)}
                  aria-describedby='validation-test-details'
                />
              )}
            />
            {errors.question && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-question'>
                {errors.question.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='question-type'>Question Type</InputLabel>
            <Controller
              name='question_type'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  fullWidth
                  value={value}
                  defaultValue=''
                  label='Question Type '
                  labelId='typeLabel'
                  onChange={onChange}
                  selected={value}
                  error={Boolean(errors.question_type)}
                  inputProps={{ placeholder: 'Select Type' }}
                >
                  <MenuItem value='mcmc'>Multi Choice</MenuItem>
                  <MenuItem value='tf'>True / False</MenuItem>
                  <MenuItem value='la'>Long Answer / Essay </MenuItem>
                  <MenuItem value='comp'>Comprehension</MenuItem>
                </Select>
              )}
            />
            {errors.question_type && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-question_type'>
                {errors.question_type.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='question-difficulty'>Difficulty</InputLabel>
            <Controller
              name='difficulty'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  fullWidth
                  value={value}
                  defaultValue='mcmc'
                  label='Difficulty'
                  labelId='typeLabel'
                  onChange={onChange}
                  selected={value}
                  error={Boolean(errors.difficulty)}
                  inputProps={{ placeholder: 'Select Type' }}
                >
                  <MenuItem value='mcmc'>Easy</MenuItem>
                  <MenuItem value='tf'>Medium</MenuItem>
                  <MenuItem value='quiz'>Hard</MenuItem>
                </Select>
              )}
            />
            {errors.difficulty && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-difficulty'>
                {errors.difficulty.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>


        <Grid item xs={12}>
          <Typography xs={{ mb: 4 }}>Answer Choices</Typography>
          <Repeater count={count}>
            {i =>
              <Box sx={{ width: '100%' }} key={i}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <FormControlLabel label='' control={<Checkbox name={`correct_answer[${i}]`} value={1} />} />
                  <FormControl fullWidth sx={{ mb: 6, width: '100%' }} >
                    <Controller
                      name={`choice[${i}]`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          rows={4}
                          multiline
                          {...field}
                          label={`Choice ${i + 1}`}
                          error={Boolean(errors.choice)}
                          aria-describedby='validation-test-details'
                        />
                      )}
                    />
                    {errors.choice && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-choice' >
                        {errors.choice.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Box>
            }
          </Repeater>
          <Button onClick={() => setCount(count + 1)}>Add 1 More Choice</Button>
        </Grid>

        <Divider sx={{ m: '0 !important' }} />


        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Controller
              name='marks'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Marks'
                  onChange={onChange}
                  placeholder='1'
                  error={Boolean(errors.marks)}
                  aria-describedby='validation-schema-title'
                />
              )}
            />
            {errors.marks && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-marks'>
                {errors.marks.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Controller
              name='neg_marks'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Negative Marks'
                  onChange={onChange}
                  placeholder='0'
                  error={Boolean(errors.neg_marks)}
                  aria-describedby='validation-schema-title'
                />
              )}
            />
            {errors.neg_marks && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-neg_marks'>
                {errors.neg_marks.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>


        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <Controller
              name='time'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='Allowed Time (Seconds)'
                  onChange={onChange}
                  placeholder='0'
                  error={Boolean(errors.time)}
                  aria-describedby='validation-schema-title'
                />
              )}
            />
            {errors.marks && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-time'>
                {errors.time.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>


        <Grid item xs={12}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='feedback'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  rows={4}
                  multiline
                  {...field}
                  label='Question Hint'
                  error={Boolean(errors.feedback)}
                  aria-describedby='validation-test-details'
                />
              )}
            />
            {errors.feedback && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-test-feedback'>
                {errors.feedback.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='answer_feedback'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  rows={4}
                  multiline
                  {...field}
                  label='Answer Feedback'
                  error={Boolean(errors.answer_feedback)}
                  aria-describedby='validation-test-answer_feedback'
                />
              )}
            />
            {errors.answer_feedback && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-test-answer_feedback'>
                {errors.answer_feedback.message}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>


        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button size='large' type='submit' variant='contained' disabled={isSubmitting ? true : false}>
            {isSubmitting ? (
              <CircularProgress
                sx={{
                  color: 'common.white',
                  width: '20px !important',
                  height: '20px !important',
                  mr: theme => theme.spacing(2)
                }}
              />
            ) : null}
            Submit
          </Button>
          <Button size='large' variant='outlined' color='secondary' component={Link} href='/qb' sx={{ ml: 3 }}>
            Cancel
          </Button>
        </Grid>


      </Grid>
    </form >
  )
}

export default CreateQuestionForm
