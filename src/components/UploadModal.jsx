import React, { useState } from 'react';
import { X, Upload, CheckCircle2 } from 'lucide-react';
import { SV_PRODIS, SV_COURSES, getYouTubeThumbnail } from '../data/projectsData';

export default function UploadModal({ isOpen, onClose, onAddProject }) {
  const [formData, setFormData] = useState({
    title: '',
    student: '',
    nim: '',
    prodiCode: 'TRK',
    semester: 3,
    course: SV_COURSES[1] || 'INTERNET OF THINGS & EMBEDDED SYSTEM',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.student || !formData.nim) {
      alert('Harap lengkapi Judul, Nama Mahasiswa, dan NIM!');
      return;
    }

    const selectedProdiObj = SV_PRODIS.find((p) => p.code === formData.prodiCode);
    const techArray = formData.techStackStr.split(',').map((s) => s.trim()).filter(Boolean);

    // Convert YouTube URL to Embed format if needed
    let finalVideoUrl = formData.videoUrl.trim();
    if (finalVideoUrl.includes('watch?v=')) {
      finalVideoUrl = finalVideoUrl.replace('watch?v=', 'embed/');
    } else if (finalVideoUrl.includes('youtu.be/')) {
      finalVideoUrl = finalVideoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    if (!finalVideoUrl) {
      finalVideoUrl = 'https://www.youtube.com/embed/9KxU30uM3qM';
    }

    const newProject = {
      id: Date.now(),
      title: formData.title,
      student: formData.student,
      nim: formData.nim,
      prodi: selectedProdiObj ? selectedProdiObj.name : 'Teknik Komputer / TRK',
      prodiCode: formData.prodiCode,
      course: formData.course,
      semester: parseInt(formData.semester),
      techStack: techArray.length > 0 ? techArray : ['TRK', 'Embedded System'],
      thumbnail: formData.thumbnail || getYouTubeThumbnail(finalVideoUrl) || 'https://img.youtube.com/vi/9KxU30uM3qM/hqdefault.jpg',
      videoUrl: finalVideoUrl,
      likes: 1,
      views: 12,
      supervisor: formData.supervisor || 'Dosen Pembimbing TRK SV IPB',
      year: '2025/2026',
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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle2 size={64} color="var(--accent-blue)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ipb-navy)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                Projek TRK Berhasil Diunggah!
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Karya video semester kamu sudah masuk ke showcase TRK Sekolah Vokasi IPB.
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--ipb-navy)' }}>
                  Upload Video Project Semester TRK
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Isi formulir untuk menambahkan karya video projek mahasiswa TRK SV IPB.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Judul Project Video *</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Contoh: Sistem Monitoring Kebun Cerdas IoT ESP32"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nama Mahasiswa *</label>
                    <input
                      type="text"
                      name="student"
                      className="form-control"
                      placeholder="Contoh: Ahmad Rizky"
                      value={formData.student}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>NIM Mahasiswa *</label>
                    <input
                      type="text"
                      name="nim"
                      className="form-control"
                      placeholder="Contoh: J0304211088"
                      value={formData.nim}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Program Studi (Prodi)</label>
                    <select
                      name="prodiCode"
                      className="form-control"
                      value={formData.prodiCode}
                      onChange={handleChange}
                    >
                      {SV_PRODIS.filter((p) => p.code !== 'ALL').map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.name} ({p.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Semester</label>
                    <select
                      name="semester"
                      className="form-control"
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
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Mata Kuliah TRK</label>
                    <select
                      name="course"
                      className="form-control"
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

                  <div className="form-group">
                    <label>Dosen Pembimbing</label>
                    <input
                      type="text"
                      name="supervisor"
                      className="form-control"
                      placeholder="Nama Dosen beserta Gelar"
                      value={formData.supervisor}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>URL Video YouTube (Embed atau Share Link)</label>
                  <input
                    type="url"
                    name="videoUrl"
                    className="form-control"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formData.videoUrl}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Teknologi / Stack (pisahkan koma)</label>
                  <input
                    type="text"
                    name="techStackStr"
                    className="form-control"
                    placeholder="C++, ESP32, MQTT, Node.js"
                    value={formData.techStackStr}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Deskripsi Project</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    placeholder="Jelaskan ringkasan latar belakang, tujuan, dan keunggulan karya..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <Upload size={18} /> Unggah Sekarang
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
