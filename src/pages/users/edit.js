import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** MUI Imports
import {
  Grid,
  Card,
  TextField,
  Button,
  Link,
  Box,
  CardHeader,
  CardContent,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'

// ** API
import UserApi from 'src/pages/users/_components/apis'
import AuthApi from 'src/configs/commonConfig'

const EditUser = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      role: 'student',
      status: '',
      mobile: '',
      email: ''
    }
  })

  const [reqField, setReqField] = useState('')

  // ** Get Current User Details
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await UserApi.viewUser(id)
          reset(res.payload)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  // ** Get Required Field
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthApi.RegRequiredField()
        setReqField(res && res.payload)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const updateFormSubmit = async data => {
    if (isValid) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
      const res = await UserApi.updateUser({ id, data: formData })
      if (res.success === true) {
        toast.success('User updated successfully')
        setTimeout(() => {
          router.push('/users')
        }, 3000)
      } else {
        toast.error('Failed to update user')
      }
    } else {
      console.log('Form has validation errors')
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Update User' />
            <CardContent>
              <form onSubmit={handleSubmit(updateFormSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4} sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='First Name'
                            variant='outlined'
                            error={!!errors.first_name}
                            helperText={errors.first_name && 'First name must be between 3 and 15 characters'}
                          />
                        )}
                        control={control}
                        name='first_name'
                        rules={{
                          required: 'First name is required',
                          minLength: {
                            value: 3,
                            message: 'First name should be at least 3 characters'
                          },
                          maxLength: {
                            value: 15,
                            message: 'First name should not exceed 15 characters'
                          }
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Middle Name'
                            variant='outlined'
                            error={!!errors.middle_name}
                            helperText={errors.middle_name && 'Middle name must be between 3 and 15 characters'}
                          />
                        )}
                        control={control}
                        name='middle_name'
                        rules={{
                          minLength: {
                            value: 3,
                            message: 'Middle name should be at least 3 characters'
                          },
                          maxLength: {
                            value: 15,
                            message: 'Middle name should not exceed 15 characters'
                          }
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                      <Controller
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Last Name'
                            variant='outlined'
                            error={!!errors.last_name}
                            helperText={errors.last_name && 'Last name must be between 3 and 15 characters'}
                          />
                        )}
                        control={control}
                        name='last_name'
                        rules={{
                          required: 'Last name is required',
                          minLength: {
                            value: 3,
                            message: 'Last name should be at least 3 characters'
                          },
                          maxLength: {
                            value: 15,
                            message: 'Last name should not exceed 15 characters'
                          }
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ mt: 3 }}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id='type-select-label'>User Role</InputLabel>
                      <Controller
                        name='role'
                        control={control}
                        defaultValue='student' // Default value set to 'student'
                        render={({ field }) => (
                          <Select {...field} labelId='type-select-label' id='type-select' label='User Role' required>
                            <MenuItem value='superadmin'>Super Admin</MenuItem>
                            <MenuItem value='admin'>Admin</MenuItem>
                            <MenuItem value='teacher'>Instructor</MenuItem>
                            <MenuItem value='student'>Student</MenuItem>
                            <MenuItem value='parent'>Parent</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ mt: 3 }}>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id='type-select-status'>Status</InputLabel>
                      <Controller
                        name='status'
                        control={control}
                        defaultValue='0'
                        render={({ field }) => (
                          <Select {...field} labelId='type-select-status' id='type-select' label='Status' required>
                            <MenuItem value='1'>Active</MenuItem>
                            <MenuItem value='0'>Inactive</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                      {reqField && reqField.email ? (
                        <Controller
                          render={({ field }) => <TextField {...field} label='Email' variant='outlined' required />}
                          control={control}
                          name='email'
                          pattern='[A-Za-z]{1,}'
                          rules={{
                            required: 'Email is required'
                          }}
                        />
                      ) : (
                        <Controller
                          render={({ field }) => <TextField {...field} label='Email' variant='outlined' />}
                          control={control}
                          name='email'
                          pattern='[A-Za-z]{1,}'
                        />
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} sx={{ mt: 3 }}>
                    <FormControl fullWidth>
                      {reqField && reqField.mobile ? (
                        <Controller
                          render={({ field }) => (
                            <TextField {...field} label='Mobile Number' variant='outlined' required />
                          )}
                          control={control}
                          name='mobile'
                          pattern='[A-Za-z]{1,}'
                          rules={{
                            required: 'Mobile number name is required'
                          }}
                        />
                      ) : (
                        <Controller
                          render={({ field }) => <TextField {...field} label='Mobile Number' variant='outlined' />}
                          control={control}
                          name='mobile'
                          pattern='[A-Za-z]{1,}'
                        />
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Button variant='contained' size='medium' type='submit' sx={{ mt: 5 }}>
                    Update
                  </Button>
                  <Button variant='contained' size='medium' component={Link} href='/user' sx={{ mt: 5, ml: 3 }}>
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
