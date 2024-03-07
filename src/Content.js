import React from "react";
import Container from "@mui/material/Container";
import RoundedRectangle from "./components/RoundedRectangle";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllLinkedContents } from "./api";
import { BACKEND_URL, LINK_IMAGE, UPLOAD_IMAGE } from "./constants";

const Content = () => {
  const [allLinks, setAllLinks] = useState(null); // Initialize with null

  useEffect(() => {
    getAllLinkedContents()
      .then((response) => {
        console.log("all links", response.data);
        setAllLinks(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <div className="heading-content">
        <p>
          This is the first website where you can interchange the contents as
          well as the targets as desired.
        </p>
      </div>

      <div className="content-container">
        <div className="content-cards">
          <RoundedRectangle sx={{ textAlign: "center" }} index={0}>
            <div>
              <img src={UPLOAD_IMAGE} alt="Upload" className="upload-img" />
            </div>
            Upload a content
          </RoundedRectangle>

          <RoundedRectangle sx={{ textAlign: "center" }} index={1}>
            <div>
              <img src={UPLOAD_IMAGE} alt="Upload" className="upload-img" />
            </div>
            Upload a target
          </RoundedRectangle>

          <Link to="/preview" style={{ textDecoration: "none" }}>
            <RoundedRectangle
              sx={{ textAlign: "center", marginLeft: "0px" }}
              index={3}
            >
              <div style={{ marginBottom: 5 }}>
                <img className="upload-img" alt="Upload" src={UPLOAD_IMAGE} />
              </div>
              Connect the content and target
            </RoundedRectangle>
          </Link>
        </div>

        <div className="links-container">
          <h4>Linked contents for the uploaded targets.</h4>

          <div className="all-links">
            {allLinks &&
              allLinks.map((link, index) => (
                <div className="linked-items" key={index}>
                  <div>
                    <img
                      src={BACKEND_URL + "/" + link.content.contentImages}
                      className="content-img"
                      alt="Content"
                    />
                    <p>Content</p>
                  </div>

                  <div>
                    <img src={LINK_IMAGE} className="link-img" alt="Link" />
                  </div>

                  <div style={{ alignItems: "center" }}>
                    <img
                      src={BACKEND_URL + "/" + link.target.targetImage}
                      className="content-img"
                      alt="Target"
                    />
                    <p>Target</p>
                  </div>

                  <Link to={`/mindar-scene/${link.target.id}`}>
                    <button className="view-button">View</button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Content;
