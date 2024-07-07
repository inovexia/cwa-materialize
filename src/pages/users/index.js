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


// ** Core Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import UserList from 'src/pages/users/_views/index'
import UserApi from 'src/pages/users/_components/apis'
import CreateUser from 'src/pages/users/_views/createUser'
import Toolbar from 'src/pages/users/_components/toolbar'

// ** Actions Imports
//import { fetchData, deleteUser } from 'src/pages/tests/_models/index'
import Pagination from 'src/pages/users/_components/pagination'
import UserContextProvider, { useUserContextData } from './_context/UserContext'

// ** Models
import { GetUsers } from 'src/pages/users/_models/UsersModel'

// ** renders client column

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
  const [selectedLength, setSelectedLength] = useState('')
  const doReload = () => setReload(r => r + 1)

  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)




  //  Bulk activate user
  const handleSelectedBulkAction = async selectedBulkAct => {
    setLoader(true)
    const formData = new FormData()
    selectedLength.forEach((user, index) => {
      formData.append(`users[${index}]`, user)
    })
    formData.append(`status`, selectedBulkAct)
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
  }

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  /** GET ALL USERS */
  useEffect(() => {
    const fetchData = async () => {
      const data = {
      }
      setLoader(true)
      if (statusFilter !== "")
        data['status'] = statusFilter

      if (searchTerm !== "")
        data['search'] = searchTerm

      if (roleFilter !== "")
        data['role'] = roleFilter

      if (orderFilter !== "")
        data['order_by'] = orderFilter

      if (itemPerPage !== "")
        data['results_per_page'] = itemPerPage

      if (currentPage !== "")
        data['page'] = currentPage

      const response = await GetUsers(data)
      setLoader(false)
      if (!response.success) {
        toast.error(response.message)
      }
      setDataList(response && response.payload.data)
      setMetaData(response && response.payload.meta)
      setResponseStatus(response && response.status)
      setResponseMessage(response && response.message)
    }
    fetchData()
  }, [searchTerm, statusFilter, roleFilter, orderFilter, itemPerPage, currentPage])

  //  Bulk Action
  const handleBulkAction = useCallback(async () => {
    const formData = new FormData()
    if (bulkAction === '1' || bulkAction === '0') {
      selectedLength.forEach((user, index) => {
        formData.append(`users[${index}]`, user)
      })
      formData.append(`status`, bulkAction)

      const res = await UserApi.changeStatus(formData)
      setResponseStatus(res.status)
      setResponseMessage(res.message)

    }
    else if (bulkAction === 'delete') {
      selectedLength.forEach((user, index) => {
        formData.append(`users[${index}]`, user)
      })

      const res = await UserApi.changeStatus(formData)
      setResponseStatus(res.status)
      setResponseMessage(res.message)
    }
  }, [bulkAction, selectedLength])

  useEffect(() => {
    handleBulkAction()
  }, [handleBulkAction, bulkAction, selectedLength])


  /** HANDLE SEARCH */
  const handleSearch = useCallback(value => {
    setSearchTerm(value)
  }, [])

  /** HANDLE STATUS */
  const handleStatus = useCallback(value => {
    setStatusFilter(value)
  }, [])

  /** HANDLE ROLE */
  const handleRole = useCallback(value => {
    setRoleFilter(value)
  }, [])

  /** HANDLE ORDER FILTER */
  const handleOrder = useCallback(value => {
    setOrderFilter(value)
  }, [])

  /** HANDLE ITEM PER PAGE */
  const handleItemPerPage = useCallback(value => {
    setItemPerPage(value)
  }, [])

  /** HANDLE CURRENT */
  const handleCurrentPage = useCallback(value => {
    setCurrentPage(value)
  }, [])

  return (
    <UserContextProvider>
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
                checkedIds={checkedIds}
                setCheckedIds={setCheckedIds}
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                statusFilter={statusFilter}
                handleStatus={handleStatus}
                roleFilter={roleFilter}
                handleRole={handleRole}
                orderFilter={orderFilter}
                handleOrder={handleOrder}
                itemPerPage={itemPerPage}
                handleItemPerPage={handleItemPerPage}
                currentPage={currentPage}
                handleCurrentPage={handleCurrentPage}
                setLoader={setLoader}
                loader={loader}
                doReload={doReload}
                checkedLength={checkedIds}
                bulkAction={bulkAction}
                setBulkAction={setBulkAction}
                selectedLength={selectedLength}
                setSelectedLength={setSelectedLength}
              />
            </CardContent>
            <UserList
              checkedIds={checkedIds}
              setCheckedIds={setCheckedIds}
              responseStatus={responseStatus}
              responseMessage={responseMessage}
              loader={loader}
              dataList={dataList}
              doReload={doReload}
              setDataList={setDataList}
              setMetaData={setMetaData}
              selectedLength={selectedLength}
              setSelectedLength={setSelectedLength}
            />
            {/* <Pagination
              itemPerPage={itemPerPage}
              setItemPerPage={setItemPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              checkedIds={checkedIds}
              metaData={metaData}
            /> */}
          </Card>
        </Grid>
      </Grid>
      <CreateUser open={drawerOpen} toggle={toggleCreateDrawer} reload={reload} setReload={setReload} doReload={doReload} />
    </UserContextProvider>
  )
}

// const UserContent = () => {
//   const { searchTerm } = useUserContextData()

//   return <div>{searchTerm}</div>
// }

export default Page
