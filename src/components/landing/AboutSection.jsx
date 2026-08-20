import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Tentang Program Studi</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 leading-tight">
              TRK Student Project Showcase
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Ruang digital bagi mahasiswa Teknik Komputer / Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University untuk memamerkan sistem IoT, mikrokontroler, jaringan komputer, dan sistem tertanam terbaik. Tempat mengeksplorasi karya praktikum dan projek akhir mahasiswa TRK secara interaktif.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
            <img 
              src="/trk_photos/DSC09046.JPG" 
              alt="Mahasiswa TRK Sekolah Vokasi IPB University" 
              className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                Praktikum & Projek Akhir TRK
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
