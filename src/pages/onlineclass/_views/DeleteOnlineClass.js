import { Fragment, useState } from 'react'
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material'

// ** Toast Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Actions Imports
import { DeleteOnlineClass } from 'src/pages/onlineclass/_models/OnlineClassModel'

const DeleteOnlineClassComponent = ({ guid }) => {
  // ** State
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleDelete = async (data) => {
    if (guid) {
      await DeleteOnlineClass(guid)
        .then(response => {
          if (response.success === true) {
            toast.success(response.message)
          } else {
            toast.error(response.message)
          }
        })
    }
    handleClose()
  }

  return (
    <Fragment>
      <IconButton size='small' onClick={handleClickOpen}>
        <Icon icon='material-symbols:delete-outline' fontSize='20' style={{ marginRight: '10px' }} /> Delete
      </IconButton>

      <Dialog
        open={open}
        maxWidth='sm'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirm Delete </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Delete this Online Class?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant="outlined" onClick={handleClose}>No</Button>
          <Button variant="contained" onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DeleteOnlineClassComponent
