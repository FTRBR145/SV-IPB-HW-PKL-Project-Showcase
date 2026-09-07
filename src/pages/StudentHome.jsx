import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  FolderGit2,
  GraduationCap,
  Play,
  Plus,
  Search
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import { isAdminAccount, isStudentAccount } from '../utils/accessControl';
import { getYouTubeThumbnail } from '../data/projectsData';
import ProjectDetailModal from '../components/modals/ProjectDetailModal';
import StudentSidebar from '../components/student/StudentSidebar';
import useApp from '../hooks/useApp';
import useInViewOnce from '../hooks/useInViewOnce';

const SEMESTER_OPTIONS = [1, 2, 3, 4, 5, 6];
const PAGE_SIZE = 6;

function belongsToStudent(project, student) {
  if (!project || !student) return false;

  // NIM adalah identitas unik: kalau keduanya ada, itu penentu tunggal.
  if (project.nim && student.nim) {
    return String(project.nim) === String(student.nim);
  }

  // Fallback nama, exact match saja agar "Adi" tidak mengklaim projek "Hadi".
  const projectStudent = project.student?.trim().toLowerCase();
  const studentName = student.name?.trim().toLowerCase();
  return Boolean(projectStudent && studentName && projectStudent === studentName);
}

export default function StudentHome() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { projects, submissions, currentUser, isLoggedIn, logout, courses } = useApp();
  const isAdminPreview = isAdminAccount(currentUser);
  const studentUser = isStudentAccount(currentUser) ? currentUser : null;

  const [selectedSemester, setSelectedSemester] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailProject, setActiveDetailProject] = useState(null);
  const [visibleProjectCount, setVisibleProjectCount] = useState(PAGE_SIZE);
  const [gridRef, gridVisible] = useInViewOnce({ rootMargin: '0px 0px -8% 0px' });

  // URL jadi sumber kebenaran tab & kategori, bukan state lokal.
  const activeTab = !isAdminPreview && searchParams.get('tab') === 'my-projects' ? 'my-projects' : 'home';
  const selectedCategory =
    searchParams.get('course') || (activeTab === 'my-projects' ? 'Projek Saya' : 'Semua');

  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, isLoggedIn, navigate]);

  const myPendingSubmissions = useMemo(() => {
    if (!studentUser) return [];
    return (submissions || [])
      .filter(
        (item) =>
          item.status === 'pending' &&
          (belongsToStudent(item, studentUser) || String(item.nim) === String(studentUser.nim))
      )
      .map((item) => ({
        ...item,
        status: 'pending',
        isPending: true
      }));
  }, [submissions, studentUser]);

  const myPublishedProjects = useMemo(
    () => projects.filter((project) => belongsToStudent(project, studentUser)),
    [projects, studentUser]
  );

  const myProjects = useMemo(
    () => [...myPendingSubmissions, ...myPublishedProjects],
    [myPendingSubmissions, myPublishedProjects]
  );

  useEffect(() => {
    const targetId = searchParams.get('project');
    if (!targetId) {
      setActiveDetailProject(null);
      return;
    }
    const pool = [...projects, ...myPendingSubmissions];
    const found = pool.find((project) => String(project.id) === String(targetId));
    setActiveDetailProject(found ?? null);
  }, [searchParams, projects, myPendingSubmissions]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    // Di tab 'home' (Beranda), HANYA tampilkan projek yang disetujui (projects). Projek pending TIDAK PERNAH muncul di beranda.
    // Di tab 'my-projects', tampilkan gabungan projek pending milik mahasiswa dan projek disetujui milik mahasiswa.
    const baseProjects = activeTab === 'my-projects' ? myProjects : projects;

    return baseProjects.filter((project) => {
      if (selectedSemester !== 'ALL' && Number(project.semester) !== Number(selectedSemester)) {
        return false;
      }

      if (selectedCategory !== 'Semua' && selectedCategory !== 'Projek Saya') {
        const categoryQuery = selectedCategory.toLowerCase();
        const matchesCourse = project.course?.toLowerCase().includes(categoryQuery);
        const matchesTechnology = project.techStack?.some((technology) =>
          technology.toLowerCase().includes(categoryQuery)
        );
        if (!matchesCourse && !matchesTechnology) return false;
      }

      if (!normalizedQuery) return true;

      return (
        [project.title, project.student, project.course].some((value) =>
          value?.toLowerCase().includes(normalizedQuery)
        ) ||
        Boolean(
          project.techStack?.some((technology) =>
            technology.toLowerCase().includes(normalizedQuery)
          )
        )
      );
    });
  }, [activeTab, myProjects, projects, searchQuery, selectedCategory, selectedSemester]);

  const visibleProjects = filteredProjects.slice(0, visibleProjectCount);
  const remainingProjectCount = filteredProjects.length - visibleProjects.length;

  const resetVisibleProjects = () => setVisibleProjectCount(PAGE_SIZE);

  const updateParams = (mutate) => {
    const nextParams = new URLSearchParams(searchParams);
    mutate(nextParams);
    setSearchParams(nextParams, { replace: true });
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    resetVisibleProjects();
  };

  const handleOpenDetail = (project) => {
    setActiveDetailProject(project);
    updateParams((params) => params.set('project', project.id));
  };

  const handleCloseDetail = () => {
    setActiveDetailProject(null);
    updateParams((params) => params.delete('project'));
  };

  const showAllProjects = () => {
    updateParams((params) => {
      params.delete('tab');
      params.delete('course');
    });
    setSelectedSemester('ALL');
    resetVisibleProjects();
  };

  const showMyProjects = () => {
    updateParams((params) => {
      params.set('tab', 'my-projects');
      params.delete('course');
    });
    resetVisibleProjects();
  };

  const selectCourse = (course) => {
    updateParams((params) => {
      params.delete('tab');
      params.set('course', course);
    });
    resetVisibleProjects();
  };

  const resetFilters = () => {
    showAllProjects();
    handleSearchChange('');
  };

  // Jangan render apa pun selagi redirect berjalan.
  if (!isLoggedIn || !currentUser) return null;

  const isDefaultFeed =
    activeTab === 'home' &&
    selectedCategory === 'Semua' &&
    selectedSemester === 'ALL' &&
    !searchQuery;

  return (
    <div className="app-canvas flex h-screen h-dvh flex-col overflow-hidden pb-[calc(5rem+env(safe-area-inset-bottom))] font-sans md:pb-0">
      <Navbar
        courses={courses}
        currentPage="student"
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOpenUpload={studentUser ? () => navigate('/student/upload') : undefined}
        onLogout={logout}
        onNavigateToAdmin={() => navigate('/admin')}
        onBackToLanding={() => navigate('/')}
      />

      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className="flex min-h-[calc(100dvh-4rem)] items-stretch sm:min-h-[calc(100dvh-5rem)]">
          <StudentSidebar
            courses={courses}
            activeItem={activeTab === 'my-projects' ? 'my-projects' : 'home'}
            selectedCategory={selectedCategory}
            projectCount={myProjects.length}
            onSelectHome={showAllProjects}
            onNavigateUpload={studentUser ? () => navigate('/student/upload') : undefined}
            onSelectMyProjects={showMyProjects}
            onSelectCourse={selectCourse}
            onNavigateAdmin={() => navigate('/admin')}
            showAdmin={isAdminPreview}
            showStudentActions={Boolean(studentUser)}
          />

          <main id="main-content" className="app-workspace min-w-0 flex-1">
          <div className="workspace-toolbar sticky top-0 z-30 border-b px-4 py-3 backdrop-blur-sm sm:px-6">
            <div className="mx-auto flex w-full max-w-[1480px] flex-wrap items-center gap-2">
              <div className="relative order-first w-full xl:hidden">
                <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Cari projek..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/15 sm:text-sm"
                  aria-label="Cari projek"
                />
              </div>

              <button
                type="button"
                onClick={showAllProjects}
                className={`min-h-11 rounded-xl px-4 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                  activeTab === 'home' && selectedCategory === 'Semua'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Semua Projek
              </button>

              {studentUser && (
                <button
                  type="button"
                  onClick={showMyProjects}
                  className={`min-h-11 rounded-xl px-4 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    activeTab === 'my-projects'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Projek Saya <span className="ml-1 opacity-70">{myProjects.length}</span>
                </button>
              )}

              <label className="relative flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700">
                <GraduationCap size={15} className="text-sky-600" />
                <span className="sr-only">Pilih semester</span>
                <select
                  value={selectedSemester}
                  onChange={(event) => {
                    setSelectedSemester(
                      event.target.value === 'ALL' ? 'ALL' : Number(event.target.value)
                    );
                    resetVisibleProjects();
                  }}
                  className="cursor-pointer bg-transparent pr-1 outline-none"
                  aria-label="Filter semester"
                >
                  <option value="ALL">Semua Semester</option>
                  {SEMESTER_OPTIONS.map((semester) => (
                    <option key={semester} value={semester}>Semester {semester}</option>
                  ))}
                </select>
              </label>

              {!isDefaultFeed && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="ml-auto min-h-11 rounded-xl px-3 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  Reset filter
                </button>
              )}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[1480px] space-y-7 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
            {isDefaultFeed && (
              <section className="motion-banner-enter relative overflow-hidden rounded-2xl bg-slate-900 px-5 py-6 text-white shadow-lg shadow-slate-900/15 sm:px-7 sm:py-8">
                <div className="absolute inset-y-0 right-0 w-1/3 bg-sky-500/10" aria-hidden="true" />
                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <h1 className="font-heading text-2xl font-black tracking-[-0.025em] text-white sm:text-3xl">
                      {isAdminPreview ? 'Pratinjau Portal Mahasiswa' : `Selamat datang, ${studentUser.name}`}
                    </h1>
                    <p className="mt-2 max-w-[65ch] text-sm leading-6 text-slate-300">
                      {isAdminPreview
                        ? 'Anda sedang melihat pengalaman mahasiswa dalam mode baca-saja. Pengelolaan dan moderasi tetap dilakukan dari Panel Admin.'
                        : 'Temukan referensi karya mahasiswa TRK atau dokumentasikan projek tugas akhir dan praktikum terbaru Anda.'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    {studentUser ? (
                      <>
                        <button
                          type="button"
                          onClick={() => navigate('/student/upload')}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-700 px-4 text-xs font-bold text-white transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <Plus size={17} /> Unggah Projek
                        </button>
                        <button
                          type="button"
                          onClick={showMyProjects}
                          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-800 px-4 text-xs font-bold text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          Kelola {myProjects.length} projek saya
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => navigate('/admin')}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-4 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        Kembali ke Panel Admin
                      </button>
                    )}
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'my-projects' && myPendingSubmissions.length > 0 && (
              <div className="flex items-center gap-3.5 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Clock size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-amber-900">
                    {myPendingSubmissions.length} projek Anda berstatus Menunggu Persetujuan
                  </p>
                  <p className="mt-0.5 leading-relaxed text-amber-800">
                    Karya Anda hanya tampil di tab Projek Saya ini dan tidak muncul di beranda umum mahasiswa sampai disetujui admin TRK.
                  </p>
                </div>
              </div>
            )}

            <section aria-labelledby="project-feed-title">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <FolderGit2 size={20} className="text-sky-600" />
                    <h2
                      id="project-feed-title"
                      className="font-heading text-xl font-extrabold tracking-[-0.02em] text-slate-950 sm:text-2xl"
                    >
                      {activeTab === 'my-projects' ? 'Portofolio Projek Saya' : 'Projek Mahasiswa TRK'}
                    </h2>
                    {selectedSemester !== 'ALL' && (
                      <span className="rounded-lg bg-sky-100 px-2 py-1 text-xs font-bold text-sky-700">
                        Semester {selectedSemester}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {filteredProjects.length} projek sesuai pencarian dan filter aktif.
                  </p>
                </div>

                {activeTab === 'my-projects' && (
                  <button
                    type="button"
                    onClick={() => navigate('/student/upload')}
                    className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl bg-slate-900 px-4 text-xs font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <Plus size={15} /> Tambah Projek
                  </button>
                )}
              </div>

              {filteredProjects.length === 0 ? (
                <div className="mx-auto my-10 max-w-lg rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    {activeTab === 'my-projects' ? <FolderGit2 size={25} /> : <Search size={25} />}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    {activeTab === 'my-projects' ? 'Belum ada projek milik Anda' : 'Projek tidak ditemukan'}
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">
                    {activeTab === 'my-projects'
                      ? 'Unggah dokumentasi projek pertama Anda untuk mulai membangun portofolio.'
                      : 'Coba gunakan kata kunci lain atau kembalikan filter ke semua projek.'}
                  </p>
                  <button
                    type="button"
                    onClick={
                      activeTab === 'my-projects'
                        ? () => navigate('/student/upload')
                        : resetFilters
                    }
                    className="mt-5 min-h-11 rounded-xl bg-slate-900 px-4 text-xs font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    {activeTab === 'my-projects' ? 'Unggah Projek Pertama' : 'Reset Filter'}
                  </button>
                </div>
              ) : (
                <>
                  <div
                    ref={gridRef}
                    className={`motion-list grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 ${gridVisible ? 'is-visible' : ''}`}
                  >
                    {visibleProjects.map((project, index) => {
                      const isOwner = Boolean(studentUser) && belongsToStudent(project, studentUser);
                      const isPending = project.status === 'pending';
                      const thumbnail = project.thumbnail || getYouTubeThumbnail(project.videoUrl);

                      return (
                        <article
                          key={`${project.status || 'published'}-${project.id}`}
                          className="motion-list-item min-w-0"
                          style={{ '--motion-index': Math.min(index, 5) }}
                        >
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(project)}
                            className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border text-left transition duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                              isPending
                                ? 'border-amber-300/90 bg-white hover:border-amber-400'
                                : 'border-slate-200 bg-white hover:border-sky-200'
                            }`}
                            aria-label={`Lihat detail ${project.title}`}
                          >
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                              <img
                                src={thumbnail}
                                alt={`Thumbnail ${project.title}`}
                                width="480"
                                height="270"
                                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                loading="lazy"
                                decoding="async"
                              />
                              <div
                                className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition group-hover:bg-slate-950/30"
                                aria-hidden="true"
                              >
                                <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-white/95 text-slate-900 opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
                                  <Play size={18} fill="currentColor" />
                                </span>
                              </div>
                              <span className="absolute bottom-2 right-2 rounded-lg bg-slate-950 px-2 py-1 text-xs font-bold text-white">
                                Semester {project.semester}
                              </span>
                              {isPending ? (
                                <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                                  <Clock size={12} className="animate-pulse" /> Menunggu Persetujuan
                                </span>
                              ) : (
                                isOwner && (
                                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-2 py-1 text-xs font-bold text-white shadow-sm">
                                    <CheckCircle2 size={12} /> Projek Saya
                                  </span>
                                )
                              )}
                            </div>

                            <div className="flex flex-1 flex-col p-4">
                              <h3 className={`line-clamp-2 font-heading text-base font-bold leading-5 transition-colors ${
                                isPending ? 'text-slate-950 group-hover:text-amber-700' : 'text-slate-950 group-hover:text-sky-700'
                              }`}>
                                {project.title}
                              </h3>

                              {isPending && (
                                <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-amber-700">
                                  <Clock size={12} className="shrink-0" />
                                  <span>Menunggu verifikasi admin TRK</span>
                                </p>
                              )}

                              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                <span className="truncate">{project.student}</span>
                                {isPending ? (
                                  <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                                    Pending
                                  </span>
                                ) : (
                                  <CheckCircle2
                                    size={13}
                                    className="shrink-0 text-sky-600"
                                    aria-label="Mahasiswa terverifikasi"
                                  />
                                )}
                              </div>
                              <p className="mt-1 line-clamp-1 text-xs font-medium text-slate-600">
                                {project.course}
                              </p>
                              <div className="mt-auto flex items-center justify-between pt-3 text-xs text-slate-600">
                                <span>{project.date || project.year || '2026'}</span>
                                {isPending && (
                                  <span className="rounded border border-amber-200/80 bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                                    Hanya Anda
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        </article>
                      );
                    })}
                  </div>

                  {remainingProjectCount > 0 && (
                    <div className="mt-7 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setVisibleProjectCount((count) => count + PAGE_SIZE)}
                        className="group min-h-11 rounded-xl border border-slate-300 bg-white px-5 text-xs font-bold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      >
                        Tampilkan {PAGE_SIZE} projek berikutnya
                        <span className="ml-1 text-slate-600 transition-colors group-hover:text-slate-900">({remainingProjectCount} tersisa)</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>

          </div>
          </main>
        </div>
      </div>

      {activeDetailProject && (
        <ProjectDetailModal project={activeDetailProject} onClose={handleCloseDetail} />
      )}
    </div>
  );
}
