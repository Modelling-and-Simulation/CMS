import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import Header from './components/Header';

const PreviewPage = () => {
  const defaultImageStyle = { width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'fit' };
  const modelImageStyle = { width: '15vw', height: '16vh', borderRadius: 'inherit', objectFit: 'cover' };

  const [selectedContentImage, setSelectedContentImage] = useState("/img/image.png");
  const [selectedTargetImage, setSelectedTargetImage] = useState("/img/image.png");
  const [selectedContentID, setSelectedContentID] = useState("");
  const [selectedTargetID, setSelectedTargetID] = useState("");
  const [selectedContentDescription, setSelectedContentDescription] = useState("");
  const [selectedTargetDescription, setSelectedTargetDescription] = useState("");
  const [isContentHovering, setIsContentHovering] = useState(false);
  const [isTargetHovering, setIsTargetHovering] = useState(false);

  const [contentImages, setContentImages] = useState([]);
  const [targetImages, setTargetImages] = useState([]);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [linkedUrl, setLinkedUrl] = useState("");

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
    setSelectedContentID(imageSrc.id);
    console.log(imageSrc.description);
  };

  const handleTargetImageClick = (imageSrc) => {
    setSelectedTargetImage(imageSrc.url);
    setSelectedTargetID(imageSrc.id);
    console.log(imageSrc.description);

  };

  const showConntentDescription = (imageSrc) => {
    setIsContentHovering(true);
    setSelectedContentDescription(imageSrc.description);
  };

  const hideContentDescription = (imageSrc) => {
    setIsContentHovering(false);
  };

  const showTargetDescription = (imageSrc) => {
    setIsTargetHovering(true);
    setSelectedTargetDescription(imageSrc.description);
  };

  const hideTargetDescription = (imageSrc) => {
    setIsTargetHovering(false);
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8080/api/links/',{contentId:selectedContentID, targetId:selectedTargetID})
    .then(res => {
      setIsSuccess(true);
      setSuccessMsg("Content and target have been linked successfully!");
      // setTimeout(() => {
      // setIsSuccess(false);
        
      // }, 5000);
      setLinkedUrl(`http://localhost:3000/api/webar/${selectedTargetID}`);

      console.log(res.data);
    })
    .catch(err => {
      setIsError(true);
      setErrorMsg("An error occured!");
      setTimeout(() => {
        setIsError(false);
          
        }, 2000);
      console.error(err);
    });
  }

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
        {isSuccess && <div className='success-text'>{successMsg}</div>}
        {isSuccess && 
          <div className='share-link'>
            <button className='share-button'>Share Link</button>
            <p>Copy Link: <a href={linkedUrl}>{linkedUrl}</a></p>
          </div>
        }
        {isError && <div className='error-text'>{errorMsg}</div>}
      </div>

      <div>
        <button className='link-button' type="submit" onClick={handleSubmit}>Link</button>
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
                onMouseEnter={() => {
                  console.log("check1");
                  showConntentDescription(imageSrc)}
                }
                onMouseLeave={() => hideContentDescription(imageSrc)}
                alt={`Content ${index + 1}`}
              />
            ))}

            {isContentHovering && (
              <div>
                {selectedContentDescription}
              </div>
            )}
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
                onMouseEnter={() => 
                  showTargetDescription(imageSrc)
                }
                onMouseLeave={() => hideTargetDescription(imageSrc)}
                alt={`Target ${index + 1}`}
              />
            ))}
            {isTargetHovering && (
              <div>
                {selectedTargetDescription}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PreviewPage;
