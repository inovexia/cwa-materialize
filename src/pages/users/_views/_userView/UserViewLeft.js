// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { DialogContentText, FormControlLabel, LinearProgress, InputAdornment, DialogActions, DialogContent, FormControl, DialogTitle, InputLabel, CardContent, CardActions, Box, Grid, Card, Button, Dialog, Select, Switch, Divider, MenuItem, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

//import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'

//import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

const roleColors = {
  admin: 'error',
  instructor: 'info',
  student: 'warning',
  teacher: 'success',
  parent: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const UserViewLeft = ({ dataList }) => {

  // ** States
  const [openEdit, setOpenEdit] = useState(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  if (dataList) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {dataList.avatar ? (
                <CustomAvatar
                  src={data.avatar}
                  variant='rounded'
                  alt={data.fullName}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color="primary"
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(
                    dataList.fullName
                      ? dataList.fullName
                      : `${dataList.first_name ? dataList.first_name : ''} ${dataList.last_name ? dataList.last_name : ''}`
                  )}
                </CustomAvatar>
              )}
              <Typography variant='h6' sx={{ mb: 2 }}>
                {dataList.first_name} {dataList.last_name}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={dataList.role}
                color={roleColors[dataList.role]}
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

            <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  {dataList.status === "1" ? (<CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }} color="success">
                    <Icon icon='mdi:check' />
                  </CustomAvatar>) : (<CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }} color="primary">
                    <Icon icon='gridicons:cross' />
                  </CustomAvatar>)}

                  <div>
                    <Typography variant='body2'>{dataList.status === "1" ? "Active" : "Inactive"}</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <Icon icon='mdi:briefcase-variant-outline' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      2
                    </Typography>
                    <Typography variant='body2'>Course Subscribed</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Username:
                  </Typography>
                  <Typography variant='body2'>@{dataList.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Billing Email:
                  </Typography>
                  <Typography variant='body2'>{dataList.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Status:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={dataList.status === "1" ? "Active" : "Inactive"}
                    color={statusColors[dataList.status === "1" ? "active" : "pending"]}
                    sx={{
                      height: 20,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Role:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {dataList.role}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Contact:</Typography>
                  <Typography variant='body2'>+{dataList.mobile}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>

            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Edit User Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='First Name' defaultValue={dataList.first_name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Username'
                        defaultValue={data.username}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Billing Email' defaultValue={data.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={data.status}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Pending</MenuItem>
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Contact' defaultValue={`+1 ${data.contact}`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                  Update
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>


      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
