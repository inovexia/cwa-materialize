// ** React Imports
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import NextLink from "next/link"
import { serialize } from 'object-to-formdata';
// ** MUI Imports
import { Grid, Card, Fragment, Link, ListItemButton, Box, List, CardHeader, ListItem, ListItemIcon, ListItemText, Drawer, Button, styled, TextField, IconButton, Typography, CardContent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'

// ** API
import CourseApi from 'src/pages/courses/_components/Apis'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

const CreateSectionLeft = ({ passedValue, contentType }) => {
  const { query: { guid, subjectId, lessonId } } = useRouter()
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
  console.log(passedValue)
  const handleFormSubmit = async data => {
    console.log('Content Type:', contentType);
    return;
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const res = await CourseApi.createSection({ lessonId, data })
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
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <label
              htmlFor='sectiontitle'
              style={{
                fontSize: 16,
                fontWeight: 500,
                fontFamily: 'Arial',
                marginBottom: '10px',
                display: "block"
              }}
            >
              Section Title
            </label>
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
            <FormEditorField
              control={control}
              name='description'
              onInit={(evt, editor) => (editorRef.current = editor)}
            />
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px' }}>
            <Button
              type='submit'
              color='primary'
              variant='contained'
            >
              <span>SAVE</span>
            </Button>
            <Button size='large' variant='outlined' component={NextLink} href="#" color='secondary'>
              Cancel
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card >
  )
}

export default CreateSectionLeft
