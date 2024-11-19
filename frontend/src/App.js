import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DriverDashboard from './components/dashboards/DriverDashboard';

const App = () => (
  <Router>
    <Content />
  </Router>
);

const Content = () => {
  return (
    <Routes>
      {/* Redirect root (/) to login */}
      <Route exact path="/" element={<Login />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/DriverDashboard" element={<DriverDashboard />} />
    </Routes>
  );
};

export default App;
