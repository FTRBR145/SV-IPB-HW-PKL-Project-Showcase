import React from 'react';
import { Play } from 'lucide-react';
import { getYouTubeThumbnail } from '../../data/projectsData';

export default function ProjectCard({ project, onClickDetail, motionIndex = 0 }) {
  const displayThumbnail = getYouTubeThumbnail(project.videoUrl) || project.thumbnail;

  return (
    <article
      className="motion-list-item card-tilt shimmer-hover card-shimmer-border group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm"
      style={{ '--motion-index': motionIndex }}
    >
      {/* Thumbnail Wrapper */}
      <button
        type="button"
        className="relative h-48 overflow-hidden bg-gray-900 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 sm:h-52"
        onClick={() => onClickDetail(project)}
        aria-label={`Lihat detail ${project.title}`}
      >
        <img 
          src={displayThumbnail} 
          alt={project.title} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
        />
        <span className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-md text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-700">
          Semester {project.semester}
        </span>
        <div className="absolute inset-0 bg-gray-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play size={22} fill="currentColor" className="ml-1" />
          </div>
        </div>
      </button>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-base font-bold text-gray-800 line-clamp-2 mb-1 group-hover:text-gray-600 transition-colors">
            {project.title}
          </h3>
          <p className="mb-3 text-xs font-medium text-gray-600">Oleh {project.student}</p>

          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-gray-200 mb-3">
            {project.course}
          </span>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {(project.techStack || []).map((tech, idx) => (
              <span key={idx} className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button 
          className="min-h-11 w-full rounded-xl bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2"
          onClick={() => onClickDetail(project)}
        >
          Lihat Detail
        </button>
      </div>
    </article>
  );
}
