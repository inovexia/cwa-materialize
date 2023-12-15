// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Drawer, Select, Button, MenuItem, styled, TextField, IconButton, InputLabel, Typography, Box, FormControl, FormHelperText, CircularProgress, Card, Grid, CardHeader, CardContent, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Divider } from '@mui/material'

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


const ViewCourse = () => {


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>English Grammer</Typography>}
          subtitle={<Typography variant='body2'>Lorem lpsm lorem lorem</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{
              pt: 1, pb: 4
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
              <img
                src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
                srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
                loading="lazy"
                alt=""
                style={{ width: '100%', height: '300px' }}
              />
            </Box>
            <Divider />
            <Box sx={{
              py: 5,
            }}>
              <Typography variant='h6' sx={{ mb: 2 }}>Category</Typography>
              <CustomChip circle label='English Category' skin='light' color='error' />
            </Box>
            <Divider />
            <Box sx={{
              py: 5,
            }}>
              <Typography variant='h6' sx={{ mb: 2 }}>Status</Typography>
              <CustomChip circle label='Publish' skin='light' color='success' />
            </Box>
            <Divider />
            <Box sx={{
              py: 5,
            }}>
              <Typography variant='h6' sx={{ mb: 2 }}>By the numbers</Typography>
              <List component='nav' aria-label='main mailbox'>
                <ListItem disablePadding sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <Icon icon="solar:book-bold" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText>Subject: 5</ListItemText>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <Icon icon="carbon:book" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText>Lesson: 25</ListItemText>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <Icon icon="jam:book" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText>Section: 40</ListItemText>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <Icon icon="mdi:user-outline" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText>Created By: ASI5</ListItemText>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 2 }}>
                  <ListItemIcon>
                    <Icon icon="fontisto:date" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText>Created On: 2023-11-05</ListItemText>
                </ListItem>
              </List>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ViewCourse
