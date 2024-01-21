import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadingIcon from "../reusable/UploadingIcon";
import useVideo from "../hooks/useVideo";
import Button from "../reusable/Button";

const CancelToken = axios.CancelToken;
let cancel;

function Uploader() {
  const { fetchVideos } = useVideo();

  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    setProcessing(false);
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

    try {
      /** @API call */
      const { data } = await axios.post("/api/upload-video", file, {
        headers: {
          filename: fileName,
        },
        onUploadProgress: (data) => {
          const progressNumber = Math.round((100 * data.loaded) / data.total);
          setProgress(progressNumber);
          if (progressNumber === 100) setProcessing(true);
        },
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      });

      if (data.status === "success") {
        cancelUploading();
        showMessage("File was uploaded successfully!", "success");
        fetchVideos();
      }
    } catch (e) {
      // console.log(e.response.data);
      if (e.response && e.response.data.error)
        showMessage(e.response.data.error, "error");
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
      } ${errorMsg ? "box--error" : ""} ${processing ? "box--processing" : ""}`}
      onDrag={handleDragStart}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragLeave}
      onDrop={handleDrop}
    >
      {!!successMsg || !!errorMsg || processing ? (
        <div className="box__message">
          {successMsg || errorMsg || "Processing your video file."}
        </div>
      ) : (
        <>
          <input
            className="box__file"
            type="file"
            name="file"
            id="file"
            onChange={onInputFileChange}
          />
          {isUploading ? <UploadingIcon animated={true} /> : <UploadingIcon />}
          {isUploading && <span className="box__percentage">{progress}%</span>}
          <div className="box__file-selected-msg">
            {!isUploading && (
              <div className="box__input">
                <label htmlFor="file">
                  {fileName ? (
                    <strong>{fileName}</strong>
                  ) : isDraggedOver ? (
                    <span>You can now drop your video!</span>
                  ) : (
                    <>
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
            )}
            {fileName && !isUploading && (
              <Button color="blue" type="submit" size="small">
                Upload
              </Button>
            )}
          </div>
          {isUploading && (
            <div className="box__is-uploading-msg">
              Uploading <strong> {fileName}</strong>
              <Button
                color="red"
                size="small"
                type="submit"
                onClick={cancelUploading}
              >
                Cancel
              </Button>
            </div>
          )}
          <div className="box-loading" style={{ width: progress + "%" }}></div>
        </>
      )}
    </form>
  );
}

export default Uploader;
