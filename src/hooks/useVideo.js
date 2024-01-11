import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../index";
import t from "../lib/tokens";
import axios from "axios";

import alert from "../lib/alert";

const useVideo = (videoId) => {
  const [loading, setLoading] = useState(true); // loading for fetching the videos

  const { videos, setVideos } = useContext(AppContext);
  const [resizes, setResizes] = useState({});
  const [name, setName] = useState("");
  const [dimensions, setDimensions] = useState({});

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
      const resizesObj = videos.find(
        (video) => video.videoId === videoId
      ).resizes;
      setResizes(resizesObj);
    } else {
      setResizes({});
    }
  }, [videoId]);

  useEffect(() => {
    if (videoId) {
      const video = videos.find((video) => video.videoId === videoId);
      setDimensions(video.dimensions);
      setName(video.name);
    } else {
      setDimensions({});
      setName("");
    }
  }, [videoId]);

  return {
    videos,
    loading,
    fetchVideos,
    resizes,
    setResizes,
    dimensions,
    name,
  };
};

export default useVideo;
