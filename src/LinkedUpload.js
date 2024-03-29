// LinkedUpload.js
import React from 'react';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

const LinkedUpload = ({ onClose, title, onSubmit }) => {
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
        marginBottom='20px' 
        fontWeight='bold'
        >{title}</Typography>
        
      Select files to upload content:
      <div style={{margin: 20}}>
        <Input type="file" disableUnderline />
      </div>

      Select files to upload target:
      <div style={{margin: 20}}>
        <Input type="file" disableUnderline />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#79109D', color: 'white' }}>
          Submit
        </Button>
      </div>
    </form>
      
    </>
  );
};

export default LinkedUpload;
