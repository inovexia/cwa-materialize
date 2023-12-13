import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, CardContent, Button, Box, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

// ** Module Specific Imports
import MeetingUsers from 'src/pages/meetings/_views/meetingUsers'
import MeetingApi from 'src/pages/meetings/_components/apis'

const Users = () => {
  const { query } = useRouter()
  const { id } = query
  const router = useRouter()
  const [checkedIds, setCheckedIds] = useState([])
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState(undefined)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loader, setLoader] = useState(true)
  const doReload = () => setReload(r => r + 1)

  const toggleCreateDrawer = () => setDrawerOpen(!drawerOpen)

  // Get All User of Meeting
  useEffect(() => {
    const fetchData = async () => {
      const res = await MeetingApi.meetingUsers(id)
      console.log(res)
      if (!res.success) return toast.error(res.message), setResponseMessage(res.message)
      setDataList(res.payload)
      setResponseMessage(res.message)
      toast.success(res.message)
    }
    fetchData()
  }, [id])

  // Single Checkbox
  const handleCheckboxChange = userId => {
    const isChecked = checkedIds.includes(userId)
    if (isChecked) {
      setCheckedIds(checkedIds.filter(id => id !== userId))
    } else {
      setCheckedIds([...checkedIds, userId])
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'left', justifyContent: 'space-between' }}>
            <Box className='actions-left' sx={{ mr: 2, alignItems: 'left' }}>
              <Typography variant='h5'>Meeting Users</Typography>
            </Box>
            <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
              <Button sx={{ mb: 2 }} variant='contained' disabled={checkedIds.length === 0}>
                {`Unenroll`}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 0 }}>
          <Card style={{ marginTop: '30px' }}>
            <MeetingUsers
              checkedIds={checkedIds}
              setCheckedIds={setCheckedIds}
              responseStatus={responseStatus}
              responseMessage={responseMessage}
              loader={loader}
              dataList={dataList}
              setDataList={setDataList}
              setMetaData={setMetaData}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Users
