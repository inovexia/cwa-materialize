// ** React Imports
import { useState } from 'react'

// ** MUI Imports

import { styled, Typography, Box, Grid } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Divider from '@mui/material/Divider';
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { AddTest } from 'src/pages/tests/_models/TestModel'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'
import PreviewSection from '../_views/outline/sections/preview'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))

const defaultValues = {
  title: '',
  type: '',
  details: '',
  category: ''
}

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  type: yup.string().required(),
  details: yup.string(),
  category: yup.string()
})


const SectionPreview = () => {


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Preview Subject</Typography>}
          subtitle={<Typography variant='body2'>All Subject Description</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <PreviewSection />
      </Grid>
    </Grid >
  )
}

export default SectionPreview
