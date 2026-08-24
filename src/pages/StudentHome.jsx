import React, { useState } from 'react';
import {
  Home,
  CheckCircle2,
  FolderGit2,
  Cpu,
  Smartphone,
  Wifi,
  Wrench,
  Binary,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Plus,
  Search,
  MoreVertical,
  ChevronRight,
  X
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { initialProjects, getYouTubeThumbnail } from '../data/projectsData';
import ProjectDetailModal from '../components/modals/ProjectDetailModal';
import UploadModal from '../components/modals/UploadModal';

export default function StudentHome({ onLogout, onNavigateToAdmin, onBackToLanding }) {
  const [projects, setProjects] = useState(initialProjects);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'my-projects'
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedSemester, setSelectedSemester] = useState('ALL'); // 'ALL' | 1 | 2 | 3 | 4 | 5 | 6
  const [isSemesterExpanded, setIsSemesterExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [activeDetailProject, setActiveDetailProject] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Current Logged-in Student Mock Profile
  const currentUser = {
    name: 'Nabila Putri Utami',
    nim: 'J0304211015',
    role: 'Mahasiswa TRK SV IPB',
    semester: 5,
    angkatan: '58 (2021)',
    myProjectCount: 2
  };

  const semesterOptions = [1, 2, 3, 4, 5, 6];

  // Filter projects logic
  const filteredProjects = projects.filter((proj) => {
    // Tab filter
    if (activeTab === 'my-projects') {
      if (proj.nim !== currentUser.nim && proj.student !== currentUser.name) {
        return false;
      }
    }

    // Semester filter
    if (selectedSemester !== 'ALL') {
      if (proj.semester !== selectedSemester) {
        return false;
      }
    }

    // Category Chip filter
    if (selectedCategory === 'Projek Saya') {
      if (proj.nim !== currentUser.nim && proj.student !== currentUser.name) return false;
    } else if (selectedCategory !== 'Semua') {
      if (selectedCategory === proj.course) {
        // exact course match from sidebar
      } else {
        const qCat = selectedCategory.toLowerCase();
        const matchCourse = proj.course?.toLowerCase().includes(qCat);
        const matchTech = proj.techStack?.some((t) => t.toLowerCase().includes(qCat));
        if (!matchCourse && !matchTech) return false;
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = proj.title?.toLowerCase().includes(q);
      const matchStudent = proj.student?.toLowerCase().includes(q);
      const matchCourse = proj.course?.toLowerCase().includes(q);
      const matchTech = proj.techStack?.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchStudent && !matchCourse && !matchTech) {
        return false;
      }
    }

    return true;
  });

  const handleAddProject = (newProj) => {
    const enriched = {
      ...newProj,
      student: currentUser.name,
      nim: currentUser.nim,
      prodi: 'Teknologi Rekayasa Komputer',
      prodiCode: 'TRK',
      views: 12,
      likes: 1,
      date: 'Baru saja'
    };
    setProjects([enriched, ...projects]);
  };

  const handleSemesterSelect = (sem) => {
    setSelectedSemester(sem);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* ========================================================================= */}
      {/* 1. CONSISTENT SHARED NAVBAR */}
      {/* ========================================================================= */}
      <Navbar
        currentPage="student"
        currentUser={currentUser}
        isLoggedIn={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUpload={() => setIsUploadOpen(true)}
        onLogout={onLogout}
        onNavigateToAdmin={onNavigateToAdmin}
        onBackToLanding={onBackToLanding}
      />

      {/* ========================================================================= */}
      {/* 2. BODY: SIDEBAR + FEED GRID */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <aside
          className={`hidden md:flex flex-col border-r border-slate-200 bg-white flex-shrink-0 transition-all duration-200 overflow-y-auto select-none ${
            isSidebarExpanded ? 'w-60 p-3' : 'w-20 py-3 px-1.5 items-center'
          }`}
        >
          {/* Main Nav Section */}
          <div className="space-y-1 w-full pb-3 border-b border-slate-100">
            <button
              onClick={() => {
                setActiveTab('home');
                setSelectedCategory('Semua');
                setSelectedSemester('ALL');
              }}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'home' && selectedCategory === 'Semua' && selectedSemester === 'ALL'
                  ? 'bg-slate-100 text-slate-900 font-extrabold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              } ${!isSidebarExpanded && 'flex-col gap-1 px-1 text-[10px] justify-center'}`}
            >
              <Home size={isSidebarExpanded ? 17 : 20} className={activeTab === 'home' && selectedCategory === 'Semua' && selectedSemester === 'ALL' ? 'text-sky-600' : ''} />
              <span>Beranda</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('my-projects');
                setSelectedCategory('Projek Saya');
              }}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'my-projects'
                  ? 'bg-slate-100 text-slate-900 font-extrabold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              } ${!isSidebarExpanded && 'flex-col gap-1 px-1 text-[10px] justify-center'}`}
            >
              <FolderGit2 size={isSidebarExpanded ? 17 : 20} className={activeTab === 'my-projects' ? 'text-sky-600' : ''} />
              <span>Projek Saya</span>
              {isSidebarExpanded && (
                <span className="ml-auto bg-sky-100 text-sky-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {currentUser.myProjectCount}
                </span>
              )}
            </button>
          </div>

          {/* Section: 5 Mata Kuliah TRK SV IPB (Only expanded) */}
          {isSidebarExpanded && (
            <>
              <div className="py-3 border-b border-slate-100 space-y-1">
                <span className="px-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  Mata Kuliah TRK
                </span>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setSelectedCategory('SISTEM TERTANAM (EMBEDDED SYSTEM)');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left truncate transition-colors ${
                    selectedCategory === 'SISTEM TERTANAM (EMBEDDED SYSTEM)'
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Cpu size={15} className="text-sky-500 flex-shrink-0" />
                  <span className="truncate">Sistem Tertanam</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setSelectedCategory('APLIKASI MOBILE');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left truncate transition-colors ${
                    selectedCategory === 'APLIKASI MOBILE'
                      ? 'bg-emerald-50 text-emerald-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Smartphone size={15} className="text-emerald-500 flex-shrink-0" />
                  <span className="truncate">Aplikasi Mobile</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setSelectedCategory('PROYEK SISTEM IOT (INTERNET OF THINGS)');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left truncate transition-colors ${
                    selectedCategory === 'PROYEK SISTEM IOT (INTERNET OF THINGS)'
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Wifi size={15} className="text-indigo-500 flex-shrink-0" />
                  <span className="truncate">Sistem IoT</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setSelectedCategory('TEKNOLOGI BENGKEL ELEKTROMEKANIK');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left truncate transition-colors ${
                    selectedCategory === 'TEKNOLOGI BENGKEL ELEKTROMEKANIK'
                      ? 'bg-amber-50 text-amber-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Wrench size={15} className="text-amber-500 flex-shrink-0" />
                  <span className="truncate">Bengkel Elektromekanik</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setSelectedCategory('RANGKAIAN LOGIKA DAN TEKNIK DIGITAL');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left truncate transition-colors ${
                    selectedCategory === 'RANGKAIAN LOGIKA DAN TEKNIK DIGITAL'
                      ? 'bg-rose-50 text-rose-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Binary size={15} className="text-rose-500 flex-shrink-0" />
                  <span className="truncate">Rangkaian Logika Digital</span>
                </button>
              </div>

              {/* Section: Quick Dosen/Admin Link & Info */}
              <div className="pt-3 space-y-1">
                <button
                  onClick={onNavigateToAdmin}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100/70 hover:bg-slate-200 transition-colors"
                >
                  <ShieldCheck size={16} className="text-slate-800" />
                  <span>Panel Admin / Dosen</span>
                </button>
                <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100 mt-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-900 mb-1">
                    <GraduationCap size={14} className="text-sky-600" />
                    <span>TRK SV IPB 2026</span>
                  </div>
                  <p className="text-[10px] text-sky-700/90 leading-tight">
                    Showcase Tugas Akhir & Praktikum Mahasiswa SV IPB University.
                  </p>
                </div>
              </div>
            </>
          )}
        </aside>

        {/* MAIN FEED CONTENT */}
        <main className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
          {/* =================================================================== */}
          {/* TOP CATEGORY CHIPS BAR (CLEAN: SEMUA, PROJEK SAYA, & EXPANDABLE SEMESTER) */}
          {/* =================================================================== */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none select-none">
            {/* 1. "Semua" Chip */}
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSelectedSemester('ALL');
                setActiveTab('home');
              }}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'Semua' && selectedSemester === 'ALL' && activeTab === 'home'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Semua
            </button>

            {/* 2. "Projek Saya" Chip */}
            <button
              onClick={() => {
                setSelectedCategory('Projek Saya');
                setActiveTab('my-projects');
              }}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'Projek Saya' || activeTab === 'my-projects'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Projek Saya
            </button>

            {/* 3. EXPANDABLE "SEMESTER" BUTTON — OPENS TO THE RIGHT */}
            <div className="flex-shrink-0 flex items-center gap-1.5 bg-slate-100/90 p-0.5 rounded-xl border border-slate-200/80 transition-all">
              <button
                onClick={() => setIsSemesterExpanded(!isSemesterExpanded)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedSemester !== 'ALL'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : isSemesterExpanded
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                title="Buka Pilihan Semester"
              >
                <GraduationCap size={14} className={selectedSemester !== 'ALL' ? 'text-white' : 'text-sky-600'} />
                <span>{selectedSemester !== 'ALL' ? `Semester ${selectedSemester}` : 'Semester'}</span>
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-200 ${isSemesterExpanded ? 'rotate-90 text-slate-800' : 'text-slate-400'}`}
                />
              </button>

              {/* Expanded Semester Options Sliding to the Right */}
              {isSemesterExpanded && (
                <div className="flex items-center gap-1 pl-1 pr-1 animate-in fade-in slide-in-from-left-2 duration-200">
                  <button
                    onClick={() => handleSemesterSelect('ALL')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                      selectedSemester === 'ALL'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Semua Sem
                  </button>
                  {semesterOptions.map((sem) => (
                    <button
                      key={sem}
                      onClick={() => handleSemesterSelect(sem)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                        selectedSemester === sem
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-sky-50 hover:text-sky-700'
                      }`}
                    >
                      Sem {sem}
                    </button>
                  ))}
                  <button
                    onClick={() => setIsSemesterExpanded(false)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-md ml-0.5"
                    title="Tutup Pilihan Semester"
                  >
                    <X size={13} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MAIN CONTAINER */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
            {/* STUDENT WELCOME BANNER */}
            {activeTab === 'home' && selectedCategory === 'Semua' && selectedSemester === 'ALL' && !searchQuery && (
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 text-white p-5 sm:p-7 shadow-lg">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="space-y-1.5 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-400/20">
                      <Sparkles size={13} />
                      <span>Beranda Mahasiswa Terautentikasi</span>
                    </div>
                    <h1 className="font-heading text-xl sm:text-2xl font-black tracking-tight text-white">
                      Hai, {currentUser.name}! 👋
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Jelajahi karya inovatif rekan mahasiswa TRK SV IPB atau unggah dokumentasi projek tugas akhir dan praktikum terbarumu.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setIsUploadOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                    >
                      <Plus size={16} />
                      <span>Unggah Video Projek</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('my-projects');
                        setSelectedCategory('Projek Saya');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs backdrop-blur-sm border border-white/15 transition-all"
                    >
                      Kelola Projek Saya ({currentUser.myProjectCount})
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB TITLE HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  {activeTab === 'my-projects' ? '📁 Portofolio Projek Saya' : 'Feed Rekomendasi Projek TRK'}
                  {selectedSemester !== 'ALL' && (
                    <span className="text-xs bg-sky-100 text-sky-700 font-bold px-2 py-0.5 rounded-md font-mono">
                      Semester {selectedSemester}
                    </span>
                  )}
                  {selectedCategory !== 'Semua' && selectedCategory !== 'Projek Saya' && (
                    <span className="text-xs bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md">
                      {selectedCategory}
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Menampilkan {filteredProjects.length} video projek dari kurikulum TRK Sekolah Vokasi IPB
                </p>
              </div>

              {activeTab === 'my-projects' && (
                <button
                  onClick={() => setIsUploadOpen(true)}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus size={14} /> Tambah Baru
                </button>
              )}
            </div>

            {/* YOUTUBE-STYLE VIDEO GRID */}
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/80 shadow-sm max-w-md mx-auto my-8">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                  <Search size={28} />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-800 mb-1">
                  Tidak Ada Video Ditemukan
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Coba ubah kata kunci pencarian atau pilih filter semester / mata kuliah yang lain.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Semua');
                    setSelectedSemester('ALL');
                    setSearchQuery('');
                    setActiveTab('home');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-7">
                {filteredProjects.map((project) => {
                  const isOwner = project.nim === currentUser.nim || project.student === currentUser.name;
                  const thumb = project.thumbnail || getYouTubeThumbnail(project.videoUrl);

                  return (
                    <div
                      key={project.id}
                      onClick={() => setActiveDetailProject(project)}
                      className="group flex flex-col cursor-pointer transition-all"
                    >
                      {/* 1. Thumbnail Container (16:9 Aspect) */}
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 shadow-sm group-hover:shadow-md transition-shadow">
                        <img
                          src={thumb}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />

                        {/* Duration / Semester Badge */}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded backdrop-blur-sm">
                          Sem {project.semester}
                        </div>

                        {/* Owner Badge */}
                        {isOwner && (
                          <div className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1 shadow-sm">
                            <CheckCircle2 size={11} />
                            <span>Projek Saya</span>
                          </div>
                        )}
                      </div>

                      {/* 2. Metadata Section (Title + Student Name + Course + Date) */}
                      <div className="flex justify-between items-start gap-2 mt-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug line-clamp-2 group-hover:text-sky-600 transition-colors mb-1.5">
                            {project.title}
                          </h3>

                          {/* Student Name */}
                          <div className="flex items-center gap-1 text-xs text-slate-700 font-semibold mb-0.5">
                            <span className="truncate">{project.student}</span>
                            <CheckCircle2 size={12} className="text-sky-600 flex-shrink-0" />
                          </div>

                          {/* Course Name */}
                          <p className="text-[11px] text-slate-500 truncate font-medium">
                            {project.course}
                          </p>

                          {/* Date */}
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                            {project.date || '2026'}
                          </p>
                        </div>

                        {/* Options Icon */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDetailProject(project);
                          }}
                          className="text-slate-400 hover:text-slate-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONSISTENT SHARED FOOTER */}
      {/* ========================================================================= */}
      <Footer />

      {/* ========================================================================= */}
      {/* 4. MODALS INTEGRATION */}
      {/* ========================================================================= */}
      {activeDetailProject && (
        <ProjectDetailModal
          project={activeDetailProject}
          onClose={() => setActiveDetailProject(null)}
        />
      )}

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
}
