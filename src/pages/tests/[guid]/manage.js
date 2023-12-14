
// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'
import { CardComponent } from 'src/pages/tests/_views/manage'

import { useRouter } from 'next/router'

const createData = (title, href, icon) => {
  return {
    title: title,
    href: href,
    icon: icon
  }
}


const Page = () => {

  const router = useRouter()
  const { guid } = router.query

  const questionsCard = [
    createData('All Questions', `/tests/${guid}/questions`, 'mdi:email-outline'),
    createData('Add Question', `/tests/${guid}/add_question`, 'mdi:email-outline'),
    createData('Upload Questions', `/tests/${guid}/upload`, 'mdi:email-outline'),
  ]

  const enrolmentCard = [
    createData('All Enrolments', `/tests/${guid}/enrolments`, 'mdi:email-outline'),
    createData('Enrol User', `/tests/${guid}/enrol`, 'mdi:email-outline'),
  ]

  const settingsCard = [
    createData('Settings', `/tests/${guid}/settings`, 'mdi:email-outline'),
    createData('Publish', `/tests/${guid}/status`, 'mdi:email-outline'),
    createData('Edit', `/tests/${guid}/edit`, 'mdi:email-outline'),
    createData('Archive', `/tests/${guid}/archive`, 'mdi:email-outline'),
    createData('Delete', `/tests/${guid}/delete`, 'mdi:email-outline'),
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Manage Test</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Questions'
          Count={40}
          ListItems={questionsCard}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Enrolments'
          Count={20}
          ListItems={enrolmentCard}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Settings'
          Count={''}
          ListItems={settingsCard}
        />
      </Grid>

    </Grid>
  )
}

export default Page
