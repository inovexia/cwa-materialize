// ** React Imports
import React, { useEffect, useState, useRef, useCallback } from 'react'

import { useRouter } from 'next/router'
// ** MUI Imports
import { Grid, Card, Alert, Fragment, Link, ListItemButton, Box, List, CardHeader, ListItem, ListItemIcon, ListItemText, Drawer, Button, styled, TextField, IconButton, Typography, CardContent } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Component
import FormEditorField from 'src/layouts/components/common/formEditorField'

// ** API
import CourseApi from 'src/pages/courses/_components/Apis'

import CreateSectionDrawer from 'src/pages/courses/_components/Outline/sections/CreateDrawer'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))
const CreateSectionRight = ({ updateValue }) => {
  const [currentPage, setCurrentPage] = useState('1')
  const [itemPerPage, setItemPerPage] = useState('10')
  const [checkedIds, setCheckedIds] = useState([])
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState(undefined)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reload, setReload] = useState(0)
  const [loader, setLoader] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [orderFilter, setOrderFilter] = useState('')
  const [bulkAction, setBulkAction] = useState('')
  const [contentType, setContentType] = useState('html')
  const doReload = () => setReload(r => r + 1)
  /** HANDLE CREATE TEST DRAWER */

  const handleDrawerContent = (value) => {
    const newValue = value
    updateValue(newValue);
    setContentType(value)
    setDrawerOpen(!drawerOpen)
  }


  return (
    <Card>
      <CardHeader title='Toolbar' />
      {/* <p onClick={() => hello("Hello")}>Click</p> */}
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
          <Grid item xs={6}>
            <Button
              value='html'
              variant='text'
              className='no-radius'
              onClick={() => handleDrawerContent("html")}
              sx={{ display: 'block', width: '100%' }}
            >
              <Icon icon="gala:editor" />
              <Typography
                variant='body2'
                sx={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                HTML Code
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='text'
              className='no-radius'
              onClick={() => handleDrawerContent("image")}
              sx={{ display: 'block', width: '100%' }}
            >
              <Icon icon="ph:image" />
              <Typography
                variant='body2'
                sx={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                Image
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='text'
              className='no-radius'
              onClick={() => handleDrawerContent("video")}
              sx={{ display: 'block', width: '100%' }}
            >
              <Icon icon="ph:video-bold" />
              <Typography
                variant='body2'
                sx={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                Video
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='text'
              className='no-radius'
              onClick={() => handleDrawerContent("pdf")}
              sx={{ display: 'block', width: '100%' }}
            >
              <Icon icon="mingcute:pdf-line" />
              <Typography
                variant='body2'
                sx={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                PDF
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='text'
              className='no-radius'
              onClick={() => handleDrawerContent("url")}
              sx={{ display: 'block', width: '100%' }}
            >
              <Icon icon="material-symbols:link" />
              <Typography
                variant='body2'
                sx={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                URL
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='text'
              className='no-radius'
              onClick={() => handleDrawerContent("youtube")}
              sx={{ display: 'block', width: '100%' }}
            >
              <Icon icon="ant-design:youtube-outlined" />
              <Typography
                variant='body2'
                sx={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                Youtube URL
              </Typography>
            </Button>
          </Grid>
        </Grid>
        {/* <CreateSectionDrawer
          contentType={contentType}
          open={drawerOpen}
          toggle={!drawerOpen}
          setDrawerOpen={setDrawerOpen}
        /> */}
      </CardContent>
    </Card>
  )
}

export default CreateSectionRight
