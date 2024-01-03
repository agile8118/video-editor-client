import React, { useState, useEffect } from "react";
import axios from "axios";
import InlineLoading from "../reusable/InlineLoading";
import t from "../lib/tokens";
import Uploader from "../components/Uploader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // const fetchPosts = async () => {
  //   setLoading(true);
  //   try {
  //     /** @API call */
  //     const { data } = await axios.get("/api/posts");
  //     setPosts(data);
  //   } catch (e) {
  //     alert(t.alert.error.default, "error");
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  if (loading)
    return (
      <div className="u-text-center u-margin-top-3">
        <InlineLoading color="gray" />
      </div>
    );
  return (
    <div className="posts-container">
      <Uploader />
    </div>
  );
};

export default Home;
