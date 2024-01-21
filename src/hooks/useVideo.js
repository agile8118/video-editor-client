import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../index";
import t from "../lib/tokens";
import axios from "axios";

import alert from "../lib/alert";

const useVideo = (videoId) => {
  const { videos, setVideos } = useContext(AppContext); // the complete list of videos
  const [loading, setLoading] = useState(true); // loading for fetching the videos
  const [video, setVideo] = useState({}); // selected video for the modal

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
    if (videoId) {
      const selectedVideo = videos.find((video) => video.videoId === videoId);
      setVideo(selectedVideo);
    } else {
      setVideo({});
    }
  }, [videoId, videos]);

  const addResize = (width, height) => {
    // Find the video in videos and add the resize to it, with processing set to true
    const updatedVideos = videos.map((video) => {
      if (video.videoId === videoId) {
        return {
          ...video,
          resizes: {
            ...video.resizes,
            [`${width}x${height}`]: {
              processing: true,
            },
          },
        };
      }
      return video;
    });
    setVideos(updatedVideos);
  };

  const extractedAudioTrue = (videoId) => {
    const updatedVideos = videos.map((video) => {
      if (video.videoId === videoId) {
        return {
          ...video,
          extractedAudio: true,
        };
      }
      return video;
    });
    setVideos(updatedVideos);
  };

  return {
    videos,
    loading,
    fetchVideos,
    video,
    addResize,
    extractedAudioTrue,
  };
};

export default useVideo;
