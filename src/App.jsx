import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Toast from './components/common/Toast';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ROUTE_ACCESS } from './utils/accessControl';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const StudentHome = lazy(() => import('./pages/StudentHome'));
const UploadProjectPage = lazy(() => import('./pages/UploadProjectPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function RouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6" role="status" aria-live="polite">
      <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-600" aria-hidden="true" />
        Memuat halaman...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <a href="#main-content" className="skip-link">Lewati ke konten utama</a>
          <ScrollToTop />
          <Suspense fallback={<RouteLoader />}>
            <Routes>
            {/* Landing Public Page */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/project/:projectId" element={<LandingPage />} />

            {/* Authenticated Student Portal (TRKTube Beranda) */}
            <Route
              path="/student"
              element={(
                <ProtectedRoute allowedRoles={ROUTE_ACCESS.studentPortal}>
                  <StudentHome />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/student/upload"
              element={(
                <ProtectedRoute allowedRoles={ROUTE_ACCESS.studentUpload}>
                  <UploadProjectPage />
                </ProtectedRoute>
              )}
            />
            <Route path="/beranda" element={<Navigate to="/student" replace />} />

            {/* Admin / Dosen Moderation Dashboard */}
            <Route
              path="/admin"
              element={(
                <ProtectedRoute allowedRoles={ROUTE_ACCESS.admin}>
                  <AdminDashboard />
                </ProtectedRoute>
              )}
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
          <Toast />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
