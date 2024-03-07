import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import EnrolList from 'src/pages/courses/_views/outline/enrolment'
import QuickAddEnrol from 'src/pages/courses/enrolment/quickaddenrol'
import Toolbar from 'src/pages/courses/_components/Outline/enrolment/Toolbar'

// ** Course API
import CourseApi from 'src/pages/courses/_components/Apis'




const Page = () => {
  const { query: { guid } } = useRouter()
  const [currentPage, setCurrentPage] = useState('1')
  const [itemPerPage, setItemPerPage] = useState('10')
  const [checkedIds, setCheckedIds] = useState([])
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState(undefined)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const [loader, setLoader] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [orderFilter, setOrderFilter] = useState('')
  const [bulkAction, setBulkAction] = useState('')
  const doReload = () => setReload(r => r + 1)

  const [isLoading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [orderBy, setOrderBy] = useState('')

  // Get All Enrolled Users
  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseApi.enrolledUsers(guid)
      if (!res.success) return
      setLoading(false)
      setDataList(res && res.payload)
      setResponseMessage(res.message)
    }
    fetchData()
  }, [guid])

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
    setOrderBy(value)
  }, [])

  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Enrolment</Typography>}
            subtitle={<Typography variant='body2'>List all Enrolment</Typography>}
            buttonHref='./enroll'
            buttonTitle='Enrol Users'
            setReload={setReload}
            doReload={doReload}
          />
          <Card style={{ marginTop: "20px" }}>
            {isLoading ?
              (
                <Box fullWidth className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
                  <CircularProgress />
                </Box>) :
              (<form>
                <CardContent>
                  <Toolbar
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    status={status}
                    handleStatus={handleStatus}
                    orderBy={orderBy}
                    handleType={handleType}
                  />
                </CardContent>
                <EnrolList
                  rows={dataList}
                  dataList={dataList}
                  responseStatus={responseStatus}
                  responseMessage={responseMessage}
                  doReload={doReload}
                />
              </form>)}
          </Card>
        </Grid>
      </Grid>
      <QuickAddEnrol
        open={drawerOpen}
        toggle={toggleCreateDrawer}
        setReload={setReload}
        reload={reload}
        doReload={doReload}
      />
    </>
  )
}

export default Page
