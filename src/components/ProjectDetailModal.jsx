import React, { useState } from 'react';
import { X, User, GraduationCap, Calendar, Video, Box, Image, Cpu, Layers } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  const [activeMediaTab, setActiveMediaTab] = useState('video');

  if (!project) return null;

  const has3DModel = Boolean(project.model3dUrl);
  const hasGallery = Boolean(project.galleryImages && project.galleryImages.length > 0);
  const hasComponents = Boolean(project.hardwareComponents && project.hardwareComponents.length > 0);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Multi-Media Tab Switcher */}
        <div style={{ display: 'flex', background: '#002244', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)', padding: '0.75rem 1rem 0 1rem', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveMediaTab('video')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px 8px 0 0',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              background: activeMediaTab === 'video' ? '#ffffff' : 'rgba(255,255,255,0.15)',
              color: activeMediaTab === 'video' ? 'var(--ipb-navy)' : '#ffffff',
              transition: 'all 0.2s ease'
            }}
          >
            <Video size={16} /> Video Demo Alat
          </button>

          {has3DModel && (
            <button
              onClick={() => setActiveMediaTab('model3d')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px 8px 0 0',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: activeMediaTab === 'model3d' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: activeMediaTab === 'model3d' ? 'var(--ipb-navy)' : '#ffffff',
                transition: 'all 0.2s ease'
              }}
            >
              <Box size={16} /> Perancangan 3D CAD
            </button>
          )}

          {hasGallery && (
            <button
              onClick={() => setActiveMediaTab('gallery')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px 8px 0 0',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: activeMediaTab === 'gallery' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: activeMediaTab === 'gallery' ? 'var(--ipb-navy)' : '#ffffff',
                transition: 'all 0.2s ease'
              }}
            >
              <Image size={16} /> Foto Fisik Alat & Skematik
            </button>
          )}
        </div>

        {/* Media Container View */}
        <div className="video-player-container">
          {activeMediaTab === 'video' && (
            <iframe
              src={project.videoUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}

          {activeMediaTab === 'model3d' && has3DModel && (
            <iframe
              src={project.model3dUrl}
              title={`3D Model - ${project.title}`}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            ></iframe>
          )}

          {activeMediaTab === 'gallery' && hasGallery && (
            <div style={{ padding: '1rem', background: '#0f172a', height: '100%', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {project.galleryImages.map((img, idx) => (
                <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={img} alt={`Foto Alat ${idx + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="modal-body">
          {/* Header Meta */}
          <div className="modal-header-meta">
            <h2 className="modal-project-title">{project.title}</h2>
            <div className="modal-meta-row">
              <span><User size={14} /> {project.student} ({project.nim})</span>
              <span>•</span>
              <span><GraduationCap size={14} /> {project.prodi}</span>
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

          {/* Spesifikasi Komponen Hardware Alat */}
          {hasComponents && (
            <div className="modal-section-block">
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Cpu size={18} color="var(--accent-blue)" /> Komponen Hardware & Sensor Alat
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {project.hardwareComponents.map((comp, idx) => (
                  <span key={idx} style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.82rem', fontWeight: 600, padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                    ⚙️ {comp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Deskripsi Projek */}
          <div className="modal-section-block">
            <h4>Deskripsi Projek & Cara Kerja Alat</h4>
            <p style={{ color: '#334155', lineHeight: 1.7 }}>
              {project.description}
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="modal-section-block">
            <h4>Teknologi & Protokol Yang Digunakan</h4>
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
