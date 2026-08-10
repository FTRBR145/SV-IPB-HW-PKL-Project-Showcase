import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ipb-navy)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              TRK Student Project Showcase
            </h3>
            <p>
              Ruang digital bagi mahasiswa Teknik Komputer / Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University untuk memamerkan sistem IoT, mikrokontroler, jaringan komputer, dan sistem tertanam terbaik. Tempat mengeksplorasi karya praktikum dan projek akhir mahasiswa TRK secara interaktif.
            </p>
          </div>
          <div className="about-image-wrapper">
            <img 
              src="/trk_photos/DSC09046.JPG" 
              alt="Mahasiswa TRK Sekolah Vokasi IPB University" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
