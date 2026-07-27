import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const ProtectedRoute = ({ roles = null, allowedRoles = null, children = null }) => {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const userRole = useAuthStore((s) => s.role) || user?.role;
  const location = useLocation();

  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;

  const requiredRoles = allowedRoles || roles;

  if (requiredRoles && requiredRoles.length > 0) {
    if (!userRole) return <Navigate to="/login" replace state={{ from: location }} />;
    
    const normalizedUserRole = userRole.toString().toLowerCase().trim();
    const hasPermission = requiredRoles.some(
      (r) => r.toString().toLowerCase().trim() === normalizedUserRole
    );

    if (!hasPermission) return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;



