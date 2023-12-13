import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography,CircularProgress  } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import CourseList from 'src/pages/courses/_views'
import CreateTest from 'src/pages/courses/create'
import Toolbar from 'src/pages/courses/_components/Toolbar'

// ** Actions Imports
import { ListTests } from 'src/pages/tests/_models/TestModel'




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

    const response = await ListTests(data)

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
        toast.error (response.message)
      }
    })
  }, [getTests, searchTerm, status, type, isLoading])


  /** HANDLE SEARCH */
  const handleSearch = useCallback(value => {
    setSearchTerm (value)
  }, [])

  /** HANDLE STATUS CHANGE */
  const handleStatus = useCallback(value => {
    setStatus (value)
  }, [])

  /** HANDLE TEST_TYPE CHANGE */
  const handleType = useCallback(value => {
    setType (value)
  }, [])

  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Courses</Typography>}
            subtitle={<Typography variant='body2'>List all Courses</Typography>}
            toggleDrawer={toggleCreateDrawer}
            buttonTitle='Add Course'
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
              <CourseList
                rows={dataList}
                responseStatus={responseStatus}
                responseMessage={responseMessage}
                meta={metaData}
              />
            </form>)}
          </Card>
        </Grid>
      </Grid>
      <CreateTest
        open={drawerOpen}
        toggle={toggleCreateDrawer}
      />
    </>
  )
}

export default Page
