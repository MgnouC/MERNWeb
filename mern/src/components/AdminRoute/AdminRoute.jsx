import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  
  if (!user.isAdmin) {
    // Redirect non-admin users to a different page, e.g., home page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;