// UploadContent.js
import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { createTarget } from "./api";

const UploadTarget = ({ onClose, onSubmit, setSuccessMsg, setIsSuccess, setIsUploadError, setUploadErrorMsg }) => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [text, setText] = useState(null);

  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError2, setIsError2] = useState(false);
  const [errorMsg2, setErrorMsg2] = useState("");
  const [isError3, setIsError3] = useState(false);
  const [errorMsg3, setErrorMsg3] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const isValidFileUploaded = (file) => {
      const validExtensions = "mind";
      const fileExtension = file.name.split(".")[1];
      return validExtensions.includes(fileExtension);
    };

    if (!isValidFileUploaded(selectedFile)) {
      setIsError(true);
      setErrorMsg("Only mind format is allowed!");
      return;
    }

    setIsError(false);
    setFile(selectedFile);
  };

  const handleFileChange2 = (e) => {
    const selectedFile2 = e.target.files[0];

    const isValidFileUploaded1 = (file) => {
      const validExtensions = ["png", "jpeg", "jpg", "webp"];
      const fileExtension = file.type.split("/")[1];
      return validExtensions.includes(fileExtension);
    };

    if (!isValidFileUploaded1(selectedFile2)) {
      setIsError2(true);
      setErrorMsg2("Only jpg, png, webp, & jpeg formats are allowed!");
      return;
    }

    setIsError2(false);
    setFile2(selectedFile2);
  };

  const handleText = (e) => {
    const description = e.target.value;

    if (!description.trim()) {
      setIsError3(true);
      setErrorMsg3("Description is required!");
    } else {
      setIsError3(false);
      setErrorMsg3("");
      setText(description);
    }
  };

  const handleSubmit = () => {
    let error = false;

    if (!file) {
      error = true;
      setIsError(true);
      setErrorMsg("No mind file is selected!");
      // return;
    }

    if (!file2) {
      error = true;
      setIsError2(true);
      setErrorMsg2("No image file is selected!");
      // return;
    }

    if (!text) {
      error = true;
      setIsError3(true);
      setErrorMsg3("No description is added!");
      // return;
    }

    if (error) return;

    const fd = new FormData();
    fd.append("mindFile", file);
    fd.append("targetImage", file2);
    fd.append("description", text);

    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    createTarget(fd, (progress) => {
      setProgress((prevState) => {
        return { ...prevState, pc: progress };
      });
    })
      .then((res) => {
        setSuccessMsg("Upload successful!");
        setIsSuccess(true);
        console.log(res.data);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      })
      .catch((err) => {
        setUploadErrorMsg("Upload failed!");
        setIsUploadError(true);
        console.error(err);
        setTimeout(() => {
          setIsUploadError(false);
        }, 2000);
      });

    onSubmit(console.log(file, file2)); // Custom onSubmit function provided by parent component
    onClose(); // Close the popup after submitting
  };

  return (
    <>
      <form action="">
        <Typography
          variant="h6"
          textAlign="center"
          fontWeight="bold"
          marginBottom="10px"
        >
          Upload a Target
        </Typography>
        {/* Select files to upload: */}
        Upload the target file:
        <div style={{ marginTop: 10, marginBottom: 5 }}>
          <Input
            name="mindFile"
            onChange={handleFileChange}
            type="file"
            disableUnderline
          />
          {isError && <div className="error-text">{errorMsg}</div>}
        </div>
        Upload the images of the target:
        <div style={{ marginTop: 5, marginBottom: 5, marginRight: 15 }}>
          <Input
            name="targetImage"
            onChange={handleFileChange2}
            type="file"
            disableUnderline
          />
          {isError2 && <div className="error-text">{errorMsg2}</div>}
        </div>
        Give a description for the target file:
        <div style={{ marginTop: 5, marginBottom: 5, marginRight: 15 }}>
          <Input
            name="description"
            onChange={handleText}
            className="description-box"
            type="text"
            disableUnderline
          />
          {isError3 && <div className="error-text">{errorMsg3}</div>}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{ backgroundColor: "#79109D", color: "white" }}
          >
            Submit
          </Button>
        </div>
        {progress.started && (
          <progress max="100" value={progress.pc}></progress>
        )}
        {msg && <span>{msg}</span>}
      </form>
    </>
  );
};

export default UploadTarget;
