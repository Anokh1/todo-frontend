import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "./userContext";
import { getAuthTokenFromCookie } from "../services/cookieService";
import { authenticated, getToken } from "../services/localStorageService";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  // const { userEmail, userId } = useUserContext();

  // Check if user is authenticated based on userEmail and userId
  // const isAuthenticated = !!userEmail || !!userId;
  // const isAuthenticated = userEmail && userId;
  // const isAuthenticated = authenticated; 
  // console.log(isAuthenticated); 

  if (localStorage.getItem("jwt")) {
    return <Outlet />
  } else {
    return <Navigate to="/login" replace />
  }

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  // return getAuthTokenFromCookie() ? <Outlet /> : <Navigate to="/login" replace />;

};

export default PrivateRoute;
