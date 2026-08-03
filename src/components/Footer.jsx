import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <h3>Sekolah Vokasi IPB</h3>
            <p>
              Platform showcase video projek akhir dan karya praktikum semester mahasiswa Sekolah Vokasi IPB University. Menampilkan hasil pembelajaran nyata yang inovatif dan siap kerja.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Navigasi</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Tentang Showcase</a></li>
              <li><a href="#projects">Project Terbaru</a></li>
              <li><a href="#projects">Top Rated Videos</a></li>
            </ul>
          </div>

          {/* Program Studi */}
          <div>
            <h4 className="footer-title">Program Studi</h4>
            <ul className="footer-links">
              <li><a href="#projects">Teknologi Rekayasa Perangkat Lunak</a></li>
              <li><a href="#projects">Komunikasi Digital & Media</a></li>
              <li><a href="#projects">Manajemen Informatika</a></li>
              <li><a href="#projects">Teknik Komputer</a></li>
              <li><a href="#projects">Manajemen Agribisnis</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-title">Kontak SV IPB</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Jl. Kumbang No.14, Cilibende, Kota Bogor, Jawa Barat 16128</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={16} /> <span>(0251) 8329101</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={16} /> <span>sv@apps.ipb.ac.id</span>
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
