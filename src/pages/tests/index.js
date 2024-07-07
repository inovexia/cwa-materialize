import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import TestList from 'src/pages/tests/_views'
import CreateTest from 'src/pages/tests/create_test'
import Toolbar from 'src/pages/tests/_components/toolbar'

// ** Actions Imports
import { ListTests } from 'src/pages/tests/_models/TestModel'


const UserList = () => {
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
          toast.error(response.message)
        }
      })
  }, [getTests, searchTerm, status, type, isLoading])


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
            title={<Typography variant='h5'>Tests</Typography>}
            subtitle={<Typography variant='body2'>List all tests</Typography>}
            toggleDrawer={toggleCreateDrawer}
            buttonTitle='Add Test'
          />
          <Card>
            {isLoading ?
              (<Box fullWidth className="loader" style={{ textAlign: "center", padding: "50px 0px" }}><CircularProgress /></Box>) :
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
                <TestList
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

export default UserList
