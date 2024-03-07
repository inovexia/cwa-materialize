// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Divider, CircularProgress } from '@mui/material'
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
import ViewQuestion from 'src/pages/courses/_views/outline/tests/Questions/viewQuestion'

// ** Actions Imports
import { AddTest, GetCategories } from 'src/pages/tests/_models/TestModel'
import CourseApi from 'src/pages/courses/_components/Apis'

const Page = props => {
  const router = useRouter()
  const { guid, testGuid } = router.query

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [dataList, setDataList] = useState([])

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


  // Get all Questions
  useEffect(() => {
    if (testGuid) {
      const fetchData = async () => {
        const res = await CourseApi.getAllQuestions({ guid: testGuid })
        setDataList(res && res.payload)
        setLoading(false)
      }
      fetchData()
    }

  }, [testGuid])

  console.log(dataList)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Questions</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
          buttonTitle='Add Question'
          buttonHref={`/courses/${guid}/test/${testGuid}/add_question`}
        />
      </Grid>
      <Grid item xs={12} md={12}>

        <Card>
          {
            isLoading ? (<Box fullWidth className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
              <CircularProgress />
            </Box>) : (<CardContent>
              {dataList && dataList.length > 0 ? (dataList && dataList.length > 0 && dataList.map((row, i) =>
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
              )) : "Questions not found!"}

            </CardContent>)
          }

        </Card>

      </Grid>
    </Grid>

  )
}

export default Page
