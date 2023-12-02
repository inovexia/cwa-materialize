// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const PageHeader = props => {
  // ** Props
  const { title, subtitle, toggleDrawer, buttonTitle } = props

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'left', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, alignItems: 'left' }}>
        {title}
        {subtitle || null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <Button sx={{ mb: 2 }} onClick={toggleDrawer} variant='contained'>
          {buttonTitle}
        </Button>
      </Box>
    </Box>
  )
}

export default PageHeader
