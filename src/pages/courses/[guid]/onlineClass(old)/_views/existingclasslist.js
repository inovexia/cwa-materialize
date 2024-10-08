// ** React Imports
import React, { useState, useCallback } from 'react'

// ** MUI Imports
import {
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
  Tooltip,
  Checkbox,
  Switch,
  Menu, MenuItem, styled
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles'
import ReactHtmlParser from 'react-html-parser'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import Translations from 'src/layouts/components/Translations'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
// import DeleteLesson from './delete'
import { changeStatus } from 'src/pages/courses/_models/LessonModel'
import CourseApi from 'src/pages/courses/_components/Apis'

const LinkStyled = styled(NextLink)(({ theme }) => ({
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
    id: 'createdby',
    numeric: false,
    disablePadding: false,
    label: 'Author'
  },
  {
    id: 'startdate',
    numeric: false,
    disablePadding: false,
    label: 'Start Date'
  },

  // {
  //   id: 'status',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Status'
  // },
  // {
  //   id: 'actions',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Actions'
  // }
]

function EnhancedTableHead(props) {
  const { query: { guid, subjectId } } = useRouter()

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

// const EnhancedTableToolbar = props => {
//   // ** Prop
//   const { numSelected } = props

//   return (
//     numSelected !== 0 ?
//       <Toolbar
//         sx={{
//           px: theme => `${theme.spacing(5)} !important`,
//           ...(numSelected > 0 && {
//             bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
//           })
//         }}
//       >
//         {numSelected > 0 ? (
//           <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
//             {numSelected} selected
//           </Typography>
//         ) : (
//           ''
//         )}
//         {numSelected > 0 ? (
//           <Tooltip title='Add'>
//             <IconButton sx={{ color: 'text.secondary' }}>
//               {/* <Icon icon='gg:add' /> */}
//               <Button variant='contained' size='medium' type='submit' >
//                 Add Online Class
//               </Button>
//             </IconButton>
//           </Tooltip>
//         ) : null}
//       </Toolbar>
//       : ""

//   )
// }

const RowOptions = ({ lessonId, onDelete }) => {
  const { query: { guid, subjectId }, push } = useRouter()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = (e) => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  // const handleDelete = () => {
  //   dispatch(deleteUser(id))
  //   handleRowOptionsClose()
  // }

  const handleItemClick = (lessonId) => {
    lessonId.stopPropagation()
    handleRowOptionsClose();
    handleDelete(lessonId);
  };

  const handleDelete = () => {
    onDelete(lessonId);
  };

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
          component={NextLink}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/courses/${guid}/subjects/${subjectId}/lesson/preview/${lessonId}`}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          Preview
        </MenuItem>
        <MenuItem
          component={NextLink}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/courses/${guid}/subjects/${subjectId}/lesson/edit/${lessonId}`}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{ '& svg': { mr: 2 } }}

          //onClick={handleRowOptionsClose}
          onClick={handleItemClick}
        >
          <Icon icon='material-symbols-light:delete' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const EnhancedTable = (props) => {
  const { query: { guid, subjectId }, push } = useRouter()

  // ** States
  const [page, setPage] = useState(0)
  const [order, setOrder] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState('10')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [guidToDelete, setGuidToDelete] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openArcModal, setOpenArcModal] = useState(false)

  // ** Props
  const { dataList, setDataList, responseStatus, responseMessage, meta } = props


  // console.log(dataList)
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

  const handleChangeStatus = (async (event, lessonId) => {
    const response = await changeStatus(event.target.checked, lessonId)
  })

  const isSelected = guid => selected.indexOf(guid) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0


  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenArcModal(false)
  }

  // Delete Lesson
  const handleItemDeleted = async () => {
    const updatedData = await CourseApi.allLesson(subjectId)
    if (!updatedData.success) return
    setDataList(updatedData.payload.data)

    //setMetaData(updatedData.payload.meta)
    setOpenModal(false)
  }

  const handleDelete = (guid) => {
    setGuidToDelete(guid);
    setOpenModal(true);
  };

  // console.log(dataList)
  return (
    <>
      {/* <EnhancedTableToolbar numSelected={selected.length} /> */}

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
          {dataList && dataList.length !== 0 ? (<TableBody>

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
                      <Checkbox checked={isItemSelected}
                        onChange={event => handleClick(event, row.guid)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component='th' id={labelId} scope='row' padding='none'>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <LinkStyled href={`/courses/${guid}/subjects/${subjectId}/lesson/${row.guid}/sections`} onClick={e => e.stopPropagation()}>{row.title}</LinkStyled>
                        <Typography noWrap variant='caption'>{row.guid}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell >{ReactHtmlParser(row.details)}</TableCell>
                    <TableCell ><Typography noWrap variant='body2'>{row.created_by}</Typography></TableCell>
                    <TableCell ><Typography noWrap variant='body2'>{row.created_on}</Typography></TableCell>

                    {/* <TableCell ><Switch defaultChecked={row.status === '1' ? true : false} onChange={event => handleChangeStatus(event, row.guid)} /></TableCell> */}
                    {/* <TableCell><RowOptions lessonId={row.guid} onDelete={handleDelete} /></TableCell> */}
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
                  <Translations text={responseMessage} message='No subject found' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>) : (<TableCell colSpan={6}>
            <Typography>No Online Class found</Typography>
          </TableCell>)}

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
    </>
  )
}

export default EnhancedTable
