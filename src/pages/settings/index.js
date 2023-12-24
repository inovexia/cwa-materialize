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
  const [value, setValue] = useState('1')

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
            <Tab value='1' label='General' />
            <Tab value='2' label='Register' />
            <Tab value='3' label='Login' />
          </TabList>
          <TabPanel value='1' sx={{ px: 0 }}>
            <TabGeneral />
          </TabPanel>
          <TabPanel value='2'>
            <TabRegister />
          </TabPanel>
          <TabPanel value='3'>
            <TabLogin />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default Page
