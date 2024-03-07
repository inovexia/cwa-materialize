// ** React Imports
import React, { useState, useCallback } from 'react'

// ** MUI Imports
import {
  Tooltip,
  Button,
  Box,
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
  Checkbox,
  Switch,
  Menu, MenuItem
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { styled } from '@mui/material/styles'
import Translations from 'src/layouts/components/Translations'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { ChangeStatus } from 'src/pages/tests/_models/TestModel'

import DeleteTest from './deleteTest'
import BulkDeleteTest from './bulkTestDelete'
import BulkRemoveTest from './bulkTestRemove'

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
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title'
  },
  {
    id: 'details',
    numeric: false,
    disablePadding: false,
    label: 'Details'
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type'
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

const BulkOptions = ({ guid, doReload, selectedIds, setSelected }) => {

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const [openModal, setOpenModal] = useState(false)
  const [openModalRemove, setOpenModalRemove] = useState(false)
  const [openArcModal, setOpenArcModal] = useState(false)

  const handleRowOptionsClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = (event) => {
    setAnchorEl(null)
  }

  const bulkRemove = (event) => {
    handleRowOptionsClose()
    setOpenModalRemove(true)
  }

  const bulkDelete = (event) => {
    event.stopPropagation()
    handleRowOptionsClose()
    setOpenModal(true)
  }


  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenModalRemove(false)
    setOpenArcModal(false)
  }

  return (
    <>
      <Box>
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
            sx={{ '& svg': { mr: 2 } }}
            onClick={bulkRemove}
          >
            <Icon icon='ep:remove' fontSize={20} />
            Remove
          </MenuItem>
          <MenuItem
            sx={{ '& svg': { mr: 2 } }}
            onClick={bulkDelete}
          >
            <Icon icon='material-symbols:delete-outline' fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </Box>
      <BulkDeleteTest
        mdOpen={openModal}
        handleClose={handleCloseModal}
        courseId={guid}
        selectedIds={selectedIds}
        doReload={doReload}
        setSelected={setSelected}
      />
      <BulkRemoveTest
        mdOpen={openModalRemove}
        handleClose={handleCloseModal}
        courseId={guid}
        selectedIds={selectedIds}
        doReload={doReload}
        setSelected={setSelected}
      />
    </>
  )
}

const EnhancedTableToolbar = props => {
  // ** Prop
  const { numSelected, selected, setSelected, selectedIds, guid, doReload } = props

  return (
    numSelected !== 0 ?
      <Toolbar
        sx={{
          px: theme => `${theme.spacing(5)} !important`,
          ...(numSelected > 0 && {
            bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
          })
        }}
      >
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
            {numSelected} selected
          </Typography>
        ) : (
          ''
        )}
        {numSelected > 0 ? (
          <Box>
            <BulkOptions selectedIds={selectedIds} guid={guid} doReload={doReload} setSelected={setSelected} />
          </Box>
        ) : null}
      </Toolbar>
      : ""

  )
}

const RowOptions = ({ guid, testGuid, setEditId, doReload, toggleCreateDrawer }) => {

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const [openModal, setOpenModal] = useState(false)
  const [openArcModal, setOpenArcModal] = useState(false)

  const handleRowOptionsClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = (event) => {
    setAnchorEl(null)
    setEditId("");
  }

  const handleItemClick = (event) => {
    event.stopPropagation()
    handleRowOptionsClose()
    setOpenModal(true)
  }

  const handleEditClick = (event) => {
    event.stopPropagation()
    setEditId(testGuid);
    setAnchorEl(null)
    toggleCreateDrawer();
  };


  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenArcModal(false)
  }


  return (
    <>
      <Box>
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
            href={`/courses/${guid}/test/${testGuid}/manage`}
          >
            <Icon icon='fluent-mdl2:document-management' fontSize={20} />
            Manage
          </MenuItem>
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            onClick={handleRowOptionsClose}
            href={`/courses/${guid}/test/${testGuid}/questions`}
          >
            <Icon icon='mdi:eye-outline' fontSize={20} />
            Preview
          </MenuItem>
          <MenuItem
            sx={{ '& svg': { mr: 2 } }}
            onClick={handleEditClick}
          >
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem
            sx={{ '& svg': { mr: 2 } }}
            onClick={handleItemClick}
          >
            <Icon icon='material-symbols:delete-outline' fontSize={20} />
            Delete
          </MenuItem>
        </Menu>
      </Box>
      <DeleteTest
        mdOpen={openModal}
        handleClose={handleCloseModal}
        courseId={guid}
        testId={testGuid}
        doReload={doReload}
      />
    </>
  )
}

const EnhancedTable = (props) => {
  // ** States
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [testStatus, setTestStatus] = useState(0)
  const [checked, setChecked] = useState(false)

  // ** Props
  const { rows, responseMessage, doReload, guid, toggleCreateDrawer, setEditId } = props

  const handleRequestSort = (event, property) => {
    event.stopPropagation()
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    event.stopPropagation()
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.guid)
      setSelected(newSelecteds)

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
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeStatus = (async (event, guid) => {
    event.stopPropagation()

    const response = await ChangeStatus(event.target.checked, guid)
    if (response.success) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  })

  const isSelected = guid => selected.indexOf(guid) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <>
      {
        selected.length !== 0 ? (<EnhancedTableToolbar numSelected={selected.length} selectedIds={selected} selected={selected} setSelected={setSelected} guid={guid} doReload={doReload} />) : ""
      }
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            rowCount={rows.length}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody>

            {/* if you don't need to support IE11, you can replace the `stableSort` call with: rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
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
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <LinkStyled href={`/courses/${guid}/test/${row.guid}/manage`} onClick={e => e.stopPropagation()}>{row.title}</LinkStyled>
                        <Typography noWrap variant='caption' onClick={e => e.stopPropagation()}>{row.guid}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell >{row.details}</TableCell>
                    <TableCell >{row.type}</TableCell>
                    <TableCell ><Switch defaultChecked={row.status === '1' ? true : false} onChange={event => handleChangeStatus(event, row.guid)} onClick={e => { e.stopPropagation() }} /></TableCell>
                    <TableCell><RowOptions guid={guid} setEditId={setEditId} testGuid={row.guid} doReload={doReload} toggleCreateDrawer={toggleCreateDrawer} /></TableCell>
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
                  <Translations text={responseMessage} message='No test found' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default EnhancedTable
