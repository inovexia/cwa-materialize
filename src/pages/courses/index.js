import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { useDebounce } from "@uidotdev/usehooks";

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import CourseList from 'src/pages/courses/_views'
import CreateTest from 'src/pages/courses/_views/create'
import Toolbar from 'src/pages/courses/_components/Toolbar'

// ** Actions Imports
import { ListCourses } from 'src/pages/courses/_models/CourseModel'

// ** Course API
import CourseApi from 'src/pages/courses/_components/Apis'




const Page = () => {
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
  const defSearchTerm = useDebounce(searchTerm, 300);
  const doReload = () => setReload(r => r + 1)

  const [isLoading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [orderBy, setOrderBy] = useState('')


  /** GET ALL COURSES */
  const getCourses = useCallback(async () => {
    const data = {
      ...(status !== "" ? { status } : {}),
      ...(defSearchTerm !== "" ? { search: defSearchTerm } : {}),
      ...(orderBy !== "" ? { order_by: orderBy } : {})
    }
    setLoading(true)
    const response = await ListCourses(data)
    setLoading(false)
    if (!response.success) return toast.error(response.message)
    setDataList(response.payload.data)
    setMetaData(response.payload.meta)
  }, [defSearchTerm, status, orderBy, reload])

  useEffect(() => {
    getCourses()
  }, [getCourses])


  /** HANDLE SEARCH */
  const handleSearch = (value) => setSearchTerm(value)
  /** HANDLE STATUS CHANGE */
  const handleStatus = (value) => setStatus(value)
  /** HANDLE TEST_TYPE CHANGE */
  const handleType = (value) => setOrderBy(value)
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
                <CourseList
                  dataList={dataList}
                  setDataList={setDataList}
                  responseStatus={responseStatus}
                  responseMessage={responseMessage}
                  meta={metaData}
                  doReload={doReload}
                />
              </form>)}
          </Card>
        </Grid>
      </Grid>
      <CreateTest
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
