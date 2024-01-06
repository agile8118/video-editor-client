import React, { useState } from "react";
import Modal from "../reusable/Modal";
import axios from "axios";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import alert from "../lib/alert";
import t from "../lib/tokens";

const UploadPhoto = (props) => {
  const [loading, setLoading] = useState(false); // overall modal loading
  const [resizeLoading, setResizeLoading] = useState(false); // resize button loading
  const [error, setError] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const reset = () => {
    setStatus("clean");
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    setResizeLoading(true);

    try {
      /** @API call */
      await axios.put("/api/video/resize", {
        videoId: props.videoId,
        width,
        height,
      });
    } catch (e) {
      console.log(e);
      alert(t.alert.error.default, "error");
    }

    setResizeLoading(false);
  };

  const renderResizes = () => {
    const dimensionsArray = Object.keys(props.resizes);

    // Separate processing and processed videos
    const processingVideos = dimensionsArray.filter(
      (dimensions) => props.resizes[dimensions].processing
    );

    const processedVideos = dimensionsArray.filter(
      (dimensions) => !props.resizes[dimensions].processing
    );

    // Sort processed videos by resolution (higher resolution first)
    processedVideos.sort((a, b) => {
      const resolutionA = a.split("x").map(Number);
      const resolutionB = b.split("x").map(Number);

      if (resolutionA[0] !== resolutionB[0]) {
        return resolutionB[0] - resolutionA[0];
      } else {
        return resolutionB[1] - resolutionA[1];
      }
    });

    // Combine processing and sorted processed videos
    const sortedDimensions = [...processingVideos, ...processedVideos];

    return sortedDimensions.map((dimensions) => {
      const width = dimensions.split("x")[0];
      const height = dimensions.split("x")[1];
      const isProcessing = props.resizes[dimensions].processing;

      return (
        <div
          className={`resizes__item ${
            isProcessing && "resizes__item--in-progress"
          }`}
          key={dimensions}
        >
          <div className="resizes__dimensions">
            {width}x{height}
          </div>
          {isProcessing ? (
            <div className="resizes__progress-msg">Processing</div>
          ) : (
            <a
              className="button button-blue button-small"
              href={`/get-video-asset?videoId=${props.videoId}&type=resize&dimensions=${dimensions}`}
            >
              Download
            </a>
          )}
        </div>
      );
    });
  };

  return (
    <Modal
      header={props.header}
      open={props.open}
      onClose={() => {
        props.onClose();
        setError("");
      }}
    >
      <p className="">{props.text}</p>
      <form className="resize-input" onSubmit={onFormSubmit}>
        <Input
          label="width"
          value={width}
          onChange={(value) => {
            setWidth(value);
          }}
        />
        <span>&times;</span>
        <Input
          label="height"
          value={height}
          onChange={(value) => {
            setHeight(value);
          }}
        />
        <Button color="blue" type="submit" loading={resizeLoading}>
          Resize
        </Button>
      </form>

      <div className="resizes">
        <h4>Your Resizes:</h4>

        {props.resizes && Object.keys(props.resizes).length ? (
          renderResizes()
        ) : (
          <div className="resizes__no-resize-message">
            You haven't resized this video yet.
          </div>
        )}
      </div>

      {/* <p className="image__upload--error">{error}</p> */}

      {/* Loading section */}
      {/* {loading && (
        <div className="image__upload--loading margin-top-1">
          <div className="center-content">
            <Loading />
          </div>
        </div>
      )} */}
    </Modal>
  );
};

export default UploadPhoto;
