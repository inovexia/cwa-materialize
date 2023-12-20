// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { IconButton, Menu, MenuItem } from '@mui/material'

const RowOptions = ({ guid }) => {

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/qb/${guid}/edit`}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/qb/${guid}/delete`}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}


const ViewQuestion = (props) => {

  const { count, question } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'left', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, alignItems: 'left' }}>
        <Typography variant='body2' sx={{ mb: 2 }}>
          Question {count}
        </Typography>
        <Typography variant='subtitle1' sx={{ mb: 2 }}>
          <Link href={`/qb/${question.guid}/edit`}>{question.question}</Link>
        </Typography>
        <Typography variant='body2'>
          <Fragment>
            <List component='nav' aria-label='main mailbox'>
              {question.choices && question.choices.length > 0 && question.choices.map((row, i) =>
              (<Box key={i}>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Icon icon='mdi:email-outline' fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={row.choice} />
                </ListItem>
              </Box>)
              )}
            </List>
          </Fragment>
        </Typography>
        <Typography variant='body1' sx={{ mb: 2 }}>
          Marks: {question.marks}, Negative Marks: {question.neg_marks}, Time: {question.time}
        </Typography>

      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <RowOptions guid={question.guid} />
      </Box>
    </Box>
  )
}

export default ViewQuestion
