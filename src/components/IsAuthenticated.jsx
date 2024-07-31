import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsAuthenticated = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default IsAuthenticated;
