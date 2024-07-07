// ** React Imports
import React, { useState, useCallback } from 'react'

// ** MUI Imports
import {
  Button,
  Alert,
  Box,
  Grid,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
  TableSortLabel,
  TablePagination,
  Paper,
  Toolbar,
  Tooltip,
  Checkbox,
  Switch,
  Menu, MenuItem, CircularProgress
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import Translations from 'src/layouts/components/Translations'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

//**APIs */
import UserApi from 'src/pages/users/_components/apis'

// ** Actions Imports
import { ChangeStatus } from 'src/pages/tests/_models/TestModel'
import ActionMenu from 'src/pages/users/_components/actionMenu'
import BulkActionMenu from 'src/pages/users/_components/bulkActionMenu'
import DeleteUser from 'src/pages/users/_views/deleteUser'
import ArchiveUser from 'src/pages/users/_views/archiveUser'
import SwitchField from 'src/pages/users/_components/Switch'
import { right } from '@popperjs/core'

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

const headCells = [
  {
    id: 'user',
    numeric: false,
    disablePadding: true,
    label: 'User'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email'
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions'
  }
]

function EnhancedTableHead(props) {
  // ** Props
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            onChange={onSelectAllClick}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{ 'aria-label': 'select all tests' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const EnhancedTableToolbar = props => {
  // ** Prop
  const { numSelected, selected } = props

  return (
    <Toolbar
      sx={{
        px: theme => `${theme.spacing(5)} !important`,
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      {numSelected > 0 ? (
        <Box
          width="100%"
          my={4}
          display="flex"
          alignItems="center"
          justifyContent={'space-between'}>
          <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
            {numSelected} selected
          </Typography>
          <Box sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div' textAlign={right}>
            <BulkActionMenu selected={selected} />
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Toolbar>
  )
}

const EnhancedTable = (props) => {

  // ** Props
  const { responseMessage, dataList, setDataList, setMetaData, selectedLength, setSelectedLength, doReload } = props

  // ** States
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [guidToDelete, setGuidToDelete] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openArcModal, setOpenArcModal] = useState(false)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = dataList.map(n => n.guid)
      setSelected(newSelecteds)
      setSelectedLength(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event, guid) => {
    event.stopPropagation()
    const selectedIndex = selected.indexOf(guid)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, guid)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
    setSelectedLength(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = guid => selected.indexOf(guid) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0

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

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenArcModal(false)
  }

  // Delete user
  const handleUserDeleted = async () => {
    const updatedUsers = await UserApi.getAllUsers()
    if (!updatedUsers.success) return
    setDataList(updatedUsers.payload.data)
    setMetaData(updatedUsers.payload.meta)
    setOpenModal(false)
  }

  // Archive User
  const handleUserArchived = async () => {
    const updatedUsers = await UserApi.getAllUsers()
    if (!updatedUsers.success) return
    setDataList(updatedUsers.payload.data)
    setMetaData(updatedUsers.payload.meta)
    setOpenModal(false)
  }

  return (
    <>
      {selected.length === 0 ? "" : (<EnhancedTableToolbar numSelected={selected.length} selected={selected} />)}
      <TableContainer component={Paper} className="user-list">
        {props.loader ? (<Box fullWidth className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
          <CircularProgress />
        </Box>) : dataList.length > 0 ? (<Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            rowCount={dataList.length}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>

            {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(dataList, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.guid)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.guid}
                    role='checkbox'
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                    onClick={event => handleClick(event, row.guid)}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                    </TableCell>
                    <TableCell component='th' id={labelId} scope='row' padding='none'>
                      <Box style={{ display: 'flex' }}>
                        <CustomAvatar
                          skin='light'
                          color={row.avatarColor || 'primary'}
                          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
                        >
                          {getInitials(
                            row.fullName
                              ? row.fullName
                              : `${row.first_name ? row.first_name : ''} ${row.last_name ? row.last_name : ''}`
                          )}
                        </CustomAvatar>
                        <Box>
                          <Typography variant='body2' component='h3'>
                            <Link href={`/users/${row.guid}`} onClick={e => e.stopPropagation()} style={{ textDecoration: 'none', color: 'inherit' }}>
                              {row.first_name} {row.last_name}
                            </Link>
                          </Typography>
                          <Typography variant='body2' component='h5'>
                            {row.guid}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell >
                      <Typography variant='body2' component='h4'>
                        {row.email}
                      </Typography>
                      <Typography variant='body2' component='h5'>
                        {row.mobile}
                      </Typography></TableCell>
                    <TableCell >{row.role === "admin" ? "Admin" : row.role === "teacher" ? "Teacher" : row.role === "parent" ? "Parent" : row.role === "superadmin" ? "Super Admin" : "Student"}</TableCell>
                    <TableCell>
                      <SwitchField id={row.guid} status={row.status} />
                    </TableCell>
                    <TableCell>
                      <ActionMenu
                        id={row.guid}
                        onDeleteClick={handleDeleteClick}
                        onArchiveClick={handleArchiveClick}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow
                sx={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6}>
                  <Translations text={responseMessage} message='No user found' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>) : (<Alert fullWidth className="loader" color="warning" style={{ textAlign: "left", padding: "10px" }}>User not found!</Alert>)}

      </TableContainer>
      <TablePagination
        page={page}
        component='div'
        count={dataList.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
    </>
  )
}

export default EnhancedTable
