import React from "react";
import AssignDriver from "../assignments/AssignDriver";
import ViewAssignments from "../assignments/ViewAssignments";

const OfficeDashboard = ({ companyCode }) => {
  return (
    <div>
      <h1>Office Dashboard</h1>
      <AssignDriver companyCode={companyCode} />
      <ViewAssignments companyCode={companyCode} />
      {/* Add more components as needed */}
    </div>
  );
};

export default OfficeDashboard;
