import React, { useState } from 'react';
import {
  ChevronDown,
  LogIn,
  Upload,
  Shield,
  Menu,
  X,
  Search,
  LogOut,
  User,
  Plus,
  PlaySquare,
  Flame,
  FolderGit2,
  Bookmark
} from 'lucide-react';
import { SV_COURSES } from '../../data/projectsData';

export default function Navbar({
  currentPage = 'landing', // 'landing' | 'student' | 'admin'
  currentUser = null,
  isLoggedIn = false,
  searchQuery = '',
  onSearchChange,
  onOpenUpload,
  onOpenLogin,
  onLogout,
  onNavigateToAdmin,
  onNavigateToStudent,
  onBackToLanding,
  onSelectCourse,
  onSelectSemester
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* =================================================================== */}
        {/* BRAND LOGO (OFFICIAL SV IPB) */}
        {/* =================================================================== */}
        <div
          onClick={onBackToLanding}
          className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
          title="Beranda Showcase TRK SV IPB"
        >
          <img
            src="/sv_ipb_navbar_logo.png"
            alt="IPB University Sekolah Vokasi Logo"
            className="h-11 sm:h-14 max-w-[210px] sm:max-w-[270px] object-contain transition-transform group-hover:scale-105"
          />
          {currentPage === 'student' && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-100 text-sky-700 text-[10px] font-bold tracking-wider font-mono uppercase">
              Portal Mahasiswa
            </span>
          )}
        </div>

        {/* =================================================================== */}
        {/* CENTER SEARCH BAR (WHEN ON STUDENT PORTAL) OR STANDARD NAVIGATION */}
        {/* =================================================================== */}
        {currentPage === 'student' ? (
          <div className="flex-1 max-w-xl hidden md:flex items-center justify-center px-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Telusuri projek TRK, sensor, dosen, atau mata kuliah..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-800 placeholder-slate-400"
              />
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange && onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <nav className="hidden lg:flex items-center gap-6 font-medium text-sm text-slate-700">
            <a
              href="#home"
              className="py-2 px-3 rounded-lg hover:text-slate-900 transition-colors font-semibold text-slate-900"
            >
              Home
            </a>
            <a
              href="#about"
              className="py-2 px-3 rounded-lg hover:text-slate-900 transition-colors text-slate-600 hover:bg-slate-50"
            >
              Tentang
            </a>

            {/* Mata Kuliah Dropdown */}
            <div className="relative group">
              <a
                href="#matakuliah"
                className="flex items-center gap-1.5 py-2 px-3 rounded-lg hover:text-slate-900 transition-colors text-slate-600 hover:bg-slate-50"
              >
                <span>Mata Kuliah</span>
                <ChevronDown
                  size={14}
                  className="transition-transform group-hover:rotate-180"
                />
              </a>
              <div className="hidden group-hover:block absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                {SV_COURSES.map((course, idx) => (
                  <a
                    key={idx}
                    href="#matakuliah"
                    className="block px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors"
                    onClick={() => {
                      onSelectCourse &&
                        onSelectCourse(course === 'Semua Mata Kuliah' ? '' : course);
                    }}
                  >
                    {course}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        )}

        {/* =================================================================== */}
        {/* RIGHT ACTION BUTTONS & USER AVATAR */}
        {/* =================================================================== */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Upload Button */}
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm hover:bg-slate-800 hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            onClick={onOpenUpload}
          >
            <Upload size={14} className="text-sky-400" />
            <span className="hidden sm:inline">Upload Projek</span>
            <span className="sm:hidden">Upload</span>
          </button>

          {/* Student Portal Shortcut (When on Landing) */}
          {currentPage === 'landing' && onNavigateToStudent && (
            <button
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold transition-all border border-sky-200/70 shadow-sm"
              onClick={onNavigateToStudent}
              title="Buka Beranda Mahasiswa TRK"
            >
              <PlaySquare size={14} />
              <span>Beranda Mahasiswa</span>
            </button>
          )}

          {/* Landing Page Shortcut (When on Student Home) */}
          {currentPage === 'student' && onBackToLanding && (
            <button
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors"
              onClick={onBackToLanding}
            >
              <span>Landing Publik</span>
            </button>
          )}

          {/* Admin Dashboard Shortcut */}
          {onNavigateToAdmin && (
            <button
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm"
              onClick={onNavigateToAdmin}
              title="Masuk Ke Dashboard Admin"
            >
              <Shield size={14} />
              <span>Admin</span>
            </button>
          )}

          {/* User Profile / Login */}
          {isLoggedIn && currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/80 bg-slate-50/60"
              >
                <User size={15} className="text-slate-600" />
                <span className="hidden sm:inline text-xs font-bold text-slate-800 max-w-[130px] truncate text-left">
                  {currentUser.name}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {currentUser.nim}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigateToStudent && onNavigateToStudent();
                      closeMobileMenu();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <PlaySquare size={14} className="text-sky-600" />
                    <span>Beranda Mahasiswa</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigateToAdmin && onNavigateToAdmin();
                      closeMobileMenu();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Shield size={14} className="text-slate-700" />
                    <span>Panel Admin Dosen</span>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => {
                      onLogout && onLogout();
                      closeMobileMenu();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                  >
                    <LogOut size={14} />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm"
              onClick={onOpenLogin}
            >
              <LogIn size={14} />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MOBILE COLLAPSIBLE DRAWER */}
      {/* =================================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-4 shadow-xl">
          {currentPage === 'student' && (
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari projek TRK, sensor, dosen..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
              />
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          )}

          <div className="space-y-1">
            <a
              href="#home"
              onClick={closeMobileMenu}
              className="block py-2 px-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={closeMobileMenu}
              className="block py-2 px-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Tentang
            </a>
            <a
              href="#matakuliah"
              onClick={closeMobileMenu}
              className="block py-2 px-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Mata Kuliah TRK
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {onNavigateToStudent && (
              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-50 text-sky-700 text-xs font-bold hover:bg-sky-100"
                onClick={() => {
                  onNavigateToStudent();
                  closeMobileMenu();
                }}
              >
                <PlaySquare size={15} /> Beranda Mahasiswa
              </button>
            )}
            {onNavigateToAdmin && (
              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                onClick={() => {
                  onNavigateToAdmin();
                  closeMobileMenu();
                }}
              >
                <Shield size={15} /> Admin Dashboard
              </button>
            )}
            {isLoggedIn ? (
              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100"
                onClick={() => {
                  onLogout && onLogout();
                  closeMobileMenu();
                }}
              >
                <LogOut size={15} /> Keluar Akun
              </button>
            ) : (
              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                onClick={() => {
                  onOpenLogin();
                  closeMobileMenu();
                }}
              >
                <LogIn size={15} /> Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
