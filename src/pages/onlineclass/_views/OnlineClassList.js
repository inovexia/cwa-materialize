// ** React Imports
import React, { Fragment, useState, useCallback } from 'react'

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

  Checkbox,
  Switch,
  Menu, MenuItem, styled
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'

//
import Translationss from 'src/layouts/components/Translations'

// import extractUrlFromHtml from 'src/lib/common/extractUrlFromHtml'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { changeStatus } from 'src/pages/courses/_models/CourseModel'

import DeleteOnlineClassComponent from './DeleteOnlineClass'
import RemoveOnlineClassComponent from 'src/pages/courses/[guid]/onlineclass/[classguid]/RemoveOnlineClass'
import ChangeDateOnlineClass from 'src/pages/courses/[guid]/onlineclass/[classguid]/ChangeDate'

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
    id: 'startdate',
    numeric: false,
    disablePadding: false,
    label: 'UPDATED ON'
  },
  {
    id: 'start',
    numeric: false,
    disablePadding: false,
    label: 'Start'
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
  const { rows, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props

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



const RowOptions = ({ guid }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [drawerOpen, setDrawerOpen] = useState(false)

  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon icon='pepicons-pop:dots-y' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Link href={`/onlineclass/${guid}/preview/`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='carbon:view' style={{ marginRight: '10px' }} />
            View
          </MenuItem>
        </Link>
        <Link href={`/onlineclass/${guid}/edit/`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='tabler:edit' style={{ marginRight: '10px' }} />
            Edit
          </MenuItem>
        </Link>
        <Link href={`/onlineclass/${guid}/share/`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='ri:share-line' style={{ marginRight: '10px' }} />
            Share
          </MenuItem>
        </Link>
        <MenuItem>
          <DeleteOnlineClassComponent guid={guid} />
        </MenuItem>
      </Menu>
    </>
  )
}

const RowOptionsCourse = ({ courseGuid, guid }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [drawerOpen, setDrawerOpen] = useState(false)

  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  return (
    <>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon icon='pepicons-pop:dots-y' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Link href={`/courses/${courseGuid}/onlineclass/${guid}/preview/`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='carbon:view' style={{ marginRight: '10px' }} />
            View
          </MenuItem>
        </Link>
        <Link href={`/courses/${courseGuid}/onlineclass/${guid}/edit/`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='tabler:edit' style={{ marginRight: '10px' }} />
            Edit
          </MenuItem>
        </Link>
        <Link href={`/courses/${courseGuid}/onlineclass/${guid}/share/`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='ri:share-line' style={{ marginRight: '10px' }} />
            Share
          </MenuItem>
        </Link>
        <MenuItem>
          <RemoveOnlineClassComponent guid={guid} courseGuid={courseGuid} />
        </MenuItem>
        <MenuItem>
          <ChangeDateOnlineClass guid={guid} courseGuid={courseGuid} />
        </MenuItem>
      </Menu>
    </>
  )
}

const EnhancedTable = (props) => {
  // ** States
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])

  // const [guid, setGuid] = useState('')
  const [testStatus, setTestStatus] = useState(0)
  const [checked, setChecked] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const doReload = () => setReload(r => r + 1)

  // ** Props
  const { rows, responseStatus, responseMessage, courseGuid, meta } = props

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.guid)
      setSelected(newSelecteds)

      return
    }
    setSelected([])
  }

  const handleClick = (event, guid) => {
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  function extractUrlFromHtml(htmlContent) {
    const urlPattern = /https?:\/\/\S+(?=<\/p>)/ // Match URL until </p>
    const match = htmlContent.match(urlPattern)

    return match ? match[0] : ''
  }

  return (
    <>
      {/* <EnhancedTableToolbar numSelected={selected.length} /> */}

      <TableContainer component={Paper}>
        {rows && rows.length > 0 ? (
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
                  const extractedUrl = extractUrlFromHtml(row.details)

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
                          <Typography variant='body1'>{row.title}</Typography>
                          <Typography noWrap variant='caption'>{row.guid}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell >{ReactHtmlParser(row.details)}</TableCell>
                      <TableCell >{row.updated_on}</TableCell>
                      <TableCell>
                        <Link
                          sx={{ display: 'inline-block' }}
                          variant='outlined'
                          component={Link}
                          href={extractedUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Icon icon='octicon:play-24' style={{ marginRight: '10px' }} />
                        </Link>
                      </TableCell>
                      <TableCell>
                        {courseGuid && (
                          <RowOptionsCourse courseGuid={courseGuid} guid={row.guid} />
                        )}
                        {!courseGuid && (
                          <RowOptions guid={row.guid} />
                        )}
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
                    <Translationss text={responseMessage} message='No online classes found' />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div>No data found</div>
        )}
      </TableContainer>
      <TablePagination
        page={page}
        component='div'
        count={rows ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default EnhancedTable
