import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
import Profile from "./components/Profile";
import Header from "./components/Header";

export const AppContext = createContext(null);
function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [section, setSection] = useState("/"); // Possible values: ["/", "/profile", "/login", "/new-post"];

  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn, section, setSection }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
