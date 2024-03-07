import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** Module Specific Imports
import UserList from 'src/pages/meetings/_views/usersList'
import MeetingApi from 'src/pages/meetings/_components/apis'
import ShareToolbar from 'src/pages/meetings/_components/shareToolbar'

// ** Actions Imports
import Pagination from 'src/pages/users/_components/pagination'

const Page = () => {
  const { query } = useRouter()
  const { id } = query
  const router = useRouter()
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

  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  // Single Checkbox
  const handleCheckboxChange = userId => {
    const isChecked = checkedIds.includes(userId)
    if (isChecked) {
      setCheckedIds(checkedIds.filter(id => id !== userId))
    } else {
      setCheckedIds([...checkedIds, userId])
    }
  }


  //  Bulk activate user
  const handleSelectedBulkAction = async selectedBulkAct => {
    setLoader(true)
    const formData = new FormData()
    checkedIds.forEach((user, index) => {
      formData.append(`users[${index}]`, user)
      formData.append(`status`, selectedBulkAct)
    })
    setLoader(true)
    const res = await MeetingApi.changeStatus(formData)
    setLoader(false)
    if (res.success) {
      setDataList(res.payload.data)
      setMetaData(res.payload.meta)
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  }

  //  Multiple Filter
  const handleFiltersChange = useCallback(async () => {
    setLoader(true)
    const formData = new FormData()
    formData.append('search', searchTerm)
    formData.append('status', statusFilter)
    formData.append('role', roleFilter)
    formData.append('order_by', orderFilter)
    formData.append('results_per_page', itemPerPage)
    formData.append('page', currentPage)
    setLoader(true)
    const res = await MeetingApi.filterUsers(formData)
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

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  //  Bulk Action
  const handleBulkAction = useCallback(async () => {
    const formData = new FormData()
    if (bulkAction === '1' || bulkAction === '0') {
      checkedIds.forEach((user, index) => {
        formData.append(`users[${index}]`, user)
        formData.append(`status`, bulkAction)
      })

      const res = await MeetingApi.changeStatus(formData)
      setReload(true)
      setResponseStatus(res.status)
      setResponseMessage(res.message)
    }
  }, [bulkAction, checkedIds])

  useEffect(() => {
    handleBulkAction()
  }, [handleBulkAction, bulkAction, checkedIds])

  // Share Handle submit
  const sharedMeeting = async () => {
    const formData = new FormData()
    checkedIds.forEach((user, index) => {
      formData.append(`users[${index}]`, user)
    })
    const res = await MeetingApi.shareMeeting({ id, data: formData })
    if (res.success == true) {
      toast.success(res.message)
      setTimeout(() => {
        router.push('/meetings')
      }, 500)
    } else {
      toast.error(res.message)
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'left', justifyContent: 'space-between' }}>
            <Box className='actions-left' sx={{ mr: 2, alignItems: 'left' }}>
              <Typography variant='h5'> All Users</Typography>
            </Box>
            <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
              <Button sx={{ mb: 2 }} onClick={sharedMeeting} variant='contained' disabled={checkedIds.length === 0}>
                {`Share`}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <CardContent>
              <ShareToolbar
                checkedIds={checkedIds}
                setCheckedIds={setCheckedIds}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setLoader={setLoader}
                onStatusFilterChange={setStatusFilter}
                onRoleFilterChange={setRoleFilter}
                onOrderFilterChange={setOrderFilter}
                bulkAction={bulkAction}
                setBulkAction={setBulkAction}
              />
            </CardContent>
            <UserList
              checkedIds={checkedIds}
              setCheckedIds={setCheckedIds}
              responseStatus={responseStatus}
              responseMessage={responseMessage}
              loader={loader}
              dataList={dataList}
              setDataList={setDataList}
              setMetaData={setMetaData}
            />
            <Pagination
              itemPerPage={itemPerPage}
              setItemPerPage={setItemPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              checkedIds={checkedIds}
              metaData={metaData}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Page
