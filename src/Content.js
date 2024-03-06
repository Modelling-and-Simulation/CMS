import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RoundedRectangle from "./components/RoundedRectangle";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllLinkedContents } from "./api";
import { BACKEND_URL } from "./constants";

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

  const viewLinkedContent = (targetId) => {
    // navigate to the view page
    window.open(`/mindar-scene/${targetId}`, "_blank");
  };

  return (
    <Container>
      <Typography
        variant="p"
        component="div"
        sx={{ textAlign: "left", marginTop: 4, marginLeft: 1, marginBottom: 5 }}
      >
        This is the first website where you can interchange the contents as well
        as the targets as desired.
      </Typography>

      <div
      className="content-container"
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15vh",
        }}
      >
        <div className="content-cards">
          <RoundedRectangle sx={{ textAlign: "center" }} index={0}>
            <div>
              <img
                src="/img/upload.png"
                style={{
                  width: "2vw",
                  height: "3vh",
                  borderRadius: "inherit",
                  objectFit: "cover",
                }}
              />
            </div>
            Upload a content
          </RoundedRectangle>

          <RoundedRectangle sx={{ textAlign: "center" }} index={1}>
            <div>
              <img
                src="/img/upload.png"
                style={{
                  width: "2vw",
                  height: "3vh",
                  borderRadius: "inherit",
                  objectFit: "cover",
                }}
              />
            </div>
            Upload a target
          </RoundedRectangle>
          {/* </div> */}

          {/* <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 50, marginTop: 20 }}> */}
          {/* <RoundedRectangle sx={{ textAlign: 'center' }} index={2}>
            <div style={{marginBottom: 5}}>
              <img 
                  src="/img/upload.png" 
                  style={{ width: '2vw', height: '3vh', borderRadius: 'inherit', objectFit: 'cover' }} 
              />
            </div>
            Upload linked content and target
          </RoundedRectangle> */}

          <Link to="/preview" style={{ textDecoration: "none" }}>
            <RoundedRectangle sx={{ textAlign: "center" }} index={3}>
              <div style={{ marginBottom: 5 }}>
                <img
                  src="/img/upload.png"
                  style={{
                    width: "2vw",
                    height: "3vh",
                    borderRadius: "inherit",
                    objectFit: "cover",
                  }}
                />
              </div>
              Connect the content and target
            </RoundedRectangle>
          </Link>
        </div>

        <div
          style={{
            border: "solid",
            width: "55vw",
            height: "58vh",
            padding: "2vh",
            alignContent: "center",
          }}
        >
          <h4>Linked contents for the uploaded targets.</h4>

          <div className="all-links">
            {allLinks &&
              allLinks.map((link, index) => (
                <div className="linked-items" key={index}>
                  <div>
                    <img
                      src={BACKEND_URL + "/" + link.content.contentImages}
                      style={{
                        width: "15vw",
                        height: "16vh",
                        borderRadius: "inherit",
                        objectFit: "cover",
                      }}
                      alt="Content"
                    />
                    <p>Content</p>
                  </div>

                  <div style={{ marginTop: 50, marginInline: 20 }}>
                    <img
                      src="/img/link.png"
                      style={{
                        width: "2vw",
                        height: "4vh",
                        borderRadius: "inherit",
                        objectFit: "cover",
                      }}
                      alt="Link"
                    />
                  </div>

                  <div style={{ alignItems: "center" }}>
                    <img
                      src={BACKEND_URL + "/" + link.target.targetImage}
                      style={{
                        width: "15vw",
                        height: "16vh",
                        borderRadius: "inherit",
                        objectFit: "cover",
                      }}
                      alt="Target"
                    />
                    <p>Target</p>
                  </div>

                  <button
                    className="view-button"
                    onClick={() => viewLinkedContent(link.target.id)}
                  >
                    View
                  </button>
                  {/* </div> */}
                </div>
              ))}

            {/* <LinkedContent contentImages={contentImages} targetImages={targetImages} /> */}
            {/* <div style={{ marginTop: 50, marginInline: 20 }}>
            <img
              src={allLinks[0].target.targetImage}
              style={{
                width: "2vw",
                height: "4vh",
                borderRadius: "inherit",
                objectFit: "cover",
              }}
              alt="Link"
            />
          </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Content;
