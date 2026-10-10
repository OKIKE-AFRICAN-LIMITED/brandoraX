import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner } from './dashboard/ui';

/** Gate for dashboard routes. Supports `admin` or `tutor` constraints. */
export const RequireAuth: React.FC<{ admin?: boolean; tutor?: boolean; children: React.ReactElement }> = ({ admin, tutor, children }) => {
  const { loading, user, isAdmin, isTutor } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner label="Loading your portal…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  
  // Admins have universal superuser access to all dashboard types (Admin, Tutor, and Student)
  if (isAdmin) {
    return children;
  }

  // Restrict Admin routes
  if (admin && !isAdmin) {
    if (isTutor) return <Navigate to="/tutor" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  // Restrict Tutor routes from standard students
  if (tutor && !isTutor) {
    return <Navigate to="/dashboard" replace />;
  }

  // Tutors landing on /dashboard can be redirected to /tutor if not intentionally previewing
  if (!admin && !tutor && location.pathname === '/dashboard' && isTutor) {
    return <Navigate to="/tutor" replace />;
  }

  return children;
};
