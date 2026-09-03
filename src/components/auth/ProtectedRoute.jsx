import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useApp from '../../hooks/useApp';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, isAuthReady } = useApp();
  const location = useLocation();

  if (!isAuthReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6" role="status" aria-live="polite">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-600" aria-hidden="true" />
          Memulihkan sesi akun...
        </div>
      </div>
    );
  }

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
