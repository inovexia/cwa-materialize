import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import {
  Grid,
  Card,
  Link,
  Button,
  Box,
  Typography,
  Table,
  Checkbox,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import toast from 'react-hot-toast'

// ** API
import UserApi from 'src/pages/users/components/apis'

// ** Global Imports
import Icon from 'src/@core/components/icon'
import Toolbar from 'src/pages/users/components/toolbar'
import DeleteUser from 'src/pages/users/view/deleteUser'
import ArchiveUser from 'src/pages/users/view/archiveUser'
import SwitchField from 'src/pages/users/components/Switch'
import ActionMenu from 'src/pages/users/components/actionMenu'
import Pagination from 'src/pages/users/view/pagination'

// ** Style

const User = () => {
  const [checkedIds, setCheckedIds] = useState([])
  const [selectedBulkAct, setSelectedBulkAct] = useState('')
  const [loader, setLoader] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [openArcModal, setOpenArcModal] = useState(false)
  const [guidToDelete, setGuidToDelete] = useState('')
  const [allUsers, setAllUsers] = useState([])
  const [metaData, setMetaData] = useState(undefined)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [orderFilter, setOrderFilter] = useState('')
  const [reload, setReload] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const doReload = () => setReload(r => r + 1)

  const getUsers = useCallback(async () => {
    setLoader(true)
    const res = await UserApi.filterUsers()
    setLoader(false)
    if (!res.success) return
    setAllUsers(res.payload.data)
    setMetaData(res.payload.meta)
  }, [reload])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleCheckboxChange = userId => {
    const isChecked = checkedIds.includes(userId)
    if (isChecked) {
      setCheckedIds(checkedIds.filter(id => id !== userId))
    } else {
      setCheckedIds([...checkedIds, userId])
    }
  }

  const handleBulkCheckboxChange = () => {
    if (checkedIds.length === allUsers.length) {
      setCheckedIds([])
    } else {
      setCheckedIds(allUsers.map(user => user.guid))
    }
  }
  // Delete Modal OPEN
  const handleClickOpen = guid => {
    setGuidToDelete(guid)
    setOpenModal(true)
  }
  const handleDeleteClick = (guid, onClose) => {
    handleClickOpen(guid)
    onClose()
  }

  // Archive Modal OPEN
  const handleClickArcOpen = guid => {
    setGuidToDelete(guid)
    setOpenArcModal(true)
  }
  const handleArchiveClick = (guid, onClose) => {
    handleClickArcOpen(guid)
    onClose()
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenArcModal(false)
  }
  // Delete user
  const handleUserDeleted = async () => {
    const updatedUsers = await UserApi.getAllUsers()
    if (!updatedUsers.success) return
    setAllUsers(updatedUsers.payload.data)
    setMetaData(updatedUsers.payload.meta)
    setOpenModal(false)
  }
  // Archive User
  const handleUserArchived = async () => {
    const updatedUsers = await UserApi.getAllUsers()
    if (updatedUsers.success === true) {
      setAllUsers(updatedUsers.payload.data)
    }
    setOpenModal(false)
  }

  //  Multiple Filter
  const handleFiltersChange = async () => {
    try {
      setLoader(true)
      const formData = new FormData()
      formData.append('search', searchTerm)
      formData.append('status', statusFilter)
      formData.append('role', roleFilter)
      formData.append('order_by', orderFilter)
      setLoader(true)
      const res = await UserApi.filterUsers(formData)
      setLoader(false)
      if (res.success) {
        setAllUsers(res.payload.data)
        setMetaData(res.payload.meta)
      } else {
        toast.error('Failed to fetch filtered results')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while fetching filtered results')
    }
  }

  useEffect(() => {
    handleFiltersChange()
  }, [searchTerm, statusFilter, roleFilter, orderFilter])

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
        setAllUsers(res.payload.data)
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

  // Pagination
  const handlePageChange = useCallback(page => {
    setCurrentPage(page)
  }, [])

  useEffect(() => {
    getUsers()
  }, [getUsers, currentPage])
  console.log(checkedIds)
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Toolbar
          setSearchTerm={setSearchTerm}
          setLoader={setLoader}
          onStatusFilterChange={setStatusFilter}
          onRoleFilterChange={setRoleFilter}
          onOrderFilterChange={setOrderFilter}
          onSelectedBulkAction={handleSelectedBulkAction}
          checkedLength={checkedIds}
        />
      </Grid>
      {loader ? (
        <Box
          className='loader'
          sx={{
            width: '100%',
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: '50%',
            transform: 'translate(-50%,-50%)'
          }}
        >
          <CircularProgress disableShrink sx={{ my: 5 }} />
        </Box>
      ) : (
        <Grid item xs={12}>
          <Card>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        checked={checkedIds.length === allUsers && allUsers.length}
                        indeterminate={checkedIds.length > 0 && checkedIds.length < allUsers.length}
                        onChange={handleBulkCheckboxChange}
                      />
                    </TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>User Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUsers && allUsers.length !== 0 ? (
                    allUsers.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox
                            checked={checkedIds.includes(user.guid)}
                            onChange={() => handleCheckboxChange(user.guid)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' component='h3'>
                            <Link
                              href={`/users/${user.guid}`}
                              passHref
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {user.first_name} {user.last_name}
                            </Link>
                          </Typography>
                          <Typography variant='body2' component='h5'>
                            {user.guid}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' component='h4'>
                            {user.email}
                          </Typography>
                          <Typography variant='body2' component='h5'>
                            {user.mobile}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2' component='h4' style={{ textTransform: 'uppercase' }}>
                            {user.role}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <SwitchField id={user.guid} status={user.status} />
                        </TableCell>
                        <TableCell>
                          <Grid container spacing={2} alignItems='center'>
                            <ActionMenu
                              id={user.guid}
                              onDeleteClick={handleDeleteClick}
                              onArchiveClick={handleArchiveClick}
                            />
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <p style={{ padding: '15px' }}>User not found!</p>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Pagination metaData={metaData} onPageChange={handlePageChange} /> */}
          </Card>
          <DeleteUser
            mdOpen={openModal}
            handleClose={handleCloseModal}
            guidToDelete={guidToDelete}
            onUserDeleted={handleUserDeleted}
          />
          <ArchiveUser
            mdOpen={openArcModal}
            handleClose={handleCloseModal}
            guidToDelete={guidToDelete}
            onUserArchived={handleUserArchived}
          />
        </Grid>
      )}
    </Grid>
  )
}

export default User
