import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import ProjectCard from '../projects/ProjectCard';

export default function ProjectShowcase({
  projects,
  selectedSemester,
  onSelectSemester,
  searchQuery,
  onSearchChange,
  onClickDetail
}) {
  const semesters = ['ALL', 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Showcase Projek</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-800">
              Project TRK Terbaru
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Karya teknik komputer, IoT, sistem tertanam & jaringan mahasiswa TRK SV IPB.
            </p>
          </div>
          <a href="#projects" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-100 hover:text-gray-900 transition-colors self-start sm:self-auto">
            View All Submissions <ArrowRight size={14} />
          </a>
        </div>

        {/* Controls: Semester Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {semesters.map((sem) => (
              <button
                key={sem}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSemester === sem
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => onSelectSemester(sem)}
              >
                {sem === 'ALL' ? 'Semua' : `Semester ${sem}`}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari judul, mahasiswa, atau stack..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClickDetail={onClickDetail}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <h3 className="font-heading text-lg font-bold text-gray-700 mb-1">Tidak ada project ditemukan</h3>
            <p className="text-gray-500 text-xs">
              Coba sesuaikan kata kunci pencarian atau filter semester yang dipilih.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
