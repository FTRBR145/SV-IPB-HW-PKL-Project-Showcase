import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Image Illustration */}
          <div className="about-image-col">
            <div className="about-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Praktikum Mahasiswa TRK Sekolah Vokasi IPB"
                className="about-img"
              />
              <div className="about-image-badge">
                <span className="badge-number">8+</span>
                <span className="badge-text">Semester Mata Kuliah TRK</span>
              </div>
            </div>
          </div>

          {/* Text Description */}
          <div className="about-text-col">
            <div className="section-tag">TENTANG SHOWCASE TRK</div>
            <h2 className="section-title">
              Wadah Digital Apresiasi Karya Projek Mahasiswa TRK SV IPB
            </h2>
            <p className="about-paragraph">
              Karya praktikum dan projek akhir mahasiswa <strong>Teknologi Rekayasa Komputer (TRK)</strong> Sekolah Vokasi IPB University memiliki nilai edukasi tinggi serta potensi besar sebagai portofolio profesional di bidang Internet of Things, Sistem Kontrol, Mikrokontroler, dan Keamanan Jaringan.
            </p>
            <p className="about-paragraph">
              Website <strong>TRK Student Project Showcase</strong> hadir sebagai katalog digital terpusat untuk menyimpan, menampilkan, dan menyebarluaskan video hasil karya mahasiswa. Pengunjung dapat mengeksplorasi projek berdasarkan semester (Semester 1–8), mata kuliah praktikum, maupun dosen pembimbing.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">💡</div>
                <div>
                  <h4>Referensi Pembelajaran</h4>
                  <p>Memudahkan mahasiswa adik tingkat mencari acuan projek praktikum semester sebelumnya.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🤝</div>
                <div>
                  <h4>Portofolio Mitra Industri</h4>
                  <p>Memamerkan talenta dan karya nyata mahasiswa TRK ke publik & mitra industri kampus.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
