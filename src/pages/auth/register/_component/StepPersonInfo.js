// ** React Imports
import { useState } from 'react'

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

const StepPersonInfo = ({ handleNext, handlePrev }) => {
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
        <Typography variant='h5'>Personal Details</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Enter Your Name</Typography>
      </Box>
      <form>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth placeholder='john' label='First Name' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Middle Name' placeholder='Doe' />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Last Name' placeholder='Doe' />
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            color='secondary'
            variant='contained'
            onClick={handlePrev}
            startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}
          >
            Previous
          </Button>
          <Button variant='contained' onClick={handleNext} endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}>
            Save & Login
          </Button>
        </Box>
      </Grid >
    </>
  )
}

export default StepPersonInfo
