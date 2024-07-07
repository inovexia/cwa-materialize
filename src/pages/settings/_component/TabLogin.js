// ** Next Import
import Link from 'next/link'

// ** React Imports
import React, { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import { Box, Grid, Card, Switch, Button, Typography, CardHeader, CardContent } from '@mui/material'

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
  // const [isLoading, setLoading] = useState(false);
  // const [switched, setSwitched] = useState(false);
  // const [singleDevice, setSingleDevice] = useState(false);
  const {
    watch,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      single_device_login_only: false
    }
  });



  const formSubmit = async ({ single_device_login_only }) => {
    const formData = new FormData();
    formData.append('single_device_login_only', single_device_login_only);

    // Call the API to send data to the server
    const res = await SettingsApi.SingleDevice(formData);
    if (res.success === true) {
      toast.success('Single Device updated successfully')
    } else {
      toast.error('Failed to update Single Device')
    }
  };

  useEffect(() => {
    // Fetch data from the API and update the state
    const fetchData = async () => {
      try {
        const res = await SettingsApi.SingleDeviceGet();
        setValue("single_device_login_only", res.payload.single_device_login_only === 'true');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setValue]);

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
                    <Switch checked={watch("single_device_login_only")} onChange={(_e, checked) => setValue("single_device_login_only", checked)} />
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
