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
import { useForm, Controller } from 'react-hook-form'

// ** Actions Imports
import { listTests } from 'src/pages/tests/_models/TestModel'


const Toolbar = ( props ) => {

  // ** Props
  const { searchTerm, handleSearch, status, handleStatus, type, handleType } = props

  return (
      <Grid container spacing={6}>
        <Grid item sm={4} xs={12}>
          <FormControl fullWidth>
            <TextField
              name='search'
              label='Search'
              value={searchTerm}
              onChange={e => handleSearch(e.target.value)}
              placeholder='Search (Title, Details)'
            />
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
              onChange={e=>handleStatus(e.target.value)}
              inputProps={{ placeholder: 'Select Status' }}
            >
              <MenuItem value=''>Select Status</MenuItem>
              <MenuItem value='1'>Published</MenuItem>
              <MenuItem value='0'>Unpublished</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={4} xs={12}>
          <FormControl fullWidth>
            <InputLabel id='type-select'>Filter By</InputLabel>
            <Select
              fullWidth
              value={type}
              id='select-type'
              label='Select Type'
              labelId='type-select'
              onChange={e=>handleType(e.target.value)}
              inputProps={{ placeholder: 'Select Type' }}
            >
              <MenuItem value=''>Select Type</MenuItem>
              <MenuItem value='evaluated'>Ascending</MenuItem>
              <MenuItem value='practice'>Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
  )
}

export default Toolbar
