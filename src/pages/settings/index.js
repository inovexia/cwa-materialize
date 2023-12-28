// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { Tab, Card, CardHeader, CardContent, TextField } from '@mui/material'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTabList from '@mui/lab/TabList'
// ** MUI Imports
import { Grid } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'
import TabRegister from './_component/TabRegister'
import TabLogin from './_component/TabLogin'
import TabGeneral from './_component/TabGeneral'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// Styled TabList component
const TabList = styled(MuiTabList)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minHeight: 38,
    minWidth: 110,
    borderRadius: 8,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}))

const Page = () => {
  // ** State
  const [value, setValue] = useState('general')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Settings</Typography>}
          subtitle={<Typography variant='body2'>All App Settings</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='customized tabs example'>
            <Tab value='general' label='General' icon={<Icon icon="icon-park-outline:setting-web" />} iconPosition='start' sx={{ alignItems: 'center' }} />
            <Tab value='register' label='Register' icon={<Icon icon="mdi:user-outline" />} iconPosition='start' sx={{ alignItems: 'center' }} />
            <Tab value='login' label='Login' />
          </TabList>
          <TabPanel value='general' sx={{ px: 0 }}>
            <TabGeneral />
          </TabPanel>
          <TabPanel value='register' sx={{ px: 0 }}>
            <TabRegister />
          </TabPanel>
          <TabPanel value='login' sx={{ px: 0 }}>
            <TabLogin />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default Page
