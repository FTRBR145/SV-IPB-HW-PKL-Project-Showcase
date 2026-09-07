import React, { useMemo, useState } from 'react';
import {
  Binary,
  BookOpen,
  Cpu,
  FolderGit2,
  GraduationCap,
  Home,
  ShieldCheck,
  Smartphone,
  Upload,
  Wifi,
  Wrench,
  X
} from 'lucide-react';
import ModalShell from '../common/ModalShell';

const coursePresentation = {
  'SISTEM TERTANAM (EMBEDDED SYSTEM)': { label: 'Sistem Tertanam', icon: Cpu },
  'APLIKASI MOBILE': { label: 'Aplikasi Mobile', icon: Smartphone },
  'PROYEK SISTEM IOT (INTERNET OF THINGS)': { label: 'Sistem IoT', icon: Wifi },
  'TEKNOLOGI BENGKEL ELEKTROMEKANIK': { label: 'Bengkel Elektromekanik', icon: Wrench },
  'RANGKAIAN LOGIKA DAN TEKNIK DIGITAL': { label: 'Rangkaian Logika Digital', icon: Binary }
};
const EMPTY_COURSES = [];

function formatCourseLabel(value) {
  return value
    .toLocaleLowerCase('id-ID')
    .replace(/(^|\s)\p{L}/gu, (letter) => letter.toLocaleUpperCase('id-ID'));
}

const mainItemClass = 'flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500';

export default function StudentSidebar({
  courses = EMPTY_COURSES,
  activeItem = 'home',
  selectedCategory = 'Semua',
  projectCount = 0,
  onSelectHome,
  onSelectMyProjects,
  onSelectCourse,
  onNavigateUpload,
  onNavigateAdmin,
  showAdmin = false,
  showStudentActions = true
}) {
  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);
  const courseItems = useMemo(() => courses.map((value) => ({
    value,
    label: coursePresentation[value]?.label || formatCourseLabel(value),
    icon: coursePresentation[value]?.icon || BookOpen,
    activeClass: 'bg-sky-50 text-sky-800',
    iconClass: 'text-sky-600'
  })), [courses]);
  const courseIsActive = courseItems.some((course) => course.value === selectedCategory);

  const selectCourse = (course) => {
    onSelectCourse?.(course);
    setIsCourseMenuOpen(false);
  };

  return (
    <>
      <aside className="workspace-sidebar hidden w-64 shrink-0 select-none flex-col overflow-y-auto border-r p-4 md:sticky md:top-0 md:flex md:h-[calc(100dvh-5rem)] md:self-start">
        <nav className="w-full space-y-1 border-b border-slate-100 pb-4" aria-label="Navigasi mahasiswa">
          <button
            type="button"
            onClick={onSelectHome}
            className={`${mainItemClass} ${
              activeItem === 'home'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Home size={17} className={activeItem === 'home' ? 'text-sky-400' : ''} />
            <span>Beranda</span>
          </button>

          {showStudentActions && (
            <>
              <button
                type="button"
                onClick={onNavigateUpload}
                className={`${mainItemClass} ${
                  activeItem === 'upload'
                    ? 'bg-sky-600 text-white'
                    : 'text-sky-800 hover:bg-sky-50'
                }`}
              >
                <Upload size={17} />
                <span>Upload Projek</span>
              </button>

              <button
                type="button"
                onClick={onSelectMyProjects}
                className={`${mainItemClass} ${
                  activeItem === 'my-projects'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FolderGit2 size={17} className={activeItem === 'my-projects' ? 'text-sky-400' : ''} />
                <span>Projek Saya</span>
                <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-bold ${
                  activeItem === 'my-projects' ? 'bg-white/15 text-white' : 'bg-sky-100 text-sky-700'
                }`}>
                  {projectCount}
                </span>
              </button>
            </>
          )}
        </nav>

        <div className="space-y-1 border-b border-slate-100 py-4">
          <p className="mb-2 px-3 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-600">
            Mata Kuliah TRK
          </p>
          {courseItems.map(({ value, label, icon: Icon, activeClass, iconClass }) => (
            <button
              key={value}
              type="button"
              onClick={() => onSelectCourse?.(value)}
              className={`flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 text-left text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                selectedCategory === value
                  ? `${activeClass} font-bold`
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={15} className={`${iconClass} shrink-0`} />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto space-y-3 pt-4">
          {showAdmin && (
            <button
              type="button"
              onClick={onNavigateAdmin}
              className="flex min-h-11 w-full items-center gap-2.5 rounded-xl bg-slate-100 px-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <ShieldCheck size={16} />
              <span>Panel Admin / Dosen</span>
            </button>
          )}
          <div className="rounded-xl bg-sky-50 px-3 py-3 text-sky-900">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-bold">
              <GraduationCap size={14} className="text-sky-600" />
              <span>TRK SV IPB 2026</span>
            </div>
            <p className="text-xs leading-4 text-sky-800">
              Showcase tugas akhir dan praktikum mahasiswa.
            </p>
          </div>
        </div>
      </aside>

      <ModalShell
        isOpen={isCourseMenuOpen}
        onClose={() => setIsCourseMenuOpen(false)}
        ariaLabel="Pilih mata kuliah"
        panelId="student-course-menu"
        overlayClassName="items-end bg-slate-950/45 p-3 pb-[calc(5rem+env(safe-area-inset-bottom))] md:hidden"
        panelClassName="max-h-[70vh] overflow-y-auto rounded-2xl p-4"
      >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-base font-bold text-slate-900">Mata Kuliah TRK</h2>
                <p className="mt-0.5 text-xs text-slate-600">Pilih kategori projek yang ingin ditampilkan.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCourseMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                aria-label="Tutup pilihan mata kuliah"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2">
              {courseItems.map(({ value, label, icon: Icon, activeClass, iconClass }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectCourse(value)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-xs font-bold ${
                    selectedCategory === value ? activeClass : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <Icon size={17} className={iconClass} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
            {showAdmin && (
              <button
                type="button"
                onClick={onNavigateAdmin}
                className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 text-xs font-bold text-white"
              >
                <ShieldCheck size={15} /> Panel Admin
              </button>
            )}
      </ModalShell>

      <nav className="workspace-toolbar fixed inset-x-0 bottom-0 z-50 border-t px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.10)] backdrop-blur md:hidden" aria-label="Navigasi mahasiswa mobile">
        <div className={`mx-auto grid min-h-16 max-w-lg items-stretch py-1.5 ${showStudentActions ? 'grid-cols-4' : 'grid-cols-3'}`}>
          <button type="button" onClick={onSelectHome} aria-label="Beranda mahasiswa" className={`flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden px-1 text-center text-xs font-bold leading-tight ${activeItem === 'home' ? 'text-sky-700' : 'text-slate-600'}`}>
            <span className={`rounded-xl p-1.5 ${activeItem === 'home' ? 'mobile-nav-active bg-sky-100' : ''}`}><Home size={19} /></span>
            <span className="max-w-full">Awal</span>
          </button>
          {showStudentActions && (
            <>
              <button type="button" onClick={onNavigateUpload} aria-label="Upload projek" className={`flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden px-1 text-center text-xs font-bold leading-tight ${activeItem === 'upload' ? 'text-sky-700' : 'text-slate-600'}`}>
                <span className={`rounded-xl p-1.5 ${activeItem === 'upload' ? 'mobile-nav-active bg-sky-100' : ''}`}><Upload size={19} /></span>
                <span className="max-w-full">Unggah</span>
              </button>
              <button type="button" onClick={onSelectMyProjects} aria-label="Projek saya" className={`relative flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden px-1 text-center text-xs font-bold leading-tight ${activeItem === 'my-projects' ? 'text-sky-700' : 'text-slate-600'}`}>
                <span className={`relative rounded-xl p-1.5 ${activeItem === 'my-projects' ? 'mobile-nav-active bg-sky-100' : ''}`}>
                  <FolderGit2 size={19} />
                  {projectCount > 0 && <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-xs text-white">{projectCount}</span>}
                </span>
                <span className="max-w-full">Projek</span>
              </button>
            </>
          )}
          <button type="button" onClick={() => setIsCourseMenuOpen((open) => !open)} aria-label="Pilih mata kuliah" aria-expanded={isCourseMenuOpen} aria-controls="student-course-menu" className={`flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden px-1 text-center text-xs font-bold leading-tight ${isCourseMenuOpen || courseIsActive ? 'text-sky-700' : 'text-slate-600'}`}>
            <span className={`rounded-xl p-1.5 ${isCourseMenuOpen || courseIsActive ? 'mobile-nav-active bg-sky-100' : ''}`}><BookOpen size={19} /></span>
            <span className="max-w-full">Kuliah</span>
          </button>
          {showAdmin && !showStudentActions && (
            <button type="button" onClick={onNavigateAdmin} aria-label="Kembali ke panel admin" className="flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden px-1 text-center text-xs font-bold leading-tight text-slate-600">
              <span className="rounded-xl p-1.5"><ShieldCheck size={19} /></span>
              <span className="max-w-full">Admin</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
