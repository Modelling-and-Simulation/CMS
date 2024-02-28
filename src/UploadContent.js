// UploadContent.js
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

const UploadContent = ({ onClose, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);

  const [progress, setProgress] = useState({started: false, pc: 0});
  const [msg, setMsg] = useState(null);

  const handleSubmit = () => {
    if(!file || !file2){
      setMsg('No file selected!');
      return;
    }

    const fd = new FormData();
    fd.append('modelFile', file);
    fd.append('contentImages', file2);

    setMsg("Uploading...");
    setProgress(prevState => {
      return{...prevState, started:true}
    })
    axios.post('http://localhost:8080/api/contents/', fd, {
      onUploadProgress: (ProgressEvent) => {setProgress(prevState => {
        return {...prevState, pc: ProgressEvent.progress*100}
      })},
      headers: {
        "Custom-Header": "value",
      }
    })
    .then(res => {
      setMsg("Upload successful!");
      console.log(res.data);
    })
    .catch(err => {
      setMsg("Upload failed!");
      console.error(err);
    });

    onSubmit(console.log(file, file2)); // Custom onSubmit function provided by parent component
    onClose(); // Close the popup after submitting
  };

  return (
    <>
    <form action="" >
    <Typography 
        variant="h6" 
        textAlign='center' 
        fontWeight='bold'
        marginBottom='10px'
        >
          Upload a Content
        </Typography>
      {/* Select files to upload: */}
      Upload the model file:
      <div style={{marginTop: 10, marginBottom:5}}>
        <Input name='modelFile' onChange={(e) => { setFile(e.target.files[0]) }} type="file" disableUnderline />
      </div>
      Upload the images of the model:
      <div style={{marginTop: 5, marginBottom:5, marginRight:15}}>
        <Input name='contentImages' onChange={(e) => { setFile2(e.target.files[0]) }} type="file" disableUnderline />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10}}>
        <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: '#79109D', color: 'white' }}>
          Submit
        </Button>
      </div>
      {progress.started && <progress max="100" value={progress.pc}></progress>}
      {msg && <span>{msg}</span>}

    </form>
      
    </>
  );
};

export default UploadContent;
