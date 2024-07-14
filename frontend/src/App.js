// src/App.js

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import DriverDashboard from "./components/dashboards/DriverDashboard";
import SuperDashboard from "./components/dashboards/SuperDashboard"; // Import SuperDashboard
import OfficeDashboard from "./components/dashboards/OfficeDashboard"; // Import OfficeDashboard
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import "./App.css";

const App = () => (
  <Router>
    <Content />
  </Router>
);

const Content = () => {
  const location = useLocation();
  const hideNavbarRoutes = [
    "/DriverDashboard",
    "/SuperDashboard",
    "/OfficeDashboard",
  ];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/DriverDashboard" element={<DriverDashboard />} />
        <Route exact path="/SuperDashboard" element={<SuperDashboard />} />
        <Route exact path="/OfficeDashboard" element={<OfficeDashboard />} />
      </Routes>
    </>
  );
};

export default App;
