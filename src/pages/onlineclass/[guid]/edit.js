import React, { useEffect, useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, TextField, Button, Link, CardHeader, CardContent, FormControl, useTheme } from '@mui/material'

// ** Action Module
import { EditOnlineClass, ViewOnlineClass } from 'src/pages/onlineclass/_models/OnlineClassModel'

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'

// ** date picker component 
import PickersBasic from 'src/lib/common/datepicker/PickersBasic'

const EditOnlineClasses = () => {
  const router = useRouter()
  const { guid } = router.query
  // ** state
  const [isLoading, setLoading] = useState(false)
  const [choices, setChoices] = useState([])
  const [startDate, setStartDate] = useState(new Date()); // Initial start date
  const [endDate, setEndDate] = useState(new Date());

  //popperPlacement
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  // Initial end date

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
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

  // /** FETCH ONLINE CLASS  */
  useEffect(() => {
    const fetchData = async () => {
      if (guid) {
        setLoading(true)
        const response = await ViewOnlineClass(guid)
        setLoading(false)
        if (response.success === false) {
          toast.error(response.message)
        }
        reset(response.payload)
        // if (response.payload) {
        //   setChoices(response.payload)
        //   setCount(response.payload.length)
        // }
      }
    }
    fetchData()
  }, [guid])

  /** EDIT ONLINE CLASS  */
  const onSubmit = async (data) => {
    if (guid) {
      await EditOnlineClass(guid, data)
        .then(response => {
          if (response.success === true) {
            toast.success(response.message)
            setTimeout(() => {
              router.push('/onlineclass')
            }, 3000)
          } else {
            toast.error(response.message)
          }
        })
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
            <CardHeader title='Update Online Class' />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                            helperText={errors.title && 'Title must be between 3 and 15 characters'}
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
                            value: 25,
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
                <Grid container spacing={2} sx={{ mt: 5 }}>
                  <Grid item xs={12} md={3}>
                    <PickersBasic
                      popperPlacement={popperPlacement}
                      label='Start Date'
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <PickersBasic
                      popperPlacement={popperPlacement}
                      label='End Date'
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                  <Button variant='contained' size='medium' type='submit' sx={{ mt: 5 }}>
                    Update
                  </Button>
                  <Button variant='outlined' size='medium' component={Link} href='/onlineclass' sx={{ mt: 5, ml: 3 }}>
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

export default EditOnlineClasses
