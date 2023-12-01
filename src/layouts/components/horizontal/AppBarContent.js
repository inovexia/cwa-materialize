// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ModeToggler settings={settings} saveSettings={saveSettings} />
    </Box>
  )
}

export default AppBarContent
