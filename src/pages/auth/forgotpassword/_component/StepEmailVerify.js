// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const StepEmailVerify = ({ handleNext }) => {
  // ** States
  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant='h5'>Email Or Mobile No.</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Enter Your Email Or Mobile No.</Typography>
      </Box>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ mb: 4 }} />
            <TextField
              fullWidth
              label='Mobile'
              placeholder='202 555 0111'
              InputProps={{
                startAdornment: <InputAdornment position='start'>India (+91)</InputAdornment>
              }}
            />
          </form>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled variant='contained' startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}>
              Previous
            </Button>
            <Button variant='contained' onClick={handleNext} endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}>
              Send OTP
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default StepEmailVerify
