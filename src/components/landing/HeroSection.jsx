import React, { useState, useEffect } from 'react';
import { Upload, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection({ onOpenUpload }) {
  const slides = [
    {
      id: 1,
      tag: "TEKNOLOGI REKAYASA KOMPUTER (TRK)",
      title: "TRK Student Project",
      highlight: "Showcase",
      subtitle: "Platform showcase video projek akhir dan praktikum sistem tertanam mahasiswa Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University. Menampilkan inovasi IoT, mikrokontroler, jaringan komputer, dan cloud.",
      image: "/sv_ipb_hero.png"
    },
    {
      id: 2,
      tag: "INTERNET OF THINGS & EMBEDDED SYSTEM",
      title: "Karya Inovatif TRK",
      highlight: "Siap Kerja",
      subtitle: "Memamerkan karya sistem hardware & software berstandar industri mulai dari transmisi sensor ESP32, arsitektur jaringan MikroTik, sistem kontrol Arduino, hingga cloud monitoring telemetri.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 3,
      tag: "PORTFOLIO DIGITAL MAHASISWA TRK",
      title: "Showcase Video",
      highlight: "Projek Akhir",
      subtitle: "Dokumentasi dan video demo produk sistem perangkat keras dan jaringan komputer hasil tugas akhir serta praktikum mahasiswa Program Studi Teknologi Rekayasa Komputer SV IPB.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=80"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-slide-bg ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 34, 68, 0.88) 0%, rgba(0, 51, 102, 0.78) 100%), url('${slide.image}')` }}
        />
      ))}

      <div className="hero-overlay-graphic"></div>

      <div className="container">
        <div className="hero-content">
          <span className="hero-tag-badge animate-slide-down">
            {slides[currentSlide].tag}
          </span>

          <h1 className="hero-title animate-fade-in">
            {slides[currentSlide].title} <br />
            <span className="blue-highlight">{slides[currentSlide].highlight}</span>
          </h1>
          
          <p className="hero-subtitle animate-fade-in">
            {slides[currentSlide].subtitle}
          </p>

          <div className="hero-buttons animate-slide-up">
            <a href="#projects" className="btn btn-primary">
              Lihat Semua Project <ArrowRight size={18} />
            </a>
            <button className="btn btn-secondary" onClick={onOpenUpload}>
              Upload Project <Upload size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Slideshow Controls */}
      <div className="hero-slideshow-controls">
        <button className="hero-nav-arrow" onClick={handlePrev} aria-label="Slide Sebelumnya">
          <ChevronLeft size={22} />
        </button>

        <div className="hero-slide-dots">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`slide-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <button className="hero-nav-arrow" onClick={handleNext} aria-label="Slide Selanjutnya">
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
