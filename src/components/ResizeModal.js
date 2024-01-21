import React, { useState } from "react";
import Modal from "../reusable/Modal";
import axios from "axios";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import alert from "../lib/alert";
import t from "../lib/tokens";
import useVideo from "../hooks/useVideo";

const UploadPhoto = (props) => {
  // const [loading, setLoading] = useState(false); // overall modal loading
  const [resizeLoading, setResizeLoading] = useState(false); // resize button loading
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const { video, addResize } = useVideo(props.videoId);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // Check that width and height are numbers, greater than zero, and less than the
    // dimensions of the original video.
    if (
      !Number(width) ||
      !Number(height) ||
      Number(width) <= 0 ||
      Number(height) <= 0 ||
      Number(width) > video.dimensions.width ||
      Number(height) > video.dimensions.height
    ) {
      alert(t.alert.error.video.resize.range, "error");
      return;
    }

    // Check if numbers are even
    if (Number(width) % 2 !== 0 || Number(height) % 2 !== 0) {
      alert(t.alert.error.video.resize.even, "error");
      return;
    }

    setResizeLoading(true);

    try {
      /** @API call */
      await axios.put("/api/video/resize", {
        videoId: props.videoId,
        width,
        height,
      });

      setWidth("");
      setHeight("");
      alert(t.alert.success.video.resized, "success");
      addResize(width, height);
    } catch (e) {
      alert(t.alert.error.default, "error");
    }

    setResizeLoading(false);
  };

  const renderResizes = () => {
    const dimensionsArray = Object.keys(video.resizes);

    // Separate processing and processed videos
    const processingVideos = dimensionsArray.filter(
      (dimensions) => video.resizes[dimensions].processing
    );

    const processedVideos = dimensionsArray.filter(
      (dimensions) => !video.resizes[dimensions].processing
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

      const isProcessing = video.resizes[dimensions].processing;

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
            /** @API call */
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
      header={`Resize ${video.name}`}
      open={props.open}
      onClose={() => {
        props.onClose();
        setWidth("");
        setHeight("");
      }}
    >
      <p className="">{props.text}</p>
      <form className="resize-input" onSubmit={onFormSubmit}>
        <Input
          label="width"
          value={width}
          required={true}
          onChange={(value) => {
            setWidth(value);
          }}
        />
        <span>&times;</span>
        <Input
          label="height"
          value={height}
          required={true}
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
        {video.resizes && Object.keys(video.resizes).length ? (
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
