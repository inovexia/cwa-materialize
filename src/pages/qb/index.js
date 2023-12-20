import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress, Divider } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import SingleQuestion from 'src/pages/qb/_views/singleQuestion'

//import CreateQuestion from 'src/pages/qb/create'
import Toolbar from 'src/pages/qb/_components/Toolbar'

// ** Actions Imports
import { ListQuestions } from 'src/pages/qb/_models/QuestionModel'


const Page = () => {
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')

  /** GET ALL TESTS */
  const getTests = useCallback(async (searchTerm, status, type) => {
    const data = {
    }
    if (status !== "")
      data['status'] = status

    if (searchTerm !== "")
      data['search'] = searchTerm

    if (type !== "")
      data['test_type'] = type

    const response = await ListQuestions(data)

    return response
  }, [])

  useEffect(() => {
    getTests(searchTerm, status, type)
      .then((response) => {
        if (response.success === true) {
          setDataList(response.payload.data)
          setMetaData(response.payload.meta)
          setLoading(false)
        } else {
          toast.error(response.message)
        }
      })
  }, [getTests, searchTerm, status, type])


  /** HANDLE SEARCH */
  const handleSearch = useCallback(value => {
    setSearchTerm(value)
  }, [])

  /** HANDLE STATUS CHANGE */
  const handleStatus = useCallback(value => {
    setStatus(value)
  }, [])

  /** HANDLE TEST_TYPE CHANGE */
  const handleType = useCallback(value => {
    setType(value)
  }, [])

  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Question Bank</Typography>}
            subtitle={<Typography variant='body2'>List All Questions</Typography>}
            buttonTitle='Add Question'
            buttonHref='/qb/create'
          />
          <Card>
            {isLoading ?
              (<CircularProgress />) :
              (<form>
                <CardContent>
                  <Toolbar
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    status={status}
                    handleStatus={handleStatus}
                    type={type}
                    handleType={handleType}
                  />
                </CardContent>
                <Card>
                  <CardContent>
                    {dataList && dataList.length > 0 && dataList.map((row, i) =>
                    (
                      <>
                        <SingleQuestion
                          key={i}
                          count={i + 1}
                          question={row}
                          responseStatus={responseStatus}
                          responseMessage={responseMessage}
                          meta={metaData}
                        />
                        <Divider />
                      </>
                    )
                    )}
                  </CardContent>
                </Card>

              </form>)}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Page
