import * as React from 'react'
import { Menu, MenuItem, Button, Link } from '@mui/material'
import Icon from 'src/@core/components/icon'

export default function ActionMenu({ id, onDeleteClick, onArchiveClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Icon icon='pepicons-pop:dots-y' />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <Link href={`/users/${id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>View</MenuItem>
        </Link>
        <Link href={`/users/edit?id=${id}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
        </Link>
        <MenuItem onClick={() => onDeleteClick(id, handleClose)}>Delete</MenuItem>
        <MenuItem onClick={() => onArchiveClick(id, handleClose)}>Archive</MenuItem>
      </Menu>
    </div>
  )
}
