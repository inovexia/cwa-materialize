import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Link, Typography, CircularProgress, Translations, Paper, Table, TableRow, TableHead, TableBody, TableCell, TableContainer } from '@mui/material'

import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import ReactHtmlParser from 'react-html-parser'
import toast from 'react-hot-toast'

// ** Actions Imports
import { GetOnlineClass } from 'src/pages/onlineclass/_models/OnlineClassModel'

const Page = () => {
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(true)



  /** GET ALL Online Class */
  useEffect(() => {
    const fetchData = async () => {
      const data = {
      }
      const response = await GetOnlineClass(data)
      setLoading(false)
      if (!response.success) {
        toast.error(response.message)
      }
      setDataList(response.payload.data)
      setMetaData(response.payload.meta)
    }
    fetchData()
  }, [])
  function extractUrlFromHtml(htmlContent) {
    const urlPattern = /https?:\/\/\S+(?=<\/p>)/ // Match URL until </p>
    const match = htmlContent.match(urlPattern)

    return match ? match[0] : ''
  }

  return (
    <>
      {isLoading ?
        (<Box className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
          <CircularProgress />
        </Box>) :
        (<form>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Start</TableCell>
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
                              <Typography variant='body1' component='h3'>
                                {item.title}
                              </Typography>
                              <Typography variant='body2' component='h5'>
                                {item.guid}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant='body1' component='p'>
                              {ReactHtmlParser(item.details)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Link
                            sx={{ display: 'inline-block' }}
                            variant='outlined'
                            component={Link}
                            href={extractedUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <Icon icon='octicon:play-24' style={{ marginRight: '10px' }} />
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow key='none' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell colSpan='5'>
                      <Translations text={responseMessage} message='Online class not found' />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </form>)}
    </>
  )
}

export default Page
