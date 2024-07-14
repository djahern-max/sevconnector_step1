import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "Driver", // Default role, adjust as needed
    company_code: "", // Add company_code to the form data
  });

  const { name, email, password, password2, role, company_code } = formData;
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Store the token and navigate to the login page
      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
        if (error.response.status === 409) {
          alert("A user with this email already exists.");
        } else {
          alert("Failed to register user");
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("No response received from the server");
      } else {
        console.error("Error message:", error.message);
        alert("Failed to register user");
      }
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <select name="role" value={role} onChange={onChange} required>
            <option value="Driver">Driver</option>
            <option value="Super">Super</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company Code"
            name="company_code"
            value={company_code}
            onChange={onChange}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
