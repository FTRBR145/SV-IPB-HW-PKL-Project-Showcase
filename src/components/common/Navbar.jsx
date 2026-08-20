import React, { useState } from 'react';
import { ChevronDown, LogIn, Upload, Shield, Menu, X } from 'lucide-react';
import { SV_COURSES } from '../../data/projectsData';

export default function Navbar({ onOpenUpload, onOpenLogin, onOpenAdminDashboard, onSelectCourse, onSelectSemester }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="/sv_ipb_navbar_logo.png"
            alt="IPB University Sekolah Vokasi Logo"
            className="h-12 sm:h-14 max-w-[230px] sm:max-w-[280px] object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Desktop & Mobile Navigation Links */}
        <nav className={`
          fixed md:relative top-20 md:top-0 left-0 right-0 md:left-auto md:right-auto 
          bg-white md:bg-transparent border-b md:border-none border-gray-200 
          p-6 md:p-0 shadow-lg md:shadow-none transition-all duration-300 ease-in-out
          ${mobileMenuOpen ? 'flex flex-col gap-4' : 'hidden md:flex md:items-center md:gap-7'}
        `}>
          <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-7 font-medium text-[15px] text-gray-700">
            <li>
              <a href="#home" className="block py-2 px-3.5 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 transition-colors font-semibold text-gray-900" onClick={closeMobileMenu}>Home</a>
            </li>
            <li>
              <a href="#about" className="block py-2 px-3.5 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 transition-colors" onClick={closeMobileMenu}>Tentang</a>
            </li>
            
            {/* Mata Kuliah Dropdown */}
            <li className="relative group">
              <a href="#matakuliah" className="flex items-center gap-1.5 py-2 px-3.5 rounded-lg hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 transition-colors">
                Mata Kuliah <ChevronDown size={15} className="transition-transform group-hover:rotate-180" />
              </a>
              <div className="hidden group-hover:block md:absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                {SV_COURSES.map((course, idx) => (
                  <a
                    key={idx}
                    href="#matakuliah"
                    className="block px-4 py-2.5 text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium transition-colors"
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
          </ul>

          {/* Mobile Actions inside Menu */}
          <div className="flex md:hidden flex-col gap-2.5 pt-4 border-t border-gray-100">
            {onOpenAdminDashboard && (
              <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all" onClick={() => { onOpenAdminDashboard(); closeMobileMenu(); }}>
                <Shield size={16} /> Admin Dashboard
              </button>
            )}
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-all" onClick={() => { onOpenLogin(); closeMobileMenu(); }}>
              <LogIn size={16} /> Login
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gray-900 text-white text-sm font-semibold shadow-md hover:bg-gray-800 transition-all" onClick={() => { onOpenUpload(); closeMobileMenu(); }}>
              <Upload size={16} /> Upload Project
            </button>
          </div>
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="flex items-center gap-3">
          {onOpenAdminDashboard && (
            <button className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 hover:text-gray-900 transition-all shadow-sm" onClick={onOpenAdminDashboard} title="Masuk Ke Dashboard Moderasi Admin">
              <Shield size={16} /> Admin
            </button>
          )}
          <button className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 hover:text-gray-900 transition-all shadow-sm" onClick={onOpenLogin}>
            <LogIn size={16} /> Login
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold shadow-md hover:bg-gray-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0" onClick={onOpenUpload}>
            <Upload size={16} /> <span className="hidden sm:inline">Upload Project</span><span className="sm:hidden">Upload</span>
          </button>
          
          {/* Hamburger Toggle Button */}
          <button className="md:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors" onClick={toggleMobileMenu} aria-label="Toggle Navigation Menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
