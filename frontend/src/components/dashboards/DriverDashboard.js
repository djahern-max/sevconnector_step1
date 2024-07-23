import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

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
      .get("/api/material")
      .then((response) => {
        console.log("Materials data:", response.data);
        setMaterials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
      });

    axios
      .get("/api/job")
      .then((response) => {
        console.log("Jobs data:", response.data);
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });

    axios
      .get("/api/loadcount")
      .then((response) => {
        console.log("Loadcounts data:", response.data);
        setLoadcount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loadcounts:", error);
      });

    axios
      .get("/api/phasecode")
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
      const response = await axios.post("/api/delivery", formData);
      console.log("Server response:", response);
      alert("Delivery has been submitted successfully");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit delivery");
    }
  };

  return (
    <div className="form-container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <p className="form-label">Hauled From:</p>
          <select
            className="form-select"
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
          <p className="form-label">Hauled To:</p>
          <select
            className="form-select"
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
          <p className="form-label">Material:</p>
          <select
            className="form-select"
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
          <p className="form-label">Quantity:</p>
          <select
            className="form-select"
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
          <p className="form-label">Phase Code:</p>
          <select
            className="form-select"
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
          <button type="submit" className="btn btn-primary form-button">
            Submit Delivery
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverDashboard;
