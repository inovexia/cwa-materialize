import React, { useEffect, useState } from 'react'

// ** MUI Imports
import {
  Grid,
  Card,
  Button,
  Link,
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tab
} from '@mui/material'
import { TabList, TabPanel, TabContext } from '@mui/lab'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import ReactHtmlParser from 'react-html-parser'

// ** Utils Import
import CustomAvatar from 'src/@core/components/mui/avatar'
import Translations from 'src/layouts/components/Translations'

// ** Module Specific Imports
import MeetingApi from 'src/pages/meetings/_components/apis'

const MyMeetings = () => {
  const [value, setValue] = useState('1')
  const [userId, setUserId] = useState('RAJ78')
  const [checkedIds, setCheckedIds] = useState([])
  const [dataList, setDataList] = useState([])
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const doReload = () => setReload(r => r + 1)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function extractUrlFromHtml(htmlContent) {
    const urlPattern = /https?:\/\/\S+(?=<\/p>)/ // Match URL until </p>
    const match = htmlContent.match(urlPattern)

    return match ? match[0] : ''
  }

  // Get all meeting
  useEffect(() => {
    const fetchData = async () => {
      const res = await MeetingApi.usersMeeting(userId)
      if (!res.success) return toast.error(res.message), setResponseMessage(res.message)
      setDataList(res.payload)
      setResponseMessage(res.message)
      toast.success(res.message)
    }
    fetchData()
  }, [userId])

  return (
    <>
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          style={{ marginBottom: '50px', borderBottom: '1px solid rgba(234, 234, 255, 0.2)', paddingBottom: '30px' }}
        >
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'left', justifyContent: 'space-between' }}>
            <Box className='actions-left' sx={{ mr: 2, alignItems: 'left' }}>
              <Typography variant='h5'>My Meetings</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='icon tabs example'>
          <Tab value='1' label='Ongoing' icon={<Icon icon='octicon:play-24' />} />
          <Tab value='2' label='Upcoming' icon={<Icon icon='ic:outline-next-plan' />} />
          <Tab value='3' label='Past' icon={<Icon icon='wpf:past' />} />
        </TabList>
        <TabPanel value='1'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card style={{ marginTop: '30px' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataList && dataList.length !== 0 ? (
                        dataList.map((item, index) => {
                          const extractedUrl = extractUrlFromHtml(item.details)

                          return (
                            <TableRow
                              key={item.guid}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              selected={checkedIds.includes(item.guid)}
                            >
                              <TableCell>
                                <Box style={{ display: 'flex' }}>
                                  <CustomAvatar
                                    skin='light'
                                    color={item.avatarColor || 'primary'}
                                    sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
                                  >
                                    <Icon icon='ri:computer-line' />
                                  </CustomAvatar>
                                  <Box>
                                    <Typography variant='body2' component='h3'>
                                      <Link
                                        href={`/users/${item.guid}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                      >
                                        {item.title}
                                      </Link>
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant='body2' component='h4'>
                                  {ReactHtmlParser(item.details)}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Link
                                  sx={{ display: 'inline-block' }}
                                  variant='outlined'
                                  component={Button}
                                  href={extractedUrl}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  JOIN
                                </Link>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <TableRow key='none' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell colSpan='5'>
                            <Translations text={responseMessage} message='No test found' />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='2'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card style={{ marginTop: '30px' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataList && dataList.length !== 0 ? (
                        dataList.map((item, index) => {
                          const extractedUrl = extractUrlFromHtml(item.details)

                          return (
                            <TableRow
                              key={item.guid}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              selected={checkedIds.includes(item.guid)}
                            >
                              <TableCell>
                                <Box style={{ display: 'flex' }}>
                                  <CustomAvatar
                                    skin='light'
                                    color={item.avatarColor || 'primary'}
                                    sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
                                  >
                                    <Icon icon='ri:computer-line' />
                                  </CustomAvatar>
                                  <Box>
                                    <Typography variant='body2' component='h3'>
                                      <Link
                                        href={`/users/${item.guid}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                      >
                                        {item.title}
                                      </Link>
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant='body2' component='h4'>
                                  {ReactHtmlParser(item.details)}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Link
                                  sx={{ display: 'inline-block' }}
                                  variant='outlined'
                                  component={Button}
                                  href={extractedUrl}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  JOIN
                                </Link>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <TableRow key='none' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell colSpan='5'>
                            <Translations text={responseMessage} message='No test found' />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='3'>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card style={{ marginTop: '30px' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataList && dataList.length !== 0 ? (
                        dataList.map((item, index) => {
                          const extractedUrl = extractUrlFromHtml(item.details)

                          return (
                            <TableRow
                              key={item.guid}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              selected={checkedIds.includes(item.guid)}
                            >
                              <TableCell>
                                <Box style={{ display: 'flex' }}>
                                  <CustomAvatar
                                    skin='light'
                                    color={item.avatarColor || 'primary'}
                                    sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
                                  >
                                    <Icon icon='ri:computer-line' />
                                  </CustomAvatar>
                                  <Box>
                                    <Typography variant='body2' component='h3'>
                                      <Link
                                        href={`/users/${item.guid}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                      >
                                        {item.title}
                                      </Link>
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant='body2' component='h4'>
                                  {ReactHtmlParser(item.details)}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Link
                                  sx={{ display: 'inline-block' }}
                                  variant='outlined'
                                  component={Button}
                                  href={extractedUrl}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                >
                                  JOIN
                                </Link>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <TableRow key='none' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell colSpan='5'>
                            <Translations text={responseMessage} message='No test found' />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </>
  )
}

export default MyMeetings
