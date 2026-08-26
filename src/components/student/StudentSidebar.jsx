import React from 'react';
import {
  Binary,
  Cpu,
  FolderGit2,
  GraduationCap,
  Home,
  ShieldCheck,
  Smartphone,
  Upload,
  Wifi,
  Wrench
} from 'lucide-react';

const courses = [
  {
    value: 'SISTEM TERTANAM (EMBEDDED SYSTEM)',
    label: 'Sistem Tertanam',
    icon: Cpu,
    activeClass: 'bg-sky-50 text-sky-700',
    iconClass: 'text-sky-500'
  },
  {
    value: 'APLIKASI MOBILE',
    label: 'Aplikasi Mobile',
    icon: Smartphone,
    activeClass: 'bg-emerald-50 text-emerald-700',
    iconClass: 'text-emerald-500'
  },
  {
    value: 'PROYEK SISTEM IOT (INTERNET OF THINGS)',
    label: 'Sistem IoT',
    icon: Wifi,
    activeClass: 'bg-indigo-50 text-indigo-700',
    iconClass: 'text-indigo-500'
  },
  {
    value: 'TEKNOLOGI BENGKEL ELEKTROMEKANIK',
    label: 'Bengkel Elektromekanik',
    icon: Wrench,
    activeClass: 'bg-amber-50 text-amber-700',
    iconClass: 'text-amber-500'
  },
  {
    value: 'RANGKAIAN LOGIKA DAN TEKNIK DIGITAL',
    label: 'Rangkaian Logika Digital',
    icon: Binary,
    activeClass: 'bg-rose-50 text-rose-700',
    iconClass: 'text-rose-500'
  }
];

const mainItemClass = 'w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors';

export default function StudentSidebar({
  activeItem = 'home',
  selectedCategory = 'Semua',
  projectCount = 0,
  onSelectHome,
  onSelectMyProjects,
  onSelectCourse,
  onNavigateUpload,
  onNavigateAdmin,
  showAdmin = false
}) {
  return (
    <aside className="hidden md:flex w-60 p-3 flex-col border-r border-slate-200 bg-white flex-shrink-0 overflow-y-auto select-none">
      <div className="space-y-1 w-full pb-3 border-b border-slate-100">
        <button
          onClick={onSelectHome}
          className={`${mainItemClass} ${
            activeItem === 'home'
              ? 'bg-slate-100 text-slate-900 font-extrabold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Home size={17} className={activeItem === 'home' ? 'text-sky-600' : ''} />
          <span>Beranda</span>
        </button>

        <button
          onClick={onNavigateUpload}
          className={`${mainItemClass} ${
            activeItem === 'upload'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
          }`}
        >
          <Upload size={17} />
          <span>Upload Projek</span>
        </button>

        <button
          onClick={onSelectMyProjects}
          className={`${mainItemClass} ${
            activeItem === 'my-projects'
              ? 'bg-slate-100 text-slate-900 font-extrabold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <FolderGit2 size={17} className={activeItem === 'my-projects' ? 'text-sky-600' : ''} />
          <span>Projek Saya</span>
          <span className="ml-auto bg-sky-100 text-sky-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
            {projectCount}
          </span>
        </button>
      </div>

      <div className="py-3 border-b border-slate-100 space-y-1">
        <span className="px-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
          Mata Kuliah TRK
        </span>
        {courses.map(({ value, label, icon: Icon, activeClass, iconClass }) => (
          <button
            key={value}
            onClick={() => onSelectCourse?.(value)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left truncate transition-colors ${
              selectedCategory === value
                ? `${activeClass} font-bold`
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Icon size={15} className={`${iconClass} flex-shrink-0`} />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>

      <div className="pt-3 space-y-1">
        {showAdmin && (
          <button
            onClick={onNavigateAdmin}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100/70 hover:bg-slate-200 transition-colors"
          >
            <ShieldCheck size={16} className="text-slate-800" />
            <span>Panel Admin / Dosen</span>
          </button>
        )}
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
    </aside>
  );
}
