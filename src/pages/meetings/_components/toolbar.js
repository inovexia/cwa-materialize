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
import MeetingApi from 'src/pages/meetings/_components/apis'

const Toolbar = ({
  searchTerm,
  setSearchTerm,
  setLoader,
  onStatusFilterChange,
  onRoleFilterChange,
  onOrderFilterChange,
  onSelectedBulkAction,
  checkedLength,
  onSelectedBulkDelete,
  bulkAction,
  setBulkAction,
  handleSearchChange,
  searchQuery,
  setSearchQuery
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
          value={searchQuery}
          onChange={handleSearchChange}

          //onChange={event => setSearchQuery(event.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton>
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
          <TextField
            select
            label='Action'
            size='small'
            disabled={checkedLength.length === 0}
            value={selectedBulkAct}
            onChange={handleBulkAction}
          >
            <MenuItem value='delete'>Delete</MenuItem>
          </TextField>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Toolbar
