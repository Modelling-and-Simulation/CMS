// UploadTarget.js
import React from 'react';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

const UploadTarget = ({ onClose, onSubmit }) => {
  const handleSubmit = () => {
    // Handle submit logic here
    onSubmit(); // Custom onSubmit function provided by parent component
    onClose(); // Close the popup after submitting
  };

  return (
    <>
    <form action="" method="post">
    <Typography 
        variant="h6" 
        textAlign='center' 
        fontWeight='bold'
        marginBottom='10px'
        >
          Upload a Target
        </Typography>
      {/* Select files to upload: */}
      Upload the mind file:
      <div style={{marginTop: 10, marginBottom:5}}>
        <Input type="file" disableUnderline />
      </div>
      Upload the images :
      <div style={{marginTop: 5, marginBottom:5, marginRight:15}}>
        <Input type="file" disableUnderline />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10}}>
        <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#79109D', color: 'white' }}>
          Submit
        </Button>
      </div>
    </form>
      
    </>
  );
};

export default UploadTarget;
