// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import toast from 'react-hot-toast'
import CustomChip from 'src/@core/components/mui/chip'
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


const ViewCourse = () => {


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Course Details</Typography>}
          subtitle={<Typography variant='body2'>All Course Description</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{
              gap: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Typography variant='h5'>English Grammer</Typography>
              <CustomChip circle label='English Category' skin='light' color='error' />
            </Box>
            <Box sx={{
              pt: 5,
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
              py: 5,
            }}>
              <Typography variant='h6' sx={{ mb: 2 }}>By the numbers</Typography>
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.7 }}>
                  <Typography variant='body1' sx={{ mr: 2, color: 'text.primary' }}>
                    Subject:
                  </Typography>
                  <Typography variant='body2'>12</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.7 }}>
                  <Typography variant='body1' sx={{ mr: 2, color: 'text.primary' }}>
                    Lesson:
                  </Typography>
                  <Typography variant='body2'>12</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.7 }}>
                  <Typography variant='body1' sx={{ mr: 2, color: 'text.primary' }}>
                    Section:
                  </Typography>
                  <Typography variant='body2'>25</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.7 }}>
                  <Typography variant='body1' sx={{ mr: 2, color: 'text.primary' }}>
                    Created By:
                  </Typography>
                  <Typography variant='body2'>ASI5</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.7 }}>
                  <Typography variant='body1' sx={{ mr: 2, color: 'text.primary' }}>
                    Created On:
                  </Typography>
                  <Typography variant='body2'>2023-11-05</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.7 }}>
                  <Typography variant='body1' sx={{ mr: 2, color: 'text.primary' }}>
                    Status:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label='Publish'
                    color='success'
                  />
                </Box>
              </Box>
            </Box>
            <Divider />
          </CardContent>
        </Card>
      </Grid>
    </Grid >
  )
}

export default ViewCourse
