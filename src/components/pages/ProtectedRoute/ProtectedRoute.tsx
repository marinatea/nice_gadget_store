import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useUser();
  const location = useLocation();

  return user ? element : <Navigate to="/signin" state={{ from: location }} />;
};

export default ProtectedRoute;
