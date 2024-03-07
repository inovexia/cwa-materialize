import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, Typography } from '@mui/material'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import { GetCategories } from 'src/pages/tests/_models/TestModel'
import CreateForm from 'src/pages/courses/_views/outline/tests/create'


const Page = () => {
  const router = useRouter()
  const { guid } = router.query

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

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Create Test</Typography>}
            buttonTitle='Back'
            buttonHref={`/courses/${guid}/manage`}
          />
          <Card sx={{ marginTop: "20px", padding: "20px" }}>
            <CreateForm categories={categories} />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Page
