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
import TestList from 'src/pages/tests/_views/index'
import TestApis from 'src/pages/tests/_components/apis'
import CreateTest from 'src/pages/tests/_views/createTest'
import Toolbar from 'src/pages/tests/_components/toolbar'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/pages/tests/_models/index'

// ** renders client column
const renderClient = row => {
  return (
    <CustomAvatar
      skin='light'
      color={row.avatarColor || 'primary'}
      sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
    >
      {getInitials(row.fullName ? row.fullName : 'John Doe')}
    </CustomAvatar>
  )
}

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
  const [dataList, setDataList] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const [loader, setLoader] = useState(true)
  const doReload = () => setReload(r => r + 1)

  // view all listing Using API
  const getTests = useCallback(async () => {
    setLoader(true)
    const response = await TestApis.getAllTests()
    setLoader(false)
    if (response.success === true) {
      setDataList(response.payload.data)
    }
    setResponseStatus(response.status)
    setResponseMessage(response.message)
  }, [])

  useEffect(() => {
    getTests()
  }, [getTests])

  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Tests</Typography>}
          subtitle={<Typography variant='body2'>List all tests</Typography>}
          toggleDrawer={toggleCreateDrawer}
          buttonTitle='Add Test'
        />
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Toolbar />
          </CardContent>
          <TestList data={dataList} responseStatus={responseStatus} responseMessage={responseMessage} />
        </Card>
      </Grid>
      <CreateTest open={drawerOpen} toggle={toggleCreateDrawer} />
    </Grid>
  )
}

export default Page
