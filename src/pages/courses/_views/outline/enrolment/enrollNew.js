// ** React Imports
import React, { useState, useCallback } from 'react'

// ** MUI Imports
import {
  Button,
  Box,
  Grid,
  TextField,
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
  Menu, MenuItem, styled, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { serialize } from 'object-to-formdata';

import Translations from 'src/layouts/components/Translations'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { EnrollUser } from 'src/pages/courses/_models/CourseModel'

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

const EnhancedTableToolbar = props => {
  // ** Prop
  const { numSelected, setOpen } = props

  const enrollUser = async => {
    setOpen(true)
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
          <>
            <Tooltip title='Enrolment'>
              <IconButton sx={{ color: 'text.secondary' }} onClick={enrollUser}>
                <Typography component="h5">Enroll</Typography> <Icon icon="mdi:user" fontSize={20} />
              </IconButton>
            </Tooltip>
          </>

        ) : null}
      </Toolbar>
      : ""

  )
}

const RowOptions = ({ guid }) => {

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = (event) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  const [drawerOpen, setDrawerOpen] = useState(false)

  /** HANDLE CREATE TEST DRAWER */
  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

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
          sx={{ '& svg': { mr: 2 } }}
          onClick={toggleCreateDrawer}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Change Date
        </MenuItem>
        <MenuItem
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
        >
          <Icon icon='material-symbols-light:delete' fontSize={20} />
          Unenroll
        </MenuItem>
      </Menu>
    </>
  )
}

const EnhancedTable = (props) => {
  const router = useRouter()
  const { guid } = router.query

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // ** States
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [testStatus, setTestStatus] = useState(0)
  const [checked, setChecked] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const [open, setOpen] = useState(false)
  const doReload = () => setReload(r => r + 1)

  // ** Props
  const { rows, dataList, responseStatus, responseMessage } = props

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
    event.stopPropagation()
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    event.stopPropagation()
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }


  const isSelected = guid => selected.indexOf(guid) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0


  // Get Current date time
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleClose = () => {
    setOpen(false)
  }


  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    selected.forEach((userId, index) => {
      formData.append(`users[${index}]`, userId);
    });

    formData.append('start_date', data.start_date.replace('T', ' '));
    formData.append('end_date', data.end_date.replace('T', ' '));

    const response = await EnrollUser({ guid, data: formData });

    if (response.success === true) {
      toast.success(response.message);
      setOpen(false)
    } else {
      toast.error(response.message);
    }
  };




  return (
    <>
      <EnhancedTableToolbar numSelected={selected.length} setOpen={setOpen} />
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
                        <LinkStyled href='/tests/manage'>{row.first_name} {row.last_name}</LinkStyled>
                        <Typography noWrap variant='caption'>{row.guid}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><RowOptions guid={row.guid} /></TableCell>
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
        rowsPerPageOptions={[10, 25, 50, 100]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Set Start and End Date'}</DialogTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogContent>
            <Grid container sx={{ py: 3 }} spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="start_date"
                  control={control}
                  defaultValue={getCurrentDateTime()}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="datetime-local"
                      label="Select Start Date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="end_date"
                  control={control}
                  defaultValue={getCurrentDateTime()}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="datetime-local"
                      label="Select End Date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined'>
              Cancel
            </Button>
            <Button type="submit" autoFocus variant='contained'>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default EnhancedTable
