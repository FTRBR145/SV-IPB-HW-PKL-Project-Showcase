import React, { useEffect, useRef, useState } from 'react';
import useInViewOnce from '../../hooks/useInViewOnce';
import useScrollReveal from '../../hooks/useScrollReveal';
import useApp from '../../hooks/useApp';

function AnimatedCounter({ target, duration = 1600, isActive }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isActive, target, duration]);

  return <>{isActive ? count : 0}</>;
}

export default function StatsBar() {
  const [sectionRef, isVisible] = useInViewOnce();
  const [headingRef, headingVisible] = useScrollReveal();
  const { projects } = useApp();

  const totalProjects = projects.length;
  const totalStudents = new Set(projects.map((p) => p.student)).size;
  const totalCourses = new Set(projects.map((p) => p.course)).size;
  const totalTech = new Set(projects.flatMap((p) => p.techStack || [])).size;

  const stats = [
    { label: 'TOTAL PROJEK', value: totalProjects, suffix: '+' },
    { label: 'MAHASISWA', value: totalStudents, suffix: '' },
    { label: 'MATA KULIAH', value: totalCourses, suffix: '' },
    { label: 'TEKNOLOGI', value: totalTech, suffix: '+' }
  ];

  return (
    <section ref={sectionRef} className="py-14 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-300">
          <div ref={headingRef} className="grid lg:grid-cols-12 gap-8 items-center pb-8 border-b border-gray-200">
            <div className="lg:col-span-5">
              <h2
                className={`font-heading text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug text-gray-900 title-underline-reveal scroll-reveal ${headingVisible ? 'is-visible' : ''}`}
              >
                Karya mahasiswa dalam satu platform
              </h2>
            </div>

            <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <p
                className={`text-gray-600 text-sm leading-relaxed max-w-xl scroll-reveal reveal-delay-2 ${headingVisible ? 'is-visible' : ''}`}
              >
                Jelajahi dokumentasi projek mahasiswa berdasarkan mata kuliah dan semester. Setiap karya dirancang agar mudah ditemukan, dipelajari, dan ditinjau melalui satu alur showcase yang terkelola.
              </p>
              <a
                href="#projects"
                className={`inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm shadow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap self-start sm:self-center scroll-reveal reveal-delay-3 ${headingVisible ? 'is-visible' : ''}`}
              >
                Jelajahi Projek
              </a>
            </div>
          </div>

          <div className={`motion-list grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 ${isVisible ? 'is-visible' : ''}`}>
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="motion-list-item flex flex-col p-4 rounded-2xl bg-white/60 border border-gray-200/80 transition-shadow duration-300 hover:shadow-md hover:border-gray-300"
                style={{ '--motion-index': idx }}
              >
                <span className="text-xs font-bold text-gray-500 tracking-wider mb-2">{stat.label}</span>
                <span
                  className={`font-heading text-3xl font-extrabold leading-snug text-gray-900 sm:text-4xl tabular-nums ${isVisible ? 'count-animate' : ''}`}
                  style={{ '--count-delay': `${idx * 80 + 120}ms` }}
                >
                  <AnimatedCounter target={stat.value} isActive={isVisible} />
                  {stat.suffix}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
