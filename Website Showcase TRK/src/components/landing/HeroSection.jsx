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
    <section id="home" className="hero-section">
      {/* Background Track - Only Background Photos Slide */}
      <div
        className="hero-bg-slider-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className="hero-bg-slide-item"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, rgba(30, 41, 59, 0.65) 100%), url('${imgUrl}')`
            }}
          />
        ))}
      </div>

      <div className="hero-overlay-graphic"></div>

      {/* Fixed/Static Hero Text Content */}
      <div className="container hero-static-container">
        <div className="hero-content">
          <span className="hero-tag-badge">
            TEKNOLOGI REKAYASA KOMPUTER (TRK)
          </span>

          <h1 className="hero-title">
            TRK Student Project <br />
            <span className="blue-highlight">Showcase</span>
          </h1>
          
          <p className="hero-subtitle">
            Platform showcase video projek akhir dan praktikum sistem tertanam mahasiswa Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University. Menampilkan inovasi IoT, mikrokontroler, jaringan komputer, dan cloud.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-hero-primary">
              Lihat Semua Project <ArrowRight size={18} />
            </a>
            <button className="btn btn-hero-secondary" onClick={onOpenUpload}>
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
          {images.map((_, idx) => (
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
