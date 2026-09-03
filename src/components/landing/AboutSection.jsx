import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function AboutSection() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section id="about" className="py-16 bg-white border-b border-gray-100">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2
              className={`font-heading text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 leading-tight title-underline-reveal scroll-reveal ${isVisible ? 'is-visible' : ''}`}
            >
              TRK Student Project Showcase
            </h2>
            {/* fade-left: slides in from the left alongside the heading */}
            <p
              className={`text-gray-600 text-sm sm:text-base leading-relaxed scroll-reveal scroll-reveal--left reveal-delay-2 ${isVisible ? 'is-visible' : ''}`}
            >
              Ruang digital bagi mahasiswa Teknik Komputer / Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University untuk memamerkan sistem IoT, mikrokontroler, jaringan komputer, dan sistem tertanam terbaik. Tempat mengeksplorasi karya praktikum dan projek akhir mahasiswa TRK secara interaktif.
            </p>
          </div>
          {/* fade-right: slides in from the right — creates a natural split-open feel */}
          <div
            className={`relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 group scroll-reveal scroll-reveal--right reveal-delay-1 ${isVisible ? 'is-visible' : ''}`}
          >
            <picture>
              <source media="(max-width: 767px)" srcSet="/trk_photos/optimized/DSC09046-640.webp" type="image/webp" />
              <source srcSet="/trk_photos/optimized/DSC09046-1600.webp" type="image/webp" />
              <img
                src="/trk_photos/optimized/DSC09046-1600.webp"
                alt="Mahasiswa TRK Sekolah Vokasi IPB University"
                loading="lazy"
                decoding="async"
                width="1600"
                height="1067"
                className="w-full h-64 sm:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </picture>
            <div className="absolute inset-0 bg-gray-950/35" />
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
