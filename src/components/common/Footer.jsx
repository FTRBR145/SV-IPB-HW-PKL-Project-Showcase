import React from 'react';
import useApp from '../../hooks/useApp';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, BookOpen } from 'lucide-react';
import { courseLabel } from '../../utils/courseLabel';

export default function Footer() {
  const { isLoggedIn, currentUser, courses = [] } = useApp();

  return (
    <footer className="site-footer border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Brand Info & Official Shield Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-start gap-3">
              <img
                src="/sv_ipb_logo.png"
                alt="Logo Resmi IPB University Sekolah Vokasi"
                width="48"
                height="48"
                className="w-10 h-auto object-contain flex-shrink-0"
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
          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-2">Navigasi</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              {isLoggedIn && currentUser?.role === 'student' && <li><Link to="/student" className="hover:text-white transition-colors">Portal Mahasiswa</Link></li>}
              {isLoggedIn && currentUser?.role === 'admin' && <li><Link to="/admin" className="hover:text-white transition-colors">Dashboard Admin</Link></li>}
              {isLoggedIn && currentUser?.role === 'student' && <li><Link to="/student/upload" className="hover:text-white transition-colors">Unggah Projek</Link></li>}
              {isLoggedIn && currentUser?.role === 'admin' && <li><Link to="/student" className="hover:text-white transition-colors">Pratinjau Portal Mahasiswa</Link></li>}
              <li><a href="/#projects" className="hover:text-white transition-colors">Jelajahi Projek</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">Tentang</a></li>
              <li><a href="/#matakuliah" className="hover:text-white transition-colors">Mata Kuliah</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-2">Mata Kuliah</h4>
            <ul className="space-y-2">
              {courses.map(course => <li key={course}>
                <a href={`/?course=${encodeURIComponent(course)}#projects`} className="hover:text-white transition-colors flex items-start gap-2">
                  <BookOpen size={14} aria-hidden="true" className="mt-0.5 text-sky-400 flex-shrink-0" />
                  <span>{courseLabel(course)}</span>
                </a>
              </li>)}
            </ul>
            {!courses.length && <p className="text-slate-400">Belum ada mata kuliah.</p>}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white mb-2">Alamat & Kontak</h4>
            <ul className="space-y-2">
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-semibold">Kampus Bogor</strong>
                  Jl. Kumbang No.14, Babakan, Kota Bogor, Jawa Barat 16128
                </span>
              </li>
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block font-semibold">Kampus Sukabumi</strong>
                  Jl. Sarasa No. 45, Babakan, Kota Sukabumi, Jawa Barat 43142
                </span>
              </li>
              <li className="flex gap-2.5 items-center pt-1">
                <Phone size={15} className="text-slate-400 flex-shrink-0" /> <a href="tel:+622518348007" className="hover:text-white">(0251) 8348007</a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail size={15} className="text-slate-400 flex-shrink-0" /> <a href="mailto:sv@apps.ipb.ac.id" className="hover:text-white">sv@apps.ipb.ac.id</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Sekolah Vokasi IPB University. Teknologi Rekayasa Komputer (TRK) Project Showcase.</p>
        </div>
      </div>
    </footer>
  );
}
