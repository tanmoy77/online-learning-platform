import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import useAuth from '../../hooks/useAuth';

const AdminPublicRoute = ({children}) => {
  const isAdminLoggedIn = useAdminAuth();
  const isLoggedIn = useAuth();

  if (isAdminLoggedIn) {
    return <Navigate to="/admin/dashboard" />
  }
  if (isLoggedIn) {
    return <Navigate to="/course" />
  }
  if (!isAdminLoggedIn || !isLoggedIn) {
    return children;
  }
}

export default AdminPublicRoute;