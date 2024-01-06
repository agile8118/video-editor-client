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
        <h4>Your resizes:</h4>

        <div className="resizes__item resizes__item--in-progress">
          <div className="resizes__dimensions">2169x1960</div>
          <div className="resizes__progress-msg">Processing</div>
        </div>

        <div className="resizes__item">
          <div className="resizes__dimensions">1920x1080</div>
          <Button color="blue" size="small">
            Download
          </Button>
        </div>

        <div className="resizes__item">
          <div className="resizes__dimensions">1080x700</div>
          <Button color="blue" size="small">
            Download
          </Button>
        </div>
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
