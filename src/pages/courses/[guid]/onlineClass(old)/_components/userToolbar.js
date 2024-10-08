import { useEffect, useState } from 'react'

// ** MUI Imports

import { Button, Link, Grid, Box, Icon, MenuItem, TextField, IconButton } from '@mui/material'

import toast from 'react-hot-toast'

const ShareToolbar = ({
  searchTerm,
  setSearchTerm,
  setLoader,
  onStatusFilterChange,
  onRoleFilterChange,
  onOrderFilterChange,
  onSelectedBulkAction,
  checkedIds,
  onSelectedBulkDelete,
  bulkAction,
  setBulkAction
}) => {
  const [statusFilter, setStatusFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [orderFilter, setOrderFilter] = useState('')
  const [selectedBulkAct, setSelectedBulkAct] = useState('')

  const handleSearchButtonClick = () => {
    handleSearch()
  }

  // Filter By Status
  const handleStatusFilterChange = event => {
    const selectedStatus = event.target.value
    setStatusFilter(selectedStatus)
    onStatusFilterChange(selectedStatus)
  }

  // Filter By Role
  const handleRoleFilterChange = event => {
    const selectedRole = event.target.value
    setRoleFilter(selectedRole)
    onRoleFilterChange(selectedRole)
  }

  // Filter By Order
  const handleOrderFilterChange = event => {
    const selectedOrder = event.target.value
    setOrderFilter(selectedOrder)
    onOrderFilterChange(selectedOrder)
  }

  // Bulk Action
  const handleBulkAction = event => {
    const selectedAction = event.target.value
    setBulkAction(selectedAction) // Pass the selected bulk action to the parent
  }

  return (
    <Grid container spacing={6}>
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          gap: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          label='Search'
          variant='outlined'
          size='small'
          fullWidth
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearchButtonClick}>
                <Icon icon='ic:baseline-search' />
              </IconButton>
            )
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          gap: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end'
        }}
      >
        <Box>
          <TextField select label='By Status' size='small' value={statusFilter} onChange={handleStatusFilterChange}>
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='1'>Active</MenuItem>
            <MenuItem value='0'>Inactive</MenuItem>
            <MenuItem value='2'>Pending</MenuItem>
            <MenuItem value='3'>Archive</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField select label='Filter By Role' size='small' value={roleFilter} onChange={handleRoleFilterChange}>
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='teacher'>Instructor</MenuItem>
            <MenuItem value='student'>Student</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField select label='Order By' size='small' value={orderFilter} onChange={handleOrderFilterChange}>
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='newest_first'>Newest First</MenuItem>
            <MenuItem value='newest_last'>Newest Last</MenuItem>
            <MenuItem value='last_name_asc'>Last Name ASC</MenuItem>
            <MenuItem value='last_name_desc'>Last Name DESC</MenuItem>
            <MenuItem value='first_name_asc'>First Name ASC</MenuItem>
            <MenuItem value='first_name_desc'>First Name DESC</MenuItem>
          </TextField>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ShareToolbar
