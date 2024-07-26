import { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import Link from 'next/link';

import Icon from 'src/@core/components/icon';

export default function ActionMenu({ guid, setOpenModal, setGuidToDelete, currStatus }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    if (event) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  const handleDeleteClick = (id) => {
    setOpenModal(true);
    setGuidToDelete(id);
    handleClose();
  };

  return (
    <>
      <IconButton size='small' onClick={handleClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/tests/${guid}/manage`}
        >
          <Icon icon='material-symbols:manage-history' fontSize={20} />
          Manage
        </MenuItem>
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/tests/${guid}/edit`}
          disabled={currStatus == "1" ? 'disabled' : ''}
        >
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/tests/${guid}/manage`}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          Preview
        </MenuItem>
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          href={`/tests/${guid}/manage`}
          disabled={currStatus == "1" ? 'disabled' : ''}
        >
          <Icon icon='uil:setting' fontSize={20} />
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClick(guid)} disabled={currStatus == "1" ? 'disabled' : ''}>
          <Icon icon='mdi:delete-outline' style={{ marginRight: '10px' }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
