import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, CardContent, Box, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import TestList from 'src/pages/courses/_views/outline/tests'
import CreateTest from 'src/pages/courses/_views/outline/tests/createTest'
import Toolbar from 'src/pages/tests/_components/toolbar'

// ** Actions Imports
import { ListTests } from 'src/pages/courses/_models/TestModel'


const Page = () => {
  const router = useRouter()
  const { guid } = router.query
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [editId, setEditId] = useState('')
  const [reload, setReload] = useState(0)
  const doReload = () => setReload(r => r + 1)

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

    const response = await ListTests({ guid, data })

    return response
  }, [guid])

  useEffect(() => {
    getTests(searchTerm, status, type)
      .then((response) => {
        if (!response.success) return
        setDataList(response.payload.data)
        setMetaData(response.payload.meta)
        setLoading(false)

      })
  }, [getTests, searchTerm, status, type, isLoading, reload])


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
          <Card sx={{ marginTop: "20px" }}>
            {isLoading ?
              (<Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: "30px 0px"
              }}><CircularProgress /></Box>) :
              (<form>
                <CardContent>
                  <Toolbar
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    status={status}
                    handleStatus={handleStatus}
                    type={type}
                    handleType={handleType}
                    doReload={doReload}
                  />
                </CardContent>
                {dataList.length !== 0 ? (<TestList
                  rows={dataList}
                  responseStatus={responseStatus}
                  responseMessage={responseMessage}
                  meta={metaData}
                  doReload={doReload}
                  guid={guid}
                  toggleCreateDrawer={toggleCreateDrawer}
                  setEditId={setEditId}
                />) : (<Box><Typography component="p" sx={{ padding: "25px" }}>Test not found!</Typography></Box>)}

              </form>)}
          </Card>
        </Grid>
      </Grid>
      <CreateTest
        open={drawerOpen}
        toggle={toggleCreateDrawer}
        guid={guid}
        doReload={doReload}
        editId={editId}
      />
    </>
  )
}

export default Page
