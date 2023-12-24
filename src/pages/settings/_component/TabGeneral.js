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



const TabGeneral = () => {
  return (
    <Grid container spacing={6}>
      {/* Connected Accounts Cards */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='General Setting' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Change whole app color through this color palette
            </Typography>


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

export default TabGeneral
