import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'

const TestSetting = () => {

  return (
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
      </CardContent>
    </Card>
  )
}

export default TestSetting
