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

//** Import Component
import SwitchField from '../_components/Switch'

export function CardComponent(props) {

  const { guid, CardTitle, Count, ListItems, dataList, doReload } = props

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
                {row.href && row.href !== "" ? (<ListItemButton href={row.href}>
                  <ListItemIcon>
                    <Icon icon={row.icon} fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={row.title} />
                </ListItemButton>) : (<ListItemButton>
                  <ListItemIcon>
                    <Icon icon={row.icon} fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary={row.title} />
                  {row.title && row.title == "Unpublished" || row.title == "Published" ? (<SwitchField id={guid} status={dataList.status} doReload={doReload} />) : ""}
                </ListItemButton>)}

              </ListItem>
            )}
          </List>
        </Fragment>
      </CardContent>
    </Card >
  )
}

