import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router';

// API
import CourseApi from 'src/pages/courses/_components/Apis'

const SwitchField = ({ subjectId, status, doReload }) => {
  console.log(subjectId)
  const router = useRouter();
  const [switchValue, setSwitchValue] = useState(false)

  useEffect(() => {
    setSwitchValue(status && status === '1')
  }, [status])

  const handleSwitchChange = async () => {
    setSwitchValue(prevValue => !prevValue)
    const newStatus = switchValue ? '0' : '1'
    const formData = new FormData()
    formData.append('status', newStatus)
    const res = await CourseApi.statusSubject({ subjectId, data: formData })
    if (res.success) {
      toast.success('Status changed')
      doReload(true)
    } else {
      toast.error('Status not changed')
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
