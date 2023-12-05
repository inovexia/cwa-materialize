import { useEffect, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import MenuItem from '@mui/material/MenuItem'
import { Button, Link } from '@mui/material'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import toast from 'react-hot-toast'

// ** API
import UserApi from 'src/pages/users/components/apis'

const Toolbar = ({
  setSearchTerm,
  setLoader,
  onStatusFilterChange,
  onRoleFilterChange,
  onOrderFilterChange,
  onSelectedBulkAction,
  checkedLength,
  onSelectedBulkDelete
}) => {
  const [searchInput, setSearchInput] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [orderFilter, setOrderFilter] = useState('')
  const [bulkAction, setBulkAction] = useState('')
  const [selectedBulkAct, setSelectedBulkAct] = useState('')

  const handleSearchInputChange = event => {
    setSearchTerm(event.target.value)
  }
  // Search
  const handleSearch = async () => {
    setLoader(true)
    try {
      const searchData = { search: searchInput }
      const res = await UserApi.filterUsers(searchData)
      if (res.success === true) {
        if (setSearchTerm) {
          setSearchTerm(searchInput) // Pass the search term to the parent
        }
      } else {
        toast.error('Failed to fetch search results')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while fetching search results')
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

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
    setSelectedBulkAct(selectedAction)
    onSelectedBulkAction(selectedAction) // Pass the selected bulk action to the parent
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
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
          onKeyPress={handleKeyPress}
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
        <Box>
          <TextField
            select
            label='Action'
            size='small'
            disabled={checkedLength.length === 0}
            value={selectedBulkAct}
            onChange={handleBulkAction}
          >
            <MenuItem value='1'>Active</MenuItem>
            <MenuItem value='0'>Inactive</MenuItem>
            <MenuItem value='delete'>Delete</MenuItem>
            <MenuItem value='archive'>Archive</MenuItem>
          </TextField>
        </Box>
        <Box>
          <Button variant='contained' color='primary' component={Link} href='/users/create'>
            Create User
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Toolbar
