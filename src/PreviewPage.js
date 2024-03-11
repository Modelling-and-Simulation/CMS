import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import {
  BACKEND_URL,
  DEFAULT_IMAGE,
  FRONTEND_URL,
  LINK_IMAGE,
} from "./constants";
import { createLink, getAllContents, getAllTargets } from "./api";

const PreviewPage = () => {

  const [selectedContentImage, setSelectedContentImage] =
    useState(DEFAULT_IMAGE);
  const [selectedTargetImage, setSelectedTargetImage] = useState(DEFAULT_IMAGE);

  const [selectedContentID, setSelectedContentID] = useState("");
  const [selectedTargetID, setSelectedTargetID] = useState("");

  const [selectedContentDescription, setSelectedContentDescription] =
    useState("");
  const [selectedTargetDescription, setSelectedTargetDescription] =
    useState("");

  const [hoveredContentIndex, setHoveredContentIndex] = useState(null);
  const [hoveredTargetIndex, setHoveredTargetIndex] = useState(null);

  const [contentImages, setContentImages] = useState([]);
  const [targetImages, setTargetImages] = useState([]);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [linkedUrl, setLinkedUrl] = useState("");

  useEffect(() => {
    getAllContents()
      .then((res) => {
        setContentImages(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    getAllTargets()
      .then((res) => {
        setTargetImages(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleContentImageClick = (imageSrc) => {
    setSelectedContentImage(BACKEND_URL + "/" + imageSrc.contentImages);
    setSelectedContentID(imageSrc.id);
  };

  const handleTargetImageClick = (imageSrc) => {
    setSelectedTargetImage(BACKEND_URL + "/" + imageSrc.targetImage);
    setSelectedTargetID(imageSrc.id);
  };

  const showConntentDescription = (imageSrc, index) => {
    setHoveredContentIndex(index);
    setSelectedContentDescription(imageSrc.description);
  };

  const hideContentDescription = (imageSrc, index) => {
    setHoveredContentIndex(null);
  };

  const showTargetDescription = (imageSrc, index) => {
    setHoveredTargetIndex(index);
    setSelectedTargetDescription(imageSrc.description);
  };

  const hideTargetDescription = (imageSrc, index) => {
    setHoveredTargetIndex(null);
  };

  const handleSubmit = () => {
    createLink({
      contentId: selectedContentID,
      targetId: selectedTargetID,
    })
      .then((res) => {
        setIsSuccess(true);
        setSuccessMsg("Content and target have been linked successfully!");
        setLinkedUrl(`${FRONTEND_URL}/mindar-scene/${selectedTargetID}`);
      })
      .catch((err) => {
        setIsError(true);
        setErrorMsg("An error occured!");
        setTimeout(() => {
          setIsError(false);
        }, 2000);
        console.error(err);
      });
  };

  return (
    <Container>
      <div className="top-preview">
        <Header title="Link Content and the Target" />

        <div className="preview">
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            {selectedContentImage && (
              <div className="preview-image-box">
                <img
                  src={selectedContentImage}
                  className="content-preview-img"
                  alt="Content Preview"
                />
              </div>
            )}
            <p>Content Preview</p>

          </div>

          <div className="preview-link-container">
            <img className="preview-link-img" src={LINK_IMAGE} alt="Link" />
          </div>

          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            {selectedTargetImage && (
              <div className="preview-image-box">
                <img
                  src={selectedTargetImage}
                  className="content-preview-img"
                  alt="Target Preview"
                />
              </div>
            )}
            <p>Target Preview</p>
          </div>
        </div>

        <div>
          <button className="link-button" type="submit" onClick={handleSubmit}>
            Link
          </button>
        </div>

        {isSuccess && <div className="success-text">{successMsg}</div>}
        {isSuccess && (
          <div className="share-link">
            {console.log(selectedTargetID)}
            <p>
              Copy Link: <a href={linkedUrl}>{linkedUrl}</a>
            </p>
            <div className="scene-btn-container">
              <Link
                to={`/mindar-scene/${selectedTargetID}`}
                style={{ textDecoration: "none" }}
              >
                <button className="scene-btn">Go to MindAR Scene</button>
              </Link>
              <button className="share-button">Share Link</button>
            </div>
          </div>
        )}
        {isError && <div className="error-text">{errorMsg}</div>}
      </div>

      <div className="content-target-container">
        <div className="select-content">
          <div style={{ textAlign: "left", fontWeight: "bold" }}>
            Select the Content:
          </div>
          <div className="content-scroll">
            {contentImages.map((imageSrc, index) => (
              <div className="image-description" key={index}>
                <img
                  className="preview-image"
                  src={BACKEND_URL + "/" + imageSrc.contentImages}
                  onClick={() => handleContentImageClick(imageSrc)}
                  onMouseEnter={() => showConntentDescription(imageSrc, index)}
                  onMouseLeave={() => hideContentDescription(imageSrc, index)}
                  alt={`Content ${index + 1}`}
                />

                {hoveredContentIndex === index && (
                  <div className="hover-description">
                    {selectedContentDescription}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>


        <div className="select-target">
          <div style={{ textAlign: "left", fontWeight: "bold" }}>
            Select the Target:
          </div>
          <div className="target-scroll">
            {targetImages.map((imageSrc, index) => (
              <div className="image-description" key={index}>
                <img
                  className="preview-image"
                  src={BACKEND_URL + "/" + imageSrc.targetImage}
                  onClick={() => handleTargetImageClick(imageSrc)}
                  onMouseEnter={() => showTargetDescription(imageSrc, index)}
                  onMouseLeave={() => hideTargetDescription(imageSrc, index)}
                  alt={`Target ${index + 1}`}
                />
                {hoveredTargetIndex === index &&
                  <div className="hover-description">
                    {selectedTargetDescription}
                  </div>
                }

              </div>

            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PreviewPage;
