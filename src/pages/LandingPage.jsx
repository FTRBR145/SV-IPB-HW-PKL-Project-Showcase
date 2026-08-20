import React, { useState } from 'react';

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

// Initial Data
import { initialProjects } from '../data/projectsData';

export default function LandingPage({ onNavigateToAdmin }) {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedSemester, setSelectedSemester] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [activeProjectDetail, setActiveProjectDetail] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchStudent = p.student.toLowerCase().includes(q);
      const matchCourse = p.course.toLowerCase().includes(q);
      const matchTech = p.techStack.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchStudent && !matchCourse && !matchTech) {
        return false;
      }
    }
    return true;
  });

  // Action Handlers
  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleLoginSuccess = (userRole) => {
    if (userRole === 'admin' && onNavigateToAdmin) {
      onNavigateToAdmin();
    }
  };

  return (
    <div className="landing-page">
      {/* Top Navbar */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdminDashboard={onNavigateToAdmin}
        onSelectCourse={(course) => setSelectedCourse(course)}
        onSelectSemester={(sem) => setSelectedSemester(sem)}
      />

      {/* Hero Banner Section */}
      <HeroSection onOpenUpload={() => setIsUploadOpen(true)} />

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
        onClickDetail={(proj) => setActiveProjectDetail(proj)}
      />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {activeProjectDetail && (
        <ProjectDetailModal
          project={activeProjectDetail}
          onClose={() => setActiveProjectDetail(null)}
        />
      )}

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddProject={handleAddProject}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
