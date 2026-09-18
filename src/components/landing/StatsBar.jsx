import React, { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { NumberTicker } from '../ui/number-ticker';
import useApp from '../../hooks/useApp';
import { ArrowRight } from 'lucide-react';
import { apiRequest } from '../../services/apiClient';

export default function StatsBar() {
  const reducedMotion = useReducedMotion();
  const { projects, courses, studentAccounts, moderators } = useApp();
  const [statistics, setStatistics] = useState(null);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setFailed(false);
    apiRequest('/statistics', { signal: controller.signal }).then(data => {
      if (!controller.signal.aborted) setStatistics(data);
    }).catch(() => {
      if (!controller.signal.aborted) { setStatistics(null); setFailed(true); }
    });
    return () => controller.abort();
  }, [projects, courses, studentAccounts, moderators, retry]);

  const stats = [
    { label: 'Total projek', value: statistics?.projects },
    { label: 'Mahasiswa terdaftar', value: statistics?.students },
    { label: 'Mata kuliah', value: statistics?.courses },
    { label: 'Dosen', value: statistics?.lecturers }
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
                {stat.value == null ? '—' : reducedMotion ? stat.value : <>
                  <NumberTicker value={stat.value} aria-hidden="true" className="tracking-normal text-slate-900" />
                  <span className="sr-only">{stat.value}</span>
                </>}
              </dd>
            </div>
          ))}
        </dl>
        {failed && <p role="status" className="mt-2 text-sm text-rose-700">Statistik belum dapat dimuat. <button className="underline" onClick={() => setRetry(value => value + 1)}>Coba lagi</button></p>}
      </div>
    </section>
  );
}
