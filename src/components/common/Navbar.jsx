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
  PlaySquare,
  Home,
  LayoutDashboard
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
  onSelectCourse
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
          {(currentPage === 'student' || currentPage === 'student-upload') && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-sky-100 text-sky-700 text-[10px] font-bold tracking-wider font-mono uppercase">
              Portal Mahasiswa
            </span>
          )}
          {currentPage === 'admin' && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-900 text-white text-[10px] font-bold tracking-wider font-mono uppercase shadow-xs">
              Panel Admin
            </span>
          )}
        </div>

        {/* =================================================================== */}
        {/* CENTER SEARCH BAR / NAVIGATION LINKS */}
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
        ) : currentPage === 'student-upload' ? (
          <div className="hidden md:block flex-1" />
        ) : currentPage === 'admin' ? (
          <nav className="hidden lg:flex items-center gap-2 font-medium text-xs text-slate-700">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-semibold"
            >
              <Home size={14} />
              <span>Landing Publik</span>
            </button>
            <button
              onClick={onNavigateToStudent}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-semibold"
            >
              <PlaySquare size={14} className="text-sky-600" />
              <span>Beranda Mahasiswa</span>
            </button>
            <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-900 font-bold border border-slate-200">
              <LayoutDashboard size={14} className="text-slate-800" />
              <span>Dashboard Admin</span>
            </span>
          </nav>
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
                      onSelectCourse?.(course === 'Semua Mata Kuliah' ? '' : course);
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
        {/* RIGHT ACTION BUTTONS & USER PROFILE */}
        {/* =================================================================== */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Upload Button */}
          {onOpenUpload && (
            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-sm hover:bg-slate-800 hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              onClick={onOpenUpload}
            >
              <Upload size={14} className="text-sky-400" />
              <span className="hidden sm:inline">Upload Projek</span>
              <span className="sm:hidden">Upload</span>
            </button>
          )}

          {/* Student Portal Shortcut (When on Landing or Admin) */}
          {(currentPage === 'landing' || currentPage === 'admin') && onNavigateToStudent && (
            <button
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold transition-all border border-sky-200/70 shadow-sm"
              onClick={onNavigateToStudent}
              title="Buka Beranda Mahasiswa TRK"
            >
              <PlaySquare size={14} />
              <span>Beranda Mahasiswa</span>
            </button>
          )}

          {/* Landing Page Shortcut (When on Student Home or Admin) */}
          {(currentPage === 'student' || currentPage === 'student-upload' || currentPage === 'admin') && onBackToLanding && (
            <button
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-colors"
              onClick={onBackToLanding}
            >
              <span>Landing Publik</span>
            </button>
          )}

          {/* Admin Dashboard Shortcut (When on Landing or Student) */}
          {currentPage !== 'admin' &&
            onNavigateToAdmin &&
            (!isLoggedIn || currentUser?.role === 'admin') && (
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
                      {currentUser.nim || currentUser.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigateToStudent?.();
                      closeMobileMenu();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <PlaySquare size={14} className="text-sky-600" />
                    <span>Beranda Mahasiswa</span>
                  </button>
                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => {
                        onNavigateToAdmin?.();
                        closeMobileMenu();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Shield size={14} className="text-slate-700" />
                      <span>Panel Admin Dosen</span>
                    </button>
                  )}
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => {
                      onLogout?.();
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
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MOBILE EXPANDED MENU */}
      {/* =================================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          {/* Mobile Search (Student View) */}
          {currentPage === 'student' && (
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Telusuri projek TRK..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none text-slate-800"
              />
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          )}

          {/* Links */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => {
                onBackToLanding?.();
                closeMobileMenu();
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2"
            >
              <Home size={15} />
              <span>Landing Utama</span>
            </button>
            <button
              onClick={() => {
                onNavigateToStudent?.();
                closeMobileMenu();
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-sky-700 bg-sky-50 flex items-center gap-2"
            >
              <PlaySquare size={15} />
              <span>Portal Beranda Mahasiswa</span>
            </button>
            {(!isLoggedIn || currentUser?.role === 'admin') && (
              <button
                onClick={() => {
                  onNavigateToAdmin?.();
                  closeMobileMenu();
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-2"
              >
                <Shield size={15} />
                <span>Panel Admin / Dosen</span>
              </button>
            )}
          </div>

          {/* Mobile User / Auth */}
          <div className="pt-2 border-t border-slate-100">
            {isLoggedIn && currentUser ? (
              <div className="space-y-2">
                <div className="px-3 py-1">
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500">{currentUser.nim || currentUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    onLogout?.();
                    closeMobileMenu();
                  }}
                  className="w-full py-2 px-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
                >
                  <LogOut size={14} />
                  <span>Keluar Akun</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenLogin?.();
                  closeMobileMenu();
                }}
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <LogIn size={14} />
                <span>Masuk / Login Akun</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
