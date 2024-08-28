import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsAuthenticated = () => {
  const userData = localStorage.getItem("user");
  // console.log(userData);
  if (userData) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default IsAuthenticated;
