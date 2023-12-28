// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import toast from 'react-hot-toast'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { AddTest, GetCategories } from 'src/pages/tests/_models/TestModel'
import { Button, CircularProgress, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material'


// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const defaultValues = {
  title: '',
  type: 'evaluated',
  details: '',
  category_guid: ''
}


const schema = yup.object().shape({
  title: yup.string().required().min(3),
  type: yup.string().required(),
  details: yup.string(),
  category: yup.string()
})

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))


const SidebarAddTest = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [categories, setCategories] = useState([])
  const [isLoading, setLoading] = useState(false)

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    toggle()
    reset()
  }

  const getCategories = useCallback(async () => {
    const response = await GetCategories()

    return response
  }, [])

  useEffect(() => {
    getCategories()
      .then((response) => {
        if (response.success) {
          setCategories(response.payload)
        }
      })
  }, [getCategories])


  const onSubmit = async (data) => {
    setLoading(true)
    const response = await AddTest(data)
    setLoading(false)
    if (response.success === true) {
      toast.success(response.message)
    } else {
      toggle()
      toast.error(response.message)
    }
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={toggle}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Category</Typography>
        <IconButton size='small' onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 4 }}>
        {responseMessage && (
          <FormHelperText sx={{ color: 'error.main' }}>Cannot submit due to server error </FormHelperText>
        )}
      </Box>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Category Name'
                        onChange={onChange}
                        placeholder='Category name'
                        error={Boolean(errors.title)}
                        aria-describedby='validation-schema-title'
                      />
                    )}
                  />
                  {errors.title && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-title'>
                      {errors.title.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <Controller
                    name='category_guid'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <Select
                          fullWidth
                          value={value}
                          defaultValue=''
                          label='Parent Category'
                          labelId='categoryLabel'
                          onChange={onChange}
                          error={Boolean(errors.category_guid)}
                          inputProps={{ placeholder: 'Parent Category' }}
                        >
                          {categories.length > 0 && categories.map(({ guid, title }, i) =>
                            (<MenuItem value={guid} key={i}>{title}</MenuItem>)
                          )}
                        </Select>
                      )
                    }}
                  />
                  {errors.category_guid && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                      {errors.category_guid.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>


              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button size='large' type='submit' variant='contained' disabled={isLoading ? true : false}>
                  {isLoading ? (
                    <CircularProgress
                      sx={{
                        color: 'common.white',
                        width: '20px !important',
                        height: '20px !important',
                        mr: theme => theme.spacing(2)
                      }}
                    />
                  ) : null}
                  Submit
                </Button>
                <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>

            </Grid>
          </form>

        </CardContent>
      </Card>

    </Drawer>
  )
}

export default SidebarAddTest
