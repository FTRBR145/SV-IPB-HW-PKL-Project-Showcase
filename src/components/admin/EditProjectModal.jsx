import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import useApp from '../../hooks/useApp';

const fieldClass = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500';

export default function EditProjectModal({ project, onClose }) {
  const { courses, categories, updateProject } = useApp();
  const [formData, setFormData] = useState({
    title: project.title,
    course: project.course,
    category: project.category || categories[0] || '',
    semester: project.semester,
    supervisor: project.supervisor || '',
    videoUrl: project.videoUrl || '',
    techStackStr: project.techStack?.join(', ') || '',
    description: project.description || ''
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    updateProject(project.id, {
      ...formData,
      semester: Number.parseInt(formData.semester, 10),
      techStack: formData.techStackStr.split(',').map((item) => item.trim()).filter(Boolean)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative" onClick={(event) => event.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100" aria-label="Tutup"><X size={17} /></button>
        <div className="mb-6 pr-8"><h2 className="font-heading text-xl font-extrabold text-slate-900">Edit Projek</h2><p className="text-xs text-slate-500 mt-1">Perbarui informasi projek yang sudah dipublikasikan.</p></div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-xs font-bold text-slate-700">Judul projek<input name="title" value={formData.title} onChange={updateField} className={`${fieldClass} mt-1.5`} required /></label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-700">Mata kuliah<select name="course" value={formData.course} onChange={updateField} className={`${fieldClass} mt-1.5`}>{courses.map((course) => <option key={course}>{course}</option>)}</select></label>
            <label className="block text-xs font-bold text-slate-700">Kategori<select name="category" value={formData.category} onChange={updateField} className={`${fieldClass} mt-1.5`}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block text-xs font-bold text-slate-700">Semester<select name="semester" value={formData.semester} onChange={updateField} className={`${fieldClass} mt-1.5`}>{[1,2,3,4,5,6].map((semester) => <option key={semester} value={semester}>Semester {semester}</option>)}</select></label>
            <label className="block text-xs font-bold text-slate-700">Dosen pembimbing<input name="supervisor" value={formData.supervisor} onChange={updateField} className={`${fieldClass} mt-1.5`} /></label>
          </div>
          <label className="block text-xs font-bold text-slate-700">URL video<input type="url" name="videoUrl" value={formData.videoUrl} onChange={updateField} className={`${fieldClass} mt-1.5`} /></label>
          <label className="block text-xs font-bold text-slate-700">Tech stack<input name="techStackStr" value={formData.techStackStr} onChange={updateField} className={`${fieldClass} mt-1.5`} placeholder="Pisahkan dengan koma" /></label>
          <label className="block text-xs font-bold text-slate-700">Deskripsi<textarea name="description" rows="4" value={formData.description} onChange={updateField} className={`${fieldClass} mt-1.5 resize-none`} /></label>
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700">Batal</button><button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold"><Save size={16} /> Simpan Perubahan</button></div>
        </form>
      </div>
    </div>
  );
}
