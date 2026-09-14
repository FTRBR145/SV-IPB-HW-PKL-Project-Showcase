import React from 'react';
import { useReducedMotion } from 'motion/react';
import { NumberTicker } from '../ui/number-ticker';
import useApp from '../../hooks/useApp';
import { ArrowRight } from 'lucide-react';

export default function StatsBar() {
  const reducedMotion = useReducedMotion();
  const { projects, moderators } = useApp();

  const totalProjects = projects.length;
  const totalStudents = new Set(projects.map((p) => p.student).filter(Boolean)).size;
  const totalCourses = new Set(projects.map((p) => p.course).filter(Boolean)).size;

  const uniqueLecturers = new Set();
  projects.forEach((p) => {
    const supervisor = p.supervisor?.trim();
    if (supervisor) uniqueLecturers.add(supervisor);
  });
  if (Array.isArray(moderators)) {
    moderators.forEach((m) => {
      const name = m.name?.trim();
      if (name && !name.toLowerCase().includes('administrator')) {
        uniqueLecturers.add(name);
      }
    });
  }
  const totalLecturers = uniqueLecturers.size;

  const stats = [
    { label: 'Total projek', value: totalProjects, suffix: '' },
    { label: 'Mahasiswa', value: totalStudents, suffix: '' },
    { label: 'Mata kuliah', value: totalCourses, suffix: '' },
    { label: 'Dosen', value: totalLecturers, suffix: '' }
  ];


  return (
    <section className="landing-statistics" aria-label="Statistik showcase">
      <div className="landing-container">
        <div className="statistics-summary">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Karya mahasiswa dalam satu platform</h2>
            <p>Jelajahi dokumentasi projek mahasiswa berdasarkan mata kuliah dan semester. Setiap karya dirancang agar mudah ditemukan, dipelajari, dan ditinjau melalui satu alur showcase yang terkelola.</p>
          </div>
          <a href="#projects" className="inline-flex items-center gap-2">Jelajahi Projek <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <dl className="statistics-list">
          {stats.map(stat => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>
                {reducedMotion ? stat.value : <>
                  <NumberTicker value={stat.value} aria-hidden="true" className="tracking-normal text-slate-900" />
                  <span className="sr-only">{stat.value}</span>
                </>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
