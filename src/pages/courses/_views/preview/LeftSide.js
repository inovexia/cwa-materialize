// ** React Imports
import { useState } from 'react'


import { Drawer, styled, Select, Button, MenuItem, TextField, IconButton, InputLabel, Typography, Box, FormControl, FormHelperText, CircularProgress, Card, Grid, CardHeader, CardContent, Divider } from '@mui/material/styles'

import toast from 'react-hot-toast'
import CustomChip from 'src/@core/components/mui/chip'
// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { AddTest } from 'src/pages/tests/_models/TestModel'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

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


const LeftSide = () => {


  return (
    <Card>
      <CardContent>
        <Box sx={{
          pt: 1,
        }}>
          <img
            src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
            srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            loading="lazy"
            alt=""
            style={{ width: '100%', height: '300px' }}
          />
        </Box>
        <Box sx={{
          py: 5,
        }}>
          <Typography variant='h6' sx={{ mb: 2 }}> Description</Typography>
          <Typography variant='p'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </Typography>
        </Box>
        <Divider />
        <Box sx={{
          pt: 5,
        }}>
          <video
            autoPlay
            loop
            muted
            // poster="https://assets.codepen.io/6093409/river.jpg"
            style={{ width: '100%', height: '100%' }}
          >
            <source
              src="https://assets.codepen.io/6093409/river.mp4"
              type="video/mp4"

            />
          </video>
        </Box>
      </CardContent>
    </Card>
  )
}

export default LeftSide
