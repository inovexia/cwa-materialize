import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress, Divider } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import OnlineClassList from 'src/pages/onlineclass/student/_views/OnlineClassList'

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

  /** GET ALL Online Class */
  useEffect(() => {
    const fetchData = async () => {
      const data = {
      }
      const response = await GetOnlineClass(data)
      setLoading(false)
      if (!response.success) {
        toast.error(response.message)
      }
      setDataList(response.payload.data)
      setMetaData(response.payload.meta)
    }
    fetchData()
  }, [])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Online Class List</Typography>}
            subtitle={<Typography variant='body2'>List All Online Class</Typography>}
          />
          <Card sx={{ mt: 4 }}>
            {isLoading ?
              (<Box className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
                <CircularProgress />
              </Box>) :
              (<form>
                <CardContent>
                  <>
                    <OnlineClassList
                      rows={dataList}
                      responseStatus={responseStatus}
                      responseMessage={responseMessage}
                      meta={metaData}
                    />
                    <Divider />
                  </>

                </CardContent>
              </form>)}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Page
