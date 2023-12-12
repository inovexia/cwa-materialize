import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'

const CourseSetting = () => {

  return (
    <>
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
    </>
  )
}

export default CourseSetting
