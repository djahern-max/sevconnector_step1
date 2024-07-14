import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AssignDriver.module.css";

const AssignDriver = ({ companyCode }) => {
  const [supers, setSupers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [superId, setSuperId] = useState("");
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseSupers = await axios.get("/api/driverAssignments/users", {
          params: { role: "Super", company_code: companyCode }, // Use company_code
        });
        const responseDrivers = await axios.get(
          "/api/driverAssignments/users",
          {
            params: { role: "Driver", company_code: companyCode }, // Use company_code
          }
        );
        setSupers(responseSupers.data);
        setDrivers(responseDrivers.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [companyCode]);

  const handleAssign = async () => {
    try {
      await axios.post("/api/driverAssignments/assign", {
        super_id: superId,
        driver_id: driverId,
        company_code: companyCode,
      });
      alert("Driver assigned to Super successfully");
    } catch (error) {
      console.error("Error assigning driver:", error);
    }
  };

  return (
    <div className={styles.assignDriverContainer}>
      <h2>Assign Driver to Super</h2>
      <div>
        <label className={styles.label}>Super:</label>
        <select
          className={styles.select}
          value={superId}
          onChange={(e) => setSuperId(e.target.value)}
        >
          <option value="">Select Super</option>
          {supers.map((superUser) => (
            <option key={superUser.id} value={superUser.id}>
              {superUser.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={styles.label}>Driver:</label>
        <select
          className={styles.select}
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        >
          <option value="">Select Driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>
      <button className={styles.button} onClick={handleAssign}>
        Assign
      </button>
    </div>
  );
};

export default AssignDriver;
