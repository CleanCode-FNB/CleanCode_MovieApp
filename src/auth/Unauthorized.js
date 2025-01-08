import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default Unauthorized;


// App.js
//import Unauthorized from "./auth/Unauthorized";

// Inside <Routes>
//<Route path="/unauthorized" element={<Unauthorized />} />
