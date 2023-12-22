// ** MUI Components
import { Box, Card, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Components Imports
import RegisterMultiStepsWizard from './_component/ForgotPassMultiSteps'

// ** Styled Components
const RegisterMultiStepsIllustration = styled('img')({
  maxWidth: 200,
  height: 'auto',
  maxHeight: '100%'
})

const LeftWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12),
  [theme.breakpoints.up('lg')]: {
    maxWidth: 480
  },
  [theme.breakpoints.down(1285)]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 635
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12)
  }
}))

const WizardWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 700,
  margin: theme.spacing(0, 'auto'),
  [theme.breakpoints.up('md')]: {
    width: 700
  }
}))

const ForgotPassMultiSteps = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))

  // ** Var
  const { skin } = settings

  return (
    <>
      <Box className='content-center'>
        {/* {!hidden ? (
        <LeftWrapper>
          <RegisterMultiStepsIllustration
            alt='register-multi-steps-illustration'
            src='public/images/auth-v2-register-multi-steps-illustration.png'
          />
        </LeftWrapper>
      ) : null} */}

        <Card>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 5, mt: 5 }}>
            <Typography variant='h4'>Forgotten Password</Typography>
          </Box>
          <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
            <WizardWrapper>
              <RegisterMultiStepsWizard />
            </WizardWrapper>
          </RightWrapper>
        </Card>

      </Box>
    </>

  )
}
ForgotPassMultiSteps.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPassMultiSteps
