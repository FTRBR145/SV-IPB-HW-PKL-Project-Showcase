import React from 'react';

export default function StatsBar() {
  const stats = [
    { label: "PROJECT MAHASISWA", value: "250+" },
    { label: "MATA KULIAH", value: "18" },
    { label: "MAHASISWA", value: "450+" },
    { label: "DOSEN", value: "85+" }
  ];

  return (
    <section className="py-14 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-300">
          <div className="grid lg:grid-cols-12 gap-8 items-center pb-8 border-b border-gray-200">
            <div className="lg:col-span-5">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight uppercase leading-snug text-gray-900">
                PRESTASI MAHASISWA DALAM SATU PLATFORM
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p className="text-gray-600 text-sm leading-relaxed max-w-xl">
                Jelajahi ratusan karya mahasiswa dari berbagai mata kuliah, semester, dan program studi dalam satu platform yang modern dan mudah diakses. Dukung dan temukan inovasi terbaru dari talenta muda universitas.
              </p>
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm shadow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap self-start sm:self-center"
              >
                Jelajahi Project
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col p-4 rounded-2xl bg-white/60 border border-gray-200/80">
                <span className="text-xs font-bold text-gray-500 tracking-wider mb-2">{stat.label}</span>
                <span className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
