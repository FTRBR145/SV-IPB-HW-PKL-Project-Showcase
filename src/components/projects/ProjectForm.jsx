import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Clock, Upload } from 'lucide-react';
import { getYouTubeThumbnail } from '../../data/projectsData';
import useApp from '../../hooks/useApp';

const inputClass = 'w-full min-h-11 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base text-slate-800 placeholder-slate-500 transition-colors focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-600 sm:text-sm';
const invalidInputClass = 'border-rose-500 focus:border-rose-600 focus:ring-rose-500/20';

const FIELD_IDS = {
  title: 'project-title',
  student: 'project-student',
  nim: 'project-nim',
  date: 'project-date',
  year: 'project-year',
  course: 'project-course',
  category: 'project-category',
  videoUrl: 'project-video-url'
};

function isValidYouTubeUrl(value) {
  if (!value.trim()) return true;

  try {
    const url = new URL(value);
    return ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(url.hostname);
  } catch {
    return false;
  }
}

function validateProject(formData) {
  const nextErrors = {};
  if (formData.title.trim().length < 5) nextErrors.title = 'Judul projek minimal 5 karakter.';
  if (!formData.student.trim()) nextErrors.student = 'Nama mahasiswa wajib diisi.';
  if (!formData.nim.trim()) nextErrors.nim = 'NIM mahasiswa wajib diisi.';
  if (!formData.date) nextErrors.date = 'Tanggal pelaksanaan wajib dipilih.';
  if (!/^\d{4}\/\d{4}$/.test(formData.year.trim())) nextErrors.year = 'Gunakan format tahun ajaran seperti 2025/2026.';
  if (!formData.course) nextErrors.course = 'Pilih mata kuliah projek.';
  if (!formData.category) nextErrors.category = 'Pilih kategori projek.';
  if (!isValidYouTubeUrl(formData.videoUrl)) nextErrors.videoUrl = 'Masukkan URL YouTube yang valid.';
  return nextErrors;
}

function FieldError({ id, message }) {
  if (!message) return null;
  return <p id={id} className="mt-1.5 text-xs font-semibold text-rose-700">{message}</p>;
}

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
  const { addProject, currentUser, courses, categories } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successTimerRef = useRef(null);
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

  useEffect(() => () => {
    if (successTimerRef.current) window.clearTimeout(successTimerRef.current);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (errors[name] || errors.form) {
      setErrors((previous) => ({ ...previous, [name]: undefined, form: undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateProject(formData);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidField = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() => document.getElementById(FIELD_IDS[firstInvalidField])?.focus());
      return;
    }

    setIsSubmitting(true);

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

    try {
      const createdProject = await Promise.resolve(
        onAddProject ? onAddProject(projectData) : addProject(projectData)
      );
      if (!createdProject) throw new Error('Project creation did not return a result.');
      setSubmitted(true);
      successTimerRef.current = window.setTimeout(() => onSuccess?.(createdProject), 1200);
    } catch (error) {
      console.error('Failed to submit project:', error);
      setErrors({ form: 'Projek belum dapat disimpan. Periksa data lalu coba kembali.' });
      setIsSubmitting(false);
    }
  };

  const fieldProps = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${FIELD_IDS[name]}-error` : undefined
  });

  const fieldClass = (name) => `${inputClass} ${errors[name] ? invalidInputClass : ''}`;

  if (lockIdentity && currentUser?.role !== 'student') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-8 text-center" role="alert">
        <h2 className="font-heading text-lg font-bold text-amber-950">Form khusus akun mahasiswa</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-amber-800">
          Nama dan NIM hanya dapat diisi dari identitas akun mahasiswa yang terverifikasi.
        </p>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mt-5 min-h-11 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
          >
            Kembali
          </button>
        )}
      </div>
    );
  }

  if (submitted) {
    const isStudent = currentUser?.role === 'student';
    return (
      <div className="space-y-3 py-12 text-center" role="status" aria-live="polite">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner ${
          isStudent ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
        }`}>
          {isStudent ? <Clock size={36} /> : <CheckCircle2 size={36} />}
        </div>
        <h2 className="font-heading text-xl font-bold text-slate-800">
          {isStudent ? 'Projek Berhasil Dikirim!' : 'Projek TRK Berhasil Diunggah!'}
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-600">
          {isStudent
            ? 'Karya video Anda berstatus Menunggu Persetujuan dan hanya tampil di tab Projek Saya milik Anda hingga disetujui oleh admin.'
            : 'Karya video kamu telah tersimpan dan langsung muncul di showcase.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {errors.form && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
          {errors.form}
        </p>
      )}
      <div>
        <label htmlFor="project-title" className="mb-1.5 block text-xs font-bold text-slate-700">Judul Projek Video *</label>
        <input
          id="project-title"
          type="text"
          name="title"
          className={fieldClass('title')}
          placeholder="Contoh: Sistem Monitoring Kebun Cerdas IoT ESP32"
          value={formData.title}
          onChange={handleChange}
          maxLength={120}
          required
          {...fieldProps('title')}
        />
        <FieldError id="project-title-error" message={errors.title} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="project-student" className="mb-1.5 block text-xs font-bold text-slate-700">Nama Mahasiswa *</label>
          <input
            id="project-student"
            type="text"
            name="student"
            className={fieldClass('student')}
            value={formData.student}
            onChange={handleChange}
            autoComplete="name"
            maxLength={100}
            disabled={lockIdentity}
            required
            {...fieldProps('student')}
          />
          <FieldError id="project-student-error" message={errors.student} />
        </div>
        <div>
          <label htmlFor="project-nim" className="mb-1.5 block text-xs font-bold text-slate-700">NIM Mahasiswa *</label>
          <input
            id="project-nim"
            type="text"
            name="nim"
            className={fieldClass('nim')}
            value={formData.nim}
            onChange={handleChange}
            autoComplete="off"
            maxLength={24}
            disabled={lockIdentity}
            required
            {...fieldProps('nim')}
          />
          <FieldError id="project-nim-error" message={errors.nim} />
        </div>
      </div>

      {lockIdentity && (
        <p className="-mt-3 text-xs text-slate-600">
          Identitas mahasiswa diambil otomatis dari akun yang sedang masuk.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="project-date" className="mb-1.5 block text-xs font-bold text-slate-700">Tanggal Pelaksanaan *</label>
          <input
            id="project-date"
            type="date"
            name="date"
            className={fieldClass('date')}
            value={formData.date}
            onChange={handleChange}
            required
            {...fieldProps('date')}
          />
          <FieldError id="project-date-error" message={errors.date} />
        </div>
        <div>
          <label htmlFor="project-year" className="mb-1.5 block text-xs font-bold text-slate-700">Tahun Ajaran *</label>
          <input
            id="project-year"
            type="text"
            name="year"
            className={fieldClass('year')}
            placeholder="Contoh: 2025/2026"
            value={formData.year}
            onChange={handleChange}
            maxLength={9}
            {...fieldProps('year')}
          />
          <FieldError id="project-year-error" message={errors.year} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="project-semester" className="mb-1.5 block text-xs font-bold text-slate-700">Semester</label>
          <select id="project-semester" name="semester" className={inputClass} value={formData.semester} onChange={handleChange}>
            {[1, 2, 3, 4, 5, 6].map((semester) => (
              <option key={semester} value={semester}>Semester {semester}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="project-supervisor" className="mb-1.5 block text-xs font-bold text-slate-700">Dosen Pembimbing</label>
          <input
            id="project-supervisor"
            type="text"
            name="supervisor"
            className={inputClass}
            placeholder="Nama Dosen Pembimbing"
            value={formData.supervisor}
            onChange={handleChange}
            maxLength={100}
          />
        </div>
      </div>

      <div>
        <label htmlFor="project-course" className="mb-1.5 block text-xs font-bold text-slate-700">Mata Kuliah TRK *</label>
        <select id="project-course" name="course" className={fieldClass('course')} value={formData.course} onChange={handleChange} {...fieldProps('course')}>
          {courses.length === 0 && <option value="">Belum ada mata kuliah tersedia</option>}
          {courses.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        <FieldError id="project-course-error" message={errors.course} />
      </div>

      <div>
        <label htmlFor="project-category" className="mb-1.5 block text-xs font-bold text-slate-700">Kategori Projek *</label>
        <select id="project-category" name="category" className={fieldClass('category')} value={formData.category} onChange={handleChange} {...fieldProps('category')}>
          {categories.length === 0 && <option value="">Belum ada kategori tersedia</option>}
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <FieldError id="project-category-error" message={errors.category} />
      </div>

      <div>
        <label htmlFor="project-video-url" className="mb-1.5 block text-xs font-bold text-slate-700">URL Video YouTube</label>
        <input
          id="project-video-url"
          type="url"
          name="videoUrl"
          className={fieldClass('videoUrl')}
          placeholder="https://www.youtube.com/watch?v=..."
          value={formData.videoUrl}
          onChange={handleChange}
          {...fieldProps('videoUrl')}
        />
        <FieldError id="project-video-url-error" message={errors.videoUrl} />
      </div>

      <div>
        <label htmlFor="project-tech-stack" className="mb-1.5 block text-xs font-bold text-slate-700">Teknologi / Stack</label>
        <input
          id="project-tech-stack"
          type="text"
          name="techStackStr"
          className={inputClass}
          placeholder="Pisahkan dengan koma, contoh: ESP32, C++, MQTT"
          value={formData.techStackStr}
          onChange={handleChange}
          maxLength={240}
        />
      </div>

      <div>
        <label htmlFor="project-description" className="mb-1.5 block text-xs font-bold text-slate-700">Deskripsi Singkat</label>
        <textarea
          id="project-description"
          name="description"
          rows="4"
          className={`${inputClass} resize-none`}
          placeholder="Jelaskan ringkasan tujuan, cara kerja, dan keunggulan projek..."
          value={formData.description}
          onChange={handleChange}
          maxLength={1200}
        />
      </div>

      {(courses.length === 0 || categories.length === 0) && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
          Form belum dapat dikirim karena mata kuliah atau kategori belum tersedia. Hubungi admin untuk melengkapinya.
        </p>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            className="min-h-11 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
            onClick={onCancel}
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting || courses.length === 0 || categories.length === 0}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
        >
          <Upload size={16} aria-hidden="true" />
          <span>{isSubmitting ? 'Menyimpan...' : submitLabel}</span>
        </button>
      </div>
    </form>
  );
}
