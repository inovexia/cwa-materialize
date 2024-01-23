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
import CreateSectionLeft from 'src/pages/courses/_views/outline/sections/createleftside'
import ButtonRightSidebar from 'src/pages/courses/_views/outline/sections/buttonType'


const SidebarAddSection = props => {
  const router = useRouter()
  const { id } = router.query
  const [selectedType, setSelectedType] = useState(null);
  const [valueToPass, setValueToPass] = useState('');
  const [contentType, setContentType] = useState('');
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
  }, [id])

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

  const updateValue = (newValue, newContentType) => {
    setValueToPass(newValue);
    setContentType(newContentType);
  };
  const handleDrawerContent = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Create Section</Typography>}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8.5}>
          <CreateSectionLeft passedValue={valueToPass} contentType={contentType} />
        </Grid>
        <Grid item xs={12} md={3.5}>
          <ButtonRightSidebar handleDrawerContent={handleDrawerContent} />
        </Grid>
      </Grid >
    </>
  )
}

export default SidebarAddSection
