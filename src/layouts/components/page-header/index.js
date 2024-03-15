// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const PageHeader = props => {
  // ** Props
  const { title, subtitle, toggleDrawer, buttonTitle, buttonHref } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'left', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, alignItems: 'left', maxWidth: '80%' }}>
        {title}
        {subtitle || null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {toggleDrawer && (
          <Button sx={{ mb: 2 }} onClick={toggleDrawer} variant='contained'>
            {buttonTitle}
          </Button>
        )}
        {buttonHref && (
          <Button sx={{ mb: 2 }} href={buttonHref} variant='contained'>
            {buttonTitle}
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default PageHeader
