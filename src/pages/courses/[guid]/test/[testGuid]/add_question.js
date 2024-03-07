// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import toast from 'react-hot-toast'
import PageHeader from 'src/layouts/components/page-header'


// ** Icon Imports
import CreateQuestionForm from 'src/pages/courses/_views/outline/tests/Questions/CreateQuestionForm'

// ** Actions Imports
import { GetCategories } from 'src/pages/tests/_models/TestModel'
import { createQuestion } from 'src/pages/courses/_models/TestModel'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))


const Page = props => {
  const router = useRouter()
  const { guid, testGuid } = router.query

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
    console.log(data)
    setLoading(true)
    const response = await createQuestion({ guid: testGuid, data })
    setLoading(false)
    if (response.success === true) {
      toast.success(response.message)
      router.reload();
    } else {
      toggle()
      toast.error(response.message)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Add Question</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
          buttonTitle='Cancel'
          buttonHref={`/courses/${guid}/tests/${testGuid}/manage`}
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
