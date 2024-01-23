import { Fragment, useState } from 'react'
import { Button, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material'

// ** Toast Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
// ** Actions Imports
import { RemoveOnlineClass } from 'src/pages/courses/_models/OnlineClassModel'

const RemoveOnlineClassComponent = (props) => {
  const router = useRouter()
  const { guid } = router.query
  const { courseGuid } = props

  // ** State
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleRemove = async (data) => {
    if (guid, courseGuid) {
      await RemoveOnlineClass(guid, courseGuid)
        .then(response => {
          if (response.success === true) {
            toast.success(response.message)
            setTimeout(() => {
              router.push(`/courses/${courseGuid}/onlineclass/`)
            }, 3000)
          } else {
            toast.error(response.message)
          }
        })
    }
    handleClose()
  }

  return (
    <Fragment>
      <IconButton size='small' onClick={handleClickOpen} sx={{ color: '#66687b' }}>
        <Icon icon='material-symbols:delete-outline' fontSize='22' style={{ marginRight: '10px' }} /> <Typography variant='body1' >Remove</Typography>
      </IconButton>

      <Dialog
        open={open}
        maxWidth='sm'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirm Remove </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Remove this Online Class?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant="outlined" onClick={handleClose}>No</Button>
          <Button variant="contained" onClick={handleRemove}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default RemoveOnlineClassComponent
