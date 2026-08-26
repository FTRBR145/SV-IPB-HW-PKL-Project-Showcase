import React, { useState } from 'react';
import { CheckCircle2, Upload } from 'lucide-react';
import { getYouTubeThumbnail } from '../../data/projectsData';
import useApp from '../../hooks/useApp';

const inputClass = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed';

function formatIndonesianDate(dateValue) {
  if (!dateValue) return '';

  const [year, month, day] = dateValue.split('-');
  if (!year || !month || !day) return dateValue;

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const monthName = months[Number.parseInt(month, 10) - 1] || month;
  return `${Number.parseInt(day, 10)} ${monthName} ${year}`;
}

function normalizeYouTubeUrl(videoUrl) {
  const trimmedUrl = videoUrl.trim();
  if (!trimmedUrl) return 'https://www.youtube.com/embed/9KxU30uM3qM';

  if (trimmedUrl.includes('watch?v=')) {
    return trimmedUrl.replace('watch?v=', 'embed/');
  }

  if (trimmedUrl.includes('youtu.be/')) {
    return trimmedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
  }

  return trimmedUrl;
}

export default function ProjectForm({
  onCancel,
  onSuccess,
  onAddProject,
  lockIdentity = false,
  submitLabel = 'Unggah Sekarang'
}) {
  const { addProject, currentUser, courses, categories, adminSettings } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    student: currentUser?.role === 'student' ? currentUser.name : '',
    nim: currentUser?.role === 'student' ? currentUser.nim : '',
    semester: currentUser?.semester || 3,
    course: courses[0] || '',
    category: categories[0] || '',
    date: today,
    year: '2025/2026',
    supervisor: '',
    videoUrl: '',
    thumbnail: '',
    techStackStr: 'ESP32, C++, MQTT, Node.js',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const finalVideoUrl = normalizeYouTubeUrl(formData.videoUrl);
    const techStack = formData.techStackStr
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const projectData = {
      title: formData.title.trim(),
      student: formData.student.trim(),
      nim: formData.nim.trim(),
      course: formData.course,
      category: formData.category,
      semester: Number.parseInt(formData.semester, 10),
      techStack: techStack.length > 0 ? techStack : ['TRK', 'Embedded System'],
      thumbnail:
        formData.thumbnail ||
        getYouTubeThumbnail(finalVideoUrl) ||
        'https://img.youtube.com/vi/9KxU30uM3qM/hqdefault.jpg',
      videoUrl: finalVideoUrl,
      supervisor: formData.supervisor.trim() || 'Dosen Pembimbing TRK SV IPB',
      year: formData.year.trim() || '2025/2026',
      date: formatIndonesianDate(formData.date),
      description:
        formData.description.trim() ||
        'Projek alat/sistem hasil praktikum mahasiswa Teknik Komputer (TRK) Sekolah Vokasi IPB.'
    };

    const createdProject = onAddProject ? onAddProject(projectData) : addProject(projectData);
    setSubmitted(true);
    window.setTimeout(() => onSuccess?.(createdProject), 1200);
  };

  if (submitted) {
    const requiresModeration = adminSettings.moderationRequired && currentUser?.role === 'student';
    return (
      <div className="text-center py-12 space-y-3 animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={36} />
        </div>
        <h2 className="font-heading text-xl font-bold text-slate-800">
          {requiresModeration ? 'Projek Berhasil Dikirim!' : 'Projek TRK Berhasil Diunggah!'}
        </h2>
        <p className="text-slate-500 text-sm">
          {requiresModeration
            ? 'Karya video kamu masuk ke antrean dan menunggu persetujuan admin.'
            : 'Karya video kamu telah tersimpan dan langsung muncul di showcase.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Judul Projek Video *</label>
        <input
          type="text"
          name="title"
          className={inputClass}
          placeholder="Contoh: Sistem Monitoring Kebun Cerdas IoT ESP32"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Mahasiswa *</label>
          <input
            type="text"
            name="student"
            className={inputClass}
            value={formData.student}
            onChange={handleChange}
            disabled={lockIdentity}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">NIM Mahasiswa *</label>
          <input
            type="text"
            name="nim"
            className={inputClass}
            value={formData.nim}
            onChange={handleChange}
            disabled={lockIdentity}
            required
          />
        </div>
      </div>

      {lockIdentity && (
        <p className="-mt-3 text-[11px] text-slate-500">
          Identitas mahasiswa diambil otomatis dari akun yang sedang masuk.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Tanggal Pelaksanaan *</label>
          <input
            type="date"
            name="date"
            className={inputClass}
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Tahun Ajaran</label>
          <input
            type="text"
            name="year"
            className={inputClass}
            placeholder="Contoh: 2025/2026"
            value={formData.year}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Semester</label>
          <select name="semester" className={inputClass} value={formData.semester} onChange={handleChange}>
            {[1, 2, 3, 4, 5, 6].map((semester) => (
              <option key={semester} value={semester}>Semester {semester}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Dosen Pembimbing</label>
          <input
            type="text"
            name="supervisor"
            className={inputClass}
            placeholder="Nama Dosen Pembimbing"
            value={formData.supervisor}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Mata Kuliah TRK</label>
        <select name="course" className={inputClass} value={formData.course} onChange={handleChange}>
          {courses.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori Projek</label>
        <select name="category" className={inputClass} value={formData.category} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">URL Video YouTube</label>
        <input
          type="url"
          name="videoUrl"
          className={inputClass}
          placeholder="https://www.youtube.com/watch?v=..."
          value={formData.videoUrl}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Teknologi / Stack</label>
        <input
          type="text"
          name="techStackStr"
          className={inputClass}
          placeholder="Pisahkan dengan koma, contoh: ESP32, C++, MQTT"
          value={formData.techStackStr}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Singkat</label>
        <textarea
          name="description"
          rows="4"
          className={`${inputClass} resize-none`}
          placeholder="Jelaskan ringkasan tujuan, cara kerja, dan keunggulan projek..."
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors"
            onClick={onCancel}
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
        >
          <Upload size={16} />
          <span>{submitLabel}</span>
        </button>
      </div>
    </form>
  );
}
