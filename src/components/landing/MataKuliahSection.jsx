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
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 25) {
          scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  useEffect(() => {
    const autoLoop = setInterval(() => {
      handleScroll('right');
    }, 4500);
    return () => clearInterval(autoLoop);
  }, []);

  return (
    <section id="matakuliah" className="py-12 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mb-8">
          Mata Kuliah Unggulan TRK
        </h2>

        <div className="relative group/slider">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-20 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            onClick={() => handleScroll('left')}
            aria-label="Scroll Kiri"
          >
            <ChevronLeft size={20} />
          </button>

          <div 
            className="flex gap-4 overflow-x-auto scrollbar-none py-2 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            ref={scrollRef}
          >
            {courses.map((c, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-64 sm:w-72 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => {
                  if (onSelectCourse) onSelectCourse(c.courseFullName);
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={c.image} 
                    alt={c.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
                </div>
                <div className="p-4 bg-gray-800 text-white font-semibold text-sm text-center line-clamp-2">
                  <span>{c.name}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-20 w-10 h-10 rounded-full bg-white/90 shadow-lg border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            onClick={() => handleScroll('right')}
            aria-label="Scroll Kanan"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
