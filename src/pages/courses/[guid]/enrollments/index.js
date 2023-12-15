import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import SubjectList from 'src/pages/courses/_views/subjects'
import CreateSubject from 'src/pages/courses/[guid]/subjects/create'
import Toolbar from 'src/pages/courses/_components/subjects/Toolbar'

// ** Actions Imports
import { ListCourses } from 'src/pages/courses/_models/CourseModel'

// ** Course API
import CourseApi from 'src/pages/courses/_components/Apis'




const Enrollments = () => {
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
    const res = await CourseApi.filterCourse(formData)
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
  const getCourses = useCallback(async (searchTerm, status, orderBy) => {
    const data = {
    }
    if (status !== "")
      data['status'] = status

    if (searchTerm !== "")
      data['search'] = searchTerm

    if (orderBy !== "")
      data['order_by'] = orderBy

    const response = await ListCourses(data)

    return response
  }, [])

  useEffect(() => {
    getCourses(searchTerm, status, orderBy)
      .then((response) => {
        if (response.success === true) {
          setDataList(response.payload.data)
          setMetaData(response.payload.meta)
          setLoading(false)
        } else {
          toast.error(response.message)
        }
      })
  }, [getCourses, searchTerm, status, orderBy, isLoading])


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
            title={<Typography variant='h5'>Subjects</Typography>}
            subtitle={<Typography variant='body2'>List all Subjects</Typography>}
            toggleDrawer={toggleCreateDrawer}
            buttonTitle='Add Subject'
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
                <SubjectList
                  rows={dataList}
                  responseStatus={responseStatus}
                  responseMessage={responseMessage}
                  meta={metaData}
                  doReload={doReload}
                />
              </form>)}
          </Card>
        </Grid>
      </Grid>
      <CreateSubject
        open={drawerOpen}
        toggle={toggleCreateDrawer}
        setReload={setReload}
        reload={reload}
        doReload={doReload}
      />
    </>
  )
}

export default Enrollments
