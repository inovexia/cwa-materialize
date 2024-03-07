// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router';

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import toast from 'react-hot-toast'
import FormHelperText from '@mui/material/FormHelperText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Icon Imports
import CreateTestForm from './createTestForm'

// ** Actions Imports
import { GetCategories } from 'src/pages/tests/_models/TestModel'
import { AddTest } from 'src/pages/courses/_models/TestModel'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between'
}))


const SidebarAddTest = props => {
  const router = useRouter();

  // ** Props
  const { open, toggle, guid, doReload, editId } = props

  // ** State
  const [responseMessage, setResponseMessage] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const getCategories = useCallback(async () => {
    const response = await GetCategories()

    return response
  }, [])

  useEffect(() => {
    getCategories()
      .then((response) => {
        if (response.success) {
          setCategories(response.payload)
        }
      })
  }, [getCategories])


  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      start_date: data.start_date.replace('T', ' '),
      end_date: data.end_date.replace('T', ' '),
    };
    setLoading(true)
    const response = await AddTest({ guid, data: formattedData })
    setLoading(false)
    if (response.success === true) {
      toast.success(response.message)
      doReload()
      toggle()
    } else {
      toggle()
      toast.error(response.message)
    }
  }
  console.log(editId)

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={toggle}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Test</Typography>
        <IconButton size='small' onClick={toggle} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      {responseMessage && (
        <Box sx={{ p: 4 }}>
          <FormHelperText sx={{ color: 'error.main' }}>Cannot submit due to server error </FormHelperText>
        </Box>
      )}

      <Card sx={{ overflow: "unset" }}>
        <CardContent>
          <CreateTestForm
            onSubmit={onSubmit}
            isLoading={isLoading}
            toggle={toggle}
            categories={categories}
            doReload={doReload}
            editId={editId}
          />
        </CardContent>
      </Card>

    </Drawer>
  )
}

export default SidebarAddTest
