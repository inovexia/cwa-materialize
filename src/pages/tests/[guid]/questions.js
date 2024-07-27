// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router';

// ** MUI Imports
import { Divider, CircularProgress, Alert } from '@mui/material'
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
//import ViewQuestion from 'src/pages/qb/_views/SingleQuestion'
import ViewQuestion from 'src/pages/tests/_views/singleQuestion'
import EnhancedTable from "src/pages/tests/_views/listQuestions"

// ** Actions Imports
import { AddTest, GetCategories } from 'src/pages/tests/_models/TestModel'

// API import
import TestApis from 'src/pages/tests/_components/apis';

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
  const [isLoading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const router = useRouter();
  const { guid } = router.query;
  const [data, setData] = useState(null);

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



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (guid) {
          const res = await TestApis.testQuestions({ guid });
          if (res.success) {
            setLoading(false)
            setData(res.payload);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [guid]);



  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>All Questions</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
          buttonTitle='Add Question'
          buttonHref={`/tests/${guid}/add_question`}
          buttonTitle2='Back'
          buttonHref2={`/tests`}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
          {isLoading ?
            (<Box fullWidth className="loader" style={{ textAlign: "center", padding: "50px 0px" }}><CircularProgress /></Box>) : <CardContent>
              {data && data.length > 0 ?
                data.map((row, i) =>
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
                )
                : <Alert severity="info">Question not found in this test!</Alert>}

            </CardContent>}

        </Card>

      </Grid>
    </Grid>

  )
}

export default Page
