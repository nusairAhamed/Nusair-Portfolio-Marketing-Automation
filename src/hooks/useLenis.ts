import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../animations/gsapConfig';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function stopLenis() {
  if (typeof window !== 'undefined' && window.__lenis) {
    window.__lenis.stop();
  }
}

export function startLenis() {
  if (typeof window !== 'undefined' && window.__lenis) {
    window.__lenis.start();
  }
}

export function useLenis() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If reduced motion is requested, do not initialize smooth scroll hijack
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    window.__lenis = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [prefersReducedMotion]);
}
