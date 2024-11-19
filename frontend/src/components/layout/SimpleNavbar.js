import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SimpleNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return <div></div>;
};

export default SimpleNavbar;
