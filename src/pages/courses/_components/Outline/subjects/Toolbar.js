import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports

import { Button, FormHelperText, Link, Grid, Box, Icon, Select, MenuItem, InputLabel, FormControl, TextField, IconButton } from '@mui/material'

import toast, { Toaster } from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

// ** Actions Imports
import { ListCourses } from 'src/pages/courses/_models/CourseModel'


const Toolbar = (props) => {

  // ** Props
  const { searchTerm, handleSearch, status, orderBy, handleType } = props

  return (
    <Grid container spacing={6}>
      <Grid item sm={4} xs={12}>
        <FormControl fullWidth>
          <TextField
            name='search'
            label='Search'
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            placeholder='Search (Title, Description)'
          />
        </FormControl>
      </Grid>
      {/* <Grid item sm={4} xs={12}>
        <FormControl fullWidth>
          <InputLabel id='status-select'>Select Status</InputLabel>
          <Select
            fullWidth
            value={status}
            id='select-status'
            label='Select Status'
            labelId='status-select'
            onChange={e => handleStatus(e.target.value)}
            inputProps={{ placeholder: 'Select Status' }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='1'>Published</MenuItem>
            <MenuItem value='0'>Unpublished</MenuItem>
          </Select>
        </FormControl>
      </Grid> */}
      {/* <Grid item sm={4} xs={12}>
        <FormControl fullWidth>
          <InputLabel id='type-select'>Order By</InputLabel>
          <Select
            fullWidth
            value={orderBy}
            id='select-type'
            label='Select Order'
            labelId='type-select'
            onChange={e => handleType(e.target.value)}
            inputProps={{ placeholder: 'Select Order' }}
          >
            <MenuItem value=''>Select Order</MenuItem>
            <MenuItem value='newest_first'>Newest First</MenuItem>
            <MenuItem value='newest_last'>Newest Last</MenuItem>
            <MenuItem value='last_name_asc'>Last Name ASC</MenuItem>
            <MenuItem value='last_name_desc'>Last Name DESC</MenuItem>
            <MenuItem value='first_name_asc'>First Name ASC</MenuItem>
            <MenuItem value='first_name_desc'>First Name DESC</MenuItem>
          </Select>
        </FormControl>
      </Grid> */}
    </Grid>
  )
}

export default Toolbar
