import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ViewAssignments.module.css";

const ViewAssignments = ({ companyCode }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`/api/assignments/${companyCode}`);
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
      {assignments.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Super Name</th>
              <th>Driver Name</th>
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
      ) : (
        <p className={styles.noAssignments}>
          No assignments found for this company.
        </p>
      )}
    </div>
  );
};

export default ViewAssignments;
