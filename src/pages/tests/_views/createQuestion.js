import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Select from '@mui/material/Select'
import toast from 'react-hot-toast'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import Repeater from 'src/@core/components/repeater'
import { Box, Checkbox, Divider, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import * as yup from 'yup'
import { ViewQuestion, AddQuestion, EditQuestion } from 'src/pages/tests/_models/QestionModel'

const validationSchema = yup.object().shape({
  question: yup.string().required().min(3),
  question_type: yup.string().required(),
  difficulty: yup.string().required(),
  marks: yup.number().integer().required(),
  neg_marks: yup.number().integer().required(),
  time: yup.number().integer().required(),
  feedback: yup.string(),
  answer_feedback: yup.string(),
  choices: yup.array().of(
    yup.object().shape({
      choice: yup.string().required(),
      correct_answer: yup.boolean().required()
    })
  ).min(2) // Ensure at least two choices are provided
})

const defaultValues = {
  question: '',
  question_type: 'mcmc',
  difficulty: '',
  marks: '1',
  neg_marks: '0',
  time: '0',
  feedback: '',
  answer_feedback: '',
  choices: [
    { choice: '', correct_answer: false },
    { choice: '', correct_answer: false }
  ]
}

const CreateQuestionForm = (props) => {
  const router = useRouter()
  const { guid } = router.query
  const { Qid } = props
  const [count, setCount] = useState(2) // Start with 2 choices by default
  const [isLoading, setLoading] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [questionType, setQuestionType] = useState(defaultValues.question_type)

  const { reset, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    const fetchData = async () => {
      if (Qid) {
        setLoading(true)
        const response = await ViewQuestion({ guid: Qid })
        setLoading(false)
        if (response.success === false) {
          toast.error(response.message)
        }
        const payload = response.payload
        payload.choices = payload.choices.map(choice => ({
          ...choice,
          correct_answer: choice.correct_answer ? true : false
        }))
        reset(payload)
        setQuestionType(payload.question_type)
        setCount(payload.question_type === 'tf' ? 2 : payload.choices.length)
      }
    }
    fetchData()
  }, [Qid, reset])

  const handleQuestionTypeChange = (e) => {
    const value = e.target.value
    setQuestionType(value)
    if (value === 'tf') {
      setCount(2)
      reset({ ...defaultValues, question_type: value, choices: [{ choice: 'True', correct_answer: false }, { choice: 'False', correct_answer: false }] })
    } else {
      setCount(3) // Default to 3 choices for other types
      reset({ ...defaultValues, question_type: value })
    }
  }

  const handleFormSubmit = async (data) => {
    setSubmitting(true)
    data.choices = data.choices.map(choice => ({
      ...choice,
      correct_answer: choice.correct_answer ? 1 : 0
    }))

    if (Qid) {
      await EditQuestion({ guid: Qid, data })
        .then(response => {
          setSubmitting(false)
          if (response.success === true) {
            toast.success(response.message)
          } else {
            toast.error(response.message)
          }
        })
    } else {
      await AddQuestion(guid, data)
        .then(response => {
          setSubmitting(false)
          if (response.success === true) {
            toast.success(response.message)
          } else {
            toast.error(response.message)
          }
        })
    }
  }

  return (
    <>
      {
        isLoading ?
          (<Box className="loader" style={{ textAlign: "center", padding: "50px 0px" }} >
            <CircularProgress />
          </Box >) :
          (
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                      name='question'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          rows={4}
                          multiline
                          label='Question'
                          {...field}
                          error={Boolean(errors.question)}
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
                    <InputLabel>Question Type</InputLabel>
                    <Controller
                      name='question_type'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          fullWidth
                          label='Question Type'
                          {...field}
                          value={questionType}
                          onChange={handleQuestionTypeChange}
                          error={Boolean(errors.question_type)}
                          inputProps={{ placeholder: 'Select Type' }}
                        >
                          <MenuItem value='mcmc'>Multi Choice</MenuItem>
                          <MenuItem value='tf'>True / False</MenuItem>
                          <MenuItem value='la'>Long Answer / Essay</MenuItem>
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
                    <InputLabel>Difficulty</InputLabel>
                    <Controller
                      name='difficulty'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          fullWidth
                          label='Difficulty'
                          {...field}
                          error={Boolean(errors.difficulty)}
                          inputProps={{ placeholder: 'Select Type' }}
                        >
                          <MenuItem value='easy'>Easy</MenuItem>
                          <MenuItem value='medium'>Medium</MenuItem>
                          <MenuItem value='hard'>Hard</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.difficulty && (
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {errors.difficulty.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography xs={{ mb: 4 }}>Answer Choices</Typography>
                  {questionType === 'tf' ? (
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="true-false"
                        name="true-false-options"
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="True"
                          checked={watch('choices[0].correct_answer')}
                          onChange={() => reset({ ...watch(), choices: [{ choice: 'True', correct_answer: true }, { choice: 'False', correct_answer: false }] })}
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="False"
                          checked={watch('choices[1].correct_answer')}
                          onChange={() => reset({ ...watch(), choices: [{ choice: 'True', correct_answer: false }, { choice: 'False', correct_answer: true }] })}
                        />
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    <Repeater count={count}>
                      {i =>
                        <Box sx={{ width: '100%' }} key={i}>
                          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Controller
                              name={`choices[${i}].correct_answer`}
                              control={control}
                              render={({ field }) => <Checkbox {...field} />}
                            />

                            <FormControl fullWidth sx={{ mb: 6, width: '100%' }} >
                              <Controller
                                name={`choices[${i}].choice`}
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                  <TextField
                                    rows={4}
                                    multiline
                                    {...field}
                                    label={`Choice ${i + 1}`}
                                    error={Boolean(errors?.choices?.[i]?.choice)}
                                    aria-describedby='validation-test-details'
                                  />
                                )}
                              />
                              {errors?.choices?.[i]?.choice && (
                                <FormHelperText sx={{ color: 'error.main' }} id='validation-choice' >
                                  {errors.choices[i].choice.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Box>
                        </Box>
                      }
                    </Repeater>
                  )}
                  {questionType !== 'tf' && (
                    <Button onClick={() => setCount(count + 1)}>Add 1 More Choice</Button>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                      name='marks'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          type='number'
                          label='Marks'
                          {...field}
                          error={Boolean(errors.marks)}
                          aria-describedby='validation-marks'
                        />
                      )}
                    />
                    {errors.marks && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-marks'>
                        {errors.marks.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                      name='neg_marks'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          type='number'
                          label='Negative Marks'
                          {...field}
                          error={Boolean(errors.neg_marks)}
                          aria-describedby='validation-neg_marks'
                        />
                      )}
                    />
                    {errors.neg_marks && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-neg_marks'>
                        {errors.neg_marks.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                      name='time'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          type='number'
                          label='Time (seconds)'
                          {...field}
                          error={Boolean(errors.time)}
                          aria-describedby='validation-time'
                        />
                      )}
                    />
                    {errors.time && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-time'>
                        {errors.time.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ mt: 0, mb: 6 }} />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 6 }}>
                    <Controller
                      name='feedback'
                      control={control}
                      render={({ field }) => (
                        <TextField
                          rows={4}
                          multiline
                          label='Feedback'
                          {...field}
                          error={Boolean(errors.feedback)}
                          aria-describedby='validation-feedback'
                        />
                      )}
                    />
                    {errors.feedback && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-feedback'>
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
                      render={({ field }) => (
                        <TextField
                          rows={4}
                          multiline
                          label='Answer Feedback'
                          {...field}
                          error={Boolean(errors.answer_feedback)}
                          aria-describedby='validation-answer_feedback'
                        />
                      )}
                    />
                    {errors.answer_feedback && (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-answer_feedback'>
                        {errors.answer_feedback.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button size='large' type='submit' variant='contained' disabled={isSubmitting}>
                    {Qid ? 'Update' : 'Create'}
                  </Button>
                  <Link href='/tests/questions' passHref>
                    <Button size='large' type='button' variant='outlined' sx={{ ml: 2 }}>
                      Cancel
                    </Button>
                  </Link>
                </Grid>

              </Grid>
            </form>
          )
      }
    </>
  )
}

export default CreateQuestionForm
