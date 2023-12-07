import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Core Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import UserList from 'src/pages/users/view/index'
import UserApi from 'src/pages/users/components/apis'
import CreateUser from 'src/pages/users/view/createUser'
import Toolbar from 'src/pages/users/components/toolbar'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/pages/tests/_models/index'
import Pagination from 'src/pages/users/components/pagination'

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
    try {
      setLoader(true)
      const formData = new FormData()
      checkedIds.forEach((user, index) => {
        formData.append(`users[${index}]`, user)
        formData.append(`status`, selectedBulkAct)
      })
      setLoader(true)
      const res = await UserApi.changeStatus(formData)
      setLoader(false)
      if (res.success) {
        setDataList(res.payload.data)
        setMetaData(res.payload.meta)
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while fetching filtered results')
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
    const res = await UserApi.filterUsers(formData)
    setLoader(false)
    if (!res.success) return toast.error('Failed to fetch filtered results')
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
  
return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Users</Typography>}
          subtitle={<Typography variant='body2'>List all users</Typography>}
          toggleDrawer={toggleCreateDrawer}
          buttonTitle='Add User'
        />
        <Card style={{ marginTop: '30px' }}>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Toolbar
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              setLoader={setLoader}
              onStatusFilterChange={setStatusFilter}
              onRoleFilterChange={setRoleFilter}
              onOrderFilterChange={setOrderFilter}
              onSelectedBulkAction={handleSelectedBulkAction}
              checkedLength={checkedIds}
            />
          </CardContent>
          <UserList
            checkedIds={checkedIds}
            data={dataList}
            responseStatus={responseStatus}
            responseMessage={responseMessage}
            loader={loader}
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
      <CreateUser open={drawerOpen} toggle={toggleCreateDrawer} />
    </Grid>
  )
}

export default Page
