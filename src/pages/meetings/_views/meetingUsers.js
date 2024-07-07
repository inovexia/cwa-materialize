import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  Grid,
  Link,
  Box,
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

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

export default function BasicTable({ dataList, responseMessage, checkedIds, setCheckedIds }) {
  // Bulk Checkbox
  const handleBulkCheckboxChange = () => {
    if (checkedIds.length === dataList.length) {
      setCheckedIds([]) // Uncheck all
    } else {
      setCheckedIds(dataList.map(user => user.guid)) // Check all
    }
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
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>GUID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList && dataList.length !== 0 ? (
              dataList.map((user, index) => (
                <TableRow
                  key={user.guid}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  selected={checkedIds.includes(user.guid)}
                >
                  <TableCell>
                    <Checkbox
                      checked={checkedIds.includes(user.guid)}
                      onChange={() => handleCheckboxChange(user.guid)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box style={{ display: 'flex' }}>
                      <CustomAvatar
                        skin='light'
                        color={user.avatarColor || 'primary'}
                        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
                      >
                        {getInitials(
                          user.fullName
                            ? user.fullName
                            : `${user.first_name ? user.first_name : ''} ${user.last_name ? user.last_name : ''}`
                        )}
                      </CustomAvatar>
                      <Box>
                        <Typography variant='body2' component='h3'>
                          <Link href={`/users/${user.guid}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {user.first_name}
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' component='h4'>
                      {user.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' component='h5'>
                      {user.guid}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key='none' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell colSpan='5'>
                  <Translations text={responseMessage && responseMessage} message='No user found' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
