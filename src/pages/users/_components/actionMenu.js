import { useState } from 'react'
import { Menu, MenuItem, Link, IconButton } from '@mui/material'

import Icon from 'src/@core/components/icon'

export default function ActionMenu({ id, onDeleteClick, onArchiveClick }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon icon='pepicons-pop:dots-y' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Link href={`/users/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='carbon:view' style={{ marginRight: '10px' }} />
            View
          </MenuItem>
        </Link>
        <Link href={`/users/edit?id=${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='tabler:edit' style={{ marginRight: '10px' }} />
            Edit
          </MenuItem>
        </Link>
        <MenuItem onClick={() => onDeleteClick(id, handleClose)}>
          <Icon icon='mdi:delete-outline' style={{ marginRight: '10px' }} />
          Delete
        </MenuItem>
        <MenuItem onClick={() => onArchiveClick(id, handleClose)}>
          <Icon icon='ic:outline-archive' style={{ marginRight: '10px' }} />
          Archive
        </MenuItem>
      </Menu>
    </div>
  )
}
