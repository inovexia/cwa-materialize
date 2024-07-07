import { useState } from 'react'

// ** MUI Imports
import { Grid, Box, MenuItem, TextField, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

// ** API
//import { useUserContextApi, useUserContextData } from '../_context/UserContext'

const Toolbar = ({
  checkedLength,
  setBulkAction,
  searchTerm,
  loader,
  handleSearch,
  statusFilter,
  handleStatus,
  roleFilter,
  handleRole,
  orderFilter,
  handleOrder,
  selectedLength
}) => {

  const [selectedBulkAct, setSelectedBulkAct] = useState('')

  // const { searchTerm } = useUserContextData()
  // const { setSearchTerm } = useUserContextApi()


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
          onChange={e => handleSearch(e.target.value)}
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
          <TextField select label='By Status' size='small' value={statusFilter} onChange={e => handleStatus(e.target.value)}>
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='1'>Active</MenuItem>
            <MenuItem value='0'>Inactive</MenuItem>
            <MenuItem value='2'>Pending</MenuItem>
            <MenuItem value='3'>Archive</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField select label='Filter By Role' size='small' value={roleFilter} onChange={e => handleRole(e.target.value)}>
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='teacher'>Instructor</MenuItem>
            <MenuItem value='student'>Student</MenuItem>
          </TextField>
        </Box>
        <Box>
          <TextField select label='Order By' size='small' value={orderFilter} onChange={e => handleOrder(e.target.value)}>
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

export default Toolbar
