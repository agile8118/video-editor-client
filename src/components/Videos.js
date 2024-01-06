import React, { useState, useEffect } from "react";
import axios from "axios";
import InlineLoading from "../reusable/InlineLoading";
import t from "../lib/tokens";
import alert from "../lib/alert";
import Button from "../reusable/Button";
import ResizeModal from "./ResizeModal";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [resizeModalOpen, setResizeModalOpen] = useState(false);
  const [resizeModalVideoId, setResizeModalVideoId] = useState("");
  const [resizeModalVideoName, setResizeModalVideoName] = useState("");

  const [extractAudioLoading, setExtractAudioLoading] = useState(false);

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

  const extractAudio = async (videoId) => {
    setExtractAudioLoading(true);

    try {
      /** @API call */
      await axios.patch(`/api/video/extract-audio?videoId=${videoId}`, {
        videoId,
      });
      alert(t.alert.success.video.audioExtracted, "success");
      fetchVideos();
    } catch (e) {
      alert(t.alert.error.default, "error");
    }

    setExtractAudioLoading(true);
  };

  const renderVideos = () => {
    return videos.map((video) => {
      return (
        <div className="video" key={video.id}>
          <img
            className="video__thumbnail"
            src={`/get-video-asset?videoId=${video.videoId}&type=thumbnail`}
          />
          <div className="video__name">{video.name}</div>
          <div className="video__dimensions">
            {video.dimensions.width}x{video.dimensions.height}
          </div>
          <div className="video__extension">
            {video.extension.toUpperCase()}
          </div>

          <div className="video__actions">
            <Button
              size="small"
              color="blue"
              onClick={() => {
                setResizeModalOpen(true);
                setResizeModalVideoId(video.videoId);
                setResizeModalVideoName(video.name);
              }}
            >
              Resize Video
            </Button>

            {video.extractedAudio ? (
              <a
                className="button button-small button-blue"
                href={`/get-video-asset?videoId=${video.videoId}&type=audio`}
              >
                Download Audio
              </a>
            ) : (
              <Button
                size="small"
                color="blue"
                loading={extractAudioLoading}
                onClick={() => {
                  extractAudio(video.videoId);
                }}
              >
                Extract Audio
              </Button>
            )}

            <a
              className="button button-small button-blue"
              href={`/get-video-asset?videoId=${video.videoId}&type=original`}
            >
              Download Video
            </a>
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
      <ResizeModal
        videoId={resizeModalVideoId}
        header={`Resize ${resizeModalVideoName}`}
        text="Specify a new width and height:"
        onClose={() => {
          setResizeModalOpen(false);
          setResizeModalVideoName("");
          setResizeModalVideoId("");
        }}
        success={() => {}}
        open={resizeModalOpen}
      />

      <h2 className="videos__heading">Your Videos</h2>
      {videos.length === 0 ? (
        <div className="videos__no-video-message">
          You have not uploaded any videos yet for editing. Start by dragging a
          video file and dropping it into the box above!
        </div>
      ) : (
        renderVideos()
      )}
    </div>
  );
};

export default Videos;
