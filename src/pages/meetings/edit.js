import React, { useEffect, useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, TextField, Button, Link, CardHeader, CardContent, FormControl } from '@mui/material'

// ** API
import MeetingApi from 'src/pages/meetings/_components/apis'

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'

const EditUser = () => {
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
      details: '',
      created_by: 'ASI8'
    }
  })

  // ** Get Current Meeting Details
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await MeetingApi.viewMeeting(id)
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
    const res = await MeetingApi.updateMeeting({ id, data })
    if (res.success === true) {
      toast.success('Meeting updated successfully')
      setTimeout(() => {
        router.push('/meetings')
      }, 3000)
    } else {
      toast.error('Failed to update meeting')
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
            <CardHeader title='Update Meeting' />
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
                      htmlFor='details'
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        fontFamily: 'Arial',
                        marginBottom: '10px'
                      }}
                    >
                      Class Details
                    </label>
                    <FormEditorField
                      control={control}
                      name='details'
                      onInit={(evt, editor) => (editorRef.current = editor)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                  <Button variant='contained' size='medium' type='submit' sx={{ mt: 5 }}>
                    Update
                  </Button>
                  <Button variant='contained' size='medium' component={Link} href='/meetings' sx={{ mt: 5, ml: 3 }}>
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

export default EditUser
