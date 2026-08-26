import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Plus,
  Search,
  MoreVertical,
  ChevronRight,
  X
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { getYouTubeThumbnail } from '../data/projectsData';
import ProjectDetailModal from '../components/modals/ProjectDetailModal';
import StudentSidebar from '../components/student/StudentSidebar';
import useApp from '../hooks/useApp';

export default function StudentHome() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, currentUser, isLoggedIn, logout } = useApp();

  const studentUser = currentUser;

  const [activeTab, setActiveTab] = useState(() =>
    searchParams.get('tab') === 'my-projects' ? 'my-projects' : 'home'
  );
  const [selectedCategory, setSelectedCategory] = useState(() =>
    searchParams.get('course') || (searchParams.get('tab') === 'my-projects' ? 'Projek Saya' : 'Semua')
  );
  const [selectedSemester, setSelectedSemester] = useState('ALL'); // 'ALL' | 1 | 2 | 3 | 4 | 5 | 6
  const [isSemesterExpanded, setIsSemesterExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailProject, setActiveDetailProject] = useState(null);

  // Deep-link project modal opening via ?project=:id
  useEffect(() => {
    const targetId = searchParams.get('project');
    if (targetId) {
      const found = projects.find((p) => String(p.id) === String(targetId));
      if (found) {
        setActiveDetailProject(found);
      }
    }
  }, [searchParams, projects]);

  const handleCloseDetail = () => {
    setActiveDetailProject(null);
    if (searchParams.get('project')) {
      searchParams.delete('project');
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleOpenDetail = (proj) => {
    setActiveDetailProject(proj);
    setSearchParams({ project: proj.id });
  };

  const myProjects = projects.filter(
    (p) => p.nim === studentUser.nim || p.student?.toLowerCase().includes(studentUser.name.toLowerCase())
  );

  const semesterOptions = [1, 2, 3, 4, 5, 6];

  // Filter projects logic
  const filteredProjects = projects.filter((proj) => {
    // Tab filter
    if (activeTab === 'my-projects') {
      if (proj.nim !== studentUser.nim && !proj.student?.toLowerCase().includes(studentUser.name.toLowerCase())) {
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
      if (proj.nim !== studentUser.nim && !proj.student?.toLowerCase().includes(studentUser.name.toLowerCase())) {
        return false;
      }
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
        currentUser={studentUser}
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUpload={() => navigate('/student/upload')}
        onLogout={() => {
          logout();
          navigate('/');
        }}
        onNavigateToAdmin={() => navigate('/admin')}
        onBackToLanding={() => navigate('/')}
      />

      {/* ========================================================================= */}
      {/* 2. BODY: SIDEBAR + FEED GRID */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        <StudentSidebar
          activeItem={activeTab === 'my-projects' ? 'my-projects' : 'home'}
          selectedCategory={selectedCategory}
          projectCount={myProjects.length}
          onSelectHome={() => {
            setActiveTab('home');
            setSelectedCategory('Semua');
            setSelectedSemester('ALL');
          }}
          onNavigateUpload={() => navigate('/student/upload')}
          onSelectMyProjects={() => {
            setActiveTab('my-projects');
            setSelectedCategory('Projek Saya');
          }}
          onSelectCourse={(course) => {
            setActiveTab('home');
            setSelectedCategory(course);
          }}
          onNavigateAdmin={() => navigate('/admin')}
          showAdmin={currentUser.role === 'admin'}
        />

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
              Projek Saya ({myProjects.length})
            </button>

            {/* 3. EXPANDABLE "SEMESTER" BUTTON */}
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

              {/* Expanded Semester Options */}
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
                      Hai, {studentUser.name}! 👋
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      Jelajahi karya inovatif rekan mahasiswa TRK SV IPB atau unggah dokumentasi projek tugas akhir dan praktikum terbarumu.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigate('/student/upload')}
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
                      Kelola Projek Saya ({myProjects.length})
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
                  onClick={() => navigate('/student/upload')}
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
                  const isOwner =
                    project.nim === studentUser.nim ||
                    project.student?.toLowerCase().includes(studentUser.name.toLowerCase());
                  const thumb = project.thumbnail || getYouTubeThumbnail(project.videoUrl);

                  return (
                    <div
                      key={project.id}
                      onClick={() => handleOpenDetail(project)}
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

                      {/* 2. Metadata Section */}
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
                            handleOpenDetail(project);
                          }}
                          className="text-slate-400 hover:text-slate-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          aria-label="Lihat Detail"
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
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}
