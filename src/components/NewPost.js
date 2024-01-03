import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../index";
import Input from "../reusable/Input";
import Textarea from "../reusable/Textarea";
import Button from "../reusable/Button";
import alert from "../lib/alert";
import t from "../lib/tokens";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSection } = useContext(AppContext);

  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /** @API call */
      await axios.post("/api/posts", { title, body });
      navigate("/");
      setSection("/");
      alert(t.alert.success.post.created, "success");
    } catch (e) {
      alert(t.alert.error.default, "error");
    }

    setLoading(false);
  };

  return (
    <div className="new-post-container">
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <Input
            required={true}
            type="text"
            label="Title"
            value={title}
            onChange={(value) => {
              setTitle(value);
            }}
          />
        </div>
        <div className="form-group">
          <Textarea
            label="Body"
            required={true}
            rows={5}
            value={body}
            onChange={(value) => {
              setBody(value);
            }}
          />
        </div>
        <div className="form-group u-flex-text-right">
          <Button type="submit" color="blue" loading={loading}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
