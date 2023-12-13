import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import toast from 'react-hot-toast'

// API
import MeetingApi from 'src/pages/meetings/_components/apis'

const SwitchField = ({ id, status }) => {
  const [switchValue, setSwitchValue] = useState(false)

  useEffect(() => {
    setSwitchValue(status === '1')
  }, [status])

  const handleSwitchChange = async () => {
    try {
      setSwitchValue(prevValue => !prevValue)
      const newStatus = switchValue ? '0' : '1'
      const formData = new FormData()
      formData.append('users[0]', id)
      formData.append('status', newStatus)
      const res = await MeetingApi.changeStatus(formData)
      if (res.success) {
        toast.success('Status changed')
      } else {
        toast.error('Status not changed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box>
      <FormGroup row>
        <Switch color='primary' checked={switchValue} onChange={handleSwitchChange} />
      </FormGroup>
    </Box>
  )
}

export default SwitchField
