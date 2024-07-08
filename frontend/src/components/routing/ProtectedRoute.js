import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import for named export

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const token = localStorage.getItem("token");
  let isAuthenticated = false;
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
      isAuthenticated = userRole === role;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
