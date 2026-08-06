import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Address */}
          <div className="footer-col brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #003366, #2563eb)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>
                TRK
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                TRK Sekolah Vokasi IPB
              </h3>
            </div>
            <p className="footer-desc" style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Platform Digital Showcase & Pengelolaan Projek Praktikum Mata Kuliah Program Studi Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University.
            </p>
          </div>

          {/* Kampus IPB Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Kampus SV IPB</h4>
            <ul className="footer-links" style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, listStyle: 'none', padding: 0 }}>
              <li><strong>Kampus Bogor:</strong> Jl. Kumbang No.14, Babakan, Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16128</li>
              <li style={{ marginTop: '0.5rem' }}><strong>Kampus Sukabumi:</strong> Jl. Sarasa No.45, Babakan, Kec. Cibeureum, Kota Sukabumi, Jawa Barat 43142</li>
              <li style={{ marginTop: '0.5rem' }}><strong>Telepon:</strong> (0251) 8348007</li>
              <li><strong>Email:</strong> sv@apps.ipb.ac.id</li>
            </ul>
          </div>

          {/* Fast Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Bidang Keahlian TRK</h4>
            <ul className="footer-links" style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, listStyle: 'none', padding: 0 }}>
              <li>Internet of Things & Embedded System</li>
              <li>Sistem Kontrol & Mikrokontroler</li>
              <li>Jaringan Komputer & Keamanan Siber</li>
              <li>Pemrograman Perangkat Terhubung</li>
              <li>Aplikasi Web & Cloud Computing</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2.5rem', paddingTop: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
          <p>© {new Date().getFullYear()} TRK Student Project Showcase - Sekolah Vokasi IPB University. Tim PKL TRK (Fatir Syaiful Bahri & Fadillah Nurwahid Mursid).</p>
        </div>
      </div>
    </footer>
  );
}
