import { useState } from 'react';
import { Menu, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Icon from 'src/@core/components/icon';
import toast from 'react-hot-toast'

// ** API
import UserApi from 'src/pages/users/_components/apis'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
}));

export default function BulkActionMenu({ selected }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState("")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickOpen = (value) => {
    setSelectedAction(value);
    setOpenModal(true);
  };

  // const handleBulkAction = async selected => {
  //   setLoading(true)
  //   const response = await UserApi.changeStatus(selected)
  //   setLoading(false)
  //   if (!response.success) return toast.success(response.message)
  //   doReload()
  //   toggle()
  //   reset()
  // }


  const handleBulkAction = async () => {
    // Ensure selected is always treated as an array
    const selectedUsers = Array.isArray(selected) ? selected : [];

    const formData = new FormData();
    selectedUsers.forEach((userId, index) => {
      formData.append(`users[${index}]`, userId);
    });
    formData.append('status', selectedAction);

    try {
      const response = await UserApi.changeStatus(formData); // Assuming your API method handles FormData
      if (!response.success) {
        setOpenModal(false);
        toast.error(response.message);
      } else {
        setOpenModal(false);
        toast.success('Status changed successfully');
        doReload();
        toggle();
        reset();
      }
    } catch (error) {
      console.error('Error occurred while changing status:', error);
      toast.error('Failed to change status. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <Icon icon="iconamoon:menu-kebab-vertical-bold" />
      </IconButton>

      <Menu
        open={openMenu}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={(event) => {
            handleCloseMenu(event);
            handleClickOpen('1');
          }}
        >
          Active
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            handleCloseMenu(event);
            handleClickOpen('0');
          }}
        >
          Inactive
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            handleCloseMenu(event);
            handleClickOpen('delete');
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            handleCloseMenu(event);
            handleClickOpen('3');
          }}
        >
          Archive
        </MenuItem>
      </Menu>

      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle sx={{ m: 0, p: 3 }} id="customized-dialog-title">
          Confirmation
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Icon icon="carbon:close-outline" />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            {selectedAction && selectedAction == "1" ? ("Are you sure to active all selected users ?") : selectedAction && selectedAction == "0" ? ("Are you sure to inactive all selected users ?") : selectedAction && selectedAction == "2" ? ("Are you sure to delete all selected users ?") : ("Are you sure to archive all selected users ?")}

          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleBulkAction}>
            Confirm
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
