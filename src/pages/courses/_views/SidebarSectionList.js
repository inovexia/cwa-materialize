// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled, Box, ListItemText, ListItem, List, LinearProgress, ListItemIcon, Divider } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))


const SidebarSectionList = () => {

  return (
    <div>
      <List component='nav' aria-label='main mailbox'>
        <ListItem disablePadding sx={{ display: 'flex', alignItems: 'start', mb: 3 }}>
          <ListItemIcon>
            <Icon icon="charm:circle-tick" fontSize={19} />
          </ListItemIcon>
          <Box sx={{ width: '100%', ml: 2 }}>
            <ListItemText sx={{ mt: 0 }}>Vue.js is the Progressive JavaScript Framework
            </ListItemText>
          </Box>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'flex', alignItems: 'start', mb: 3 }}>
          <ListItemIcon>
            <Icon icon="material-symbols:circle-outline" fontSize={19} />
          </ListItemIcon>
          <Box sx={{ width: '100%', ml: 2 }}>
            <ListItemText sx={{ mt: 0 }}>Vue.js is the Progressive JavaScript Framework
            </ListItemText>
          </Box>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'flex', alignItems: 'start', mb: 3 }}>
          <ListItemIcon>
            <Icon icon="charm:circle-tick" fontSize={19} />
          </ListItemIcon>
          <Box sx={{ width: '100%', ml: 2 }}>
            <ListItemText sx={{ mt: 0 }}>Vue.js is the Progressive JavaScript Framework
            </ListItemText>
          </Box>
        </ListItem>
      </List>
    </div>
  )
}

export default SidebarSectionList
