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
    <section id="projects" className="showcase-section">
      <div className="container">
        {/* Header Title */}
        <div className="showcase-header">
          <div className="section-title-group">
            <h2>Project TRK Terbaru</h2>
            <p>Karya teknik komputer, IoT, sistem tertanam & jaringan mahasiswa TRK SV IPB.</p>
          </div>
          <a href="#projects" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
            View All Submissions <ArrowRight size={14} />
          </a>
        </div>

        {/* Controls: Semester Tabs & Search */}
        <div className="controls-bar">
          <div className="semester-tabs">
            {semesters.map((sem) => (
              <button
                key={sem}
                className={`tab-btn ${selectedSemester === sem ? 'active' : ''}`}
                onClick={() => onSelectSemester(sem)}
              >
                {sem === 'ALL' ? 'Semua' : `Semester ${sem}`}
              </button>
            ))}
          </div>

          <div className="filter-inputs">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Cari judul, mahasiswa, atau stack..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClickDetail={onClickDetail}
              />
            ))
          ) : (
            <div className="empty-state">
              <h3>Tidak ada project ditemukan</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Coba sesuaikan kata kunci pencarian atau filter semester yang dipilih.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
