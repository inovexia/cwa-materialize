import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Typography, Menu, useTheme, IconButton, MenuItem, style, Link } from '@mui/material'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'

// import Link from 'next/link';
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Core Imports
import PageHeader from 'src/layouts/components/page-header'

// ** date picker component
import PickersBasic from 'src/lib/common/datepicker/PickersBasic'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Module Specific Imports
import OnlineClassList from './_views/existingclasslist'
import OnlineClassApi from './_components/apis'

// import CreateMeeting from './_views/createonlineclass'
// import Toolbar from './_components/toolbar'

// ** Actions Imports
//import { fetchData, deleteUser } from 'src/pages/tests/_models/index'
import Pagination from './_components/pagination'

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
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const router = useRouter()
  const { guid } = router.query
  const [currentPage, setCurrentPage] = useState('1')
  const [itemPerPage, setItemPerPage] = useState('10')
  const [checkedIds, setCheckedIds] = useState([])
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState(undefined)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  // const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const [loader, setLoader] = useState(true)

  // const [searchTerm, setSearchTerm] = useState('')
  // const [statusFilter, setStatusFilter] = useState('')
  // const [roleFilter, setRoleFilter] = useState('')
  // const [orderFilter, setOrderFilter] = useState('')
  // const [bulkAction, setBulkAction] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')
  const doReload = () => setReload(r => r + 1)
  const [startDate, setStartDate] = useState(new Date()); // Initial start date
  const [endDate, setEndDate] = useState(new Date());     // Initial end date

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      guid: '',
      created_on: '',
      updated_on: ''
    }
  })

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };


  // Get all meeting
  useEffect(() => {
    const fetchData = async () => {
      const res = await OnlineClassApi.outsideOnlineClassList(guid)
      setDataList(res && res.payload.data)
      setMetaData(res && res.payload.meta)
      setResponseMessage(res.message)

      // console.log(res)
    }
    fetchData()
  }, [guid])

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
  // const handleBulkAction = useCallback(async () => {
  //   const formData = new FormData()
  //   if (bulkAction === '1' || bulkAction === '0') {
  //     checkedIds.forEach((user, index) => {
  //       formData.append(`users[${index}]`, user)
  //       formData.append(`status`, bulkAction)
  //     })

  //     const res = await MeetingApi.changeStatus(formData)
  //     setReload(true)
  //     setResponseStatus(res.status)
  //     setResponseMessage(res.message)
  //   }
  // }, [bulkAction, checkedIds])

  // useEffect(() => {
  //   handleBulkAction()
  // }, [handleBulkAction, bulkAction, checkedIds])

  // Filter data based on searchQuery
  // useEffect(() => {
  //   // Check if dataList is defined before filtering
  //   if (dataList) {
  //     const filteredResults = dataList.filter(
  //       item =>
  //         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         item.details.toLowerCase().includes(searchQuery.toLowerCase())
  //     );

  //     setDataList(filteredResults);
  //   }
  // }, [searchQuery, dataList]);

  // const handleSearchChange = e => {
  //   const newSearchQuery = e.target.value
  //   setSearchQuery(newSearchQuery)
  // }
  const handleFormSubmit = async data => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    const res = await OnlineClassApi.addExistingOnlineClass({ guid, data })
    console.log(res)
    if (res.success === true) {
      toast.success('online class added successfully')
      setTimeout(() => {
        router.push(`/courses/${guid}/onlineClass`)
      }, 500)
    } else {
      toast.error('Failed to added online class')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Add Existing Online Class</Typography>}
          subtitle={<Typography variant='body2'>List all Existing Online Class</Typography>}
        />
        <Card style={{ marginTop: '30px' }}>
          <CardHeader title='All Online Class' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <PickersBasic
                    popperPlacement={popperPlacement}
                    label='Start Date'
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <PickersBasic
                    popperPlacement={popperPlacement}
                    label='End Date'
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <OnlineClassList
                    checkedIds={checkedIds}
                    setCheckedIds={setCheckedIds}
                    responseStatus={responseStatus}
                    responseMessage={responseMessage}
                    setResponseMessage={setResponseMessage}
                    loader={loader}
                    dataList={dataList}
                    setDataList={setDataList}
                    setMetaData={setMetaData}
                  />
                  {/* <Pagination
                      itemPerPage={itemPerPage}
                      setItemPerPage={setItemPerPage}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      checkedIds={checkedIds}
                      metaData={metaData}
                    /> */}
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <Button variant='contained' size='medium' type='submit' sx={{ mt: 5 }}>
                      Add Existing Class
                    </Button>
                    <Button
                      variant='outlined'
                      size='medium'

                      // component={Link}
                      href={`/courses/${guid}/onlineClass`}
                      sx={{ mt: 5, ml: 3 }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Page
