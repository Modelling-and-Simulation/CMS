import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DisplayPreview from './DisplayPreview';
import Header from './components/Header';

const PreviewPage = () => {
  const defaultImageStyle = { width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'fit' };
  const modelImageStyle = { width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover' };

  const [selectedContentImage, setSelectedContentImage] = useState("/img/image.png");
  const [selectedTargetImage, setSelectedTargetImage] = useState("/img/image.png");

  const handleContentImageClick = (imageSrc) => {
    setSelectedContentImage(imageSrc);
  };

  const handleTargetImageClick = (imageSrc) => {
    setSelectedTargetImage(imageSrc);
  };

  const contentImages = [
    "/img/cottage.png",
    "/img/mug.png",
    "/img/house.jpg",
    "/img/room.png",
    "/img/spaceship.png",
  ];

  const targetImages = [
    "/img/cottage.png",
    "/img/mug.png",
    "/img/house.jpg",
    "/img/room.png",
    "/img/spaceship.png",
  ];

  const glbFileName = 'mercedes.glb'; 

  return (
    <Container>
      <div className='top-preview'>
        {/* <div className='preview-header'>
          <Typography style={{ backgroundColor: '#9518C0', height: '6vh', fontWeight: 'bold', marginTop: 15 }}>
            Link Content and the Target
          </Typography>
        </div> */}
        <Header title='Link Content and the Target'/>

        <div className='preview' style={{ width: '40vw' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {selectedContentImage && (
              <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: 15 }}>
                <img
                  src={selectedContentImage}
                  style={selectedContentImage === "/img/image.png" ? defaultImageStyle : modelImageStyle}
                />
              </div>
            )}
            Content Preview
          </div>

          <div style={{ marginTop: 50, marginInline: 20 }}>
            <img src="/img/link.png" style={{ width: '2vw', height: '4vh', borderRadius: 'inherit', objectFit: 'cover' }} />
          </div>

          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {selectedTargetImage && (
              <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: 15 }}>
                <img
                  src={selectedTargetImage}
                  style={selectedTargetImage === "/img/image.png" ? defaultImageStyle : modelImageStyle}
                />
              </div>
            )}
            Target Preview
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='select-content'>
          <div style={{ textAlign: 'left', fontWeight: 'bold' }}>Select the Content:</div>
          <div className='content-scroll'>
            {contentImages.map((imageSrc, index) => (
              <img
                key={index}
                className="preview-image"
                src={imageSrc}
                style={{
                  width: '15vw',
                  height: '16vh',
                  borderRadius: 'inherit',
                  objectFit: 'cover',
                  margin: 10,
                  cursor: 'pointer',
                }}
                onClick={() => handleContentImageClick(imageSrc)}
              />
            ))}
            <DisplayPreview fileName={glbFileName} />
          </div>
        </div>

        <div className='select-target'>
          <div style={{ textAlign: 'left', fontWeight: 'bold' }}>Select the Target:</div>
          <div className='target-scroll'>
            {targetImages.map((imageSrc, index) => (
              <img
                key={index}
                className="preview-image"
                src={imageSrc}
                style={{
                  width: '15vw',
                  height: '16vh',
                  borderRadius: 'inherit',
                  objectFit: 'cover',
                  margin: 10,
                  cursor: 'pointer',
                }}
                onClick={() => handleTargetImageClick(imageSrc)}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PreviewPage;
