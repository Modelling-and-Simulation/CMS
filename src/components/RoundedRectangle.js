import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import UploadContent from "../UploadContent";
import LinkedUpload from "../LinkedUpload";
import UploadTarget from "../UploadTarget";
import { CLOSE_IMAGE } from "../constants";

const RoundedRectangle = ({ children, index, setSuccessMsg, setIsSuccess, setIsUploadError, setUploadErrorMsg, ...props }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (index < 3) {
      setOpen(true);
    } else {
      navigate("/preview"); // Navigate to the Preview page for the last rectangle
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="box-container">
      <Box
        onClick={handleClick}
        sx={{
          // width: '15vw',
          // height: '16vh',
          // backgroundColor: isHoveredBox ? '#BB4AE2' : '#9518C0',
          // borderRadius: 5,
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
          // color: '#ffffff',
          // fontWeight: 'bold',
          // cursor: 'pointer',
          // transition: 'background-color 0.3s ease-in-out',
          // margin: '2%',
          ...props.sx,
        }}
      >
        {children}
      </Box>

      {index < 3 && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{ margin: 2 }}>
            <div className="close-btn-container">
              <img
                src={CLOSE_IMAGE}
                alt="Close"
                className="close-btn"
                onClick={handleClose}
              />
            </div>

            <div>
              {index === 0 && (
                <UploadContent
                  // sx={{margin: 2}}
                  setSuccessMsg={setSuccessMsg}
                  setIsSuccess={setIsSuccess}
                  setUploadErrorMsg={setUploadErrorMsg}
                  setIsUploadError={setIsUploadError}
                  onClose={handleClose}
                  onSubmit={() => console.log("Submit 1")}
                />
              )}
              {index === 1 && (
                <UploadTarget
                  onClose={handleClose}
                  setSuccessMsg={setSuccessMsg}
                  setIsSuccess={setIsSuccess}
                  setUploadErrorMsg={setUploadErrorMsg}
                  setIsUploadError={setIsUploadError}
                  onSubmit={() => console.log("Submit 2")}
                />
              )}
              {index === 2 && (
                <LinkedUpload
                  title="Upload linked content and target"
                  onClose={handleClose}
                  onSubmit={() => console.log("Submit 3")}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RoundedRectangle;
