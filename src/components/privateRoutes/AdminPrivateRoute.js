import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';

const AdminPrivateRoute = ({children}) => {
  const isAdminLoggedIn = useAdminAuth();

  return isAdminLoggedIn ? children : <Navigate to="/admin" />
}

export default AdminPrivateRoute;