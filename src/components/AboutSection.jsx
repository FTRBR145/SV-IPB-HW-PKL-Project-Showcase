import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ipb-navy)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              TRPL Student Project Showcase
            </h3>
            <p>
              Ruang digital bagi mahasiswa Teknologi Rekayasa Perangkat Lunak (TRPL) Sekolah Vokasi IPB University untuk memamerkan produk software, aplikasi web/mobile, sistem AI, dan gim terbaik. Tempat mengeksplorasi karya praktikum dan projek akhir mahasiswa TRPL secara interaktif.
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
