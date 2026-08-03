import React from 'react';
import { Upload, ArrowRight } from 'lucide-react';

export default function HeroSection({ onOpenUpload }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay-graphic"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Preview Project <br />
            <span className="blue-highlight">Video Semester</span>
          </h1>
          
          <p className="hero-subtitle">
            Jelajahi berbagai project mahasiswa dari setiap semester dan mata kuliah dalam satu platform yang dirancang untuk menampilkan hasil pembelajaran secara nyata. Temukan ide, inovasi, dan karya terbaik yang menjadi bukti kreativitas serta kemampuan mahasiswa Sekolah Vokasi IPB.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              Lihat Semua Project <ArrowRight size={18} />
            </a>
            <button className="btn btn-secondary" onClick={onOpenUpload}>
              Upload Project <Upload size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
