import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ children }) => {
  const token = Cookies.get("token");
  return token ? <Navigate to="/home" replace /> : children;
};

export default PublicRoute;
