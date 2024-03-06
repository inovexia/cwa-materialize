import React from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, CardContent, Typography } from '@mui/material'

// ** Module Specific Imports
import UnEnrolUser from 'src/pages/courses/[guid]/onlineclass/_views/UnenrolUserList'

// ** Core Imports
import PageHeader from 'src/layouts/components/page-header'

const AddUserOnlineClasses = () => {
  const router = useRouter()
  const { guid, classguid } = router.query


  return (
    <>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Add user in online class</Typography>}
            subtitle={<Typography variant='body2'>List all Enrolment</Typography>}
          // setReload={setReload}
          // doReload={doReload}
          />
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <UnEnrolUser guid={guid} classguid={classguid} />
            </CardContent>
          </Card>
        </Grid>
      </Grid >
    </>
  )
}

export default AddUserOnlineClasses
