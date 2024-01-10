import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
// ** MUI Imports
import { Grid, Button, Box, Link, Typography, CircularProgress, Paper, TableRow, TableHead, TableBody, TableCell, TableContainer, Table, Checkbox } from '@mui/material'
import toast from 'react-hot-toast'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { GetUser, ShareOnlineClass } from 'src/pages/onlineclass/_models/OnlineClassModel'
import Translations from 'src/layouts/components/Translations'

const Page = (props) => {
  const router = useRouter()
  const { guid } = props
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [checkedIds, setCheckedIds] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  // Checkbox  Change
  const handleCheckboxChange = userId => {
    const isChecked = checkedIds.includes(userId)
    if (isChecked) {
      setCheckedIds(checkedIds.filter(id => id !== userId))
    } else {
      setCheckedIds([...checkedIds, userId])
    }
  }
  const handleBulkCheckboxChange = () => {
    // Toggle all checkboxes at once
    if (checkedIds.length === dataList.length) {
      setCheckedIds([]);
    } else {
      setCheckedIds(dataList.data.map((item) => item.guid));
    }
  };

  /** GET ALL user in Online Class */
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetUser(guid)
      setLoading(false)
      if (!response.success) {
        toast.error(response.message)
      }
      setDataList(response.payload)
      setMetaData(response.payload)
    }
    fetchData()
  }, [guid])

  /** Share ONLINE CLASS  */
  const onSubmit = async (data) => {
    if (checkedIds.length === 0) {
      toast.error('Please select at least one user to share the online class.');
      return;
    }
    // console.log(checkedIds)
    // return
    await ShareOnlineClass(guid, checkedIds)
      .then(response => {
        console.log(response);
        if (response.success === true) {
          toast.success(response.message);
          setTimeout(() => {
            router.push(`/onlineclass/${guid}/share`)
          }, 3000)
        } else {
          toast.error(response.message);
        }
      });
  };


  return (
    <>
      {isLoading ?
        (<Box className="loader" style={{ textAlign: "center", padding: "50px 0px" }}>
          <CircularProgress />
        </Box>) :
        (<form onSubmit={handleSubmit(onSubmit)}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={checkedIds.length === dataList.length}
                      indeterminate={checkedIds.length > 0 && checkedIds.length < dataList.length}
                      onChange={handleBulkCheckboxChange}
                    />
                  </TableCell>
                  <TableCell>Guid</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList && dataList.length !== 0 ? (
                  dataList.data.map((item, index) => {
                    return (
                      <TableRow
                        key={item.guid}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Checkbox
                            checked={checkedIds.includes(item.guid)}
                            onChange={() => handleCheckboxChange(item.guid)}
                          />
                        </TableCell>
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
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Button variant='contained' size='medium' type='submit' sx={{ mt: 5 }}>
              Share
            </Button>
            <Button variant='outlined' size='medium' component={Link} href='/onlineclass' sx={{ mt: 5, ml: 3 }}>
              Cancel
            </Button>
          </Grid>
        </form>)}
    </>
  )
}

export default Page
