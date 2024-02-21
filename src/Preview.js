import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import RoundedRectangle from "./components/RoundedRectangle";

const PreviewPage = () => {
  return (
    <Container>

        <div style={{color: 'white', backgroundColor:'purple', width: '100%'}}> 
            <Typography 
                variant="h6" 
                component="div" 
                sx={{ textAlign: 'center', marginTop: 4, marginLeft: 1, marginBottom:5, fontWeight: 'bold' }}
            >

            Link Content and the Target
            </Typography>
        </div>
        

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 50, marginTop: 65 }}>

        <div style={{ textAlign: 'center', fontWeight: 'bold', marginLeft: 150}}>
            <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: 15 }}>
                <img 
                  src="/img/wolf.jpg" 
                  style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover' }} 
                />
            </div>
          Content Preview
        </div>

        <div style={{ marginTop: 50 }}>
            <img 
              src="/img/link.png" 
              style={{ width: '2vw', height: '4vh', borderRadius: 'inherit', objectFit: 'cover' }} 
            />
        </div>
        
        <div style={{ textAlign: 'center', fontWeight: 'bold', marginRight: 150}}>
            <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: 15 }}>
                <img 
                  src="/img/bugatti.jpg" 
                  style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover' }} 
                />
            </div>
          Target Preview
        </div>

      </div>

        <div style={{ textAlign: 'left', fontWeight: 'bold'}}>
            Select the Content:
        </div>
    </Container>
  );
};

export default PreviewPage;
