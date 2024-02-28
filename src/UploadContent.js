// UploadContent.js
import React from 'react';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

const UploadContent = ({ onClose, title, onSubmit, section1, section2 }) => {
  const handleSubmit = () => {
    // Handle submit logic here
    onSubmit(); // Custom onSubmit function provided by parent component
    onClose(); // Close the popup after submitting
  };

  return (
    <>
      <Typography 
        variant="h6" 
        textAlign='center' 
        fontWeight='bold'
        marginBottom='10px'
        >{title}</Typography>
      {/* Select files to upload: */}
      {section1}:
      <div style={{marginTop: 10, marginBottom:5}}>
        <Input type="file" disableUnderline />
      </div>
      {section2}:
      <div style={{marginTop: 5, marginBottom:5, marginRight:15}}>
        <Input type="file" disableUnderline />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10}}>
        <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#79109D', color: 'white' }}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default UploadContent;
