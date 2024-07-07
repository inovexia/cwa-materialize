import React, { useEffect, useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'

// ** MUI Imports
import { Grid, Card, CardActions, TextField, Button, Link, CardHeader, CardContent, Typography, FormControl, useTheme } from '@mui/material'

// ** Action Module
import { ViewOnlineClass } from 'src/pages/onlineclass/_models/OnlineClassModel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PreviewClass = () => {
  const router = useRouter()
  const { guid } = router.query

  // ** state
  const [isLoading, setLoading] = useState(false)
  const [choices, setChoices] = useState([])
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])



  // /** FETCH ONLINE CLASS  */
  useEffect(() => {
    const fetchData = async () => {
      if (guid) {
        setLoading(true)
        const response = await ViewOnlineClass(guid)
        setLoading(false)
        if (response.success === false) {
          toast.error(response.message)
        }

        // reset(response.payload)
        if (response.payload) {
          setDataList(response.payload)

          // setCount(response.payload.length)
        }
      }
    }
    fetchData()
  }, [guid])

  function extractUrlFromHtml(htmlContent) {
    const urlPattern = /https?:\/\/\S+(?=<\/p>)/; // Match URL until </p>
    const match = htmlContent && htmlContent.match(urlPattern); // Check if htmlContent is defined

    return match ? match[0] : '';
  }

  const extractedUrl = extractUrlFromHtml(dataList.details)

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Typography variant='h6' sx={{ mb: 2 }}>
                Title:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
                {dataList.title}
              </Typography>
              <Typography variant='h6'>
                Details:
              </Typography>
              <Typography variant='body2'>
                {ReactHtmlParser(dataList.details)}
              </Typography>
            </CardContent>
            <CardActions className='card-action-dense' sx={{ ml: 2 }}>
              <Button variant='contained' component={Link}
                href={extractedUrl}
                target='_blank' rel='noopener noreferrer'>
                Join Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default PreviewClass
