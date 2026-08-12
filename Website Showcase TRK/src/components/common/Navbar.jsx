import React, { useState } from 'react';
import { ChevronDown, LogIn, Upload, Shield, Menu, X } from 'lucide-react';
import { SV_COURSES } from '../../data/projectsData';

export default function Navbar({ onOpenUpload, onOpenLogin, onOpenAdminDashboard, onSelectCourse, onSelectSemester }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#" className="navbar-brand">
          <img
            src="/sv_ipb_navbar_logo.png"
            alt="IPB University Sekolah Vokasi Logo"
            className="navbar-logo-img"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className={`nav-wrapper ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          <ul className="nav-links">
            <li>
              <a href="#home" className="nav-link active" onClick={closeMobileMenu}>Home</a>
            </li>
            <li>
              <a href="#about" className="nav-link" onClick={closeMobileMenu}>Tentang</a>
            </li>
            
            {/* Mata Kuliah Dropdown */}
            <li className="nav-dropdown">
              <a href="#matakuliah" className="nav-link">
                Mata Kuliah <ChevronDown size={14} />
              </a>
              <div className="dropdown-menu">
                {SV_COURSES.map((course, idx) => (
                  <a
                    key={idx}
                    href="#matakuliah"
                    className="dropdown-item"
                    onClick={() => {
                      onSelectCourse(course === "Semua Mata Kuliah" ? "" : course);
                      closeMobileMenu();
                    }}
                  >
                    {course}
                  </a>
                ))}
              </div>
            </li>

            {/* Semester Dropdown */}
            <li className="nav-dropdown">
              <span className="nav-link">
                Semester <ChevronDown size={14} />
              </span>
              <div className="dropdown-menu">
                <a href="#projects" className="dropdown-item" onClick={() => { onSelectSemester('ALL'); closeMobileMenu(); }}>Semua Semester</a>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <a
                    key={sem}
                    href="#projects"
                    className="dropdown-item"
                    onClick={() => { onSelectSemester(sem); closeMobileMenu(); }}
                  >
                    Semester {sem}
                  </a>
                ))}
              </div>
            </li>

            {/* Project Dropdown */}
            <li className="nav-dropdown">
              <a href="#projects" className="nav-link" onClick={closeMobileMenu}>
                Project <ChevronDown size={14} />
              </a>
              <div className="dropdown-menu">
                <a href="#projects" className="dropdown-item" onClick={closeMobileMenu}>Project Terbaru</a>
                <a href="#projects" className="dropdown-item" onClick={closeMobileMenu}>Top Rated Video</a>
                <a href="#projects" className="dropdown-item" onClick={closeMobileMenu}>Dokumentasi Projek Akhir</a>
              </div>
            </li>
          </ul>

          {/* Mobile Actions inside Menu */}
          <div className="mobile-nav-actions">
            {onOpenAdminDashboard && (
              <button className="btn btn-secondary btn-sm" onClick={() => { onOpenAdminDashboard(); closeMobileMenu(); }}>
                <Shield size={16} /> Admin Dashboard
              </button>
            )}
            <button className="btn btn-secondary btn-sm" onClick={() => { onOpenLogin(); closeMobileMenu(); }}>
              <LogIn size={16} /> Login
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => { onOpenUpload(); closeMobileMenu(); }}>
              <Upload size={16} /> Upload Project
            </button>
          </div>
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="nav-actions">
          {onOpenAdminDashboard && (
            <button className="btn btn-secondary btn-sm desktop-only" onClick={onOpenAdminDashboard} title="Masuk Ke Dashboard Moderasi Admin">
              <Shield size={16} /> Admin
            </button>
          )}
          <button className="btn btn-secondary btn-sm desktop-only" onClick={onOpenLogin}>
            <LogIn size={16} /> Login
          </button>
          <button className="btn btn-primary btn-sm" onClick={onOpenUpload}>
            <Upload size={16} /> <span className="btn-text-desktop">Upload Project</span><span className="btn-text-mobile">Upload</span>
          </button>
          
          {/* Hamburger Toggle Button */}
          <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle Navigation Menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
