import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InlineLoading from "../reusable/InlineLoading";
import t from "../lib/tokens";
import Uploader from "../components/Uploader";
import { AppContext } from "../index";
import Videos from "../components/Videos";

const Home = () => {
  const { loggedIn, setLoggedIn, section, setSection } = useContext(AppContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login");
    }
  }, [loggedIn]);

  if (loading)
    return (
      <div className="u-text-center u-margin-top-3">
        <InlineLoading color="gray" />
      </div>
    );
  return (
    <div className="posts-container">
      <Uploader />
      <Videos />
    </div>
  );
};

export default Home;
