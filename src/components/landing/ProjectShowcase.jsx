import React from 'react';
import { Search, Filter } from 'lucide-react';
import ProjectCard from '../projects/ProjectCard';
import { SV_COURSES, SV_PRODIS } from '../../data/projectsData';

export default function ProjectShowcase({
  projects,
  selectedSemester,
  onSelectSemester,
  selectedProdi,
  onSelectProdi,
  searchQuery,
  onSearchChange,
  onClickDetail
}) {
  const semesters = ['ALL', 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section id="projects" className="showcase-section">
      <div className="container">
        {/* Section Header */}
        <div className="showcase-header text-center">
          <div className="section-tag">KATALOG DIGITAL TRK</div>
          <h2 className="section-title">Showcase Project TRK Terbaru</h2>
          <p className="section-subtitle">
            Jelajahi berbagai karya video hasil praktikum dan perancangan sistem tertanam mahasiswa Teknik Komputer Sekolah Vokasi IPB.
          </p>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="showcase-controls">
          {/* Semester Filter Tabs */}
          <div className="semester-tabs-scroll">
            <div className="semester-tabs">
              {semesters.map((sem) => (
                <button
                  key={sem}
                  className={`tab-btn ${selectedSemester === sem ? 'active' : ''}`}
                  onClick={() => onSelectSemester(sem)}
                >
                  {sem === 'ALL' ? 'Semua Semester' : `Sem ${sem}`}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Dropdown Filter Row */}
          <div className="search-filter-row">
            {/* Search Input Bar */}
            <div className="search-input-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Cari judul project, nama mahasiswa, NIM, atau tech stack..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => onSearchChange('')}>
                  ×
                </button>
              )}
            </div>

            {/* Prodi Dropdown Filter */}
            <div className="filter-dropdown-wrapper">
              <Filter className="filter-icon" size={16} />
              <select
                value={selectedProdi}
                onChange={(e) => onSelectProdi(e.target.value)}
                className="filter-select"
              >
                {SV_PRODIS.map((prodi) => (
                  <option key={prodi.code} value={prodi.code}>
                    {prodi.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid Display */}
        {projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClickDetail={onClickDetail}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>Project Tidak Ditemukan</h3>
            <p>Tidak ada hasil yang cocok dengan kata kunci atau filter pilihan kamu.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                onSelectSemester('ALL');
                onSelectProdi('ALL');
                onSearchChange('');
              }}
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
