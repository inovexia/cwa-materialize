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

const DeleteCourse = ({ mdOpen, handleClose, guidToDelete, onItemDeleted, doReload }) => {
  const [open, setOpen] = useState(mdOpen)

  useEffect(() => {
    setOpen(mdOpen)
  }, [mdOpen])

  const handleDeleteCourse = async () => {
    const res = await CourseApi.deleteCourse(guidToDelete)
    setOpen(false)
    if (!res.success) return toast.error('Failed to delete course')
    toast.success('Course deleted successfully')
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
          <DialogTitle id='alert-dialog-title'>{'Delete Course'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>Confirm to delete ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleDeleteCourse} autoFocus variant='contained'>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default DeleteCourse
