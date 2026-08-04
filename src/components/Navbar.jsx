import React from 'react';
import { ChevronDown, LogIn, Upload, Video, BookOpen, Layers } from 'lucide-react';
import { SV_COURSES } from '../data/projectsData';

export default function Navbar({ onOpenUpload, onOpenLogin, onSelectCourse, onSelectSemester }) {
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

        {/* Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#home" className="nav-link active">Home</a>
            </li>
            <li>
              <a href="#about" className="nav-link">Tentang</a>
            </li>
            
            {/* Mata Kuliah Dropdown */}
            <li className="nav-dropdown">
              <span className="nav-link">
                Mata Kuliah <ChevronDown size={14} />
              </span>
              <div className="dropdown-menu">
                {SV_COURSES.map((course, idx) => (
                  <a
                    key={idx}
                    href="#projects"
                    className="dropdown-item"
                    onClick={() => onSelectCourse(course === "Semua Mata Kuliah" ? "" : course)}
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
                <a href="#projects" className="dropdown-item" onClick={() => onSelectSemester('ALL')}>Semua Semester</a>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <a
                    key={sem}
                    href="#projects"
                    className="dropdown-item"
                    onClick={() => onSelectSemester(sem)}
                  >
                    Semester {sem}
                  </a>
                ))}
              </div>
            </li>

            {/* Project Dropdown */}
            <li className="nav-dropdown">
              <span className="nav-link">
                Project <ChevronDown size={14} />
              </span>
              <div className="dropdown-menu">
                <a href="#projects" className="dropdown-item">Project Terbaru</a>
                <a href="#projects" className="dropdown-item">Top Rated Video</a>
                <a href="#projects" className="dropdown-item">Dokumentasi Projek Akhir</a>
              </div>
            </li>
          </ul>
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
      </div>
    </header>
  );
}
