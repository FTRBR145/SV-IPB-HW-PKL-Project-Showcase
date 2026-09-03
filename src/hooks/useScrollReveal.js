import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — returns [ref, isVisible].
 *
 * Attach `ref` to the element you want to animate.
 * `isVisible` becomes true once the element enters the viewport and stays true (fire-once).
 *
 * The hook respects prefers-reduced-motion: if the user prefers reduced motion,
 * isVisible is immediately true so no animation plays.
 *
 * @param {object} options
 * @param {string} options.rootMargin  IntersectionObserver rootMargin
 * @param {number} options.threshold   IntersectionObserver threshold (0–1)
 */
export default function useScrollReveal({
  rootMargin = '0px 0px -60px 0px',
  threshold = 0.12
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!el || prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, isVisible];
}
