import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Upload, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export default function HeroSection({ onOpenUpload, onNavigateToStudent }) {
  const images = [
    { small: '/trk_photos/optimized/DSC09044-640.webp', large: '/trk_photos/optimized/DSC09044-1600.webp' },
    { small: '/trk_photos/optimized/DSC09040-640.webp', large: '/trk_photos/optimized/DSC09040-1600.webp' },
    { small: '/trk_photos/optimized/DSC09042-640.webp', large: '/trk_photos/optimized/DSC09042-1600.webp' },
    { small: '/trk_photos/optimized/DSC09046-640.webp', large: '/trk_photos/optimized/DSC09046-1600.webp' },
    { small: '/sv_ipb_hero-640.webp', large: '/sv_ipb_hero-1600.webp' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(!document.hidden);
  const heroRef = useRef(null);
  const parallaxFrameRef = useRef(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (!heroRef.current || prefersReducedMotion || parallaxFrameRef.current) return;
    parallaxFrameRef.current = window.requestAnimationFrame(() => {
      parallaxFrameRef.current = null;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;
      const progress = 1 - (rect.bottom / (viewH + rect.height));
      setParallaxOffset(progress * 40);
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!heroRef.current || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isHeroVisible) return undefined;
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (parallaxFrameRef.current) {
        window.cancelAnimationFrame(parallaxFrameRef.current);
        parallaxFrameRef.current = null;
      }
    };
  }, [handleScroll, isHeroVisible, prefersReducedMotion]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || !isHeroVisible || !isDocumentVisible) return undefined;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, images.length, isDocumentVisible, isHeroVisible, isPaused, prefersReducedMotion]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <section ref={heroRef} id="home" className="relative flex min-h-[620px] items-center overflow-hidden bg-slate-950 px-0 pb-28 pt-14 text-white md:min-h-[540px] md:py-20">
      {/* Background slideshow keeps the existing hero structure while loading one responsive image at a time. */}
      <picture key={images[currentSlide].large}>
        <source media="(max-width: 767px)" srcSet={images[currentSlide].small} type="image/webp" />
        <source srcSet={images[currentSlide].large} type="image/webp" />
        <img
          src={images[currentSlide].large}
          alt={`Dokumentasi kegiatan mahasiswa TRK, foto ${currentSlide + 1} dari ${images.length}`}
          className="hero-media absolute inset-0 h-full w-full object-cover object-center"
          style={{ transform: `translateY(${parallaxOffset}px) scale(1.05)` }}
          width="1600"
          height="900"
          decoding="async"
          fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
        />
      </picture>

      <div className="pointer-events-none absolute inset-0 bg-slate-950/75" />
      {/* Subtle grain texture for visual depth — very low opacity so it doesn't distract */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      {/* Fixed/Static Hero Text Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <span className="hero-intro hero-intro-badge float-gentle inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-200 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            {/* Live indicator dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-300" />
            </span>
            TEKNOLOGI REKAYASA KOMPUTER (TRK)
          </span>

          <h1 className="hero-intro hero-intro-title font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            TRK Student Project <br />
            <span className="text-slate-200">Showcase</span>
          </h1>
          
          <p className="hero-intro hero-intro-copy text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Platform showcase video projek akhir dan praktikum sistem tertanam mahasiswa Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University. Menampilkan inovasi IoT, mikrokontroler, jaringan komputer, dan cloud.
          </p>

          <div className="hero-intro hero-intro-actions flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onNavigateToStudent}
              className="inline-flex min-h-11 items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-bold text-sm shadow-lg shadow-black/20 transition-[background-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              Lihat Semua Projek <ArrowRight size={18} />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm shadow-md transition-[background-color,box-shadow,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]" onClick={onOpenUpload}>
              Unggah Projek <Upload size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Slideshow Controls */}
      <div className="hero-intro hero-intro-controls absolute bottom-4 right-4 z-20 flex items-center gap-1 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/90 p-1.5 sm:bottom-6 sm:right-6" role="group" aria-label="Kontrol slideshow hero">
        {!prefersReducedMotion && !isPaused && isHeroVisible && isDocumentVisible && (
          <span key={currentSlide} className="hero-slide-progress" aria-hidden="true" />
        )}
        <span className="min-w-12 px-2 text-center text-xs font-bold tabular-nums text-slate-300" aria-live="polite">
          {String(currentSlide + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <button className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" onClick={handlePrev} aria-label="Foto sebelumnya">
          <ChevronLeft size={20} />
        </button>

        <button className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" onClick={() => setIsPaused((paused) => !paused)} aria-label={isPaused ? 'Putar slideshow' : 'Jeda slideshow'} aria-pressed={isPaused}>
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </button>

        <button className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" onClick={handleNext} aria-label="Foto berikutnya">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
