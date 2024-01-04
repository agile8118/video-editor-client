import React, { useState, useEffect } from "react";
import axios from "axios";
import InlineLoading from "../reusable/InlineLoading";
import t from "../lib/tokens";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      /** @API call */
      const { data } = await axios.get("/api/videos");
      setVideos(data);
    } catch (e) {
      alert(t.alert.error.default, "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const downloadVideo = () => {};

  const renderVideos = () => {
    return videos.map((video) => {
      return (
        <div className="video">
          <img
            className="video__thumbnail"
            src={`/thumbnails/${video.thumbnail}`}
          />
          <div className="video__name">{video.name}</div>
          <div className="video__dimensions">
            {video.dimensions.width}x{video.dimensions.height}
          </div>
          <div className="video__extension">
            {video.extension.toUpperCase()}
          </div>

          <div className="video__actions">
            <button className="button button-blue">Resize Video</button>
            <button className="button button-blue">Extract Audio</button>
            <button
              className="button button-blue"
              onClick={downloadVideo(video.videoId)}
            >
              Download Video
            </button>
          </div>
        </div>
      );
    });
  };

  if (loading)
    return (
      <div className="u-text-center u-margin-top-3">
        <InlineLoading color="gray" />
      </div>
    );
  return (
    <div className="videos">
      <h2 className="videos__heading">Your Videos</h2>
      {renderVideos()}
    </div>
  );
};

export default Videos;
