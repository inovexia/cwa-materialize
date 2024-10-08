// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Card, CardContent, CardHeader } from '@mui/material'

export function CardComponent(props) {

  const { guid, CardTitle, Count, ListItems } = props

  return (
    <Card>
      <CardHeader
        title={CardTitle}
        action={Count}
      />
      <CardContent>
        <Fragment>
          <List component='nav' aria-label='main mailbox'>
            {ListItems.length > 0 && ListItems.map((row, i) =>
              <ListItem disablePadding key={i}>
                <ListItemButton href={row.href}>
                  <ListItemIcon>
                    <Icon icon={row.icon} fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={row.title} />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Fragment>
      </CardContent>
    </Card >
  )
}

