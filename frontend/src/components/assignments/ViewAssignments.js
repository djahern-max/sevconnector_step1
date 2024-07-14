import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ViewAssignments.module.css";

const ViewAssignments = ({ companyCode }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    console.log("Company code received in ViewAssignments:", companyCode);

    const fetchAssignments = async () => {
      try {
        if (!companyCode) {
          console.error("Company code is undefined");
          return;
        }

        const response = await axios.get("/api/driverAssignments/assignments", {
          params: { company_code: companyCode },
        });
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [companyCode]);

  return (
    <div className={styles.viewAssignmentsContainer}>
      <h2>View Assignments</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Super</th>
            <th>Driver</th>
            <th>Company Code</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.super_name}</td>
              <td>{assignment.driver_name}</td>
              <td>{assignment.company_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssignments;
