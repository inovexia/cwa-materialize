// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import { List, Divider, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Card, CardContent, CardHeader } from '@mui/material'

//** Import Component
import SwitchField from './switchField'
import DeleteSubject from './delete'
import CourseApi from 'src/pages/courses/_components/Apis'

export function CardComponent(props) {
  const router = useRouter()
  const { subjectId, guid, CardTitle, Count, ListItems, dataList, doReload } = props
  const [openModal, setOpenModal] = useState(false)
  const [openArcModal, setOpenArcModal] = useState(false)

  const handleCloseModal = () => {
    setOpenModal(false)
    setOpenArcModal(false)
  }

  // Delete course
  const handleItemDeleted = async () => {
    const updatedData = await CourseApi.getSubjects(props.guid)
    if (!updatedData.success) return
    router.push(`/courses/${guid}/subjects`)
  }
  const deleteItem = () => {
    setOpenModal(true)
  }
  return (
    <>
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
                  {row.href && row.href !== "" ? (<ListItemButton href={row.href} component={NextLink}>
                    <ListItemIcon>
                      <Icon icon={row.icon} fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary={row.title} />
                  </ListItemButton>) : (<ListItemButton>
                    <ListItemIcon>
                      <Icon icon={row.icon} fontSize={20} />
                    </ListItemIcon>
                    <ListItemText primary={row.title} />
                    {row.title && row.title == "Unpublished" || row.title == "Published" ? (<SwitchField subjectId={subjectId} status={dataList.status} doReload={doReload} />) : ""}
                  </ListItemButton>)}
                </ListItem>

              )}
              <ListItem disablePadding onClick={deleteItem}>
                {CardTitle == "Settings" ? <ListItemButton>
                  <ListItemIcon>
                    <Icon icon="material-symbols:delete-outline" fontSize={20} />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </ListItemButton> : ""}
              </ListItem>
            </List>
          </Fragment>
        </CardContent>
      </Card >
      <DeleteSubject
        mdOpen={openModal}
        handleClose={handleCloseModal}
        subjectId={subjectId}
        onItemDeleted={handleItemDeleted}
        guid={guid}
      />
    </>
  )
}

