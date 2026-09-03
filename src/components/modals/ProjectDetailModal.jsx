import React from 'react';
import { X, User, GraduationCap, Calendar } from 'lucide-react';
import ModalShell from '../common/ModalShell';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  return (
    <ModalShell
      onClose={onClose}
      ariaLabel={`Detail projek ${project.title}`}
      panelClassName="max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl lg:overflow-hidden"
    >
        {/* Close Button */}
        <button
          type="button"
          className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950/85 text-white shadow-lg transition-colors hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          onClick={onClose}
          aria-label="Tutup Modal"
        >
          <X size={18} />
        </button>

        {/* Layout: side-by-side on lg, stacked on mobile */}
        <div className="flex flex-col lg:flex-row relative">
          {/* Left: Video — drives the modal height via aspect-video */}
          <div className="lg:w-3/5 flex-shrink-0 bg-black">
            <div className="relative w-full aspect-video">
              <iframe
                src={project.videoUrl}
                title={project.title}
                className="absolute inset-0 w-full h-full border-none lg:rounded-l-3xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Right: Info Panel — absolute on desktop to match video height exactly, scrolls internally */}
          <div className="lg:w-2/5 lg:absolute lg:top-0 lg:bottom-0 lg:right-0 overflow-y-auto">
            <div className="p-5 sm:p-6 space-y-4">
              {/* Title & Metadata */}
              <div>
                <h2 className="font-heading text-lg font-extrabold text-slate-800 mb-1.5 leading-snug pr-8">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-sky-500" />
                    {project.student} {project.nim ? `(${project.nim})` : ''}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <GraduationCap size={12} className="text-sky-500" />
                    Semester {project.semester}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-sky-500" />
                    {project.date ? `${project.date} (${project.year})` : project.year}
                  </span>
                </div>
              </div>

              {/* Mata Kuliah & Dosen */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div>
                  <span className="mb-0.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    MATA KULIAH TRK
                  </span>
                  <p className="font-bold text-xs text-slate-800">{project.course}</p>
                </div>
                <div>
                  <span className="mb-0.5 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    DOSEN PEMBIMBING
                  </span>
                  <p className="font-bold text-xs text-slate-800">{project.supervisor || 'Dosen Pembimbing TRK SV IPB'}</p>
                </div>
              </div>

              {/* Deskripsi */}
              {project.description && (
                <div>
                  <h4 className="font-heading text-xs font-bold text-slate-800 mb-1">Deskripsi Projek</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{project.description}</p>
                </div>
              )}

              {/* Tech Stack */}
              {project.techStack && project.techStack.length > 0 && (
                <div>
                  <h4 className="font-heading text-xs font-bold text-slate-800 mb-1.5">
                    Teknologi Yang Digunakan
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-sky-100 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </ModalShell>
  );
}
