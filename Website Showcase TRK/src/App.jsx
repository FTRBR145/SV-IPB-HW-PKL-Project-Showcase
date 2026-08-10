import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  if (currentPage === 'admin') {
    return <AdminDashboard onBackToLanding={() => setCurrentPage('landing')} />;
  }

  return <LandingPage onNavigateToAdmin={() => setCurrentPage('admin')} />;
}
