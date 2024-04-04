import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './authProvider';

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const { user } = useAuth();

  return user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
