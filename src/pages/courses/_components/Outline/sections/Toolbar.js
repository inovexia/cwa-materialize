import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports

import { Button, FormHelperText, Link, Grid, Box, Icon, Select, MenuItem, InputLabel, FormControl, TextField, IconButton } from '@mui/material'

import toast, { Toaster } from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

// ** Actions Imports
import { ListCourses } from 'src/pages/courses/_models/CourseModel'


const Toolbar = (props) => {

  // ** Props
  const { searchTerm, handleSearch } = props

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
    </Grid>
  )
}

export default Toolbar
