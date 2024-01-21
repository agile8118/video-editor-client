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


  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login");
    }
  }, [loggedIn]);


  return (
    <div className="posts-container">
      <Uploader />
      <Videos />
    </div>
  );
};

export default Home;
