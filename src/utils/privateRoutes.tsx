import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "./userContext";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const { userEmail, userId } = useUserContext();

  // Check if user is authenticated based on userEmail and userId
  const isAuthenticated = !!userEmail && !!userId;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
