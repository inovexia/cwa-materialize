import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import LessonList from 'src/pages/courses/_views/outline/lessons'
import CreateLesson from 'src/pages/courses/[guid]/subjects/[subjectId]/lesson/createDrawer'
import Toolbar from 'src/pages/courses/_components/Outline/lessons/Toolbar'

// ** Course API
import CourseApi from 'src/pages/courses/_components/Apis'

const Page = () => {
  const { query: { guid, subjectId } } = useRouter()
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState(undefined)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const [loader, setLoader] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const doReload = () => setReload(r => r + 1)
  /** HANDLE SEARCH */
  const handleSearch = useCallback(value => {
    setSearchTerm(value)
  }, [])


  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  //** GET ALL LESSON OF CURRENT SUBJECT */
  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseApi.allLesson(subjectId)
      if (!res.success) return setLoader(false)
      setLoader(false)
      const searchTermLower = searchTerm.toLowerCase();
      // Filter subjects based on the case-insensitive search term
      const filteredLesson = res.payload.data.filter(lesson =>
        lesson.title.toLowerCase().includes(searchTermLower) ||
        lesson.description.toLowerCase().includes(searchTermLower)
      );
      setDataList(filteredLesson)
      setResponseMessage(res.message)

    };
    fetchData();
  }, [subjectId, searchTerm, reload]);
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
            {loader ?
              (
                <Box fullWidth className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
                  <CircularProgress />
                </Box>) :
              (<form>
                <CardContent>
                  <Toolbar
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                  //status={status}
                  //handleStatus={handleStatus}
                  //orderBy={orderBy}
                  //handleType={handleType}
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
