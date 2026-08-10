import React from 'react';

export default function StatsBar() {
  const stats = [
    { label: "PROJECT MAHASISWA", value: "250+" },
    { label: "MATA KULIAH", value: "18" },
    { label: "MAHASISWA", value: "450+" },
    { label: "DOSEN", value: "85+" }
  ];

  return (
    <section className="prestasi-stats-section">
      <div className="container">
        <div className="prestasi-card">
          <div className="prestasi-top-grid">
            <div className="prestasi-title-col">
              <h2 className="prestasi-heading">
                PRESTASI MAHASISWA DALAM SATU PLATFORM
              </h2>
            </div>

            <div className="prestasi-desc-col">
              <p className="prestasi-subtitle">
                Jelajahi ratusan karya mahasiswa dari berbagai mata kuliah, semester, dan program studi dalam satu platform yang modern dan mudah diakses. Dukung dan temukan inovasi terbaru dari talenta muda universitas.
              </p>
              <a href="#projects" className="btn-jelajahi">
                Jelajahi Project
              </a>
            </div>
          </div>

          <div className="prestasi-stats-row">
            {stats.map((stat, idx) => (
              <div key={idx} className="prestasi-stat-item">
                <div className="prestasi-stat-label">{stat.label}</div>
                <div className="prestasi-stat-value">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
