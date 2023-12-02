import React, { useEffect, useState, useRef } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography } from '@mui/material'

// ** Core Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import TestList from 'src/pages/tests/_views/index'
import TestApis from 'src/pages/tests/_components/apis'
import CreateDrawer from 'src/pages/tests/_views/createDrawer'
import Toolbar from 'src/pages/tests/_components/toolbar'

const Page = () => {
  const [dataList, setDataList] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  // view all listing Using API
  const getTests = useRef(async () => {
    const response = await TestApis.getAllTests()
    if (response.success === true) {
      setDataList(response.payload.data)
    }
    setResponseStatus(response.status)
    setResponseMessage(response.message)
  })
  useEffect(() => {
    getTests.current()
  }, [])

  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Tests</Typography>}
          subtitle={<Typography variant='body2'>List all tests</Typography>}
          toggleDrawer={toggleCreateDrawer}
          buttonTitle='Add Test'
        />
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Toolbar />
          </CardContent>
          <TestList data={dataList} responseStatus={responseStatus} responseMessage={responseMessage} />
        </Card>
      </Grid>
      <CreateDrawer open={drawerOpen} toggle={toggleCreateDrawer} />
    </Grid>
  )
}

export default Page
