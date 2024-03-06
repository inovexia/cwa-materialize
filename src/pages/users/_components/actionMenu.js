import { useState } from 'react'
import { Menu, MenuItem, IconButton, Box } from '@mui/material'
import NextLink from 'next/link'

import Icon from 'src/@core/components/icon'

export default function ActionMenu({ id, onDeleteClick, onArchiveClick }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setAnchorEl(null);
  }

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
        <MenuItem href={`/users/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} component={NextLink}>
          <Icon icon='carbon:view' style={{ marginRight: '10px' }} />
          View
        </MenuItem>
        <MenuItem href={`/users/${id}/edit`} style={{ textDecoration: 'none', color: 'inherit' }} component={NextLink}>
          <Icon icon='tabler:edit' style={{ marginRight: '10px' }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => onDeleteClick(id, handleClose)}>
          <Icon icon='mdi:delete-outline' style={{ marginRight: '10px' }} />
          Delete
        </MenuItem>
        <MenuItem onClick={(event) => onArchiveClick(id, handleClose)}>
          <Icon icon='ic:outline-archive' style={{ marginRight: '10px' }} />
          Archive
        </MenuItem>
      </Menu>
    </>
  )
}
