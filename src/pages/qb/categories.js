import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress, Divider } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import CategoriesComponent from 'src/pages/qb/_views/categories/Index'
import CreateCategoryComponent from 'src/pages/qb/_views/categories/Create'

//import CreateQuestion from 'src/pages/qb/create'
import Toolbar from 'src/pages/qb/_components/Toolbar'

// ** Actions Imports
import { GetCategories } from 'src/pages/qb/_models/CategoriesModel'


const Page = () => {
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [status, setStatus] = useState(0)

  /** GET ALL TESTS */
  useEffect(() => {
    const fetchData = async () => {
      const data = {
      }
      if (status !== "")
        data['status'] = status

      const response = await GetCategories(data)
      setLoading(false)
      if (!response.success) {
        toast.error(response.message)
      }
      setDataList(response.payload)
    }
    fetchData()
  }, [])



  /** HANDLE STATUS CHANGE */
  const handleStatus = useCallback(value => {
    setStatus(value)
  }, [])

  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Categories</Typography>}
            subtitle={<Typography variant='body2'>List All Categories</Typography>}
            buttonTitle='Add Category'
            toggleDrawer={toggleCreateDrawer}
          />
          <Card>
            {isLoading ?
              (<Box fullWidth className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
                <CircularProgress />
              </Box>) :
              (<form>
                <CardContent>
                  <Toolbar
                    status={status}
                    handleStatus={handleStatus}
                  />
                </CardContent>
                <Card>
                  <CardContent>
                    <CategoriesComponent
                      rows={dataList}
                      responseStatus={responseStatus}
                      responseMessage={responseMessage}
                      meta={metaData}
                    />
                  </CardContent>
                </Card>
              </form>)}
          </Card>
        </Grid>
      </Grid>
      <CreateCategoryComponent
        open={drawerOpen}
        toggle={toggleCreateDrawer}
      />
    </>
  )
}

export default Page
