import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Paper, Table, TableRow, TableHead, TableBody, Box, TableCell, Typography, CircularProgress, Divider, TableContainer } from '@mui/material'
import toast from 'react-hot-toast'

import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { GetEnrolUserList } from 'src/pages/onlineclass/_models/OnlineClassModel'
import Translations from 'src/layouts/components/Translations'


const Page = (props) => {

  const { guid, classguid } = props
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(true)

  /** GET ALL user in Online Class */
  useEffect(() => {
    const fetchData = async () => {
      if (classguid, guid) {
        const response = await GetEnrolUserList(classguid, guid)
        setLoading(false)
        if (!response.success) {
          toast.error(response.message)
        }
        setDataList(response.payload)
        setMetaData(response.payload)
      }

    }
    fetchData()
  }, [classguid, guid])

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
                  <TableCell>Guid</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList && dataList.length !== 0 ? (
                  dataList.map((item, index) => {
                    return (
                      <TableRow
                        key={item.guid}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <CustomAvatar
                              skin='light'
                              color={item.avatarColor || 'primary'}
                              sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
                            >
                              <Icon icon="mdi:user-outline" />
                            </CustomAvatar>
                            <Box>
                              <Typography variant='body2' component='h5'>
                                {item.guid}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant='body1' component='p'>
                              {item.first_name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant='body1' component='p'>
                              {item.last_name}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow key='none' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell colSpan='5'>
                      <Translations text={responseMessage} message='User not found' />
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
