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


const SidebarAddSection = props => {
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
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Create Content</Typography>}
            subtitle={<Typography variant='body2'>All Subject Description</Typography>}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8.5}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(updateFormSubmit)}>
                <Grid container spacing={2}>
                  <FormControl fullWidth style={{ height: '0px', border: 'none', visibility: 'hidden' }}>
                    <Controller
                      style={{ height: '0px', border: 'none' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          style={{ height: '0px', border: 'none' }}
                          type='hidden'
                          variant='outlined'
                        />
                      )}
                      control={control}
                      name='created_by'
                    />
                  </FormControl>
                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Title'
                            variant='outlined'
                            error={!!errors.title}
                            helperText={errors.title && 'First name must be between 3 and 15 characters'}
                          />
                        )}
                        control={control}
                        name='title'
                        rules={{
                          required: 'Title is required',
                          minLength: {
                            value: 3,
                            message: 'Title should be at least 3 characters'
                          },
                          maxLength: {
                            value: 15,
                            message: 'Title should not exceed 15 characters'
                          }
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <label
                      htmlFor='description'
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        fontFamily: 'Arial',
                        marginBottom: '10px',
                        display: "block"
                      }}
                    >
                      Description
                    </label>
                    <FormEditorField
                      control={control}
                      name='description'
                      onInit={(evt, editor) => (editorRef.current = editor)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                  <Button variant='contained' size='medium' type='submit' sx={{ mt: 5 }}>
                    Update
                  </Button>
                  <Button variant='outlined' size='medium' component={Link} href='/meetings' sx={{ mt: 5, ml: 3 }}>
                    Cancel
                  </Button>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3.5}>
          <Card>
            <CardHeader title='Toolbar' />
            <CardContent>
              <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                <Grid item xs={6}>
                  <Button
                    variant='text'
                    className='no-radius'
                    //onClick={handleAddEditorField}
                    onClick={() => addContentBlock('Text')}
                    sx={{ display: 'block', width: '100%' }}
                  >
                    <Icon icon="gala:editor" />
                    <Typography
                      variant='body2'
                      sx={{
                        width: '100%',
                        display: 'block',
                        textAlign: 'center',
                      }}
                    >
                      HTML Code
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='text'
                    className='no-radius'
                    //onClick={handleAddMediaField}
                    onClick={() => addContentBlock('Image')}
                    sx={{ display: 'block', width: '100%' }}
                  >
                    <Icon icon="ph:image" />
                    <Typography
                      variant='body2'
                      sx={{
                        width: '100%',
                        display: 'block',
                        textAlign: 'center',
                      }}
                    >
                      Image
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='text'
                    className='no-radius'
                    //onClick={handleAddMediaField}
                    onClick={() => addContentBlock('Video')}
                    sx={{ display: 'block', width: '100%', backgroundColor: 'backgroundColor' }}
                  >
                    <Icon icon="ph:video-bold" />
                    <Typography
                      variant='body2'
                      sx={{
                        width: '100%',
                        display: 'block',
                        textAlign: 'center',
                      }}
                    >
                      Video
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='text'
                    className='no-radius'
                    //onClick={handleAddMediaField}
                    onClick={() => addContentBlock('File')}
                    sx={{ display: 'block', width: '100%' }}
                  >
                    <Icon icon="mingcute:pdf-line" />
                    <Typography
                      variant='body2'
                      sx={{
                        width: '100%',
                        display: 'block',
                        textAlign: 'center',
                      }}
                    >
                      PDF
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='text'
                    className='no-radius'
                    //onClick={handleAddUrlField}
                    onClick={() => addContentBlock('Link')}
                    sx={{ display: 'block', width: '100%' }}

                  >
                    <Icon icon="material-symbols:link" />
                    <Typography
                      variant='body2'
                      sx={{
                        width: '100%',
                        display: 'block',
                        textAlign: 'center',
                      }}
                    >
                      URL
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='text'
                    className='no-radius'
                    //onClick={handleAddUrlField}
                    onClick={() => addContentBlock('YoutubeLink')}
                    sx={{ display: 'block', width: '100%' }}
                  >
                    <Icon icon="ant-design:youtube-outlined" />
                    <Typography
                      variant='body2'
                      sx={{
                        width: '100%',
                        display: 'block',
                        textAlign: 'center',
                      }}
                    >
                      Youtube URL
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid >
    </>
  )
}

export default SidebarAddSection
