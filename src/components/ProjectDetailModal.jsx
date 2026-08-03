import React, { useState } from 'react';
import { X, Heart, Eye, User, BookOpen, GraduationCap, Calendar, Send, FileText } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose, onAddComment, onToggleLike }) {
  const [newComment, setNewComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [liked, setLiked] = useState(false);

  if (!project) return null;

  const handleLike = () => {
    setLiked(!liked);
    onToggleLike(project.id, !liked);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(project.id, {
      id: Date.now(),
      name: commentName.trim() || 'Pengunjung Anonim',
      role: 'Civitas SV IPB',
      text: newComment,
      date: 'Baru saja'
    });
    setNewComment('');
    setCommentName('');
  };

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
              <span><GraduationCap size={14} /> {project.prodi}</span>
              <span>•</span>
              <span><Calendar size={14} /> Tahun {project.year}</span>
            </div>
          </div>

          {/* Quick Action Stats */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button
              className={`btn ${liked ? 'btn-magenta' : 'btn-secondary'} btn-sm`}
              onClick={handleLike}
            >
              <Heart size={16} fill={liked ? '#ffffff' : 'none'} /> {project.likes + (liked ? 1 : 0)} Suka
            </button>
            <span className="btn btn-secondary btn-sm" style={{ cursor: 'default' }}>
              <Eye size={16} /> {project.views} Dilihat
            </span>
            <a
              href="#download-paper"
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.preventDefault();
                alert(`Unduh Laporan Ringkas/Laporan Projek: ${project.title}`);
              }}
            >
              <FileText size={16} /> Unduh Laporan PDF
            </a>
          </div>

          {/* Dosen Pembimbing & Mata Kuliah */}
          <div className="modal-section-block">
            <h4>Detail Mata Kuliah & Pembimbing</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>MATA KULIAH</span>
                <p style={{ fontWeight: 700, color: 'var(--ipb-navy)' }}>{project.course}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>DOSEN PEMBIMBING</span>
                <p style={{ fontWeight: 700, color: 'var(--ipb-navy)' }}>{project.supervisor}</p>
              </div>
            </div>
          </div>

          {/* Deskripsi & Tujuan */}
          <div className="modal-section-block">
            <h4>Deskripsi Projek</h4>
            <p style={{ color: '#334155', lineHeight: 1.7, marginBottom: '1rem' }}>
              {project.description}
            </p>

            {project.objectives && project.objectives.length > 0 && (
              <>
                <h5 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ipb-navy)', marginBottom: '0.5rem' }}>
                  Tujuan & Hasil Utama:
                </h5>
                <ul style={{ paddingLeft: '1.25rem', color: '#475569', fontSize: '0.9rem' }}>
                  {project.objectives.map((obj, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{obj}</li>
                  ))}
                </ul>
              </>
            )}
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

          {/* Comments Section */}
          <div className="modal-section-block">
            <h4>Diskusi & Feedback ({project.comments ? project.comments.length : 0})</h4>

            <div className="comments-list">
              {project.comments && project.comments.length > 0 ? (
                project.comments.map((c) => (
                  <div key={c.id} className="comment-item">
                    <div className="comment-author">
                      <div>
                        <span className="comment-name">{c.name} </span>
                        <span className="comment-role">{c.role}</span>
                      </div>
                      <span className="comment-date">{c.date}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#334155' }}>{c.text}</p>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Belum ada komentar. Berikan feedback pertama kamu!
                </p>
              )}
            </div>

            <form onSubmit={handleSubmitComment} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Nama kamu (Opsional)"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
              />
              <div className="comment-input-box">
                <input
                  type="text"
                  placeholder="Tulis feedback atau pertanyaan projek..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  <Send size={16} /> Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
