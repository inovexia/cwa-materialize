import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Core Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import MeetingList from 'src/pages/meetings/_views/index'
import MeetingApi from 'src/pages/meetings/_components/apis'
import CreateMeeting from 'src/pages/meetings/_views/createMeeting'
import Toolbar from 'src/pages/meetings/_components/toolbar'

// ** Actions Imports
//import { fetchData, deleteUser } from 'src/pages/tests/_models/index'
import Pagination from 'src/pages/meetings/_components/pagination'

// ** renders client column

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href='/apps/user/view/overview/'
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const Page = () => {
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
  const [searchQuery, setSearchQuery] = useState('')
  const doReload = () => setReload(r => r + 1)

  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  // Get all meeting
  useEffect(() => {
    const fetchData = async () => {
      const res = await MeetingApi.meetingList()
      setDataList(res && res.payload.data)
      setMetaData(res && res.payload.meta)
    }
    fetchData()
  }, [])

  // Single Checkbox
  const handleCheckboxChange = userId => {
    const isChecked = checkedIds.includes(userId)
    if (isChecked) {
      setCheckedIds(checkedIds.filter(id => id !== userId))
    } else {
      setCheckedIds([...checkedIds, userId])
    }
  }

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

  // Filter data based on searchQuery
  useEffect(() => {
    const filteredResults = dataList.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setDataList(filteredResults)
  }, [searchQuery, dataList])

  const handleSearchChange = e => {
    const newSearchQuery = e.target.value
    setSearchQuery(newSearchQuery)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>All Meetings</Typography>}
            subtitle={<Typography variant='body2'>List all meetings</Typography>}
            toggleDrawer={toggleCreateDrawer}
            buttonTitle='Create'
          />
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
            <CardContent>
              <Toolbar
                checkedIds={checkedIds}
                setCheckedIds={setCheckedIds}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setLoader={setLoader}
                onStatusFilterChange={setStatusFilter}
                onRoleFilterChange={setRoleFilter}
                onOrderFilterChange={setOrderFilter}
                handleSearchChange={handleSearchChange}
                checkedLength={checkedIds}
                bulkAction={bulkAction}
                setBulkAction={setBulkAction}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </CardContent>
            <MeetingList
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
      <CreateMeeting open={drawerOpen} toggle={toggleCreateDrawer} setReload={setReload} />
    </>
  )
}

export default Page
