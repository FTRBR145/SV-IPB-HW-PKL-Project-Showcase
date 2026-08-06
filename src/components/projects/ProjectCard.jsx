import React, { useState } from 'react';
import { Play, Heart, Eye, User, GraduationCap } from 'lucide-react';
import { getYouTubeThumbnail } from '../../data/projectsData';

export default function ProjectCard({ project, onClickDetail }) {
  const [likes, setLikes] = useState(project.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  // Determine High Resolution Thumbnail (YouTube thumbnail or fallback)
  const displayThumbnail = getYouTubeThumbnail(project.videoUrl) || project.thumbnail;

  return (
    <div className="project-card" onClick={() => onClickDetail(project)}>
      {/* Card Media Preview Header */}
      <div className="project-card-media">
        <img
          src={displayThumbnail}
          alt={project.title}
          className="project-card-img"
          loading="lazy"
        />
        <div className="media-overlay">
          <div className="play-button-icon">
            <Play size={24} fill="#ffffff" color="#ffffff" />
          </div>
        </div>

        {/* Semester Tag Badge */}
        <div className="semester-badge">
          Sem {project.semester}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="project-card-body">
        <div className="project-course-tag">
          {project.course}
        </div>

        <h3 className="project-card-title">
          {project.title}
        </h3>

        <div className="project-author-info">
          <div className="author-row">
            <User size={14} className="author-icon" />
            <span className="author-name">{project.student}</span>
          </div>
          <div className="prodi-row">
            <GraduationCap size={14} className="author-icon" />
            <span className="prodi-name">{project.prodi}</span>
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="tech-tags">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {/* Card Footer Stats */}
        <div className="project-card-footer">
          <div className="card-stats">
            <button
              className={`stat-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLikeClick}
              title="Sukai Projek Ini"
            >
              <Heart size={15} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : 'currentColor'} />
              <span>{likes}</span>
            </button>

            <div className="stat-item" title="Jumlah Dilihat">
              <Eye size={15} />
              <span>{project.views}</span>
            </div>
          </div>

          <button className="view-detail-btn" onClick={() => onClickDetail(project)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
