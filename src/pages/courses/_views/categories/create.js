// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import { Drawer, Button, MenuItem, styled, TextField, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
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

// ** API
import CourseApi from 'src/pages/courses/_components/Apis'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))


const schema = yup.object().shape({
  title: yup.string().required().min(3).max(15)
})

const SidebarAddCategory = props => {
  // ** Props
  const { open, toggle, doReload, dataList } = props

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [parentId, setParentId] = useState('')

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

  const handleFormSubmit = async data => {
    const formData = {};
    if (parentId) {
      formData.parent_guid = parentId;
    }

    // Include other form data fields
    Object.assign(formData, data);
    setLoading(true);
    const response = await CourseApi.createCategory(formData);
    setLoading(false);

    if (!response.success) {
      return toast.success(response.message);
    }

    doReload();
    toggle();
    reset();
  }



  // Filter By Role
  const handleRoleFilterChange = event => {
    const selectedRole = event.target.value
    setParentId(selectedRole)

  }

  const handleClose = () => {
    toggle()
    reset()
  }

  const editorRef = useRef(null)

  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={handleClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Create Category</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      {responseMessage && responseMessage ? (
        <Box sx={{ p: 4 }}>
          {responseMessage && <FormHelperText sx={{ color: 'error.main' }}>{responseMessage}</FormHelperText>}
        </Box>
      ) : (
        ''
      )}
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '30px' }}>
            <LoadingButton
              type='submit'
              color='primary'
              loading={loading}
              loadingPosition='start'
              startIcon={loading ? <Icon icon='eos-icons:bubble-loading' /> : ''}
              variant='contained'
              disabled={errors.title ? true : false}
            >
              <span>SAVE</span>
            </LoadingButton>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddCategory
