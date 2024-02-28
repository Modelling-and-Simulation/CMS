import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import Header from './components/Header';

const PreviewPage = () => {
  const defaultImageStyle = { width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'fit' };
  const modelImageStyle = { width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover' };

  const [selectedContentImage, setSelectedContentImage] = useState("/img/image.png");
  const [selectedTargetImage, setSelectedTargetImage] = useState("/img/image.png");
  const [contentImages, setContentImages] = useState([]);
  const [targetImages, setTargetImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/contents/',  {})
    .then(res => {
      setContentImages(res.data);
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });

    axios.get('http://localhost:8080/api/targets/',  {})
    .then(res => {
      setTargetImages(res.data);
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
  },[])


  

  const handleContentImageClick = (imageSrc) => {
    setSelectedContentImage(imageSrc.url);
  };

  const handleTargetImageClick = (imageSrc) => {
    setSelectedTargetImage(imageSrc.url);
  };

  return (
    <Container>
      <div className='top-preview'>
        <Header title='Link Content and the Target'/>

        <div className='preview' style={{ width: '40vw' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {selectedContentImage && (
              <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: 15 }}>
                <img
                  src={selectedContentImage}
                  style={selectedContentImage === "/img/image.png" ? defaultImageStyle : modelImageStyle}
                  alt="Content Preview"
                />
              </div>
            )}
            Content Preview
          </div>

          <div style={{ marginTop: 50, marginInline: 20 }}>
            <img src="/img/link.png" style={{ width: '2vw', height: '4vh', borderRadius: 'inherit', objectFit: 'cover' }} alt="Link"/>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {selectedTargetImage && (
              <div style={{ textAlign: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: 15 }}>
                <img
                  src={selectedTargetImage}
                  style={selectedTargetImage === "/img/image.png" ? defaultImageStyle : modelImageStyle}
                  alt="Target Preview"
                />
              </div>
            )}
            Target Preview
          </div>
        </div>
      </div>

      <div>
        <button className='link-button' type="submit">Link</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className='select-content'>
          <div style={{ textAlign: 'left', fontWeight: 'bold' }}>Select the Content:</div>
          <div className='content-scroll'>
            {contentImages.map((imageSrc, index) => (
              <img
                key={index}
                className="preview-image"
                src={imageSrc.url}
                style={{
                  width: '15vw',
                  height: '16vh',
                  borderRadius: 'inherit',
                  objectFit: 'cover',
                  margin: 10,
                  cursor: 'pointer',
                }}
                onClick={() => handleContentImageClick(imageSrc)}
                alt={`Content ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className='select-target'>
          <div style={{ textAlign: 'left', fontWeight: 'bold' }}>Select the Target:</div>
          <div className='target-scroll'>
            {targetImages.map((imageSrc, index) => (
              <img
                key={index}
                className="preview-image"
                src={imageSrc.url}
                style={{
                  width: '15vw',
                  height: '16vh',
                  borderRadius: 'inherit',
                  objectFit: 'cover',
                  margin: 10,
                  cursor: 'pointer',
                }}
                onClick={() => handleTargetImageClick(imageSrc)}
                alt={`Target ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PreviewPage;
