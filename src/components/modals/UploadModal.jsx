import React, { useState } from 'react';
import { X, Upload, CheckCircle2 } from 'lucide-react';
import { SV_COURSES, getYouTubeThumbnail } from '../../data/projectsData';

export default function UploadModal({ isOpen, onClose, onAddProject }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    title: '',
    student: '',
    nim: '',
    semester: 3,
    course: SV_COURSES[1] || 'RANGKAIAN LOGIKA DAN TEKNIK DIGITAL',
    date: todayStr,
    year: '2025/2026',
    supervisor: '',
    videoUrl: '',
    thumbnail: '',
    techStackStr: 'C++, ESP32, MQTT, Node.js',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatIndoDate = (dateStr) => {
    if (!dateStr) return '19 Agustus 2026';
    try {
      const [y, m, d] = dateStr.split('-');
      if (!y || !m || !d) return dateStr;
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      const monthName = months[parseInt(m, 10) - 1] || m;
      return `${parseInt(d, 10)} ${monthName} ${y}`;
    } catch (e) {
      return dateStr;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.student || !formData.nim) {
      alert('Harap lengkapi Judul, Nama Mahasiswa, dan NIM!');
      return;
    }

    const techArray = formData.techStackStr.split(',').map((s) => s.trim()).filter(Boolean);

    let finalVideoUrl = formData.videoUrl.trim();
    if (finalVideoUrl.includes('watch?v=')) {
      finalVideoUrl = finalVideoUrl.replace('watch?v=', 'embed/');
    } else if (finalVideoUrl.includes('youtu.be/')) {
      finalVideoUrl = finalVideoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    if (!finalVideoUrl) {
      finalVideoUrl = 'https://www.youtube.com/embed/9KxU30uM3qM';
    }

    const formattedDate = formatIndoDate(formData.date);

    const newProject = {
      id: Date.now(),
      title: formData.title,
      student: formData.student,
      nim: formData.nim,
      course: formData.course,
      semester: parseInt(formData.semester),
      techStack: techArray.length > 0 ? techArray : ['TRK', 'Embedded System'],
      thumbnail: formData.thumbnail || getYouTubeThumbnail(finalVideoUrl) || 'https://img.youtube.com/vi/9KxU30uM3qM/hqdefault.jpg',
      videoUrl: finalVideoUrl,
      likes: 1,
      views: 12,
      supervisor: formData.supervisor || 'Dosen Pembimbing TRK SV IPB',
      year: formData.year || '2025/2026',
      date: formattedDate,
      description: formData.description || 'Projek alat/sistem hasil praktikum mahasiswa Teknik Komputer (TRK) Sekolah Vokasi IPB.',
      comments: []
    };

    onAddProject(newProject);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
          onClick={onClose}
        >
          <X size={16} />
        </button>

        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 size={52} className="text-sky-500 mx-auto mb-3" />
              <h3 className="font-heading text-xl font-bold text-gray-800 mb-1.5">
                Projek TRK Berhasil Diunggah!
              </h3>
              <p className="text-gray-500 text-xs">
                Karya video semester kamu sudah masuk ke showcase TRK Sekolah Vokasi IPB.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 pr-6">
                <h2 className="font-heading text-lg sm:text-xl font-extrabold text-gray-800">
                  Upload Video Project Semester TRK
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">
                  Isi formulir untuk menambahkan karya video projek mahasiswa TRK SV IPB.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Judul Project Video *</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder="Contoh: Sistem Monitoring Kebun Cerdas IoT ESP32"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Nama Mahasiswa *</label>
                    <input
                      type="text"
                      name="student"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                      placeholder="Contoh: Ahmad Rizky"
                      value={formData.student}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">NIM Mahasiswa *</label>
                    <input
                      type="text"
                      name="nim"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                      placeholder="Contoh: J0304211088"
                      value={formData.nim}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Tanggal Pelaksanaan / Upload *</label>
                    <input
                      type="date"
                      name="date"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Tahun Ajaran / Angkatan</label>
                    <input
                      type="text"
                      name="year"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                      placeholder="Contoh: 2025/2026"
                      value={formData.year}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Semester</label>
                    <select
                      name="semester"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                      value={formData.semester}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Dosen Pembimbing</label>
                    <input
                      type="text"
                      name="supervisor"
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                      placeholder="Nama Dosen beserta Gelar"
                      value={formData.supervisor}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Mata Kuliah TRK</label>
                  <select
                    name="course"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    {SV_COURSES.filter((c) => c !== 'Semua Mata Kuliah').map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">URL Video YouTube</label>
                  <input
                    type="url"
                    name="videoUrl"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.videoUrl}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Teknologi / Stack (pisahkan koma)</label>
                  <input
                    type="text"
                    name="techStackStr"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder="C++, ESP32, MQTT, Node.js"
                    value={formData.techStackStr}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Deskripsi Project</label>
                  <textarea
                    name="description"
                    rows="2.5"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder="Jelaskan ringkasan latar belakang, tujuan, dan keunggulan karya..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2.5 pt-3">
                  <button type="button" className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-100 transition-colors" onClick={onClose}>
                    Batal
                  </button>
                  <button type="submit" className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs shadow-md transition-all">
                    <Upload size={15} /> Unggah Sekarang
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
