import React from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, CardContent, Typography } from '@mui/material'

// ** Module Specific Imports
import AllOnlineClasses from 'src/pages/courses/[guid]/onlineclass/_views/AllOnlineClasses'

// ** Core Imports
import PageHeader from 'src/layouts/components/page-header'

const ExistingOnlineClasses = () => {
  const router = useRouter()
  const { guid, courseGuid } = router.query


  return (
    <>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Add existing class into the course</Typography>}
            subtitle={<Typography variant='body2'>List of all online classes</Typography>}
          // setReload={setReload}
          // doReload={doReload}
          />
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <AllOnlineClasses guid={guid} courseGuid={courseGuid} />
            </CardContent>
          </Card>
        </Grid>
      </Grid >
    </>
  )
}

export default ExistingOnlineClasses
