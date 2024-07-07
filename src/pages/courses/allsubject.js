import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardMedia, List, ListItem, ListItemIcon, ListItemText, CardActions, Pagination, Avatar, Chip, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import Switch from '@mui/material/Switch'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

const AllSubject = () => {

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>All Subject</Typography>}
            subtitle={<Typography variant='body2'>List all Courses</Typography>}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia sx={{ height: 201 }} image='https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800' />
            <CardContent sx={{ pt: 4, pb: 2 }} >
              <Typography variant='h6' sx={{ mb: 2 }}>
                English Grammer 2
              </Typography>
              <Typography variant='body1'>
                Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister
              </Typography>
              <List component='nav' aria-label='main mailbox'>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon icon="solar:book-bold" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText>Subject: 5</ListItemText>
                </ListItem>
              </List>
            </CardContent>
            <CardActions className='card-action-dense' sx={{ ml: 3, mb: 3 }}>
              <Button variant='contained'>View Subject</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia sx={{ height: 201 }} image='https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800' />
            <CardContent sx={{ pt: 4, pb: 2 }} >
              <Typography variant='h6' sx={{ mb: 2 }}>
                English Grammer 2
              </Typography>
              <Typography variant='body1'>
                Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister
              </Typography>
              <List component='nav' aria-label='main mailbox'>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon icon="solar:book-bold" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText>Subject: 5</ListItemText>
                </ListItem>
              </List>
            </CardContent>
            <CardActions className='card-action-dense' sx={{ ml: 3, mb: 3 }}>
              <Button variant='contained'>View Subject</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia sx={{ height: 201 }} image='https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800' />
            <CardContent sx={{ pt: 4, pb: 2 }} >
              <Typography variant='h6' sx={{ mb: 2 }}>
                English Grammer 2
              </Typography>
              <Typography variant='body1'>
                Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister
              </Typography>
              <List component='nav' aria-label='main mailbox'>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon icon="solar:book-bold" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText>Subject: 5</ListItemText>
                </ListItem>
              </List>
            </CardContent>
            <CardActions className='card-action-dense' sx={{ ml: 3, mb: 3 }}>
              <Button variant='contained'>View Subject</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={6} sx={{ py: 5, my: 5 }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <div className='demo-space-y'>
            <Pagination count={10} variant='outlined' color='secondary' />
          </div>
        </Grid>

      </Grid>

    </>


  )
}

export default AllSubject
