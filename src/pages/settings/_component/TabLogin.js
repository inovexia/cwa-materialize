// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
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



const TabLogin = () => {
  return (
    <Grid container spacing={6}>
      {/* Connected Accounts Cards */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Login Setting' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Settings are given for the user to login through email Or mobile.
            </Typography>

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
          </CardContent>
          <CardContent>
            <Button variant='contained' sx={{ mr: 3 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setFormData(initialData)}>
              Reset
            </Button>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

export default TabLogin
