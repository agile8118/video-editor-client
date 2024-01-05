import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadingIcon from "./UploadingIcon";
const CancelToken = axios.CancelToken;
let cancel;

function Uploader() {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  //   useEffect(() => {
  //     let interval;
  //     if (isUploading) {
  //       let p = 0;
  //       interval = setInterval(() => {
  //         p += 1;

  //         if (p < 100) {
  //           setProgress(p);
  //         } else {
  //           setProgress(100);
  //           clearInterval(interval);
  //         }
  //       }, 300);
  //     }

  //     if (!isUploading) {
  //       setProgress(0);

  //       console.log("about to clear...");
  //       clearInterval(interval);
  //     }

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, [isUploading]);

  const handleDragStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDraggedOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDraggedOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDraggedOver(false);

    setFileName(e.dataTransfer.files[0].name);
    setFile(e.dataTransfer.files[0]);
    e.dataTransfer.clearData();
  };

  const cancelUploading = () => {
    setIsUploading(false);
    setFileName("");
    setProgress(0);
    setFile(null);

    if (cancel) cancel();
  };

  const onInputFileChange = (e) => {
    setFileName(e.target.files[0]?.name);
    setFile(e.target.files[0]);
    document.querySelector("#file").value = "";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);

    // const formData = new FormData();
    // formData.append("image-key", file);
    try {
      const { data } = await axios.post("/api/upload-video", file, {
        headers: {
          filename: fileName,
        },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      });

      if (data.status === "success") {
        cancelUploading();
        showMessage("File was uploaded successfully!", "success");
      }
    } catch (e) {
      if (e.response && e.response.data.message)
        showMessage(e.response.data.message, "error");
      cancelUploading();
    }
  };

  const showMessage = (message, status) => {
    if (status === "success") {
      setSuccessMsg(message);
      setTimeout(() => {
        setSuccessMsg("");
      }, 5000);
    }

    if (status === "error") {
      setErrorMsg(message);
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={`box ${isDraggedOver ? "box--dragged-over" : ""} ${
        fileName ? "box--file-selected" : ""
      } ${isUploading ? "box--file-uploading" : ""} ${
        successMsg ? "box--success" : ""
      } ${errorMsg ? "box--error" : ""}`}
      onDrag={handleDragStart}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragLeave}
      onDrop={handleDrop}
    >
      {!!successMsg || !!errorMsg ? (
        <div className="box__message">{successMsg || errorMsg}</div>
      ) : (
        <>
          {" "}
          <input
            className="box__file"
            type="file"
            name="file"
            id="file"
            onChange={onInputFileChange}
          />
          {isUploading && <span className="box__percentage">{progress}%</span>}
          {isUploading ? (
            <UploadingIcon animated={true} />
          ) : (
            <UploadingIcon />
            // <img src="/download.svg" alt="download" className="box__icon" />
          )}
          <div className="box__input">
            <label htmlFor="file">
              {fileName ? (
                <strong>{fileName}</strong>
              ) : isDraggedOver ? (
                <span>You can now drop your video!</span>
              ) : (
                <>
                  {" "}
                  <strong>Choose a video file</strong>
                  <span className="box__dragndrop">
                    {" "}
                    or drag and drop it here
                  </span>
                  .
                </>
              )}
            </label>
          </div>
          {fileName && !isUploading && (
            <button className="button button-blue" type="submit">
              Upload
            </button>
          )}
          {isUploading && (
            <button
              className="button button-red"
              type="submit"
              onClick={cancelUploading}
            >
              Cancel uploading
            </button>
          )}
          <div className="box-loading" style={{ width: progress + "%" }}></div>
        </>
      )}
    </form>
  );
}

export default Uploader;
