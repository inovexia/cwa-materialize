import React, { useEffect, useState } from 'react'
import { Grid, Box, Button, Dialog, DialogActions, DialogContent, FormControl, TextField, FormHelperText, MenuItem, DialogTitle } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API
import CourseApi from 'src/pages/courses/_components/Apis'

const schema = yup.object().shape({
  title: yup.string().required()
})

const EditCategory = ({ mdOpen, handleClose, guid, onItemDeleted, doReload, dataList }) => {
  const [open, setOpen] = useState(mdOpen)
  const [parentId, setParentId] = useState('')
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setOpen(mdOpen)
  }, [mdOpen])

  useEffect(() => {
    setOpen(mdOpen)
  }, [mdOpen])

  const handleFormSubmit = async data => {
    const formData = new FormData()
    if (parentId) {
      formData.append("parent_guid", parentId)
    }
    formData.append("title", data.title)
    setLoading(true);
    const response = await CourseApi.updateCategory({ guid, data: formData });

    setOpen(false)
    if (!response.success) return toast.error('Failed to edit category')
    toast.success('Category edited successfully')
    setLoading(false);
    doReload();
    if (onItemDeleted) onItemDeleted()
    reset();
  }

  // ** Get Current Meeting Details
  useEffect(() => {
    const fetchData = async () => {
      if (guid) {
        const res = await CourseApi.viewCategory(guid)
        reset(res.payload)
      }
    }
    fetchData()
  }, [reset, guid])


  // Filter By Role
  const handleRoleFilterChange = event => {
    const selectedRole = event.target.value
    setParentId(selectedRole)

  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Edit Category'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl fullWidth sx={{ mb: 6, paddingTop: "10px" }}>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label='Title'
                  value={value}
                  onChange={onChange}
                  placeholder='Title'
                  error={Boolean(errors.title)}
                />
              )}
            />
            {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
          </FormControl>
          <Box>
            <TextField select label='Parent Category' size='small' value={parentId} onChange={handleRoleFilterChange} style={{ width: '100%' }}>
              <MenuItem value=''>Select Category</MenuItem>
              {dataList.map((item) => (
                <MenuItem value={item.guid} key={item.guid}>{item.title}</MenuItem>
              ))}
            </TextField>
          </Box>
          <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px', padding: "0" }}>
            <Button onClick={handleClose} size='medium' variant='outlined' color='secondary'>
              Cancel
            </Button>
            <LoadingButton
              type='submit'
              color='primary'
              loading={loading}
              loadingPosition='start'
              startIcon={loading ? <Icon icon='eos-icons:bubble-loading' /> : ''}
              variant='contained'
              autoFocus
            >
              <span>UPDATE</span>
            </LoadingButton>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditCategory
