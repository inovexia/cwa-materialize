
// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Link, Typography, CircularProgress } from '@mui/material'
import toast from 'react-hot-toast'
import { ListSubjects } from 'src/pages/courses/_models/SubjectModel'

// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'
import { CardComponent } from 'src/pages/courses/_views/outline/subjects/manage'

import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'

const createData = (title, href, icon) => {
  return {
    title: title,
    href: href,
    icon: icon
  }
}

import CourseApi from 'src/pages/courses/_components/Apis'
const Manage = () => {

  const router = useRouter()
  const { guid, subjectId } = router.query
  const [subject, setSubject] = useState("");
  const [lessons, setLessons] = useState([]);
  const doReload = () => setReload(r => r + 1)

  /** GET CURRENT COURSE DATA */
  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseApi.viewSubject(subjectId)
      if (!res.success) return
      setSubject(res && res.payload)
    }
    fetchData()
  }, [subjectId])

  /** GET ALL LESSON */
  useEffect(() => {
    const fetchData = async () => {
      const res = await CourseApi.allLesson(subjectId)
      if (!res.success) return
      setLessons(res && res.payload.data)
    }
    fetchData()
  }, [subjectId])


  const courseOutlineCard = [
    createData('All Lesson', `/courses/${guid}/subjects/${subjectId}/lesson`, 'iconoir:book'),
    createData('Add Lesson', `/courses/${guid}/subjects/${subjectId}/lesson/create`, 'gg:add'),
  ]

  const settingsCard = [
    createData(subject && subject.status == "1" ? "Published" : "Unpublished", "", 'material-symbols:publish'),
    createData('Edit', `/courses/${guid}/subjects/edit/${subjectId}`, 'tabler:edit'),
    createData('Archive', "", 'material-symbols:archive-outline')
  ]
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Manage Subject</Typography>}
          subtitle={<Typography variant='body2'></Typography>}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          guid={guid}
          CardTitle='Lessons'
          Count={lessons && lessons ? lessons.length : "0"}
          ListItems={courseOutlineCard}
          dataList={lessons}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardComponent
          CardTitle='Settings'
          Count={''}
          ListItems={settingsCard}
          dataList={subject}
          doReload={doReload}
          subjectId={subjectId}
          guid={guid}
        />
      </Grid>
    </Grid>
  )
}

export default Manage
