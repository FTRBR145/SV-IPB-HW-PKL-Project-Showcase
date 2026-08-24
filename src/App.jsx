import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentHome from './pages/StudentHome';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'student' | 'admin'

  if (currentPage === 'student') {
    return (
      <StudentHome
        onLogout={() => setCurrentPage('landing')}
        onNavigateToAdmin={() => setCurrentPage('admin')}
        onBackToLanding={() => setCurrentPage('landing')}
      />
    );
  }

  if (currentPage === 'admin') {
    return (
      <AdminDashboard
        onBackToLanding={() => setCurrentPage('landing')}
        onNavigateToStudent={() => setCurrentPage('student')}
      />
    );
  }

  return (
    <LandingPage
      onNavigateToAdmin={() => setCurrentPage('admin')}
      onNavigateToStudent={() => setCurrentPage('student')}
    />
  );
}
