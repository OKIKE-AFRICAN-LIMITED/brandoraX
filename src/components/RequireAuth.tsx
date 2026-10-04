import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner } from './dashboard/ui';

/** Gate for dashboard routes. `admin` restricts to admin accounts. */
export const RequireAuth: React.FC<{ admin?: boolean; children: React.ReactElement }> = ({ admin, children }) => {
  const { loading, user, profile, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner label="Loading your portal…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (admin && !isAdmin) return <Navigate to="/dashboard" replace />;
  // Admins land on their console, not the student view
  if (!admin && isAdmin && location.pathname === '/dashboard') return <Navigate to="/admin" replace />;
  return children;
};
