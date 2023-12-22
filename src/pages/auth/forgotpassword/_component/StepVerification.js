// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'
// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import FormHelperText from '@mui/material/FormHelperText'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from './FooterIllustrationsV1'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'
import { Divider } from '@mui/material'



// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main
}))

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 50,
  textAlign: 'center',
  height: '50px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

const defaultValues = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}
const StepPersonalDetails = ({ handleNext, handlePrev }) => {
  // ** State
  const [isBackspace, setIsBackspace] = useState(false)

  // ** Hooks
  const theme = useTheme()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Vars
  const errorsArray = Object.keys(errors)

  const handleChange = (event, onChange) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            maxLength={1}
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={event => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              Two Step Verification 💬
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We sent a verification code to your mobile. Enter the code from the mobile in the field below.
            </Typography>
            <Typography sx={{ mt: 2, fontWeight: 700 }}>******1234</Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Type your 6 digit security code</Typography>
          <form onSubmit={handleSubmit(() => true)}>
            <CleaveWrapper
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                ...(errorsArray.length && {
                  '& .invalid:focus': {
                    borderColor: theme => `${theme.palette.error.main} !important`,
                    boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                  }
                })
              }}
            >
              {renderInputs()}
            </CleaveWrapper>
            {errorsArray.length ? (
              <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid OTP</FormHelperText>
            ) : null}
          </form>
          <Divider sx={{ mt: 5 }} />
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>Didn't get the code?</Typography>
            <LinkStyled href='/' onClick={e => e.preventDefault()}>
              Resend
            </LinkStyled>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled variant='contained' startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}>
              Previous
            </Button>
            <Button variant='contained' onClick={handleNext} endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}>
              Verify
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default StepPersonalDetails
