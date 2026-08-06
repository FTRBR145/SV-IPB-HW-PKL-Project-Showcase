import React, { useState, useEffect } from 'react';
import { ArrowRight, Upload, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection({ onOpenUpload }) {
  const slides = [
    {
      badge: "TEKNOLOGI REKAYASA KOMPUTER (TRK)",
      title: "TRK Student Project Showcase",
      subtitle: "Platform showcase video projek akhir & praktikum sistem tertanam, jaringan, dan IoT mahasiswa Teknologi Rekayasa Komputer Sekolah Vokasi IPB.",
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
    },
    {
      badge: "INTERNET OF THINGS & EMBEDDED SYSTEM",
      title: "Inovasi Perangkat Cerdas TRK",
      subtitle: "Eksplorasi hasil rancang bangun mikrokontroler, otomasi industri, dan sensor telemetri karya inovatif mahasiswa prodi TRK SV IPB.",
      bgImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=80"
    },
    {
      badge: "JARINGAN & CLOUD COMPUTING",
      title: "Arsitektur Siber Terintegrasi",
      subtitle: "Dokumentasi simulasi jaringan server, keamanan siber, dan infrastruktur cloud computing berstandar industri Sekolah Vokasi IPB.",
      bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="hero-section">
      {/* Dynamic Slide Background */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`hero-slide-bg ${idx === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        />
      ))}

      {/* Hero Overlay Gradient */}
      <div className="hero-overlay" />

      {/* Hero Main Content */}
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <span className="badge-dot"></span>
            {slides[currentSlide].badge}
          </div>

          <h1 className="hero-title animate-slide-up">
            {slides[currentSlide].title}
          </h1>

          <p className="hero-subtitle animate-slide-up-delay">
            {slides[currentSlide].subtitle}
          </p>

          <div className="hero-actions animate-fade-in-delay">
            <a href="#projects" className="btn btn-primary btn-lg">
              Lihat Semua Project <ArrowRight size={18} />
            </a>
            <button className="btn btn-outline-hero btn-lg" onClick={onOpenUpload}>
              Upload Project <Upload size={18} />
            </button>
          </div>
        </div>

        {/* Slideshow Navigation Controls */}
        <div className="hero-slider-controls">
          <button className="slider-arrow-btn" onClick={handlePrev} aria-label="Slide Sebelumnya">
            <ChevronLeft size={20} />
          </button>

          <div className="slider-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`slider-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button className="slider-arrow-btn" onClick={handleNext} aria-label="Slide Selanjutnya">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
