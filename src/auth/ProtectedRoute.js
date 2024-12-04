import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(auth.user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
