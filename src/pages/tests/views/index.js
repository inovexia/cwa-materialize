import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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
          {props &&
            props.data.length > 0 &&
            props.data.map(row => (
              <TableRow key={row.guid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.guid}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.details}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}

          {props && !Array.isArray(props) && (
            <TableRow key='none' sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell colspan='5'>No tests found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
