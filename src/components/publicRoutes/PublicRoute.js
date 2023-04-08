import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import useStudentAuth from '../../hooks/useAuth';

const PublicRoute = ({children}) => {
  const isLoggedIn = useStudentAuth();
  const isAdminLoggedIn = useAdminAuth();
  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" />
  }
  if (isLoggedIn) {
    return <Navigate to="/course" />
  }
  return children;
}

export default PublicRoute;