// ** React Imports
import React, { useEffect, useState, useRef } from 'react'

import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, Fragment, Link, ListItemButton, Box, List, CardHeader, ListItem, ListItemIcon, ListItemText, Drawer, Button, styled, TextField, IconButton, Typography, CardContent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'

// ** API
import CourseApi from 'src/pages/courses/_components/Apis'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

const EditSectionLeft = props => {

  const router = useRouter()
  const { id } = router.query

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      created_by: 'ASI8'
    }
  })

  // ** Get Current Meeting Details
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await CourseApi.viewCourse(id)
        reset(res.payload)
      }
    }
    fetchData()
  }, [id, reset])

  const updateFormSubmit = async data => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    const res = await CourseApi.updateCourse({ id, data })
    if (res.success === true) {
      toast.success('Course updated successfully')
      setTimeout(() => {
        router.push('/courses')
      }, 3000)
    } else {
      toast.error('Failed to update course')
    }
  }

  const editorRef = useRef(null)

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <img
            src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
            srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
            loading="lazy"
            alt=""
            style={{ width: '100%', height: '300px' }}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant='h6' sx={{ mb: 2 }}> Description</Typography>
          <Typography variant='p'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
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
        <Box sx={{ mb: 3 }}>
          <List component='nav' aria-label='main mailbox'>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon sx={{ mr: 1 }}>
                <Icon icon="ph:dot-fill" fontSize={30} />
              </ListItemIcon>
              <ListItemText>Lorem ipsum dolor sit amet, </ListItemText>
            </ListItem>
          </List>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant='p'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='p' sx={{ mb: 2 }}>English Grammer PDF</Typography>
          </Box>
          <Button component="label" variant="contained" color="primary" size="small" startIcon={<Icon icon="material-symbols:download" />}>
            Download
          </Button>
          <Button component="label" variant="contained" color="success" size="small" sx={{ ml: 3 }} startIcon={<Icon icon="carbon:view" />}>
            Preview
          </Button>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='p' sx={{ mb: 2 }}>English Grammer PDF</Typography>
          </Box>
          <Button component="label" variant="contained" color="primary" size="small" startIcon={<Icon icon="material-symbols:download" />}>
            Download
          </Button>
          <Button component="label" variant="contained" color="success" size="small" sx={{ ml: 3 }} startIcon={<Icon icon="carbon:view" />}>
            Preview
          </Button>
        </Box>
      </CardContent>
    </Card >
  )
}

export default EditSectionLeft
