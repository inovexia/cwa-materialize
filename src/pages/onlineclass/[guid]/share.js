import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** MUI Imports
import { Grid, Card, TextField, Button, Link, CardHeader, CardContent, FormControl, useTheme, Typography } from '@mui/material'

// ** Action Module
import { ShareOnlineClass, GetEnrolUserList } from 'src/pages/onlineclass/_models/OnlineClassModel'

// ** Module Specific Imports
import EnrolUser from 'src/pages/onlineclass/_views/enroluserlist'


//import CreateQuestion from 'src/pages/qb/create'
import Toolbar from 'src/pages/onlineclass/_components/Toolbar'

// ** Core Imports
import PageHeader from 'src/layouts/components/page-header'

const ShareOnlineClasses = () => {
  const router = useRouter()
  const { guid } = router.query
  // ** state
  const [startDate, setStartDate] = useState(new Date()); // Initial start date
  const [endDate, setEndDate] = useState(new Date());
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [reload, setReload] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
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
