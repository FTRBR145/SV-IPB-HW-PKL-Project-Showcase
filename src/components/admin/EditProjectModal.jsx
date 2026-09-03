import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import useApp from '../../hooks/useApp';
import ModalShell from '../common/ModalShell';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFormError('');
    const { techStackStr, ...projectUpdates } = formData;
    const updated = await updateProject(project.id, {
      ...projectUpdates,
      semester: Number.parseInt(formData.semester, 10),
      techStack: techStackStr.split(',').map((item) => item.trim()).filter(Boolean)
    });
    setIsSubmitting(false);
    if (updated) onClose();
    else setFormError('Perubahan belum tersimpan. Periksa data lalu coba kembali.');
  };

  return (
    <ModalShell onClose={onClose} ariaLabel={`Edit projek ${project.title}`} panelClassName="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600" aria-label="Tutup"><X size={17} /></button>
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
          {formError && <p className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-800" role="alert">{formError}</p>}
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={onClose} disabled={isSubmitting} className="min-h-11 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 disabled:opacity-50">Batal</button><button disabled={isSubmitting} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"><Save size={16} /> {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}</button></div>
        </form>
    </ModalShell>
  );
}
