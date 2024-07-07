import React, { useEffect, useState } from 'react'
import { Grid, Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import toast from 'react-hot-toast'

// ** API
import OnlineClassApi from '../_components/apis'

const DeleteMeeting = ({ mdOpen, handleClose, guidToDelete, onItemDeleted, onItemRemove }) => {
  const [open, setOpen] = useState(mdOpen)

  useEffect(() => {
    setOpen(mdOpen)
  }, [mdOpen])

  const handleDeleteMeeting = async () => {
    const res = await OnlineClassApi.deleteOnlineClass(guidToDelete)
    console.log(res)
    if (res.success === true) {
      setOpen(false)
      toast.success('Online Class deleted successfully')
      if (onItemDeleted) {
        onItemDeleted()
      }
    } else {
      setOpen(false)
      toast.error('Failed to delete Online Class')
    }
  }

  // useEffect(() => {
  //   setOpen(mdOpen)
  // }, [mdOpen])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Delete Online Class'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>Confirm to delete ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleDeleteMeeting} autoFocus variant='contained'>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default DeleteMeeting
