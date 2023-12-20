import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import LessonList from 'src/pages/courses/_views/outline/lessons'
import CreateLesson from 'src/pages/courses/[guid]/subjects/[subjectId]/lesson/createDrawer'
import Toolbar from 'src/pages/courses/_components/Toolbar'

// ** Actions Imports
import { ListLesson } from 'src/pages/courses/_models/LessonModel'

// ** Course API
import CourseApi from 'src/pages/courses/_components/Apis'




const Page = () => {
  const router = useRouter()
  const { subjectId } = router.query
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

  // Get All Courses
  //  Multiple Filter
  const handleFiltersChange = useCallback(async () => {
    setLoader(true)
    const formData = new FormData()
    formData.append('search', searchTerm)
    formData.append('status', status)
    formData.append('order_by', orderBy)
    formData.append('results_per_page', itemPerPage)
    formData.append('page', currentPage)
    setLoader(true)
    const res = await CourseApi.allLesson(formData)
    setLoader(false)
    if (!res.success) return
    setDataList(res.payload.data)
    setMetaData(res.payload.meta)
    setResponseStatus(res.status)
    setResponseMessage(res.message)
  }, [searchTerm, statusFilter, roleFilter, orderFilter, reload, itemPerPage, currentPage])

  useEffect(() => {
    handleFiltersChange()
  }, [handleFiltersChange])


  /** GET ALL TESTS */
  const getLessons = useCallback(async (searchTerm, status, orderBy) => {
    const data = {
    }
    if (status !== "")
      data['status'] = status

    if (searchTerm !== "")
      data['search'] = searchTerm

    if (orderBy !== "")
      data['order_by'] = orderBy

    const response = await ListLesson({ subjectId, data })
    return response


  }, [])

  useEffect(() => {
    getLessons(searchTerm, status, orderBy)
      .then((response) => {
        if (response.success === true) {
          setDataList(response.payload.data)
          setMetaData(response.payload.meta)
          setLoading(false)
        } else {
          toast.error(response.message)
        }
      })
  }, [getLessons, searchTerm, status, orderBy, isLoading])


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
            title={<Typography variant='h5'>Lessons</Typography>}
            subtitle={<Typography variant='body2'>List all Lessons</Typography>}
            toggleDrawer={toggleCreateDrawer}
            buttonTitle='Add Lesson'
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
                <LessonList
                  rows={dataList}
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
      <CreateLesson
        open={drawerOpen}
        toggle={toggleCreateDrawer}
        setReload={setReload}
        reload={reload}
        doReload={doReload}
        subjectId={subjectId}
      />
    </>
  )
}

export default Page
