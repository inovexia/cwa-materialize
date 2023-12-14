
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

  const courseOutlineCard = [
    createData('All Subject', `/tests/${guid}/questions`, 'iconoir:book'),
    createData('Add Subject', `/tests/${guid}/add_question`, 'gg:add'),
  ]

  const TestSettingsCard = [
    createData('All Test', `/tests/${guid}/questions`, 'quill:paper'),
    createData('Add Test', `/tests/${guid}/add_question`, 'gg:add'),
  ]

  const MeetingSettingsCard = [
    createData('All Meeting', `/tests/${guid}/questions`, 'mdi:virtual-meeting'),
    createData('Add Meeting', `/tests/${guid}/add_question`, 'gg:add'),
  ]

  const enrolmentCard = [
    createData('All Enrolments', `/tests/${guid}/enrolments`, 'mdi:user'),
    createData('Add Enrolments', `/tests/${guid}/enrol`, 'gg:add'),
  ]

  const settingsCard = [
    createData('Publish', `/tests/${guid}/status`, 'material-symbols:publish'),
    createData('Edit', `/tests/${guid}/edit`, 'tabler:edit'),
    createData('Archive', `/tests/${guid}/archive`, 'material-symbols:archive-outline'),
    createData('Delete', `/tests/${guid}/delete`, 'material-symbols:delete-outline'),
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Manage Course</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Course Outline'
          Count={40}
          ListItems={courseOutlineCard}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Test'
          Count={20}
          ListItems={TestSettingsCard}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Meeting'
          Count={'3'}
          ListItems={MeetingSettingsCard}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Enrolment'
          Count={'15'}
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
