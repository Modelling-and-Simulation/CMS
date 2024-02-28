import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DisplayPreview from './DisplayPreview';
import Header from './components/Header';
import firebase from 'firebase/app';  // Import the main firebase module
import 'firebase/storage';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const PreviewPage = () => {
  const defaultImageStyle = { width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'fit' };
  const modelImageStyle = { width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover' };

  const [selectedContentImage, setSelectedContentImage] = useState("/img/image.png");
  const [selectedTargetImage, setSelectedTargetImage] = useState("/img/image.png");
  const [contentImages, setContentImages] = useState([]);
  const [targetImages, setTargetImages] = useState([]);

  useEffect(() => {
    const fetchImages = async (folderName, setImageState) => {
      const storageRef = firebase.storage().ref().child(folderName);
      const images = [];

      try {
        const listResult = await storageRef.listAll();
        await Promise.all(
          listResult.items.map(async (item) => {
            const url = await item.getDownloadURL();
            images.push(url);
          })
        );
        setImageState(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    // Replace 'contents' and 'targets' with the actual folder names in your Firebase Storage
    fetchImages('contents', setContentImages);
    fetchImages('targets', setTargetImages);
  }, []); // Run the effect once when the component mounts

  const handleContentImageClick = (imageSrc) => {
    setSelectedContentImage(imageSrc);
  };

  const handleTargetImageClick = (imageSrc) => {
    setSelectedTargetImage(imageSrc);
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
