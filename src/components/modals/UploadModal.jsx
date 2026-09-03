import React from 'react';
import { X } from 'lucide-react';
import ProjectForm from '../projects/ProjectForm';
import ModalShell from '../common/ModalShell';

export default function UploadModal({ isOpen, onClose, onAddProject }) {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Unggah projek TRK"
      panelClassName="max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl"
    >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
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
    </ModalShell>
  );
}
