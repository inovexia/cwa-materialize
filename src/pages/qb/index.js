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
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')

  /** GET ALL TESTS */
  useEffect(() => {
    const getQuestions = async () => {
      const data = {
      }
      if (status !== "")
        data['status'] = status

      if (searchTerm !== "")
        data['search'] = searchTerm

      if (type !== "")
        data['test_type'] = type

      const response = await ListQuestions(data)
      setLoading(false)
      if (!response.success) {
        toast.error(response.message)
      }
      setDataList(response.payload.data)
      setMetaData(response.payload.meta)
    }
    getQuestions()
  }, [searchTerm, status, type])


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
              (<Box fullWidth className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
                <CircularProgress />
              </Box>) :
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
