import React from 'react';
import { X, User, GraduationCap, Calendar } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Embedded Video Player */}
        <div className="video-player-container">
          <iframe
            src={project.videoUrl}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="modal-body">
          {/* Header Meta */}
          <div className="modal-header-meta">
            <h2 className="modal-project-title">{project.title}</h2>
            <div className="modal-meta-row">
              <span><User size={14} /> {project.student} ({project.nim})</span>
              <span>•</span>
              <span><GraduationCap size={14} /> Semester {project.semester}</span>
              <span>•</span>
              <span><Calendar size={14} /> Tahun {project.year}</span>
            </div>
          </div>

          {/* Dosen Pembimbing & Mata Kuliah */}
          <div className="modal-section-block">
            <h4>Detail Mata Kuliah & Pembimbing</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MATA KULIAH TRK</span>
                <p style={{ fontWeight: 700, color: 'var(--ipb-navy)' }}>{project.course}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DOSEN PEMBIMBING</span>
                <p style={{ fontWeight: 700, color: 'var(--ipb-navy)' }}>{project.supervisor}</p>
              </div>
            </div>
          </div>

          {/* Deskripsi Projek */}
          <div className="modal-section-block">
            <h4>Deskripsi Projek</h4>
            <p style={{ color: '#334155', lineHeight: 1.7 }}>
              {project.description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="modal-section-block">
            <h4>Teknologi Yang Digunakan</h4>
            <div className="tech-tags">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="tech-tag" style={{ fontSize: '0.85rem', padding: '0.3rem 0.8rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
