import React from 'react';
import { X } from 'lucide-react';
import ProjectForm from '../projects/ProjectForm';

export default function UploadModal({ isOpen, onClose, onAddProject }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
          onClick={onClose}
          aria-label="Tutup"
        >
          <X size={16} />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <div className="mb-6 pr-8">
            <h2 className="font-heading text-xl font-extrabold text-slate-900">
              Upload Video Projek TRK SV IPB
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Isi formulir untuk menambahkan karya video projek mahasiswa ke showcase.
            </p>
          </div>

          <ProjectForm
            onAddProject={onAddProject}
            onCancel={onClose}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
}
