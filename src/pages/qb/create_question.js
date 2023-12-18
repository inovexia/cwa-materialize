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
import { AddQuestion, GetCategories } from 'src/pages/qb/_models/QuestionModel'


const Page = props => {

  // ** Props
  const { open, toggle } = props

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

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


  const onSubmit = async (data) => {
    setLoading(true)
    const response = await AddTest(data)
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
          title={<Typography variant='h5'>Create New Question</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <CreateQuestionForm
              onSubmit={onSubmit}
              isLoading={isLoading}
              toggle={toggle}
              categories={categories}
            />
          </CardContent>
        </Card>

      </Grid>
    </Grid>

  )
}

export default Page
