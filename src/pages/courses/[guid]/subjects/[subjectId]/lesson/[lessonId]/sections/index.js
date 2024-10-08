import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardContent, Box, Typography, CircularProgress, List, ListItem } from '@mui/material'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import SectionList from 'src/pages/courses/_views/outline/sections'
import Toolbar from 'src/pages/courses/_components/Outline/sections/Toolbar'

// ** Course API
import CourseApi from 'src/pages/courses/_components/Apis'
import { LessonPreview } from 'src/pages/courses/_models/LessonModel'
import Icon from 'src/@core/components/icon'




const Page = () => {
  const { query: { guid, subjectId, lessonId } } = useRouter()
  const [currentPage, setCurrentPage] = useState('1')
  const [itemPerPage, setItemPerPage] = useState('10')
  const [checkedIds, setCheckedIds] = useState([])
  const [dataList, setDataList] = useState([])
  const [currentLesson, setCurrentLesson] = useState([])
  const [metaData, setMetaData] = useState(undefined)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const [loader, setLoader] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const doReload = () => setReload(r => r + 1)

  const [isLoading, setLoading] = useState(true)

  /** Get Current Lesson Details */
  useEffect(() => {
    const fetchData = async () => {
      const response = await LessonPreview(lessonId)
      setCurrentLesson(response.payload)
    }
    fetchData()
  }, [lessonId])

  //** GET ALL SECTIONS OF CURRENT LESSON */
  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseApi.allSections(lessonId)
      if (!res.success) return setLoader(false)
      setLoading(false)
      const searchTermLower = searchTerm.toLowerCase();

      const filteredSection = res.payload.filter(lesson =>
        lesson.title.toLowerCase().includes(searchTermLower)
      );
      setDataList(filteredSection)
      setResponseMessage(res.message)

    };

    fetchData();
  }, [lessonId, searchTerm]);


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
            title={<Typography variant='h5'>{currentLesson && currentLesson.title}</Typography>}
            subtitle={<Typography variant='body2'>{ReactHtmlParser(currentLesson && currentLesson.description)}</Typography>}
            buttonHref={`/courses/${guid}/subjects/${subjectId}/lesson/${lessonId}/sections/create`}
            buttonTitle='Add Section'
            buttonHref2={`/courses/${guid}/subjects/${subjectId}/lesson`}
            buttonTitle2='Back'
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
                  />
                </CardContent>
                <SectionList
                  rows={dataList}
                  responseStatus={responseStatus}
                  responseMessage={responseMessage}
                  meta={metaData}
                  doReload={doReload}
                  guid={guid}
                  subjectId={subjectId}
                  lessonId={lessonId}
                />
              </form>)}
          </Card>
        </Grid>
      </Grid>
      {/* <CreateSection
        open={drawerOpen}
        toggle={toggleCreateDrawer}
        setReload={setReload}
        reload={reload}
        doReload={doReload}
      /> */}
    </>
  )
}

export default Page
