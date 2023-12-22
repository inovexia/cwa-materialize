import { Fragment, useState } from 'react'
import { Button, IconButton, Icon } from '@mui/material'
import toast from 'react-hot-toast'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Actions Imports
import { DeleteQuestion } from 'src/pages/qb/_models/QuestionModel'

const DeleteQuestionComponent = ({ guid }) => {
  // ** State
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleDelete = async (data) => {
    if (guid) {
      await DeleteQuestion(guid)
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
        <Icon icon='mdi:pencil-outline' fontSize='20' /> Delete
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
            Delete this question?
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

export default DeleteQuestionComponent
