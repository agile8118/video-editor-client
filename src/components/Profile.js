import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import alert from "../lib/alert";
import InlineLoading from "../reusable/InlineLoading";
import t from "../lib/tokens";

const Profile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contentLoading, setContentLoading] = useState(false); // loading for the data fetching
  const [formLoading, setFormLoading] = useState(false); // loading for the form submission

  const fetchData = async () => {
    setContentLoading(true);
    try {
      /** @API call */
      const { data } = await axios.get("/api/user");
      setName(data.name);
      setUsername(data.username);
    } catch (e) {
      alert(t.alert.error.default, "error");
    }
    setContentLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      /** @API call */
      await axios.put("/api/user", { name, username, password });
      alert(t.alert.success.user.updated, "success");
    } catch (e) {
      alert(t.alert.error.default, "error");
    }
    setFormLoading(false);
  };

  if (contentLoading)
    return (
      <div className="u-text-center u-margin-top-3">
        <InlineLoading color="gray" />
      </div>
    );

  return (
    <div className="profile-container">
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(value) => {
              setName(value);
            }}
          />
        </div>
        <div className="form-group">
          <Input
            type="text"
            label="Username"
            value={username}
            onChange={(value) => {
              setUsername(value);
            }}
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(value) => {
              setPassword(value);
            }}
          />
        </div>
        <div className="form-group u-flex-text-right">
          <Button color="blue" type="submit" loading={formLoading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
