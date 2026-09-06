'use client';

import { useEffect, useRef } from 'react';

export function useLenis() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis smooth scroll initialization
    // This will be integrated with the global scroll context
    const handleWheel = (e: WheelEvent) => {
      // Smooth scroll handling
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return containerRef;
}
