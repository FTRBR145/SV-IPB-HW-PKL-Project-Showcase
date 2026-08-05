import React, { useState, useEffect } from 'react';
import { Upload, ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';

export default function HeroSection({ onOpenUpload }) {
  const slides = [
    {
      id: 1,
      tag: "TEKNOLOGI REKAYASA PERANGKAT LUNAK (TRPL)",
      title: "TRPL Student Project",
      highlight: "Showcase",
      subtitle: "Platform showcase video projek akhir dan praktikum koding mahasiswa Teknologi Rekayasa Perangkat Lunak (TRPL) Sekolah Vokasi IPB University. Menampilkan inovasi aplikasi web, mobile, sistem terdistribusi, AI, dan gim.",
      image: "/sv_ipb_hero.png"
    },
    {
      id: 2,
      tag: "REKAYASA SOFTWARE & INOVASI SISTEM",
      title: "Karya Inovatif TRPL",
      highlight: "Siap Kerja",
      subtitle: "Memamerkan karya perangkat lunak berstandar industri mulai dari arsitektur cloud, sistem informasi enterprise, aplikasi mobile Flutter, hingga model Machine Learning karya mahasiswa TRPL SV IPB.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 3,
      tag: "PORTFOLIO DIGITIAL MAHASISWA TRPL",
      title: "Showcase Video",
      highlight: "Projek Akhir",
      subtitle: "Dokumentasi dan video demo produk perangkat lunak hasil tugas akhir serta praktikum mahasiswa Program Studi Teknologi Rekayasa Perangkat Lunak SV IPB.",
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

          <h1 className="hero-title animate-fade-in key={currentSlide}">
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
