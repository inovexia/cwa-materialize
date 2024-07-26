import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import toast from 'react-hot-toast';

// ** API
import TestApis from 'src/pages/tests/_components/apis';

const Delete = ({ openModal, setOpenModal, guidToDelete, onUserDeleted }) => {
  const [open, setOpen] = useState(openModal);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleDeleteTest = async () => {
    const res = await TestApis.deleteTest({ guid: guidToDelete });
    if (res.success === true) {
      setOpen(false);
      setOpenModal(false); // Close modal after successful deletion
      toast.success('Test deleted successfully');
      if (onUserDeleted) {
        onUserDeleted();
      }
    } else {
      toast.error('Failed to delete test');
      setOpenModal(false);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Delete Test'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>Confirm to delete test?</DialogContentText>
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
  );
};

export default Delete;
