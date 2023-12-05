import React, { useState } from 'react'
import { Box, TextField, MenuItem, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Pagination as MuiPagination } from '@mui/material'
const ITEMS_PER_PAGE = 5

const Pagination = ({ currentPage, onPageChange, itemPerPage, setItemPerPage, metaData }) => {
  //const pageCount = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const [selectedNum, setSelectedNum] = useState('')

  const handleChange = (event, value) => {
    onPageChange(value)
  }
  // Filter By Status
  const handlePerPage = event => {
    const selectedItem = event.target.value
    setSelectedNum(selectedItem)
    setItemPerPage(selectedItem)
  }
  return (
    <>
      <Box
        sx={{
          px: 8,
          py: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Box>
          <TextField select label='Items Per Page' size='small' value={itemPerPage} onChange={handlePerPage}>
            <MenuItem value='5'>5</MenuItem>
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='20'>20</MenuItem>
            <MenuItem value='50'>50</MenuItem>
            <MenuItem value='100'>100</MenuItem>
          </TextField>
        </Box>
        {metaData && (
          <MuiPagination count={metaData.last_page} page={currentPage} onChange={handleChange} color='primary' />
        )}
      </Box>
    </>
  )
}

export default Pagination
