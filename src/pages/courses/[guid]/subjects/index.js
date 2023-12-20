import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardContent, Box, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import SubjectList from 'src/pages/courses/_views/outline/subjects'
import CreateSubject from 'src/pages/courses/[guid]/subjects/createDrawer'
import Toolbar from 'src/pages/courses/_components/Outline/subjects/Toolbar'

// ** Course API
import CourseApi from 'src/pages/courses/_components/Apis'




const Page = () => {
  const router = useRouter()
  const { guid } = router.query
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState(undefined)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const doReload = () => setReload(r => r + 1)

  const [isLoading, setLoading] = useState(true)


  /** HANDLE SEARCH */
  const handleSearch = useCallback(value => {
    setSearchTerm(value)
  }, [])


  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)


  //** GET ALL SUBJECT OF CURRENT COURSE */
  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseApi.getSubjects(guid);
      if (!res.success) return
      const searchTermLower = searchTerm.toLowerCase();
      // Filter subjects based on the case-insensitive search term
      const filteredSubjects = res.payload.data.filter(subject =>
        subject.title.toLowerCase().includes(searchTermLower) ||
        subject.description.toLowerCase().includes(searchTermLower)
      );

      setDataList(filteredSubjects);
      setMetaData(res.payload.meta);
      setResponseStatus(res.status);
      setResponseMessage(res.message);
      setLoading(false);
    };


    fetchData();
  }, [guid, searchTerm]);

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
                  //status={status}
                  //handleStatus={handleStatus}
                  //orderBy={orderBy}
                  //handleType={handleType}
                  />
                </CardContent>
                <SubjectList
                  rows={dataList && dataList}
                  responseStatus={responseStatus}
                  responseMessage={responseMessage}
                  meta={metaData}
                  doReload={doReload}
                  guid={guid}
                  dataList={dataList}
                  setDataList={setDataList}
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
        guid={guid}
      />
    </>
  )
}

export default Page
