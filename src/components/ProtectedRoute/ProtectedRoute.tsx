import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  redirectTo: string;
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  redirectTo,
  children,
}): ReactElement => {
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
