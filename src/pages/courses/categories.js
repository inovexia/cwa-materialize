import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardContent, Box, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { useDebounce } from "@uidotdev/usehooks";

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import CategoryList from 'src/pages/courses/_views/categories'
import CreateCategory from 'src/pages/courses/_views/categories/create'
import CategoryToolbar from 'src/pages/courses/_components/CategoryToolbar'

// ** Actions Imports
import { ListCategory } from 'src/pages/courses/_models/CategoryModel'

const Page = () => {
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState(undefined)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const defSearchTerm = useDebounce(searchTerm, 300);
  const [reload, setReload] = useState(0)
  const doReload = () => setReload(r => r + 1)

  const [isLoading, setLoading] = useState(true)


  /** GET ALL CATEGORIES */
  const getCategories = useCallback(async () => {
    const data = {
      ...(defSearchTerm !== "" ? { search: defSearchTerm } : {})
    }
    setLoading(true)
    const response = await ListCategory(data)
    setLoading(false)
    if (!response.success) return toast.error(response.message)
    setDataList(response.payload.data)
    setMetaData(response.payload.meta)
  }, [defSearchTerm])

  useEffect(() => {
    getCategories()
  }, [getCategories])


  /** HANDLE SEARCH */
  const handleSearch = (value) => setSearchTerm(value)

  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Categories</Typography>}
            subtitle={<Typography variant='body2'>List all Categories</Typography>}
            toggleDrawer={toggleCreateDrawer}
            buttonTitle='Create New'
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
                  <CategoryToolbar
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                  />
                </CardContent>
                <CategoryList
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
      <CreateCategory
        open={drawerOpen}
        dataList={dataList}
        toggle={toggleCreateDrawer}
        setReload={setReload}
        reload={reload}
        doReload={doReload}
      />
    </>
  )
}

export default Page
