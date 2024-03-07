// ** React Imports
import React from 'react'

// ** MUI Imports
import { Grid, Card, CardHeader, Button, Typography, CardContent } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ButtonType = ({ handleDrawerContent }) => {

  const buttonData = [
    { type: 'html', label: 'HTML CODE', ic: "gala:editor" },
    { type: 'image', label: 'IMAGE', ic: "ph:image" },
    { type: 'video', label: 'VIDEO', ic: "ph:video-bold" },
    { type: 'pdf', label: 'PDF', ic: "mingcute:pdf-line" },
    { type: 'url', label: 'URL', ic: "material-symbols:link" },
    { type: 'youtube', label: 'YOUTUBE URL', ic: "ant-design:youtube-outlined" },

    // Add more button data as needed
  ];

  /** HANDLE CREATE TEST DRAWER */

  return (
    <Card>
      <CardHeader title='Toolbar' />
      {/* <p onClick={() => hello("Hello")}>Click</p> */}
      <CardContent>
        <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
          {buttonData.map((button) => (
            <Grid item xs={6} key={button.type}>
              <Button
                variant='text'
                className='no-radius'
                onClick={() => handleDrawerContent(button.type)}
                sx={{ display: 'block', width: '100%' }}
              >
                <Icon icon={button.ic} />
                <Typography
                  variant='body2'
                  sx={{
                    width: '100%',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  {button.label}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ButtonType
