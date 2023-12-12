import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** Module Specific Imports
import CourseList from 'src/pages/courses/_views'
import CreateTest from 'src/pages/courses/create'
import Toolbar from 'src/pages/courses/_components/Toolbar'

// ** Actions Imports
import { ListTests } from 'src/pages/tests/_models/TestModel'
import ManageCourse from './_views/manage'




const Page = () => {


  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Manage Courses</Typography>}
            subtitle={<Typography variant='body2'>List all Courses</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <ManageCourse />
        </Grid>
      </Grid>
    </>
  )
}

export default Page
