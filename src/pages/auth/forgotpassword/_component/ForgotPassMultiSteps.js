// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

// ** Step Components
import StepEmailVerify from './StepEmailVerify'
import StepOtpVerification from './StepOtpVerification'
import StepChangePassword from './StepChangePassword'

// ** Custom Component Import
import StepperCustomDot from './CustomDot'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
  {
    title: 'Username & Password',

    // subtitle: 'Account Details'
  },
  {
    title: 'Enter OTP',

    // subtitle: 'Enter Information'
  },
  {
    title: 'Change Password',

    // subtitle: 'Payment Details'
  }
]

const RegisterMultiSteps = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <StepEmailVerify handleNext={handleNext} />
      case 1:
        return <StepOtpVerification handleNext={handleNext} handlePrev={handlePrev} />
      case 2:
        return <StepChangePassword handlePrev={handlePrev} />
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  return (
    <>
      <StepperWrapper sx={{ mb: 10 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <Typography className='step-number'>{`0${index + 1}`}</Typography>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      {renderContent()}
    </>
  )
}

export default RegisterMultiSteps
