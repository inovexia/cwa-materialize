import React, { useEffect, useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, TextField, FormHelperText, Button, Link, CardHeader, CardContent, FormControl } from '@mui/material'

// ** Course API
import CourseApi from 'src/pages/courses/_components/Apis'

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'

const CreateSubject = () => {
  const router = useRouter()
  const { guid } = router.query

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: ''
    }
  })


  const handleFormSubmit = async data => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    const res = await CourseApi.createSubject({ guid, data })
    if (res.success === true) {
      toast.success('Subject created successfully')
      setTimeout(() => {
        router.push(`/courses/${guid}/subjects`)
      }, 500)
    } else {
      toast.error('Failed to create subject')
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
          <Card>
            <CardHeader title='Create Subject' />
            <CardContent>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                            value: 100,
                            message: 'Title should not exceed 15 characters'
                          }
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <FormControl fullWidth sx={{ mb: 6 }}>
                      <Controller
                        name='description'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            label='Description'
                            value={value}
                            rows={5}
                            multiline
                            onChange={onChange}
                            placeholder='Description'
                            error={Boolean(errors.description)}
                          />
                        )}
                      />
                      {errors.description && <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                  <Button variant='contained' size='medium' type='submit' sx={{ mt: 5 }}>
                    Create
                  </Button>
                  <Button variant='contained' size='medium' component={Link} href={`/courses/${guid}/subjects`} sx={{ mt: 5, ml: 3 }}>
                    Cancel
                  </Button>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateSubject
