import React from 'react';
import { Play } from 'lucide-react';
import { getYouTubeThumbnail } from '../../data/projectsData';

export default function ProjectCard({ project, onClickDetail }) {
  const displayThumbnail = getYouTubeThumbnail(project.videoUrl) || project.thumbnail;

  return (
    <div className="project-card">
      <div className="card-thumbnail-wrapper" onClick={() => onClickDetail(project)}>
        <img src={displayThumbnail} alt={project.title} />
        <span className="semester-badge">Semester {project.semester}</span>
        <div className="play-overlay">
          <div className="play-btn-circle">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-author">By {project.student}</p>

        <span className="card-course-badge">{project.course}</span>

        <div className="tech-tags">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="tech-tag">{tech}</span>
          ))}
        </div>

        <button className="card-footer-btn" onClick={() => onClickDetail(project)}>
          View Details
        </button>
      </div>
    </div>
  );
}
