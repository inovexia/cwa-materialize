import * as React from 'react'
import { Button, Box, LinkStyled, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Translations from 'src/layouts/components/Translations'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>GUID</TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Published</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props && Array.isArray(props.data) ? (
            props.data.map((row, index) => (
              <TableRow key={row.guid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.guid}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <LinkStyled href='/src/pages/tests/manage'>{row.title}</LinkStyled>
                    <Typography noWrap variant='caption'>
                      {row.guid}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.details}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked={row.status === '1' ? true : ''} />} />
                  </FormGroup>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow key='none' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell colspan='5'>
                <Translations text={props.responseMessage} message='No test found' />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
