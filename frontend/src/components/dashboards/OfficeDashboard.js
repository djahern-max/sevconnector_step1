import React, { useState, useEffect } from "react";
import ViewAssignments from "../assignments/ViewAssignments";
import AssignDriver from "../assignments/AssignDriver";
import AssignTruck from "../assignments/AssignTruck"; // Import the new component
import ViewTruckAssignments from "../assignments/ViewTruckAssignments"; // Import the new component
import styles from "./OfficeDashboard.module.css";
import axios from "axios";

const OfficeDashboard = () => {
  const [isAssignDriverVisible, setAssignDriverVisible] = useState(false);
  const [isViewAssignmentsVisible, setViewAssignmentsVisible] = useState(false);
  const [isAssignTruckVisible, setAssignTruckVisible] = useState(false); // State for assigning trucks
  const [isViewTruckAssignmentsVisible, setViewTruckAssignmentsVisible] =
    useState(false); // State for viewing truck assignments
  const [assignments, setAssignments] = useState([]);
  const [truckAssignments, setTruckAssignments] = useState([]); // State for truck assignments
  const companyCode = "SEV"; // Replace this with the actual company code if it's dynamic

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("/api/driverAssignments/assignments", {
        params: { company_code: companyCode },
      });
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchTruckAssignments = async () => {
    try {
      const response = await axios.get("/api/truckAssignments/assignments", {
        params: { company_code: companyCode },
      });
      setTruckAssignments(response.data);
    } catch (error) {
      console.error("Error fetching truck assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchTruckAssignments();
  }, [companyCode]);

  const toggleAssignDriver = () => {
    setAssignDriverVisible(!isAssignDriverVisible);
  };

  const toggleViewAssignments = () => {
    setViewAssignmentsVisible(!isViewAssignmentsVisible);
  };

  const toggleAssignTruck = () => {
    setAssignTruckVisible(!isAssignTruckVisible);
  };

  const toggleViewTruckAssignments = () => {
    setViewTruckAssignmentsVisible(!isViewTruckAssignmentsVisible);
  };

  const handleAssignmentAdded = () => {
    fetchAssignments();
    fetchTruckAssignments();
  };

  return (
    <>
      <div className={styles.officeDashboardContainer}>
        <div className={styles.sidebar}>
          <button className={styles.menuItem} onClick={toggleAssignDriver}>
            {isAssignDriverVisible ? "Hide" : "Show"} Assign Driver
          </button>
          <button className={styles.menuItem} onClick={toggleViewAssignments}>
            {isViewAssignmentsVisible ? "Hide" : "Show"} View Assignments
          </button>
          <button className={styles.menuItem} onClick={toggleAssignTruck}>
            {isAssignTruckVisible ? "Hide" : "Show"} Assign Truck
          </button>
          <button
            className={styles.menuItem}
            onClick={toggleViewTruckAssignments}
          >
            {isViewTruckAssignmentsVisible ? "Hide" : "Show"} View Truck
            Assignments
          </button>
        </div>
        <div className={styles.mainContent}>
          {isAssignDriverVisible && (
            <div className={styles.section}>
              <AssignDriver
                companyCode={companyCode}
                onAssignmentAdded={handleAssignmentAdded}
              />
            </div>
          )}
          {isViewAssignmentsVisible && (
            <div className={styles.section}>
              <ViewAssignments
                companyCode={companyCode}
                assignments={assignments}
                onDeleteAssignment={fetchAssignments}
              />
            </div>
          )}
          {isAssignTruckVisible && (
            <div className={styles.section}>
              <AssignTruck
                companyCode={companyCode}
                onAssignmentAdded={handleAssignmentAdded}
              />
            </div>
          )}
          {isViewTruckAssignmentsVisible && (
            <div className={styles.section}>
              <ViewTruckAssignments
                companyCode={companyCode}
                assignments={truckAssignments}
                onDeleteAssignment={fetchTruckAssignments}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OfficeDashboard;
