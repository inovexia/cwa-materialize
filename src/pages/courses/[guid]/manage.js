
// ** MUI Imports
import { Grid, Box, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import ReactHtmlParser from 'react-html-parser'
import { ListSubjects } from 'src/pages/courses/_models/SubjectModel'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'
import { CardComponent } from 'src/pages/courses/_views/manage'

import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'

const createData = (title, href, icon) => {
  return {
    title: title,
    href: href,
    icon: icon
  }
}

import CourseApi from '../_components/Apis'

const Page = () => {

  const router = useRouter()
  const { guid } = router.query
  const [course, setCourse] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [tests, setTests] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [reload, setReload] = useState(0)
  const doReload = () => setReload(r => r + 1)

  /** GET CURRENT COURSE DATA */
  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseApi.viewCourse(guid)
      if (!res.success) return
      setCourse(res && res.payload)
    }
    fetchData()
  }, [guid])

  /** GET ALL SUBJECTS */
  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseApi.getSubjects(guid)
      if (!res.success) return
      setSubjects(res && res.payload.data)
    }
    fetchData()
  }, [guid])

  /** GET ALL TESTS */
  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData()
      const res = await CourseApi.filterTest({ guid, data: formData })
      if (!res.success) return
      setTests(res && res.payload.data)
    }
    fetchData()
  }, [guid])

  /** GET ALL MEETINGS */
  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData()
      const res = await CourseApi.filterMeetings({ guid, data: formData })
      if (!res.success) return
      setMeetings(res && res.payload.data)
    }
    fetchData()
  }, [guid])

  /** GET ALL ENROLLED USERS */
  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData()
      const res = await CourseApi.enrolledUsers({ guid, data: formData })
      if (!res.success) return
      setEnrolledUsers(res && res.payload.data)
    }
    fetchData()
  }, [guid])

  const courseOutlineCard = [
    createData('All Subject', `/courses/${guid}/subjects`, 'iconoir:book'),
    createData('Add Subject', `/courses/${guid}/subjects/create`, 'gg:add'),
  ]

  const TestSettingsCard = [
    createData('All Test', `/courses/${guid}/test`, 'quill:paper'),
    createData('Add Test', `/courses/${guid}/test/create`, 'gg:add'),
  ]

  const MeetingSettingsCard = [
    createData('All Online Class', `/courses/${guid}/onlineclass`, 'mdi:virtual-meeting'),
    createData('Add Online Class', `/courses/${guid}/meetings/create`, 'gg:add'),
  ]

  const enrolmentCard = [
    createData('All Enrollments', `/courses/${guid}/enrollments`, 'mdi:user'),
    createData('Add Enrollments', `/courses/${guid}/enrollments/create`, 'gg:add'),
  ]

  const settingsCard = [
    createData(course && course.status == "1" ? "Published" : "Unpublished", "", 'material-symbols:publish'),
    createData('Edit', `/courses/${guid}/edit`, 'tabler:edit'),
    createData('Archive', "", 'material-symbols:archive-outline'),
    createData('Delete', "", 'material-symbols:delete-outline'),
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5' component="h1">{course.title}</Typography>}
          subtitle={<Typography variant='body2'>{ReactHtmlParser(course.description)}</Typography>}
          buttonTitle='Back'
          buttonHref={`/courses/`}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Subjects'
          Count={subjects && subjects ? subjects.length : "0"}
          ListItems={courseOutlineCard}
          dataList={subjects}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Test'
          Count={tests && tests ? tests.length : "0"}
          ListItems={TestSettingsCard}
          dataList={tests}

        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Online Class'
          Count={meetings && meetings ? meetings.length : "0"}
          ListItems={MeetingSettingsCard}
          dataList={meetings}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Enrollment'
          Count={enrolledUsers && enrolledUsers ? enrolledUsers.length : "0"}
          ListItems={enrolmentCard}
          dataList={enrolledUsers}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Settings'
          Count={''}
          ListItems={settingsCard}
          dataList={course}
          doReload={doReload}
        />
      </Grid>
    </Grid>
  )
}

export default Page
