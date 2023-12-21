// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** View Imports
import CreateQuestionForm from 'src/pages/qb/_views/createQuestion'

// ** Actions Imports
import { ViewQuestion, GetCategories, EditQuestion } from 'src/pages/qb/_models/QuestionModel'

import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

const Page = () => {

  const router = useRouter()
  const { guid } = router.query

  // ** State
  const [isLoading, setLoading] = useState(false)
  const [question, setQuestion] = useState([])
  const [categories, setCategories] = useState([])

  /** FETCH QUESTION  */
  useEffect(() => {
    const getQuestion = async () => {
      const response = await ViewQuestion(guid)
      setLoading(false)
      if (!response.success) {
        toast.error(response.message)
      }
      setQuestion(response.payload.data)
    }
    getQuestion()
  }, [])

  console.log(question)


  /** SAVE QUESTION  */
  const onSubmit = async (data) => {
    setLoading(true)
    await EditQuestion(guid, data)
      .then(response => {
        if (response.success === true) {
          toast.success(response.message)
        } else {
          toast.error(response.message)
        }
      })
    setLoading(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Edit Question</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            {isLoading ?
              (<Box className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
                <CircularProgress />
              </Box>) :
              (<CreateQuestionForm
                onSubmit={onSubmit}
                guid={guid}
                question={question}
              />)}
          </CardContent>
        </Card>

      </Grid>
    </Grid>

  )
}

export default Page
