
// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Switch, Typography, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material'
import toast from 'react-hot-toast'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'
import { CardComponent } from 'src/pages/tests/_views/manage'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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
  const { guid, testGuid } = router.query

  const questionsCard = [
    createData('All Questions', `/courses/${guid}/test/${testGuid}/questions`, 'fluent-mdl2:survey-questions'),
    createData('Add Question', `/courses/${guid}/test/${testGuid}/add_question`, 'carbon:add-filled'),
    createData('Upload Questions', `/courses/${guid}/test/${guid}/upload`, 'material-symbols:upload'),
  ]

  const enrolmentCard = [
    createData('All Enrolments', `/courses/${guid}/test/${testGuid}/enrolments`, 'fluent-mdl2:open-enrollment'),
    createData('Enrol User', `/courses/${guid}/test/${testGuid}/enrol`, 'mdi:users'),
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
          Count={"  "}
          ListItems={questionsCard}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Enrolments'
          Count={""}
          ListItems={enrolmentCard}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader
            title={'Settings'}
            action={''}
          />
          <CardContent>
            <>
              <List component='nav' aria-label='main mailbox'>
                <ListItem disablePadding>
                  <ListItemButton href={`/courses/${guid}/test/${testGuid}/setting`}>
                    <ListItemIcon>
                      <Icon icon="uil:setting" fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary={'Settings'} />
                  </ListItemButton>
                </ListItem>
                <ListItem enablePadding>
                  <ListItemIcon>
                    <Icon icon="material-symbols:publish" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={'Publish'} />
                  <Switch defaultChecked={'true'} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href={`/courses/${guid}/test/${testGuid}/setting`}>
                    <ListItemIcon>
                      <Icon icon="mdi:edit-outline" fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary={'Edit'} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href={`/courses/${guid}/test/${testGuid}/setting`}>
                    <ListItemIcon>
                      <Icon icon="material-symbols:archive" fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary={'Archive'} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href={`/courses/${guid}/test/${testGuid}/setting`}>
                    <ListItemIcon>
                      <Icon icon="material-symbols:delete" fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary={'Delete'} />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
          </CardContent>
        </Card >
      </Grid>

    </Grid>
  )
}

export default Page
