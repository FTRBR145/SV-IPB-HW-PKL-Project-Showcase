import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams, useParams } from 'react-router-dom';

// Common Components
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

// Landing Sections
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import StatsBar from '../components/landing/StatsBar';
import MataKuliahSection from '../components/landing/MataKuliahSection';
import ProjectShowcase from '../components/landing/ProjectShowcase';

// Modals
import ProjectDetailModal from '../components/modals/ProjectDetailModal';
import UploadModal from '../components/modals/UploadModal';
import LoginModal from '../components/modals/LoginModal';

// App Context
import useApp from '../hooks/useApp';

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projectId } = useParams();
  const { projects, currentUser, isLoggedIn, logout, adminSettings, showToast } = useApp();

  const [selectedSemester, setSelectedSemester] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [activeProjectDetail, setActiveProjectDetail] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get('login') === 'required') {
      setIsLoginOpen(true);
    }
  }, [searchParams]);

  // Deep-link direct project modal opening via /project/:id or ?project=:id
  useEffect(() => {
    const targetId = projectId || searchParams.get('project');
    if (targetId) {
      const found = projects.find((p) => String(p.id) === String(targetId));
      if (found) {
        setActiveProjectDetail(found);
      }
    }
  }, [projectId, searchParams, projects]);

  const handleCloseDetail = () => {
    setActiveProjectDetail(null);
    if (searchParams.get('project')) {
      searchParams.delete('project');
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleOpenDetail = (proj) => {
    setActiveProjectDetail(proj);
    setSearchParams({ project: proj.id });
  };

  // Filter Projects Logic
  const filteredProjects = projects.filter((p) => {
    // Semester filter
    if (selectedSemester !== 'ALL' && p.semester !== selectedSemester) {
      return false;
    }
    // Course filter
    if (selectedCourse && p.course !== selectedCourse) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title?.toLowerCase().includes(q);
      const matchStudent = p.student?.toLowerCase().includes(q);
      const matchCourse = p.course?.toLowerCase().includes(q);
      const matchTech = p.techStack?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchStudent && !matchCourse && !matchTech) {
        return false;
      }
    }
    return true;
  });

  const handleLoginSuccess = (userRole) => {
    const requestedPath = location.state?.from;
    const canUseRequestedPath =
      typeof requestedPath === 'string' &&
      (requestedPath.startsWith('/student') || (userRole === 'admin' && requestedPath.startsWith('/admin')));

    navigate(canUseRequestedPath ? requestedPath : userRole === 'admin' ? '/admin' : '/student', {
      replace: true
    });
  };

  const handleOpenUpload = () => {
    if (adminSettings.maintenanceMode) {
      showToast('Upload sedang dinonaktifkan selama pemeliharaan.', 'info');
      return;
    }
    if (!adminSettings.allowGuestUploads && !isLoggedIn) {
      setIsLoginOpen(true);
      showToast('Silakan masuk sebelum mengunggah projek.', 'info');
      return;
    }
    setIsUploadOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    if (searchParams.get('login')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('login');
      setSearchParams(nextParams, { replace: true });
    }
  };

  return (
    <div className="landing-page min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        currentPage="landing"
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onOpenUpload={handleOpenUpload}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={logout}
        onNavigateToAdmin={() => navigate('/admin')}
        onNavigateToStudent={() => navigate('/student')}
        onSelectCourse={(course) => setSelectedCourse(course)}
      />

      {/* Hero Banner Section */}
      <HeroSection onOpenUpload={handleOpenUpload} />

      {/* About Section */}
      <AboutSection />

      {/* Prestasi Mahasiswa Stats Card */}
      <StatsBar />

      {/* Mata Kuliah Carousel Section */}
      <MataKuliahSection onSelectCourse={(course) => setSelectedCourse(course)} />

      {/* Projects Showcase Catalog */}
      <ProjectShowcase
        projects={filteredProjects}
        selectedSemester={selectedSemester}
        onSelectSemester={setSelectedSemester}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClickDetail={handleOpenDetail}
      />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {activeProjectDetail && (
        <ProjectDetailModal
          project={activeProjectDetail}
          onClose={handleCloseDetail}
        />
      )}

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
