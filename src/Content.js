import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import RoundedRectangle from "./components/RoundedRectangle";

const Content = () => {
  return (
    <Container>
      <Typography 
        variant="p" 
        component="div" 
        sx={{ textAlign: 'left', marginTop: 4, marginLeft: 1, marginBottom:5 }}
        >

        This is the first website where you can interchange the contents as well as the targets as desired.
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 50, marginTop: 20 }}>
        <RoundedRectangle sx={{ textAlign: 'center' }} index={0}>
            <div>
                <img 
                    src="/img/upload.png" 
                    style={{ width: '2vw', height: '2vh', borderRadius: 'inherit', objectFit: 'cover' }} 
                />
            </div>
          Upload a content
        </RoundedRectangle>

        <RoundedRectangle sx={{ textAlign: 'center' }} index={1}>
          <div>
            <img 
                src="/img/upload.png" 
                style={{ width: '2vw', height: '2vh', borderRadius: 'inherit', objectFit: 'cover' }} 
            />
          </div>
          Upload a target
        </RoundedRectangle>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 50, marginTop: 20 }}>
        <RoundedRectangle sx={{ textAlign: 'center' }} index={2}>
          <div style={{marginBottom: 5}}>
            <img 
                src="/img/upload.png" 
                style={{ width: '2vw', height: '2vh', borderRadius: 'inherit', objectFit: 'cover' }} 
            />
          </div>
          Upload linked content and target
        </RoundedRectangle>

        <RoundedRectangle sx={{ textAlign: 'center' }} index={3}>
          <div style={{marginBottom: 5}}>
            <img 
                src="/img/upload.png" 
                style={{ width: '2vw', height: '2vh', borderRadius: 'inherit', objectFit: 'cover' }} 
            />
          </div>
          Connect the content and target
        </RoundedRectangle>
      </div>

    </Container>
  );
};

export default Content;