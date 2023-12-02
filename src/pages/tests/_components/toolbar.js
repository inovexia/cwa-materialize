import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Icon from 'src/@core/components/icon'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { Button, Link } from '@mui/material'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import toast, { Toaster } from 'react-hot-toast'

const Toolbar = ({ onUserSearch }) => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [status, setStatus] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])

  const handleSearchInputChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = async () => {
    // Call the searchUser function with the search input
    await searchUser({ search: searchInput })
  }

  const handleKeyPress = event => {
    // Check if Enter key is pressed
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const searchUser = async data => {
    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })

      const res = await UserApi.filterUsers(formData)

      if (res.success === true) {
        if (onUserSearch) {
          onUserSearch()
        }
      } else {
        toast.error('Failed to create user')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while creating the user')
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item sm={4} xs={12}>
        <FormControl fullWidth>
          <InputLabel id='role-select'>Select Role</InputLabel>
          <Select
            fullWidth
            value={role}
            id='select-role'
            label='Select Role'
            labelId='role-select'
            onChange={handleRoleChange}
            inputProps={{ placeholder: 'Select Role' }}
          >
            <MenuItem value=''>Select Role</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='author'>Author</MenuItem>
            <MenuItem value='editor'>Editor</MenuItem>
            <MenuItem value='maintainer'>Maintainer</MenuItem>
            <MenuItem value='subscriber'>Subscriber</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={4} xs={12}>
        <FormControl fullWidth>
          <InputLabel id='plan-select'>Select Plan</InputLabel>
          <Select
            fullWidth
            value={plan}
            id='select-plan'
            label='Select Plan'
            labelId='plan-select'
            onChange={handlePlanChange}
            inputProps={{ placeholder: 'Select Plan' }}
          >
            <MenuItem value=''>Select Plan</MenuItem>
            <MenuItem value='basic'>Basic</MenuItem>
            <MenuItem value='company'>Company</MenuItem>
            <MenuItem value='enterprise'>Enterprise</MenuItem>
            <MenuItem value='team'>Team</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item sm={4} xs={12}>
        <FormControl fullWidth>
          <InputLabel id='status-select'>Select Status</InputLabel>
          <Select
            fullWidth
            value={status}
            id='select-status'
            label='Select Status'
            labelId='status-select'
            onChange={handleStatusChange}
            inputProps={{ placeholder: 'Select Role' }}
          >
            <MenuItem value=''>Select Role</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default Toolbar
