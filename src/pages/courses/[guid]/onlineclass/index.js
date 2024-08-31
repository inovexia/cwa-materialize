import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, CardContent, Box, Typography, CardHeader, Link, CircularProgress, Divider, Button } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import OnlineClassList from 'src/pages/onlineclass/_views/OnlineClassList'
// import CreateOnlineClass from 'src/pages/onlineclass/_views/CreateOnlineClass'
import CreateOnlineClass from 'src/pages/onlineclass/_views/createOnlineClass'

// ** Actions Imports
import { GetOnlineClassInCourse } from 'src/pages/courses/_models/OnlineClassModel'

const Page = () => {
  const router = useRouter()
  const { guid } = router.query
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  /** GET ALL Online Class */
  useEffect(() => {
    const fetchData = async () => {
      if (guid) {
        setLoading(true)
        const response = await GetOnlineClassInCourse(guid)
        setLoading(false)
        if (!response.success) {
          toast.error(response.message)
        }
        setDataList(response.payload.data)
        setMetaData(response.payload.meta)
      }
    }
    fetchData()
  }, [guid])


  /** HANDLE SEARCH */
  const handleSearch = useCallback(value => {
    setSearchTerm(value)
  }, [])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Online Class List</Typography>}
            subtitle={<Typography variant='body2'>List All Online Class</Typography>}
            toggleDrawer={toggleCreateDrawer}
            buttonTitle='Create'
          />
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Existing Online Class' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography>If you want to add existing online class in the Course</Typography>
              <Link href={`./addclass`}>
                <Button size='medium' variant='contained' color='primary'>
                  Add Existing Class
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card sx={{ mt: 4 }}>
            {isLoading ?
              (<Box className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
                <CircularProgress />
              </Box>) :
              (<form>
                <CardContent>

                  <OnlineClassList
                    courseGuid={guid}
                    rows={dataList}
                    responseStatus={responseStatus}
                    responseMessage={responseMessage}
                    meta={metaData}

                  // doReload={doReload}
                  />
                </CardContent>
              </form>)}
          </Card>
        </Grid>
      </Grid>
      <CreateOnlineClass open={drawerOpen} toggle={toggleCreateDrawer} setReload={setReload} />
    </>
  )
}

export default Page
