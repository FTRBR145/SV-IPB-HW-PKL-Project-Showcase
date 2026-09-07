import React, { useEffect, useRef, useState } from 'react';
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

const EMPTY_COURSES = [];

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
  courses = EMPTY_COURSES
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const courseDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll(); // check initial state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCourseDropdownOpen(false);
        setUserDropdownOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(e.target)) {
        setCourseDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setCourseDropdownOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm transition-all duration-300 ${isScrolled ? 'navbar-scrolled border-slate-200/95' : 'border-slate-200'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:gap-4 sm:px-6 lg:px-8">
        {/* =================================================================== */}
        {/* BRAND LOGO (OFFICIAL SV IPB) */}
        {/* =================================================================== */}
        <button
          type="button"
          onClick={onBackToLanding}
          className="group flex min-h-11 min-w-0 shrink-0 items-center gap-2.5 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
          title="Beranda Showcase TRK SV IPB"
        >
          <img
            src="/sv_ipb_navbar_logo.png"
            alt="IPB University Sekolah Vokasi Logo"
            className="h-9 max-w-[145px] object-contain transition-transform group-hover:scale-[1.02] sm:h-14 sm:max-w-[270px]"
          />
          {(currentPage === 'student' || currentPage === 'student-upload') && (
            <span className="hidden items-center gap-1 rounded-lg bg-sky-100 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-sky-700 sm:inline-flex">
              Portal Mahasiswa
            </span>
          )}
          {currentPage === 'admin' && (
            <span className="hidden items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs sm:inline-flex">
              Panel Admin
            </span>
          )}
        </button>

        {/* =================================================================== */}
        {/* CENTER SEARCH BAR / NAVIGATION LINKS */}
        {/* =================================================================== */}
        {currentPage === 'student' ? (
          <div className="hidden max-w-xl flex-1 items-center justify-center px-4 xl:flex">
            <div className="relative w-full">
              <label htmlFor="student-project-search" className="sr-only">Telusuri projek mahasiswa</label>
              <input
                id="student-project-search"
                type="text"
                placeholder="Telusuri projek TRK, sensor, dosen, atau mata kuliah..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-500 transition-colors focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange && onSearchChange('')}
                  type="button"
                  className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
                  aria-label="Hapus pencarian"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        ) : currentPage === 'student-upload' ? (
          <div className="hidden md:block flex-1" />
        ) : currentPage === 'admin' ? (
          <nav className="hidden items-center gap-2 text-xs font-medium text-slate-700 xl:flex">
            <button
              onClick={onBackToLanding}
              className="flex min-h-11 items-center gap-1.5 rounded-xl px-3.5 py-2 font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
            >
              <Home size={14} />
              <span>Landing Publik</span>
            </button>
            <button
              onClick={onNavigateToStudent}
              className="flex min-h-11 items-center gap-1.5 rounded-xl px-3.5 py-2 font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
            >
              <PlaySquare size={14} className="text-sky-600" />
              <span>Beranda Mahasiswa</span>
            </button>
            <span className="flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 font-bold text-slate-900">
              <LayoutDashboard size={14} className="text-slate-800" />
              <span>Dashboard Admin</span>
            </span>
          </nav>
        ) : (
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 xl:flex">
            <a
              href="#home"
              className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 font-semibold text-slate-900 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
            >
              Home
            </a>
            <a
              href="#about"
              className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
            >
              Tentang
            </a>

            {/* Mata Kuliah Dropdown */}
            <div ref={courseDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setCourseDropdownOpen((open) => !open)}
                aria-expanded={courseDropdownOpen}
                aria-haspopup="menu"
                className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              >
                <span>Mata Kuliah</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${courseDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {courseDropdownOpen && (
                <div
                  role="menu"
                  aria-label="Katalog Mata Kuliah"
                  className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                >
                  {['Semua Mata Kuliah', ...courses].map((course) => (
                    <a
                      key={course}
                      href="#matakuliah"
                      role="menuitem"
                      className="flex min-h-11 items-center px-4 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:bg-slate-50 focus-visible:text-slate-900"
                      onClick={() => {
                        onSelectCourse?.(course === 'Semua Mata Kuliah' ? '' : course);
                        setCourseDropdownOpen(false);
                      }}
                    >
                      {course}
                    </a>
                  ))}
                </div>
              )}
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
              className="action-strong hidden min-h-11 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:flex"
              onClick={onOpenUpload}
            >
              <Upload size={14} className="text-sky-400" />
              <span className="hidden sm:inline">Upload Projek</span>
              <span className="sm:hidden">Upload</span>
            </button>
          )}

          {/* Student Portal Shortcut (When on Landing or Admin) */}
          {currentPage === 'landing' && onNavigateToStudent && (
            <button
              className="hidden min-h-11 items-center gap-1.5 rounded-xl border border-sky-200/70 bg-sky-50 px-3.5 py-2 text-xs font-bold text-sky-700 shadow-sm transition-all hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 md:flex"
              onClick={onNavigateToStudent}
              title="Buka Beranda Mahasiswa TRK"
            >
              <PlaySquare size={14} />
              <span>Beranda Mahasiswa</span>
            </button>
          )}

          {/* Landing Page Shortcut (When on Student Home or Admin) */}
          {(currentPage === 'student' || currentPage === 'student-upload') && onBackToLanding && (
            <button
              className="hidden min-h-11 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 lg:flex"
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
              className="hidden min-h-11 items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 md:flex"
              onClick={onNavigateToAdmin}
              title="Masuk Ke Dashboard Admin"
            >
              <Shield size={14} />
              <span>Admin</span>
            </button>
          )}

          {/* User Profile / Login */}
          {isLoggedIn && currentUser ? (
            <div ref={userDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/60 px-3 py-1.5 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
                aria-label={`Menu akun ${currentUser.name}`}
                aria-expanded={userDropdownOpen}
                aria-haspopup="menu"
              >
                <User size={15} className="text-slate-600" />
                <span className="hidden sm:inline text-xs font-bold text-slate-800 max-w-[130px] truncate text-left">
                  {currentUser.name}
                </span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div role="menu" aria-label="Opsi Akun" className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs font-mono text-slate-600">
                      {currentUser.nim || currentUser.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onNavigateToStudent?.();
                      closeMobileMenu();
                    }}
                    className="flex min-h-11 w-full items-center gap-2 px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:bg-slate-50"
                  >
                    <PlaySquare size={14} className="text-sky-600" />
                    <span>Beranda Mahasiswa</span>
                  </button>
                  {currentUser.role === 'admin' && (
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onNavigateToAdmin?.();
                        closeMobileMenu();
                      }}
                      className="flex min-h-11 w-full items-center gap-2 px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:bg-slate-50"
                    >
                      <Shield size={14} className="text-slate-700" />
                      <span>Panel Admin Dosen</span>
                    </button>
                  )}
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onLogout?.();
                      closeMobileMenu();
                    }}
                    className="flex min-h-11 w-full items-center gap-2 px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 focus-visible:outline-none focus-visible:bg-rose-50"
                  >
                    <LogOut size={14} />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="hidden min-h-11 items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 md:flex"
              onClick={onOpenLogin}
            >
              <LogIn size={14} />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 xl:hidden"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MOBILE EXPANDED MENU */}
      {/* =================================================================== */}
      {mobileMenuOpen && (
        <div className="space-y-3 border-t border-slate-200 bg-white px-4 py-4 shadow-xl animate-in slide-in-from-top-2 duration-200 xl:hidden">
          {/* Mobile Search (Student View) */}
          {currentPage === 'student' && (
            <div className="relative w-full">
              <label htmlFor="student-project-search-mobile" className="sr-only">Telusuri projek mahasiswa</label>
              <input
                id="student-project-search-mobile"
                type="text"
                placeholder="Telusuri projek TRK..."
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-base text-slate-800 placeholder-slate-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm"
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
              className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              <Home size={15} />
              <span>Landing Utama</span>
            </button>
            <button
              onClick={() => {
                onNavigateToStudent?.();
                closeMobileMenu();
              }}
              className="flex min-h-11 w-full items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 text-left text-xs font-bold text-sky-700"
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
                className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold text-slate-800 hover:bg-slate-100"
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
                  <p className="text-xs text-slate-600">{currentUser.nim || currentUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    onLogout?.();
                    closeMobileMenu();
                  }}
                  className="flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-center text-xs font-bold text-rose-600"
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
                className="action-strong flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-center text-xs font-bold"
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
