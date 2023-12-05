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
import UserApi from 'src/pages/users/components/apis'

const ArchiveUser = ({ mdOpen, handleClose, guidToDelete, onUserArchived }) => {
  const [open, setOpen] = useState(mdOpen)

  useEffect(() => {
    setOpen(mdOpen)
  }, [mdOpen])

  const handleArchiveUser = async () => {
    try {
      const formData = new FormData()
      formData.append('users[0]', guidToDelete)
      const res = await UserApi.trashUser(formData)
      if (res.success === true) {
        setOpen(false)
        toast.success('User deleted successfully')
        if (onUserArchived) {
          onUserArchived()
        }
      } else {
        setOpen(false)
        toast.error('Failed to delete user')
      }
    } catch (error) {
      console.log(error)
    }
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
          <DialogTitle id='alert-dialog-title'>{'Archive User'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>Confirm to archive User ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined'>
              Cancel
            </Button>
            <Button onClick={handleArchiveUser} autoFocus variant='contained'>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  )
}

export default ArchiveUser
