import React from "react";
import { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ element: Component }) => {
  return (
    <Route
      {...rest}
      element={isAdmin ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default AdminRoute;
