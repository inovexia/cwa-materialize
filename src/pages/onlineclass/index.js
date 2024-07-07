import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardContent, Box, Typography, CircularProgress, Divider } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import OnlineClassList from 'src/pages/onlineclass/_views/OnlineClassList'
import CreateOnlineClass from 'src/pages/onlineclass/_views/CreateOnlineClass'

import Toolbar from 'src/pages/onlineclass/_components/Toolbar'

// ** Actions Imports
import { GetOnlineClass } from 'src/pages/onlineclass/_models/OnlineClassModel'

const Page = () => {
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
      const data = {
      }
      if (searchTerm !== "")
        data['search'] = searchTerm

      const response = await GetOnlineClass(data)
      setLoading(false)
      if (!response.success) {
        toast.error(response.message)
      }
      setDataList(response.payload.data)
      setMetaData(response.payload.meta)
    }
    fetchData()
  }, [searchTerm])


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
          <Card sx={{ mt: 4 }}>
            {isLoading ?
              (<Box className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
                <CircularProgress />
              </Box>) :
              (<form>
                <CardContent>
                  <Toolbar
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}

                  // status={status}
                  // handleStatus={handleStatus}
                  // type={type}
                  // handleType={handleType}
                  />
                </CardContent>
                <CardContent>

                  <>
                    <OnlineClassList

                      // key={i}
                      // count={i + 1}
                      // question={row}

                      rows={dataList}
                      responseStatus={responseStatus}
                      responseMessage={responseMessage}
                      meta={metaData}

                    // doReload={doReload}
                    />
                    <Divider />
                  </>

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
