// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// ** View Imports
import UploadQuestionComponent from 'src/pages/qb/_views/UploadQuestion'


const Page = props => {

  // ** Props
  const { open, toggle } = props

  // ** State
  const [isLoading, setLoading] = useState(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Create New Question</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Card>
          <CardContent>
            <UploadQuestionComponent />
          </CardContent>
        </Card>

      </Grid>
    </Grid>

  )
}

export default Page
