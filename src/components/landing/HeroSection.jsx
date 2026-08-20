import React, { useState, useEffect } from 'react';
import { Upload, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection({ onOpenUpload }) {
  const images = [
    "/trk_photos/DSC09044.JPG",
    "/trk_photos/DSC09040.JPG",
    "/trk_photos/DSC09997.JPG",
    "/trk_photos/DSC09046.JPG",
    "/sv_ipb_hero.png"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <section id="home" className="relative min-h-[480px] md:min-h-[540px] flex items-center py-16 md:py-20 text-white overflow-hidden bg-gray-950">
      {/* Background Track - Only Background Photos Slide */}
      <div
        className="absolute inset-0 flex w-full h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className="w-full h-full flex-shrink-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.85) 0%, rgba(31, 41, 55, 0.72) 100%), url('${imgUrl}')`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-gray-950/30 pointer-events-none" />

      {/* Fixed/Static Hero Text Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-200 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            TEKNOLOGI REKAYASA KOMPUTER (TRK)
          </span>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            TRK Student Project <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Showcase</span>
          </h1>
          
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
            Platform showcase video projek akhir dan praktikum sistem tertanam mahasiswa Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University. Menampilkan inovasi IoT, mikrokontroler, jaringan komputer, dan cloud.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-white text-gray-900 font-bold text-sm shadow-lg shadow-black/20 transition-all transform hover:-translate-y-0.5">
              Lihat Semua Project <ArrowRight size={18} />
            </a>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm shadow-md transition-all transform hover:-translate-y-0.5" onClick={onOpenUpload}>
              Upload Project <Upload size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Slideshow Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-gray-900/70 backdrop-blur-md border border-gray-700/50 p-1.5 rounded-2xl">
        <button className="p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors" onClick={handlePrev} aria-label="Slide Sebelumnya">
          <ChevronLeft size={20} />
        </button>

        <button className="p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors" onClick={handleNext} aria-label="Slide Selanjutnya">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
