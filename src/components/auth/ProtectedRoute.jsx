import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useApp from '../../hooks/useApp';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useApp();
  const location = useLocation();

  if (!currentUser) {
    return (
      <Navigate
        to="/?login=required"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    const fallback = currentUser.role === 'admin' ? '/admin' : '/student';
    return <Navigate to={fallback} replace />;
  }

  return children;
}
