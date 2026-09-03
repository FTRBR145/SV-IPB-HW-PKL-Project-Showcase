import React from 'react';
import { MapPin, Phone, Mail, Cpu, Smartphone, Wifi, Wrench, Binary } from 'lucide-react';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function Footer() {
  const [footerRef, isVisible] = useScrollReveal({ rootMargin: '0px 0px -40px 0px' });

  return (
    <footer ref={footerRef} className="site-footer border-t border-slate-900 bg-slate-950 py-14 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
          {/* Brand Info & Official Shield Logo */}
          <div className={`lg:col-span-1 scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
            <div className="flex items-start gap-3 mb-4">
              <img
                src="/sv_ipb_logo.png"
                alt="Logo Resmi IPB University Sekolah Vokasi"
                className="w-12 h-auto object-contain flex-shrink-0"
              />
              <div>
                <h3 className="font-heading text-base font-bold text-white mb-1">TRK Sekolah Vokasi IPB</h3>
                <p className="text-xs leading-relaxed text-slate-300">
                  Platform showcase video projek akhir dan karya praktikum semester mahasiswa Teknik Komputer / Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`scroll-reveal reveal-delay-1 ${isVisible ? 'is-visible' : ''}`}>
            <h4 className="font-heading text-sm font-bold text-white mb-4 uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5">
              <li><a href="/" className="hover:text-white transition-colors">Home Landing</a></li>
              <li><a href="/student" className="hover:text-white transition-colors">Beranda Mahasiswa</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors">Panel Admin / Dosen</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">Tentang Showcase</a></li>
              <li><a href="/#matakuliah" className="hover:text-white transition-colors">Katalog Mata Kuliah</a></li>
            </ul>
          </div>

          {/* Fokus Keahlian TRK SV IPB (5 Mata Kuliah Utama) */}
          <div className={`scroll-reveal reveal-delay-2 ${isVisible ? 'is-visible' : ''}`}>
            <h4 className="font-heading text-sm font-bold text-white mb-4 uppercase tracking-wider">Fokus Keahlian TRK</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/#matakuliah" className="hover:text-sky-400 transition-colors flex items-center gap-2">
                  <Cpu size={14} className="text-sky-400 flex-shrink-0" />
                  <span>Sistem Tertanam (Embedded System)</span>
                </a>
              </li>
              <li>
                <a href="/#matakuliah" className="hover:text-sky-400 transition-colors flex items-center gap-2">
                  <Smartphone size={14} className="text-sky-400 flex-shrink-0" />
                  <span>Aplikasi Mobile</span>
                </a>
              </li>
              <li>
                <a href="/#matakuliah" className="hover:text-sky-400 transition-colors flex items-center gap-2">
                  <Wifi size={14} className="text-sky-400 flex-shrink-0" />
                  <span>Proyek Sistem IoT (Internet of Things)</span>
                </a>
              </li>
              <li>
                <a href="/#matakuliah" className="hover:text-sky-400 transition-colors flex items-center gap-2">
                  <Wrench size={14} className="text-sky-400 flex-shrink-0" />
                  <span>Teknologi Bengkel Elektromekanik</span>
                </a>
              </li>
              <li>
                <a href="/#matakuliah" className="hover:text-sky-400 transition-colors flex items-center gap-2">
                  <Binary size={14} className="text-sky-400 flex-shrink-0" />
                  <span>Rangkaian Logika & Teknik Digital</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={`scroll-reveal reveal-delay-3 ${isVisible ? 'is-visible' : ''}`}>
            <h4 className="font-heading text-sm font-bold text-white mb-4 uppercase tracking-wider">Alamat & Kontak</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-semibold">KAMPUS BOGOR</strong>
                  Jl. Kumbang No.14, Babakan, Kota Bogor, Jawa Barat 16128
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-semibold">KAMPUS SUKABUMI</strong>
                  Jl. Sarasa No. 45, Babakan, Kota Sukabumi, Jawa Barat 43142
                </span>
              </li>
              <li className="flex gap-2.5 items-center pt-1">
                <Phone size={15} className="text-slate-400 flex-shrink-0" /> <span>(0251) 8348007</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail size={15} className="text-slate-400 flex-shrink-0" /> <span>sv@apps.ipb.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-slate-800 pt-8 text-center text-xs text-slate-400 scroll-reveal reveal-delay-4 ${isVisible ? 'is-visible' : ''}`}>
          <p>© 2026 Sekolah Vokasi IPB University. Teknologi Rekayasa Komputer (TRK) Project Showcase.</p>
        </div>
      </div>
    </footer>
  );
}
