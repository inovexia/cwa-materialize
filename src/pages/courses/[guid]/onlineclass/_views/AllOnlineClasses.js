import React, { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'

// ** MUI Imports
import { Grid, Button, Box, Link, Typography, CircularProgress, Paper, TableRow, TableHead, TableBody, TableCell, TableContainer, Table, Checkbox, Card, CardContent } from '@mui/material'
import toast from 'react-hot-toast'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { GetOnlineClasses, AddExistingOnlineClass } from 'src/pages/courses/_models/OnlineClassModel'
import Translations from 'src/layouts/components/Translations'

//import CreateQuestion from 'src/pages/qb/create'
import Toolbar from 'src/pages/onlineclass/_components/Toolbar'

const Page = (props) => {
  const router = useRouter()
  const { guid, classguid } = props
  const [dataList, setDataList] = useState([])
  const [metaData, setMetaData] = useState([])
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [checkedIds, setCheckedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

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
      setCheckedIds(dataList.map((item) => item.guid));
    }
  };

  /** GET ALL user in Online Class */
  useEffect(() => {
    const fetchData = async () => {
      if (guid) {
        const data = {
        }

        // if (searchTerm !== "")
        //   data['search'] = searchTerm
        const response = await GetOnlineClasses(guid)
        setLoading(false)
        if (!response.success) {
          toast.error(response.message)
        }
        setDataList(response.payload.data)
        setMetaData(response.payload.data)
      }
    }
    fetchData()
  }, [guid, classguid])

  /** Share ONLINE CLASS  */
  const onSubmit = async (data) => {
    if (checkedIds.length === 0) {
      toast.error('Please select at least one online class into the course.');

      return;
    }
    if (guid) {
      // console.log(checkedIds)
      // return
      await AddExistingOnlineClass(guid, checkedIds)
        .then(response => {
          console.log(response);
          if (response.success === true) {
            toast.success(response.message);
            setTimeout(() => {
              router.push(`/courses/${guid}/onlineclass/${classguid}/share`)
            }, 3000)
          } else {
            toast.error(response.message);
          }
        });
    }
  };


  /** HANDLE SEARCH */
  const handleSearch = useCallback(value => {
    setSearchTerm(value)
  }, [])
  function extractUrlFromHtml(htmlContent) {
    const urlPattern = /https?:\/\/\S+(?=<\/p>)/; // Match URL until </p>
    const match = htmlContent && htmlContent.match(urlPattern); // Check if htmlContent is defined

    return match ? match[0] : '';
  }

  const extractedUrl = extractUrlFromHtml(dataList.details)

  return (
    <>
      {
        isLoading ?
          (<Box className="loader" style={{ textAlign: "center", padding: "50px 0px" }} >
            <CircularProgress />
          </Box >) :
          (<form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}></Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained' size='medium' type='submit' sx={{ mt: 5 }}>
                  Add
                </Button>
                <Button variant='outlined' size='medium' component={Link} href={`/courses/${guid}/onlineclass/`} sx={{ mt: 5, ml: 3 }}>
                  Cancel
                </Button>
              </Grid>


            </Grid>
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
                    <TableCell>Title</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
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
                                <Icon icon="healthicons:i-training-class-outline" />
                              </CustomAvatar>
                              <Box>
                                <Typography variant='body2' component='h5'>
                                  {item.title}
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
                            <Box>
                              <Typography variant='body1' component='p'>
                                {item.created_on}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant='body1' component='p'>
                                {item.updated_on}
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
