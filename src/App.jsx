import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentHome from './pages/StudentHome';
import UploadProjectPage from './pages/UploadProjectPage';
import AdminDashboard from './pages/AdminDashboard';
import { AppProvider } from './context/AppContext';
import Toast from './components/common/Toast';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Landing Public Page */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/project/:projectId" element={<LandingPage />} />

            {/* Authenticated Student Portal (TRKTube Beranda) */}
            <Route
              path="/student"
              element={(
                <ProtectedRoute allowedRoles={['student', 'admin']}>
                  <StudentHome />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/student/upload"
              element={(
                <ProtectedRoute allowedRoles={['student', 'admin']}>
                  <UploadProjectPage />
                </ProtectedRoute>
              )}
            />
            <Route path="/beranda" element={<Navigate to="/student" replace />} />

            {/* Admin / Dosen Moderation Dashboard */}
            <Route
              path="/admin"
              element={(
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              )}
            />

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toast />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
