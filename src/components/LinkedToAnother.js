// FourthRectangle.js
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FourthRectangle = () => {
  return (
    <Link to="/content-page">
      <Box
        sx={{
          width: '15vw',
          height: '16vh',
          backgroundColor: '#9518C0',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#ffffff',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        <Typography variant="h5">Fourth Rectangle</Typography>
      </Box>
    </Link>
  );
};

export default FourthRectangle;
