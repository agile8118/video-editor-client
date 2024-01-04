import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../index";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import alert from "../lib/alert";
import t from "../lib/tokens";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { loggedIn, setLoggedIn, setSection } = useContext(AppContext);

  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /** @API call */
      await axios.post("/api/login", { username, password });
      setLoggedIn(true);
      navigate("/");
      setSection("/");
      alert(t.alert.success.auth.loggedIn, "success");
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 401) {
        alert(t.alert.error.auth.badLoginInfo, "error");
      } else {
        alert(t.alert.error.default, "error");
      }
    }
    setLoading(false);
  };
  return (
    <div className="login-container">
      <form onSubmit={onFormSubmit}>
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
          <Button color="blue" type="submit" loading={loading}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
