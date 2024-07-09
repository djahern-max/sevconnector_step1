import React from "react";
import DriverDashboard from "./components/dashboards/DriverDashboard";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => (
  <Router>
    <Content />
  </Router>
);

const Content = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/DriverDashboard"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />

        <Route exact path="/DriverDashboard" element={<DriverDashboard />} />
      </Routes>
    </>
  );
};

export default App;
