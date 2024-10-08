import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

// ** MUI Imports
import { Grid, Card, TextField, Button, CardHeader, CardContent, FormControl } from '@mui/material'

// ** API
import CourseApi from 'src/pages/courses/_components/Apis'

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'

const EditCourse = () => {
  const { query: { guid }, push } = useRouter()
  const editorRef = useRef(null)
  const [loading, setLoading] = useState(true)

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

  const updateFormSubmit = async data => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })
    const res = await CourseApi.updateCourse({ guid, data })
    if (res.success === true) {
      toast.success('Course updated successfully')
      setTimeout(() => {
        push('/courses')
      }, 3000)
    } else {
      toast.error('Failed to update course')
    }
  }

  // ** Get Current Course Details
  useEffect(() => {
    const fetchData = async () => {
      if (guid) {
        setLoading(true)
        const res = await CourseApi.viewCourse(guid)
        setLoading(false)
        reset(res.payload)
      }
    }
    fetchData()
  }, [guid, reset])

  if (loading) return null

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Edit Course' />
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
                  <Button variant='contained' size='medium' component={NextLink} href={`/courses`} sx={{ mt: 5, ml: 3 }}>
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

export default EditCourse
