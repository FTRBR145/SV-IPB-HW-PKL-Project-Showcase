import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info & Official Shield Logo */}
          <div className="footer-brand">
            <div className="footer-logo-wrapper">
              <img 
                src="/sv_ipb_logo.png" 
                alt="Logo Resmi IPB University Sekolah Vokasi" 
                className="footer-logo-img"
              />
              <div>
                <h3>TRK Sekolah Vokasi IPB</h3>
                <p>
                  Platform showcase video projek akhir dan karya praktikum semester mahasiswa Teknik Komputer / Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Navigasi</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Tentang Showcase</a></li>
              <li><a href="#projects">Project Terbaru</a></li>
              <li><a href="#projects">Kategori TRK</a></li>
            </ul>
          </div>

          {/* Fokus Keahlian TRK */}
          <div>
            <h4 className="footer-title">Fokus Keahlian TRK</h4>
            <ul className="footer-links">
              <li><a href="#projects">Internet of Things & Sensor ESP32</a></li>
              <li><a href="#projects">Mikrokontroler & Sistem Kontrol</a></li>
              <li><a href="#projects">Jaringan Komputer & Keamanan Siber</a></li>
              <li><a href="#projects">Embedded System & Robotika</a></li>
              <li><a href="#projects">Cloud Computing & Server Monitoring</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-title">Alamat & Kontak</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '3px', color: 'var(--sv-official-sky)' }} />
                <span>
                  <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.85rem' }}>KAMPUS BOGOR</strong>
                  Jl. Kumbang No.14, Kel. Babakan, Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16128
                </span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '3px', color: 'var(--sv-official-sky)' }} />
                <span>
                  <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.85rem' }}>KAMPUS SUKABUMI</strong>
                  Jl. Sarasa No. 45, Babakan, Kec. Cibeureum, Kota Sukabumi, Jawa Barat 43142
                </span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                <Phone size={16} style={{ color: 'var(--sv-official-sky)' }} /> <span>(0251) 8348007</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--sv-official-sky)' }} /> <span>sv@apps.ipb.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Sekolah Vokasi IPB University. Developed for PKL Project Video Semester Showcase.</p>
        </div>
      </div>
    </footer>
  );
}
