// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const connectedAccountsArr = [
  {
    checked: true,
    title: 'User Registration',
    icon: 'mdi:user-outline',
    subtitle: 'Allow User Registration'
  },
  {
    checked: false,
    title: 'Email',
    icon: 'ic:outline-email',
    subtitle: 'Email Verification'
  },
  {
    checked: true,
    title: 'Username',
    icon: 'mdi:user-outline',
    subtitle: 'Auto Generate Username'
  },
  {
    checked: false,
    title: 'Approve',
    icon: 'ic:round-check',
    subtitle: 'Auto Approve'
  }
]

const connectedRegisterArr = [
  {
    checked: false,
    title: 'Email',
    icon: 'ic:outline-email',
    subtitle: 'Use Mobile Number Field',

  },
  {
    checked: true,
    title: 'Mobile',
    icon: 'ic:outline-phone',
    subtitle: 'Use Email Field'
  }
]

const TabRegister = () => {
  return (
    <Grid container spacing={6}>
      {/* Connected Accounts Cards */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Registration Setting' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Settings are given for the user to login through email Or mobile.
            </Typography>
            <form>
              {connectedAccountsArr.map(account => {
                return (
                  <Box
                    key={account.title}
                    sx={{
                      gap: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:not(:last-of-type)': { mb: 4 }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 4, display: 'flex', justifyContent: 'center' }}>
                        <Icon icon={account.icon} size='30' />
                      </Box>
                      <div>
                        <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          {account.subtitle}
                        </Typography>
                      </div>
                    </Box>
                    <Switch defaultChecked={account.checked} />
                  </Box>
                )
              })}
              <Grid container sx={{ mt: 3 }}>
                <Grid xs={6} md={8}>
                  <Typography sx={{ mb: 4, color: 'text.secondary' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 4, display: 'flex', justifyContent: 'center' }}>
                        <Icon icon="mdi:user-outline" />
                      </Box>
                      <div>
                        <Typography sx={{ fontWeight: 500 }}>Role</Typography>
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          lorem
                        </Typography>
                      </div>
                    </Box>
                  </Typography>
                </Grid>
                <Grid xs={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id='status-select'>User Role</InputLabel>
                    <Select
                      fullWidth
                      value={status}
                      id='User-Role'
                      label='User Role'
                      labelId='status-select'
                      onChange={e => handleStatus(e.target.value)}
                      inputProps={{ placeholder: 'User Role' }}
                    >
                      <MenuItem value=''>Admin</MenuItem>
                      <MenuItem value='1'>Teacher</MenuItem>
                      <MenuItem value='0'>Student</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <Button variant='contained' sx={{ mr: 3 }}>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Required Registration' />
          <CardContent>
            <form>
              {connectedRegisterArr.map(account => {
                return (
                  <Box
                    key={account.title}
                    sx={{
                      gap: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:not(:last-of-type)': { mb: 4 }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 4, display: 'flex', justifyContent: 'center' }}>
                        <Icon icon={account.icon} size='30' />
                      </Box>
                      <div>
                        <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          {account.subtitle}
                        </Typography>
                      </div>
                    </Box>
                    <Switch defaultChecked={account.checked} />
                  </Box>
                )
              })}
              <Button size='large' type='submit' variant='contained' sx={{ mt: 4 }}>
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TabRegister
