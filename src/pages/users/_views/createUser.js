// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API
import UserApi from 'src/pages/users/_components/apis'
import AuthApi from 'src/configs/commonConfig'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  username: yup.string(),
  first_name: yup.string().required().min(3).max(15),
  middle_name: yup.string(),
  last_name: yup.string().required().min(3).max(15),
  role: yup.string().required(),
  status: yup.string(),
  email: yup.string()
})

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [settings, setSettings] = useState('')
  const [reqField, setReqField] = useState('')
  const [loading, setLoading] = useState(false)

  // ** Hooks
  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      role: 'student',
      status: '1',
      mobile: '',
      email: ''
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  // Get Settings
  useEffect(() => {
    const fetchSetting = async () => {
      const res = await AuthApi.regCommonSettings()
      setSettings(res && res.payload)
    }
    fetchSetting()
  }, [])

  // Get Required Field
  useEffect(() => {
    const fetchData = async () => {
      const res = await AuthApi.RegRequiredField()
      setReqField(res && res.payload)
    }
    fetchData()
  }, [])

  const handleFormSubmit = async data => {
    setLoading(true)
    const response = await UserApi.createUser(data)
    setLoading(false)
    if (!response.success) return toast.success(response.message)
    props.setReload(true)
    toggle()
    reset()
  }

  const handleClose = () => {
    toggle()
    reset()
  }
  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={handleClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
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
          {settings && settings.auto_generate_username !== 'true' ? (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='username'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label='Username'
                    value={value}
                    required
                    onChange={onChange}
                    placeholder='Username'
                    error={Boolean(errors.username)}
                  />
                )}
              />
              {errors.username && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>
              )}
            </FormControl>
          ) : (
            ''
          )}

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='first_name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label='First Name'
                  value={value}
                  onChange={onChange}
                  placeholder='John'
                  error={Boolean(errors.first_name)}
                />
              )}
            />
            {errors.first_name && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.first_name.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='middle_name'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label='Middle Name'
                  value={value}
                  onChange={onChange}
                  placeholder='Middle Name'
                  error={Boolean(errors.middle_name)}
                />
              )}
            />
            {errors.middle_name && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.middle_name.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='last_name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  label='Last Name'
                  value={value}
                  onChange={onChange}
                  placeholder='Doe'
                  error={Boolean(errors.last_name)}
                />
              )}
            />
            {errors.last_name && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.last_name.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='user-role'>User Role</InputLabel>
            <Controller
              name='role'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  fullWidth
                  //value={value}
                  label='User Role'
                  labelId='userRoleLabel'
                  onChange={onChange}
                  defaultValue='student'
                  error={Boolean(errors.role)}
                  inputProps={{ placeholder: 'Select Role' }}
                >
                  <MenuItem value='superadmin'>Super Admin</MenuItem>
                  <MenuItem value='admin'>Admin</MenuItem>
                  <MenuItem value='teacher'>Instructor</MenuItem>
                  <MenuItem value='student'>Student</MenuItem>
                  <MenuItem value='parent'>Parent</MenuItem>
                </Select>
              )}
            />
            {errors.role && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='user-status'>Status</InputLabel>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Select
                  fullWidth
                  value={value}
                  label='Status'
                  labelId='statusLabel'
                  onChange={onChange}
                  defaultValue='1'
                  error={Boolean(errors.status)}
                  inputProps={{ placeholder: 'Select Status' }}
                >
                  <MenuItem value='1'>Active</MenuItem>
                  <MenuItem value='0'>Inactive</MenuItem>
                </Select>
              )}
            />
            {errors.status && (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                This field is required
              </FormHelperText>
            )}
          </FormControl>
          {reqField && reqField.email ? (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label='Email'
                    value={value}
                    required
                    onChange={onChange}
                    placeholder='Email'
                    error={Boolean(errors.email)}
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
          ) : (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <TextField {...register('email')} label='Email' variant='outlined' name='email' pattern='[A-Za-z]{1,}' />
            </FormControl>
          )}
          {reqField && reqField.mobile ? (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='mobile'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label='Mobile Number'
                    value={value}
                    required
                    onChange={onChange}
                    placeholder='Mobile Number'
                    error={Boolean(errors.mobile)}
                  />
                )}
              />
              {errors.mobile && <FormHelperText sx={{ color: 'error.main' }}>{errors.mobile.message}</FormHelperText>}
            </FormControl>
          ) : (
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='mobile'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label='Mobile Number'
                    value={value}
                    onChange={onChange}
                    placeholder='Mobile Number'
                    error={Boolean(errors.mobile)}
                  />
                )}
              />
              {errors.mobile && <FormHelperText sx={{ color: 'error.main' }}>{errors.mobile.message}</FormHelperText>}
            </FormControl>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <LoadingButton
              type='submit'
              color='secondary'
              loading={loading}
              loadingPosition='start'
              startIcon={loading ? <Icon icon='eos-icons:bubble-loading' /> : ''}
              variant='contained'
            >
              <span>SUBMIT</span>
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

export default SidebarAddUser
