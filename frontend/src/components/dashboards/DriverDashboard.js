import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sev_Logo from "../../img/Sev_Logo.png";

const DriverDashboard = () => {
  const [formData, setFormData] = useState({
    hauledFrom: "",
    hauledTo: "",
    material: "",
    quantity: "",
    phaseCode: "", // Added phaseCode to formData state
  });

  const [materials, setMaterials] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loadcounts, setLoadcount] = useState([]);
  const [phaseCodes, setPhaseCodes] = useState([]); // State to store phase codes
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/material")
      .then((response) => {
        console.log("Materials data:", response.data);
        setMaterials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
      });

    axios
      .get("http://localhost:3001/api/job")
      .then((response) => {
        console.log("Jobs data:", response.data);
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });

    axios
      .get("http://localhost:3001/api/loadcount")
      .then((response) => {
        console.log("Loadcounts data:", response.data);
        setLoadcount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loadcounts:", error);
      });

    axios
      .get("http://localhost:3001/api/phasecode")
      .then((response) => {
        console.log("Phase codes data:", response.data);
        setPhaseCodes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching phase codes:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/delivery",
        formData
      );
      console.log("Server response:", response);
      alert("Delivery has been submitted successfully");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit delivery");
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/");
  };

  return (
    <div className="container_driver">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <p className="form-label">Hauled From:</p>
          <select
            name="hauledFrom"
            id="hauledFrom"
            value={formData.hauledFrom}
            onChange={handleChange}
          >
            <option value="">Where From?</option>
            {jobs.length > 0 ? (
              jobs.map((item, index) => (
                <option key={index} value={item.job_number}>
                  {item.job_name}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <p className="form-label">Hauled To:</p>
          <select
            name="hauledTo"
            id="hauledTo"
            value={formData.hauledTo}
            onChange={handleChange}
          >
            <option value="">Where To?</option>
            {jobs.length > 0 ? (
              jobs.map((item, index) => (
                <option key={index} value={item.job_number}>
                  {item.job_name}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <p className="form-label">Material:</p>
          <select
            name="material"
            id="material"
            value={formData.material}
            onChange={handleChange}
          >
            <option value="">What Type?</option>
            {materials.length > 0 ? (
              materials.map((item, index) => (
                <option key={index} value={item.item_code}>
                  {item.description}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <p className="form-label">Quantity:</p>
          <select
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
          >
            <option value="">How much?</option>
            {loadcounts.length > 0 ? (
              loadcounts.map((item, index) => (
                <option key={index} value={item.quantity}>
                  {item.quantity}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
        <div className="form-group">
          <p className="form-label">Phase Code:</p>
          <select
            name="phaseCode"
            id="phaseCode"
            value={formData.phaseCode}
            onChange={handleChange}
          >
            <option value="">Which Phase?</option>
            {phaseCodes.length > 0 ? (
              phaseCodes.map((item, index) => (
                <option key={index} value={item.phaseCode}>
                  {item.description}
                </option>
              ))
            ) : (
              <option>Loading...</option>
            )}
          </select>
        </div>
        <button type="submit" className="logout-button">
          Submit Delivery
        </button>
        <button className="logout-button" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" /> Logout
        </button>
      </form>
    </div>
  );
};

export default DriverDashboard;
