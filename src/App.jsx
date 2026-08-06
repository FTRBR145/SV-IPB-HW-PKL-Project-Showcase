import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import StatsBar from './components/StatsBar';
import MataKuliahSection from './components/MataKuliahSection';
import ProjectShowcase from './components/ProjectShowcase';
import ProjectDetailModal from './components/ProjectDetailModal';
import UploadModal from './components/UploadModal';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';

import { initialProjects } from './data/projectsData';

export default function App() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedSemester, setSelectedSemester] = useState('ALL');
  const [selectedProdi, setSelectedProdi] = useState('ALL');
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
    // Prodi filter
    if (selectedProdi !== 'ALL' && p.prodiCode !== selectedProdi) {
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

  return (
    <div className="app">
      {/* Navbar */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onSelectCourse={(course) => setSelectedCourse(course)}
        onSelectSemester={(sem) => setSelectedSemester(sem)}
      />

      {/* Hero Section */}
      <HeroSection onOpenUpload={() => setIsUploadOpen(true)} />

      {/* About Section */}
      <AboutSection />

      {/* Prestasi Stats Bar (Matches Design Screenshot) */}
      <StatsBar />

      {/* Mata Kuliah Carousel Section */}
      <MataKuliahSection onSelectCourse={(course) => setSelectedCourse(course)} />

      {/* Project Showcase Section */}
      <ProjectShowcase
        projects={filteredProjects}
        selectedSemester={selectedSemester}
        onSelectSemester={setSelectedSemester}
        selectedProdi={selectedProdi}
        onSelectProdi={setSelectedProdi}
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
      />
    </div>
  );
}
