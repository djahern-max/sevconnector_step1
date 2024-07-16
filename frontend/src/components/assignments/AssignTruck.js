import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AssignDriver.module.css";

const AssignTruck = ({ companyCode }) => {
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [truckId, setTruckId] = useState("");
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const responseTrucks = await axios.get("/api/trucks", {
          params: { company_code: companyCode },
        });
        const responseDrivers = await axios.get(
          "/api/driverAssignments/users",
          {
            params: { role: "Driver", company_code: companyCode },
          }
        );
        setTrucks(responseTrucks.data);
        setDrivers(responseDrivers.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, [companyCode]);

  const handleAssign = async () => {
    try {
      await axios.post("/api/truckAssignments/assign", {
        truck_id: truckId,
        driver_id: driverId,
        company_code: companyCode,
      });
      alert("Truck assigned to driver successfully");
    } catch (error) {
      console.error("Error assigning truck:", error);
    }
  };

  return (
    <div className={styles.assignDriverContainer}>
      <h2>Assign Truck to Driver</h2>
      <div>
        <label className={styles.label}>Truck:</label>
        <select
          className={styles.select}
          value={truckId}
          onChange={(e) => setTruckId(e.target.value)}
        >
          <option value="">Select Truck</option>
          {trucks.map((truck) => (
            <option key={truck.id} value={truck.id}>
              {truck.truck_number} - {truck.truck_name}
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

export default AssignTruck;
