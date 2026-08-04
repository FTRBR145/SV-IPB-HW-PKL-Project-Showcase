import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <p>
              Ruang bagi mahasiswa untuk memamerkan karya terbaik, membangun koneksi dengan sesama mahasiswa, dan menarik perhatian dosen serta perusahaan teknologi terkemuka. Satu tempat untuk menyimpan, menampilkan, dan mengapresiasi karya video project mahasiswa.
            </p>
          </div>
          <div className="about-image-wrapper">
            <img 
              src="/sv_ipb_hero.png" 
              alt="Gedung Sekolah Vokasi IPB University" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
