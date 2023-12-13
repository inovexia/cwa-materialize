import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, Avatar, CustomChip, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import Switch from '@mui/material/Switch'
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
              <Switch />
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
              <Typography variant='body1'>archive</Typography>
            </div>
            <div>
              <Switch />
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
