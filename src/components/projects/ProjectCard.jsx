import React from 'react';
import { Play } from 'lucide-react';
import { getYouTubeThumbnail } from '../../data/projectsData';

export default function ProjectCard({ project, onClickDetail }) {
  const displayThumbnail = getYouTubeThumbnail(project.videoUrl) || project.thumbnail;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200/80 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group">
      {/* Thumbnail Wrapper */}
      <div 
        className="relative h-48 sm:h-52 overflow-hidden bg-gray-900 cursor-pointer"
        onClick={() => onClickDetail(project)}
      >
        <img 
          src={displayThumbnail} 
          alt={project.title} 
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
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-base font-bold text-gray-800 line-clamp-2 mb-1 group-hover:text-gray-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-gray-500 mb-3 font-medium">By {project.student}</p>

          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-gray-200 mb-3">
            {project.course}
          </span>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 text-[11px] font-medium px-2 py-0.5 rounded border border-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button 
          className="w-full py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs transition-colors shadow-sm"
          onClick={() => onClickDetail(project)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
