// UploadContent.js
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

const UploadTarget = ({ onClose, onSubmit }) => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);

  const [progress, setProgress] = useState({started: false, pc: 0});
  const [msg, setMsg] = useState(null);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError2, setIsError2] = useState(false);
  const [errorMsg2, setErrorMsg2] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccess2, setIsSuccess2] = useState(false);



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setIsSuccess(false);

    const isValidFileUploaded=(file)=>{
      const validExtensions = 'mind';
      const fileExtension = file.name.split('.')[1];
      return validExtensions.includes(fileExtension)
    }

    if(!isValidFileUploaded(selectedFile)){
      setIsError(true);
      setErrorMsg ("Only mind format is allowed!");
        return;
    }

    setIsError(false);
    setFile(selectedFile);
  }

  const handleFileChange2 = (e) => {
    const selectedFile2 = e.target.files[0];
    setIsSuccess2(false);

    const isValidFileUploaded1=(file)=>{
      const validExtensions = ['png','jpeg','jpg','webp']
      const fileExtension = file.type.split('/')[1]
      return validExtensions.includes(fileExtension)
    }

    if(!isValidFileUploaded1(selectedFile2)){
      setIsError2(true);
        setErrorMsg2 ("Only jpg, png, webp, & jpeg formats are allowed!");
        return;
    }

    setIsError2(false);
    setFile2(selectedFile2);
  }

  const handleSubmit = () => {
    if(isError){
      return;
    }
    // setErrorMsg("");
    if(isError2){
      return;
    }
    // setErrorMsg2("");


    // console.log(file);
    if(!file){
      setIsError(true);
      setErrorMsg('No mind file is selected!');
      // return;
    }

    if(!file2){
      setIsError2(true);
      setErrorMsg2('No image file is selected!');
      return;
    }

    const fd = new FormData();
    fd.append('mindFile', file);
    fd.append('targetImage', file2);

    setMsg("Uploading...");
    setProgress(prevState => {
      return{...prevState, started:true}
    })

    axios.post('http://localhost:8080/api/targets/', fd, {
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
          Upload a Target
        </Typography>
      {/* Select files to upload: */}
      Upload the model file:
      <div style={{marginTop: 10, marginBottom:5}}>
        <Input 
          name='mindFile' 
          onChange={handleFileChange} 
          type="file" 
          disableUnderline 
        />
        {isError && <div className='error-text'>{errorMsg}</div>}
      </div>
      Upload the images of the model:
      <div style={{marginTop: 5, marginBottom:5, marginRight:15}}>
        <Input 
          name='targetImage' 
          onChange={handleFileChange2} 
          type="file" 
          disableUnderline 
        />
        {isError2 && <div className='error-text'>{errorMsg2}</div>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10, marginTop:20}}>
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

export default UploadTarget;
