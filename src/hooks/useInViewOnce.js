import { useEffect, useRef, useState } from 'react';

export default function useInViewOnce({ rootMargin = '0px 0px -12% 0px' } = {}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!element || prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0.08 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [elementRef, isVisible];
}
