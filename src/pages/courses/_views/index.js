// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import {
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
  Tooltip,
  Checkbox,
  Switch,
  Menu, MenuItem, styled
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'

import Translations from 'src/layouts/components/Translations'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { changeStatus } from 'src/pages/courses/_models/CourseModel'
import DeleteCourse from './deleteCourse'
import BulkDeleteCourse from './bulkDelete'

// APIs
import CourseApi from 'src/pages/courses/_components/Apis'

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
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description'
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
  const { numSelected, setOpenBulkModal } = props

  const handleBulkDelete = () => {
    setOpenBulkModal(true)
  }

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
          <Tooltip title='Delete' onClick={handleBulkDelete}>
            <IconButton sx={{ color: 'text.secondary' }}>
              <Icon icon='mdi:delete-outline' />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
      : ""

  )
}

const RowOptions = ({ guid, onDelete }) => {

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  // New function that calls both functions
  const handleItemClick = (event) => {
    event.stopPropagation()
    handleRowOptionsClose()
    handleDelete()
  }

  const handleDelete = () => {
    onDelete(guid);
  };


  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick} >
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
          href={`/courses/${guid}/manage`}
        >
          <Icon icon='carbon:gui-management' fontSize={20} />
          Manage
        </MenuItem>
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/courses/view/${guid}`}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          Preview
        </MenuItem>
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/courses/${guid}/edit`}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleItemClick}
        >
          <Icon icon='material-symbols-light:delete' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const EnhancedTable = ({ dataList, setDataList, responseMessage, doReload }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [guidToDelete, setGuidToDelete] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openBulkModal, setOpenBulkModal] = useState(false)
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

      return
    }
    setSelected([])
  }

  const handleClick = (event, guid) => {
    event.stopPropagation();
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

  const handleChangeStatus = (async (event, id) => {
    const response = await changeStatus(event.target.checked, id)
  })

  const isSelected = guid => selected.indexOf(guid) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenBulkModal(false)
    setOpenArcModal(false)
  }

  // Delete course
  const handleItemDeleted = async () => {
    const updatedData = await CourseApi.getAllCourses()
    if (!updatedData.success) return
    setDataList(updatedData.payload.data)

    //setMetaData(updatedData.payload.meta)
    setOpenModal(false)
  }

  const handleDelete = (guid) => {
    setGuidToDelete(guid);
    setOpenModal(true);
  };

  // Bulk Delete course
  const handleItemBulkDeleted = async () => {
    const updatedData = await CourseApi.getAllCourses()
    if (!updatedData.success) return
    setDataList(updatedData.payload.data)
    setOpenBulkModal(false)
  }

  return (
    <>
      <EnhancedTableToolbar numSelected={selected.length} setOpenBulkModal={setOpenBulkModal} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
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
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <LinkStyled href={`/courses/${row.guid}/manage`} onClick={e => e.stopPropagation()}>{row.title}</LinkStyled>
                        <Typography noWrap variant='caption'>{row.guid}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell style={{ maxWidth: "400px", boxSizing: "border-box", wordWrap: "break-word" }}>{ReactHtmlParser(row.description)}</TableCell>
                    {/* <TableCell >{row.type}</TableCell> */}
                    <TableCell >
                      <Switch defaultChecked={row.status === '1' ? true : false} onChange={event => { handleChangeStatus(event, row.guid) }} onClick={e => { e.stopPropagation() }} />
                    </TableCell>
                    <TableCell><RowOptions guid={row.guid} onDelete={handleDelete} /></TableCell>
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
                  <Translations text={responseMessage} message='No course found' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        page={page}
        component='div'
        count={dataList.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DeleteCourse
        mdOpen={openModal}
        handleClose={handleCloseModal}
        guidToDelete={guidToDelete}
        onItemDeleted={handleItemDeleted}
        doReload={doReload}
      />
      <BulkDeleteCourse
        mdOpen={openBulkModal}
        handleClose={handleCloseModal}
        selectedCourseId={selected}
        onItemDeleted={handleItemBulkDeleted}
        doReload={doReload}
      />
    </>
  )
}

export default EnhancedTable
