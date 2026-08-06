import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MataKuliahSection({ onSelectCourse }) {
  const scrollRef = useRef(null);

  const baseCourses = [
    {
      name: "Hardware",
      courseFullName: "INTERNET OF THINGS & EMBEDDED SYSTEM",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Internet of Things",
      courseFullName: "INTERNET OF THINGS & EMBEDDED SYSTEM",
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Mikrokontroler",
      courseFullName: "SISTEM KONTROL & MIKROKONTROLER",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Jaringan Komputer",
      courseFullName: "JARINGAN KOMPUTER & KEAMANAN SIBER",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Perangkat Terhubung",
      courseFullName: "PEMROGRAMAN PERANGKAT TERHUBUNG",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Cloud Computing",
      courseFullName: "APLIKASI WEB & CLOUD COMPUTING",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Tripled course array for endless smooth scrolling loop
  const courses = [...baseCourses, ...baseCourses, ...baseCourses];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = 300;

      if (direction === 'right') {
        if (scrollLeft + clientWidth >= scrollWidth - 25) {
          // Loop back to start smoothly
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 25) {
          // Loop to end smoothly
          scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  // Auto-scroll loop interval
  useEffect(() => {
    const autoLoop = setInterval(() => {
      handleScroll('right');
    }, 4500);
    return () => clearInterval(autoLoop);
  }, []);

  return (
    <section className="matakuliah-section">
      <div className="container">
        <h2 className="matakuliah-title">Mata Kuliah</h2>

        <div className="matakuliah-slider-wrapper">
          <button
            className="slider-nav-btn nav-left"
            onClick={() => handleScroll('left')}
            aria-label="Scroll Kiri"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="matakuliah-scroll-container" ref={scrollRef}>
            {courses.map((c, idx) => (
              <div
                key={idx}
                className="matakuliah-card"
                onClick={() => {
                  if (onSelectCourse) onSelectCourse(c.courseFullName);
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="matakuliah-img-wrapper">
                  <img src={c.image} alt={c.name} />
                </div>
                <div className="matakuliah-label-bar">
                  <span>{c.name}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="slider-nav-btn nav-right"
            onClick={() => handleScroll('right')}
            aria-label="Scroll Kanan"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
