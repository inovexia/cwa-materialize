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

const Page = props => {

  const router = useRouter()
  const { guid } = router.query

  // ** Props
  const { open, toggle } = props

  // ** State
  const [isLoading, setLoading] = useState(true)
  const [question, setQuestion] = useState([])
  const [categories, setCategories] = useState([])

  /** FETCH QUESTION  */
  useEffect(() => {
    const fetchData = async () => {
      const response = await ViewQuestion(guid)
      if (response.success) {
        setQuestion(response.payload)
      }
      setLoading(false)
    }
    fetchData()
  }, [guid])

  /*   const ques = useCallback(async () => {
      const response = await ViewQuestion(`${guid}`)

      return response
    }, [])

    useEffect(() => {
      ques()
        .then((response) => {
          if (response.success) {
            setQuestion(response.payload)
          }
        })
        .then(setLoading(false))
    }, [ques, question])


   */  /** SAVE QUESTION  */
  const onSubmit = async (data) => {
    setLoading(true)
    const response = await EditQuestion(guid, data)
    setLoading(false)
    if (response.success === true) {
      toast.success(response.message)
    } else {
      toggle()
      toast.error(response.message)
    }
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
              ('Loading') :
              (<CreateQuestionForm
                onSubmit={onSubmit}
                isLoading={isLoading}
                data={question}
              />)}
          </CardContent>
        </Card>

      </Grid>
    </Grid>

  )
}

export default Page
