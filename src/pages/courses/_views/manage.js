import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography,CircularProgress  } from '@mui/material'
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




const ManageCourse = () => {
 

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title='Subject Settings' />
          <CardContent>
            <Box
              sx={{
                gap: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:not(:last-of-type)': { mb: 4 },
                color: theme => theme.palette.primary.main
              }}
            >
              <div>
                <Typography variant='body1'>All Subject</Typography>
              </div>
              <div>
                <Icon icon='gg:check-o' />
              </div>
            </Box>
            <Box
              sx={{
                gap: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:not(:last-of-type)': { mb: 4 },
                color: theme => theme.palette.primary.main
              }}
            >
              <div>
                <Typography variant='body1'>Add Subject</Typography>
              </div>
              <div>
                <Icon icon='icons8:plus' />
              </div>
            </Box>
            <Box
              sx={{
                gap: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:not(:last-of-type)': { mb: 4 },
                color: theme => theme.palette.primary.main
              }}
            >
              <div>
                <Typography variant='body1'>Delete Subject</Typography>
              </div>
              <div>
                <Icon
                  icon='mdi:delete-outline'
                  sx={{
                    pr: 2
                  }}
                />
              </div>
            </Box>
          </CardContent>
        </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Test Settings' />
            <CardContent>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:not(:last-of-type)': { mb: 4 },
                  color: theme => theme.palette.primary.main
                }}
              >
                <div>
                  <Typography variant='body1'>All Tests</Typography>
                </div>
                <div>
                  <Icon icon='gg:check-o' />
                </div>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:not(:last-of-type)': { mb: 4 },
                  color: theme => theme.palette.primary.main
                }}
              >
                <div>
                  <Typography variant='body1'>Add Test</Typography>
                </div>
                <div>
                  <Icon icon='icons8:plus' />
                </div>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:not(:last-of-type)': { mb: 4 },
                  color: theme => theme.palette.primary.main
                }}
              >
                <div>
                  <Typography variant='body1'>Delete Test</Typography>
                </div>
                <div>
                  <Icon icon='mdi:delete-outline' />
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Enrolment' />
            <CardContent>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:not(:last-of-type)': { mb: 4 },
                  color: theme => theme.palette.primary.main
                }}
              >
                <div>
                  <Typography variant='body1'>All Enrolment </Typography>
                </div>
                <div>
                  <Icon icon='gg:check-o' />
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Course Settings' />
            <CardContent>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:not(:last-of-type)': { mb: 4 },
                  color: theme => theme.palette.primary.main
                }}
              >
                <div>
                  <Typography variant='body1'>Publish</Typography>
                </div>
                <div>
                  <Icon icon='line-md:switch' />
                </div>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:not(:last-of-type)': { mb: 4 },
                  color: theme => theme.palette.primary.main
                }}
              >
                <div>
                  <Typography variant='body1'>Edit</Typography>
                </div>
                <div>
                  <Icon icon='mdi:pencil-outline' />
                </div>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:not(:last-of-type)': { mb: 4 },
                  color: theme => theme.palette.primary.main
                }}
              >
                <div>
                  <Typography variant='body1'>Delete</Typography>
                </div>
                <div>
                  <Icon icon='mdi:delete-outline' />
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ManageCourse
