import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const ProtectedRoute = ({ roles = null, children = null }) => {
  const token = useAuthStore((s) => s.token);
  const userRole = useAuthStore((s) => s.role);
  const location = useLocation();

  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;

  if (roles && roles.length > 0) {
    if (!userRole) return <Navigate to="/login" replace state={{ from: location }} />;
    if (!roles.includes(userRole)) return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;



