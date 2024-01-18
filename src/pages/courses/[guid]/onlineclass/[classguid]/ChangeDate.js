import { Fragment, useState } from 'react'
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, useTheme, Grid, Typography } from '@mui/material'
import PickersBasic from 'src/lib/common/datepicker/PickersBasic'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
// ** Toast Imports
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
// ** Actions Imports
import { AddExistingOnlineClass } from 'src/pages/courses/_models/OnlineClassModel'

const ChangeDateOnlineClass = (props) => {
  const router = useRouter()
  const { guid } = router.query
  const { classguid } = props
  const [startDate, setStartDate] = useState(new Date()); // Initial start date
  const [endDate, setEndDate] = useState(new Date());
  //popperPlacement
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  // Initial end date
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  // ** State
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleChangeDate = async () => {
    if (guid && classguid) {
      const data = {
        guid: guid,
        classguid: classguid,
        startDate: startDate.toISOString(), // Convert to ISO string or any other desired format
        endDate: endDate.toISOString(),
      };

      await ChangeDateOnlineClass(data)
        .then((response) => {
          if (response.success === true) {
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
        });
    }
    handleClose();
  };

  return (
    <Fragment>
      <IconButton size='small' onClick={handleClickOpen} sx={{ color: '#66687b' }}>
        <Icon icon='simple-line-icons:calender' fontSize='16' style={{ marginRight: '10px' }} /> <Typography variant='body1' >Change Date</Typography>
      </IconButton>

      <Dialog
        open={open}
        maxWidth='sm'
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Change Date </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Grid container spacing={2} sx={{ mt: 5 }}>
              <Grid item xs={12} md={3}>
                <PickersBasic
                  popperPlacement={popperPlacement}
                  label='Start Date'
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <PickersBasic
                  popperPlacement={popperPlacement}
                  label='End Date'
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant="outlined" onClick={handleClose}>No</Button>
          <Button variant="contained" onClick={handleChangeDate}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ChangeDateOnlineClass
