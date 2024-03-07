import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import toast from 'react-hot-toast'

// ** API
import CourseApi from 'src/pages/courses/_components/Apis'

const BulkDeleteTest = ({ mdOpen, handleClose, setSelected, courseId, onItemDeleted, doReload, selectedIds }) => {
  const [open, setOpen] = useState(mdOpen)

  useEffect(() => {
    setOpen(mdOpen)
  }, [mdOpen])

  const handleDeleteTest = async (e) => {
    e.stopPropagation()
    const formData = new FormData()
    selectedIds.forEach((id, index) => {
      formData.append(`tests[${index}]`, id)
    })
    const res = await CourseApi.deleteTest({ guid: courseId, data: formData })
    setOpen(false)
    if (!res.success) return toast.error('Failed to delete test')
    toast.success('Test deleted successfully')
    setSelected([])
    doReload()
    if (onItemDeleted) onItemDeleted()
  }

  useEffect(() => {
    setOpen(mdOpen)
  }, [mdOpen])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Bulk Delete Test'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>Confirm to delete ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleDeleteTest} autoFocus variant='contained'>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default BulkDeleteTest
