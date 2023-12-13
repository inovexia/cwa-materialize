import React, { useEffect, useState, useRef, useCallback } from 'react'

// ** MUI Imports
import { Grid } from '@mui/material'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'

// ** Module Specific Imports

import TestSetting from './manage/TestSetting'
import EnrolmentSetting from './manage/EnrolmentSetting'
import CourseSetting from './manage/CourseSetting'
import SubjectSetting from './manage/SubjectSetting'
import MeetingSetting from './manage/MeetingSetting'
const ManageCourse = () => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <SubjectSetting />
      </Grid>
      <Grid item xs={12} md={6}>
        <TestSetting />
      </Grid>
      <Grid item xs={12} md={6}>
        <MeetingSetting />
      </Grid>
      <Grid item xs={12} md={6}>
        <EnrolmentSetting />
      </Grid>
      <Grid item xs={12} md={6}>
        <CourseSetting />
      </Grid>

    </Grid>
  )
}

export default ManageCourse
