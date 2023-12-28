import { useState, useEffect, useRef } from 'react'
// ** Next Import
import Link from 'next/link'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
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
// ** API
import SettingsApi from './Apis'
const connectedAccountsArr = [
  {
    checked: false,
    title: 'Email',
    icon: 'ic:outline-email',
    subtitle: 'Use Mobile Number Field',

  },
  {
    checked: true,
    title: 'Mobile',
    icon: 'ic:outline-phone',
    subtitle: 'Use Email Field'
  }
]



const TabGeneral = () => {
  const [color, setColor] = useColor("#561ecb");
  const [show, setShow] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData = watch();

  const formSubmit = async (data) => {
    const formData = new FormData();
    formData.append('theme_color', color.hex);
    // Call the API to send data to the server
    const res = await SettingsApi.ThemeColorPost(formData);
    console.log('Selected color:', color);
    if (res.success === true) {
      toast.success('Theme Color updated successfully')
    } else {
      toast.error('Failed to update Theme Color')
    }
  };

  return (
    <Grid container spacing={6}>
      {/* Connected Accounts Cards */}
      <Grid item xs={12}>

        <Card>
          <CardHeader title='General Setting' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Change whole app color through this color palette
            </Typography>
            <form onSubmit={handleSubmit(formSubmit)}>
              <ColorPicker color={color} onChange={setColor} />
              <Button variant='contained' type='submit' sx={{ mt: 4 }}>
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid >
  )
}

export default TabGeneral
