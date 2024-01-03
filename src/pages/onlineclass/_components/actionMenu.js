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
        <Link href={`/meetings/users?id=${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='mdi:users' style={{ marginRight: '10px' }} />
            Users
          </MenuItem>
        </Link>
        <Link href={`/meetings/edit?id=${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='tabler:edit' style={{ marginRight: '10px' }} />
            Edit
          </MenuItem>
        </Link>
        <Link href={`/meetings/share?id=${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>
            <Icon icon='ri:share-line' style={{ marginRight: '10px' }} />
            Share
          </MenuItem>
        </Link>
        <MenuItem onClick={() => onDeleteClick(id, handleClose)}>
          <Icon icon='mdi:delete-outline' style={{ marginRight: '10px' }} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}
