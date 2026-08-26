import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // If not a hash anchor jump (e.g. #matakuliah), scroll to top
    if (!window.location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, search]);

  return null;
}
