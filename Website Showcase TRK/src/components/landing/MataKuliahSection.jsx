import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MataKuliahSection({ onSelectCourse }) {
  const scrollRef = useRef(null);

  const baseCourses = [
    {
      name: "Rangkaian Logika & Teknik Digital",
      courseFullName: "RANGKAIAN LOGIKA DAN TEKNIK DIGITAL",
      image: "/trk_photos/DSC09040.JPG"
    },
    {
      name: "Teknologi Bengkel Elektromekanik",
      courseFullName: "TEKNOLOGI BENGKEL ELEKTROMEKANIK",
      image: "/trk_photos/DSC09042.JPG"
    },
    {
      name: "Aplikasi Mobile",
      courseFullName: "APLIKASI MOBILE",
      image: "/trk_photos/DSC09048.JPG"
    },
    {
      name: "Sistem Tertanam",
      courseFullName: "SISTEM TERTANAM (EMBEDDED SYSTEM)",
      image: "/trk_photos/DSC09038.JPG"
    },
    {
      name: "Proyek Sistem IoT",
      courseFullName: "PROYEK SISTEM IOT (INTERNET OF THINGS)",
      image: "/trk_photos/DSC09044.JPG"
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
    <section id="matakuliah" className="matakuliah-section">
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
