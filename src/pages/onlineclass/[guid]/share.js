import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, CardContent, useTheme, Typography } from '@mui/material'

// ** Module Specific Imports
import EnrolUser from 'src/pages/onlineclass/_views/EnrolUserList'

// ** Core Imports
import PageHeader from 'src/layouts/components/page-header'
const ShareOnlineClasses = () => {
  const router = useRouter()
  const { guid } = router.query

  //popperPlacement
  const theme = useTheme()
  const { direction } = theme


  return (
    <>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>User already in online class</Typography>}
            subtitle={<Typography variant='body2'>List all Enrolment</Typography>}
            buttonHref={`/onlineclass/${guid}/addUsers`}
            // toggleDrawer={toggleCreateDrawer}
            buttonTitle='Add Users'
          // setReload={setReload}
          // doReload={doReload}
          />
          <Card sx={{ mt: 4 }}>
            {/* <CardHeader title='User already in online class' /> */}
            <CardContent>
              <EnrolUser guid={guid} />
            </CardContent>
          </Card>
        </Grid>
      </Grid >
    </>
  )
}

export default ShareOnlineClasses
