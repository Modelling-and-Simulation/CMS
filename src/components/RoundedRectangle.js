import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import UploadContent from '../UploadContent';
import LinkedUpload from '../LinkedUpload';

const RoundedRectangle = ({ children, index, ...props }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isHoveredBox, setHoveredBox] = useState(false);
  const [isHoveredClose, setHoveredClose] = useState(false);

  const handleClick = () => {
    if (index < 3) {
      setOpen(true);
    } else {
      navigate('/preview'); // Navigate to the Preview page for the last rectangle
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box
        onClick={handleClick}
        onMouseEnter={() => setHoveredBox(true)}
        onMouseLeave={() => setHoveredBox(false)}
        sx={{
          width: '15vw',
          height: '16vh',
          backgroundColor: isHoveredBox ? '#BB4AE2' : '#9518C0',
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#ffffff',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease-in-out',
          ...props.sx,
        }}
      >
        {children}
      </Box>

      {index < 3 && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{margin: 2}}>
            
            <div style={{ float: 'right', position: 'absolute', padding:15, marginLeft:'19vw' }}>
              <img
                src="/img/close.png"
                style={{
                  width: '1.5vw',
                  height: '1.5vh',
                  borderRadius: 'inherit',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={handleClose}
                onMouseEnter={() => setHoveredClose(true)}
                onMouseLeave={() => setHoveredClose(false)}
              />
            </div>

            <div>
              {index === 0 && (
                <UploadContent 
                  sx={{margin: 2}} 
                  title="Upload a Content" 
                  section1="Upload the mind file" 
                  section2="Upload the images"
                  onClose={handleClose} 
                  onSubmit={
                    () => console.log('Submit 1')
                  } />
              )}
              {index === 1 && (
                <UploadContent 
                  title="Upload a Target" 
                  section1="Upload the glb file" 
                  section2="Upload the images of the model"
                  onClose={handleClose} 
                  onSubmit={
                    () => console.log('Submit 2')
                  } />
              )}
              {index === 2 && (
                <LinkedUpload 
                  title="Upload linked content and target" 
                  onClose={handleClose} 
                  onSubmit={
                    () => console.log('Submit 3')
                  } />
              )}
            </div>
            
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RoundedRectangle;
