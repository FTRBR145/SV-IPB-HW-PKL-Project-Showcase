import React, { useState } from 'react';
import { LogIn, Upload, Menu, X, ChevronDown, Award } from 'lucide-react';
import { SV_COURSES, SV_PRODIS } from '../../data/projectsData';

export default function Navbar({ onOpenUpload, onOpenLogin, onSelectCourse, onSelectSemester }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mkDropdownOpen, setMkDropdownOpen] = useState(false);
  const [semDropdownOpen, setSemDropdownOpen] = useState(false);

  const handleCourseClick = (course) => {
    if (onSelectCourse) onSelectCourse(course === "Semua Mata Kuliah" ? "" : course);
    setMkDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSemesterClick = (sem) => {
    if (onSelectSemester) onSelectSemester(sem);
    setSemDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <a href="#" className="brand-logo" style={{ textDecoration: 'none' }}>
          <div className="logo-badge-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', background: 'linear-gradient(135deg, #003366, #2563eb)', borderRadius: '10px', boxShadow: '0 4px 10px rgba(37,99,235,0.3)', marginRight: '10px' }}>
            <Award size={24} color="#ffffff" />
          </div>
          <div className="brand-text">
            <span className="brand-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ipb-navy)', letterSpacing: '-0.02em', display: 'block' }}>
              TRK <span style={{ color: 'var(--accent-blue)' }}>SHOWCASE</span>
            </span>
            <span className="brand-subtitle" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginTop: '-2px' }}>
              Sekolah Vokasi IPB
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <a href="#" className="nav-link active">Home</a>
          <a href="#about" className="nav-link">Tentang</a>

          {/* Mata Kuliah Dropdown */}
          <div className="dropdown-wrapper" onMouseLeave={() => setMkDropdownOpen(false)}>
            <button
              className="nav-link dropdown-toggle"
              onClick={() => setMkDropdownOpen(!mkDropdownOpen)}
              onMouseEnter={() => setMkDropdownOpen(true)}
            >
              Mata Kuliah <ChevronDown size={14} />
            </button>

            {mkDropdownOpen && (
              <div className="dropdown-menu">
                {SV_COURSES.map((course, idx) => (
                  <button
                    key={idx}
                    className="dropdown-item"
                    onClick={() => handleCourseClick(course)}
                  >
                    {course}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Semester Dropdown */}
          <div className="dropdown-wrapper" onMouseLeave={() => setSemDropdownOpen(false)}>
            <button
              className="nav-link dropdown-toggle"
              onClick={() => setSemDropdownOpen(!semDropdownOpen)}
              onMouseEnter={() => setSemDropdownOpen(true)}
            >
              Semester <ChevronDown size={14} />
            </button>

            {semDropdownOpen && (
              <div className="dropdown-menu" style={{ minWidth: '160px' }}>
                <button className="dropdown-item" onClick={() => handleSemesterClick('ALL')}>
                  Semua Semester
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <button
                    key={sem}
                    className="dropdown-item"
                    onClick={() => handleSemesterClick(sem)}
                  >
                    Semester {sem}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="#projects" className="nav-link">Project</a>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions">
          <button className="btn btn-secondary btn-sm" onClick={onOpenLogin}>
            <LogIn size={16} /> Login
          </button>
          <button className="btn btn-primary btn-sm" onClick={onOpenUpload}>
            <Upload size={16} /> Upload Project
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <a href="#" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Tentang TRK</a>
          <a href="#projects" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Katalog Project</a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <button className="btn btn-secondary w-full" onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}>
              <LogIn size={16} /> Login Admin/Dosen
            </button>
            <button className="btn btn-primary w-full" onClick={() => { setMobileMenuOpen(false); onOpenUpload(); }}>
              <Upload size={16} /> Upload Project Video
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
