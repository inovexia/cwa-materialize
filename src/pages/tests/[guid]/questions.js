// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router';

// ** MUI Imports
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import toast from 'react-hot-toast'
import PageHeader from 'src/layouts/components/page-header'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Icon Imports
import ViewQuestion from 'src/pages/qb/_views/SingleQuestion'

// ** Actions Imports
import { AddTest, GetCategories } from 'src/pages/tests/_models/TestModel'

const createData = (question, type, difficulty, choices, correct_answer, marks, neg_marks, time) => {
  return {
    question: question,
    type: type,
    difficulty: difficulty,
    choices: choices,
    correct_answer: correct_answer,
    marks: marks,
    neg_marks: neg_marks,
    time: time
  }
}

const Page = props => {

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const router = useRouter();
  const { guid } = router.query;

  const getCategories = useCallback(async () => {
    const response = await GetCategories()

    return response
  }, [])

  useEffect(() => {
    getCategories()
      .then((response) => {
        if (response.success) {
          setCategories(response.payload)
        }
      })
  }, [getCategories])

  const questions = [
    createData(
      'Evidence of psychological testing can be traced back to',
      'mcmc',
      '',
      [
        'Caveman challenging each other to lift heavy stones',
        'Selection of candidates for the Roman senate',
        'Public service examinations in Ancient China',
        'Hammurbi code of civil law',
      ],
      [
        1,
        0,
        0,
        0
      ],
      '1',
      '0',
      '0'
    ),
    createData(
      'Evidence of psychological testing can be traced back to',
      'mcmc',
      '',
      [
        'Caveman challenging each other to lift heavy stones',
        'Selection of candidates for the Roman senate',
        'Public service examinations in Ancient China',
        'Hammurbi code of civil law',
      ],
      [
        1,
        0,
        0,
        0
      ],
      '1',
      '0',
      '0'
    ),
  ]


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Manage Test</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
          buttonTitle='Add Question'
          buttonHref={`/tests/${guid}/add_question`}
        />
      </Grid>
      <Grid item xs={12} md={12}>

        <Card>
          <CardContent>
            {questions && questions.length > 0 && questions.map((row, i) =>
            (
              <>
                <ViewQuestion
                  key={i}
                  count={i + 1}
                  question={row}
                />
                <Divider />
              </>
            )
            )}
          </CardContent>
        </Card>

      </Grid>
    </Grid>

  )
}

export default Page
