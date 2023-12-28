// ** Next Import
import Link from 'next/link'

// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'

// ** API
import SettingsApi from './Apis'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const connectedAccountsArr = [
  {
    checked: false,
    title: 'Single Device',
    icon: 'clarity:mobile-line',
    subtitle: 'Use Single Device Login',
  },
]

const TabLogin = () => {

  // ** State
  const [isLoading, setLoading] = useState(false);
  const [switched, setSwitched] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData = watch();

  const formSubmit = async (data) => {
    const formData = new FormData();
    formData.append('single_device_login_only', switched);
    // Call the API to send data to the server
    const res = await SettingsApi.SingleDevice(formData);
    console.log(res);
    if (res.success === true) {
      toast.success('Single Device updated successfully')
    } else {
      toast.error('Failed to update Single Device')
    }
  };



  return (

    <Grid container spacing={6}>
      {/* Connected Accounts Cards */}
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(formSubmit)}>
          <Card>
            <CardHeader title='Login Setting' />
            <CardContent>
              <Typography sx={{ mb: 4, color: 'text.secondary' }}>
                Settings are given for the user to login through single device.
              </Typography>

              {connectedAccountsArr.map(account => {
                return (
                  <Box
                    key={account.title}
                    sx={{
                      gap: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:not(:last-of-type)': { mb: 4 }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 4, display: 'flex', justifyContent: 'center' }}>
                        <Icon icon={account.icon} size='30' />
                      </Box>
                      <div>
                        <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                        <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                          {account.subtitle}
                        </Typography>
                      </div>
                    </Box>
                    <Switch defaultChecked={account.checked} />
                  </Box>
                )
              })}
              <Button size='large' type='submit' variant='contained' sx={{ mt: 4 }}>
                Submit
              </Button>

            </CardContent>
          </Card>
        </form>
      </Grid>
    </Grid>
  )
}

export default TabLogin
