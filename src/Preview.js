import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import RoundedRectangle from "./components/RoundedRectangle";

const PreviewPage = () => {
  return (
    <Container>

      <div className='top-preview'>
        <div className='preview-header'> 
              <Typography 
                style={{backgroundColor: 'purple', height: '6vh', fontWeight: 'bold', marginTop:15}}
              >
              Link Content and the Target
              </Typography>
          </div>

          <div 
            className='preview'
            style={{width: '40vw'}}
          >

            <div style={{ textAlign: 'center', fontWeight: 'bold'}}>
                <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: 15 }}>
                    <img 
                      src="/img/wolf.jpg" 
                      style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover' }} 
                    />
                </div>
              Content Preview
            </div>

            <div style={{ marginTop: 50, marginInline:20 }}>
                <img 
                  src="/img/link.png" 
                  style={{ width: '2vw', height: '4vh', borderRadius: 'inherit', objectFit: 'cover' }} 
                />
            </div>

            <div style={{ textAlign: 'center', fontWeight: 'bold'}}>
                <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: 15 }}>
                    <img 
                      src="/img/bugatti.jpg" 
                      style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover' }} 
                    />
                </div>
              Target Preview
            </div>
          </div>
      </div>

        
        

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div className='select-content'>

          <div 
            style={{ textAlign: 'left', fontWeight: 'bold'}}>
              Select the Content:
          </div>

          <div className='content-scroll'>
            <img 
                className="preview-image"
                src="/img/cottage.png" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
            <img 
                className="preview-image"
                src="/img/mug.png" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
            <img 
                className="preview-image"
                src="/img/house.jpg" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
            <img 
                className="preview-image"
                src="/img/room.png" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
            <img 
                className="preview-image"
                src="/img/spaceship.png" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
          </div>

          </div>

          <div className='select-target'>

          <div 
            style={{ textAlign: 'left', fontWeight: 'bold'}}>
              Select the Target:
          </div>

          <div className='target-scroll'>
            <img 
                className="preview-image"
                src="/img/cottage.png" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
            <img 
                className="preview-image"
                src="/img/mug.png" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
            <img 
                className="preview-image"
                src="/img/house.jpg" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
            <img 
                className="preview-image"
                src="/img/room.png" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
            <img 
                className="preview-image"
                src="/img/spaceship.png" 
                style={{ width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover', margin: 10 }} 
            />
          </div>

        </div>
      </div>

      

       
    </Container>
  );
};

export default PreviewPage;
