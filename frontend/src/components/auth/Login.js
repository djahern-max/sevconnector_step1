// src/components/auth/Login.js

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await axios.post("/api/users/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, role } = response.data;

      console.log("User logged in:", response.data);
      localStorage.setItem("token", token);

      console.log("Role:", role);

      switch (role) {
        case "Driver":
          console.log("Redirecting to /DriverDashboard");
          navigate("/DriverDashboard");
          break;
        case "Super":
          console.log("Redirecting to /SuperDashboard");
          navigate("/SuperDashboard");
          break;
        case "Office":
          console.log("Redirecting to /OfficeDashboard");
          navigate("/OfficeDashboard");
          break;
        default:
          console.log("Redirecting to /");
          navigate("/");
      }
    } catch (err) {
      console.error("Error logging in user:", err);
      alert("Invalid credentials, please try again");
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Login</h1>
      <form className="form" onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default Login;
