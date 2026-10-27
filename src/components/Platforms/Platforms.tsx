import React, { useEffect, useRef } from 'react';
import { platformsData } from '../../data/platforms';
import { SectionBadge } from '../UI/SectionBadge';
import { gsap } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const Platforms: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Duplicate platforms to ensure a perfectly seamless infinite marquee
  const marqueeItems = [
    ...platformsData,
    ...platformsData,
    ...platformsData,
    ...platformsData,
  ];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="platforms"
      className="py-16 sm:py-20 md:py-24 bg-[#FBFBFB] border-t border-slate-200/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-10 sm:mb-14">
        {/* Standard Section Header */}
        <div ref={headerRef} className="max-w-3xl">
          <SectionBadge label="/ 04 — PLATFORMS" className="mb-4" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-4">
            Platforms
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Enterprise ESPs, marketing automation engines, and delivery architectures I build, automate, and optimize for daily.
          </p>
        </div>
      </div>

      {/* Infinite Moving Logo Slider / Marquee */}
      <div className="relative w-full overflow-hidden bg-white border-y border-slate-200/80 py-8 sm:py-10 shadow-xs group">
        {/* Left & Right Gradient Mask Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Continuous Marquee Track (Pauses on Hover) */}
        <div className="flex w-max items-center gap-12 sm:gap-20 animate-marquee hover:[animation-play-state:paused] will-change-transform">
          {marqueeItems.map((platform, index) => (
            <div
              key={`${platform.id}-${index}`}
              className="flex items-center justify-center shrink-0 px-2 sm:px-4 cursor-pointer transition-transform duration-300 hover:scale-105"
              title={`${platform.name} — ${platform.category}`}
            >
              <img
                src={platform.logo}
                alt={`${platform.name} logo`}
                className="max-h-8 sm:max-h-10 max-w-[140px] sm:max-w-[170px] w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
