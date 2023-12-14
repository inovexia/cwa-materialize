import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  Grid,
  Link,
  Box,
  Button,
  IconButton,
  Typography,
  Table,
  Checkbox,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'
import Translations from 'src/layouts/components/Translations'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import ReactHtmlParser from 'react-html-parser'
// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import SwitchField from 'src/pages/meetings/_components/Switch'
import ActionMenu from 'src/pages/meetings/_components/actionMenu'
import DeleteMeeting from 'src/pages/meetings/_views/deleteMeeting'

// APIs
import MeetingApi from 'src/pages/meetings/_components/apis'

export default function BasicTable({
  dataList,
  responseStatus,
  responseMessage,
  setResponseMessage,
  setDataList,
  setMetaData,
  checkedIds,
  setCheckedIds
}) {
  const [guidToDelete, setGuidToDelete] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openArcModal, setOpenArcModal] = useState(false)
  // Bulk Checkbox
  const handleBulkCheckboxChange = () => {
    if (checkedIds.length === dataList.length) {
      setCheckedIds([]) // Uncheck all
    } else {
      setCheckedIds(dataList.map(user => user.guid)) // Check all
    }
  }

  // Delete Modal OPEN
  const handleClickOpen = guid => {
    setGuidToDelete(guid)
    setOpenModal(true)
  }
  const handleDeleteClick = (guid, onClose) => {
    handleClickOpen(guid)
    onClose()
  }

  // Archive Modal OPEN
  const handleClickArcOpen = guid => {
    setGuidToDelete(guid)
    setOpenArcModal(true)
  }
  const handleArchiveClick = (guid, onClose) => {
    handleClickArcOpen(guid)
    onClose()
  }
  // Checkbox  Change
  const handleCheckboxChange = userId => {
    const isChecked = checkedIds.includes(userId)
    if (isChecked) {
      setCheckedIds(checkedIds.filter(id => id !== userId))
    } else {
      setCheckedIds([...checkedIds, userId])
    }
  }
  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenArcModal(false)
  }
  // Delete user
  const handleItemDeleted = async () => {
    const updatedData = await MeetingApi.meetingList()
    if (!updatedData.success) return
    setDataList(updatedData.payload.data)
    setMetaData(updatedData.payload.meta)
    setOpenModal(false)
  }

  // Archive User
  const handleUserArchived = async () => {
    const updatedUsers = await MeetingApi.getAllUsers()
    if (!updatedUsers.success) return
    setDataList(updatedUsers.payload.data)
    setMetaData(updatedUsers.payload.meta)
    setOpenModal(false)
  }

  function extractUrlFromHtml(htmlContent) {
    const urlPattern = /https?:\/\/\S+(?=<\/p>)/ // Match URL until </p>
    const match = htmlContent.match(urlPattern)
    return match ? match[0] : ''
  }
  console.log(responseMessage)
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={checkedIds.length === dataList && dataList.length}
                  indeterminate={checkedIds.length > 0 && checkedIds.length < dataList && dataList.length}
                  onChange={handleBulkCheckboxChange}
                />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Updated On</TableCell>
              <TableCell>Start</TableCell>
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
                      <Checkbox
                        checked={checkedIds.includes(item.guid)}
                        onChange={() => handleCheckboxChange(item.guid)}
                      />
                    </TableCell>
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
                            <Link href={`/users/${item.guid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                              {item.title}
                            </Link>
                          </Typography>
                          <Typography variant='body2' component='h5'>
                            {item.guid}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2' component='p'>
                          {ReactHtmlParser(item.details)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant='body2' component='h3'>
                          {item.updated_on}
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
                    <TableCell>
                      <Grid container spacing={2} alignItems='center'>
                        <ActionMenu
                          id={item.guid}
                          onDeleteClick={handleDeleteClick}
                        //onArchiveClick={handleArchiveClick}
                        />
                      </Grid>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow key='none' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell colSpan='5'>
                  <Translations text={responseMessage} message='Meeting not found' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteMeeting
        mdOpen={openModal}
        handleClose={handleCloseModal}
        guidToDelete={guidToDelete}
        onItemDeleted={handleItemDeleted}
      />
    </>
  )
}
