import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-14 border-t border-gray-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info & Official Shield Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-start gap-3 mb-4">
              <img 
                src="/sv_ipb_logo.png" 
                alt="Logo Resmi IPB University Sekolah Vokasi" 
                className="w-12 h-auto object-contain flex-shrink-0"
              />
              <div>
                <h3 className="font-heading text-base font-bold text-white mb-1">TRK Sekolah Vokasi IPB</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Platform showcase video projek akhir dan karya praktikum semester mahasiswa Teknik Komputer / Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-4 uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2.5">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Tentang Showcase</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Project Terbaru</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Kategori TRK</a></li>
            </ul>
          </div>

          {/* Fokus Keahlian TRK */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-4 uppercase tracking-wider">Fokus Keahlian TRK</h4>
            <ul className="space-y-2.5">
              <li><a href="#projects" className="hover:text-white transition-colors">Internet of Things & Sensor ESP32</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Mikrokontroler & Sistem Kontrol</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Jaringan Komputer & Keamanan Siber</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Embedded System & Robotika</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Cloud Computing & Server Monitoring</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-4 uppercase tracking-wider">Alamat & Kontak</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-semibold">KAMPUS BOGOR</strong>
                  Jl. Kumbang No.14, Kel. Babakan, Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16128
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-semibold">KAMPUS SUKABUMI</strong>
                  Jl. Sarasa No. 45, Babakan, Kec. Cibeureum, Kota Sukabumi, Jawa Barat 43142
                </span>
              </li>
              <li className="flex gap-2.5 items-center pt-1">
                <Phone size={16} className="text-gray-400 flex-shrink-0" /> <span>(0251) 8348007</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail size={16} className="text-gray-400 flex-shrink-0" /> <span>sv@apps.ipb.ac.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-[11px]">
          <p>© 2026 Sekolah Vokasi IPB University. Developed for PKL Project Video Semester Showcase.</p>
        </div>
      </div>
    </footer>
  );
}
