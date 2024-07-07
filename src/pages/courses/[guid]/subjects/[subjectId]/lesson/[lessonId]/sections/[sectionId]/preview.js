// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports

import { styled, Typography, Box, Grid } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup'


// ** Component Imports
import PageHeader from 'src/layouts/components/page-header'

// import PreviewSection from '../_views/outline/sections/preview'
import SectionContent from 'src/pages/courses/_views/SectionContent'

// API
import { SecPreview } from 'src/pages/courses/_models/SectionModel'

const SectionPreview = () => {
  const { query: { guid, subjectId, lessonId, sectionId } } = useRouter()
  const [dataList, setDataList] = useState([])
  const [parentData, setParentData] = useState("")
  const [loader, setLoader] = useState(true)

  //** GET ALL LESSON OF CURRENT SUBJECT */
  useEffect(() => {
    const fetchData = async () => {
      const res = await SecPreview(sectionId)
      if (!res.success) return setLoader(false)
      setLoader(false)
      setParentData(res.payload)
      setDataList(res.payload.content)

    };
    fetchData();
  }, [sectionId]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <PageHeader
          title={<Typography variant='h5'>Preview Section</Typography>}
          subtitle={<Typography variant='body2'>{parentData.title}</Typography>}
          buttonHref={`/courses/${guid}/subjects/${subjectId}/lesson/${lessonId}/sections`}
          buttonTitle='Back'
        />
      </Grid>
      <Grid item xs={12}>
        <SectionContent dataList={dataList} />
      </Grid>
    </Grid >
  )
}

export default SectionPreview
