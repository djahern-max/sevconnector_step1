import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "",
    company_id: "",
  });

  const { name, email, password, password2, role, company_id } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/register", formData)
      .then((response) => {
        alert("Data submitted successfully");
      })
      .catch((error) => {
        console.log(formData);
        console.error("Error submitting data:", error);
        alert("Failed to submit data");
      });
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>

      <form
        className="form"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        {/* <div className="form-group">
          <input
            type="text "
            placeholder="role"
            name="role"
            value={role}
            onChange={onChange}
          />
        </div> */}
        <select value={role} onChange={onChange} name="role" required>
          <option value="">Select Role</option>
          <option value="driver">Driver</option>
          <option value="superintendent">Superintendent</option>
          <option value="office">Office</option>
        </select>

        {/* <div className="form-group">
          <input
            type="text"
            placeholder="company_id"
            name="company_id"
            value={company_id}
            onChange={onChange}
          />
        </div> */}
        <div className="form-group">
          <input
            type="text"
            value={company_id}
            onChange={onChange}
            placeholder="Company ID"
            name="company_id"
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
