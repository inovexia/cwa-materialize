import React from 'react';
import Button from '@mui/material/Button';

const TypeButtons = ({ handleDrawerContent }) => {
  const buttonData = [
    { type: 'html', label: 'HTML CODE', icon: "" },
    { type: 'image', label: 'IMAGE', icon: "" },
    { type: 'video', label: 'VIDEO', icon: "" },
    { type: 'pdf', label: 'PDF', icon: "" },
    { type: 'url', label: 'URL', icon: "" },
    { type: 'youtube', label: 'YOUTUBE URL', icon: "" },

    // Add more button data as needed
  ];

  return (
    <div>
      {buttonData.map((button) => (
        <Button
          key={button.type}
          variant='text'
          className='no-radius'
          onClick={() => handleDrawerContent(button.type)}
          sx={{ display: 'block', width: '100%' }}
        >
          {/* You can use different icons or labels based on the button type */}
          {button.type === 'html' && 'HTML CODE'}
          {button.type === 'image' && 'IMAGE'}
          {button.type === 'video' && 'VIDEO'}
          {button.type === 'pdf' && 'PDF'}
          {button.type === 'url' && 'URL'}
          {button.type === 'youtube' && 'YOUTUBE URL'}
          {/* Add more conditions as needed */}
        </Button>
      ))}
    </div>
  );
};

export default TypeButtons;
