import React, { useEffect, useRef } from 'react';
import { careerExperiences } from '../../data/experience';
import { SectionBadge } from '../UI/SectionBadge';
import { gsap } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
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

      // Role items stagger reveal
      const items = gsap.utils.toArray<HTMLElement>('.experience-item');
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: listRef.current,
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
      id="experience"
      className="pt-14 sm:pt-16 pb-20 sm:pb-28 bg-[#FBFBFB] border-t border-slate-200/70 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 md:mb-20">
          <SectionBadge label="/ 06 — EXPERIENCE" className="mb-4" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-4">
            Experience
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            6+ years across HubSpot Marketing Hub, marketing automation and email engineering.
          </p>
        </div>

        {/* Minimal Editorial Role List with Smooth Hover Effects */}
        <div ref={listRef} className="divide-y divide-slate-200/80">
          {careerExperiences.map((exp) => (
            <div
              key={exp.id}
              className="experience-item py-7 px-4 -mx-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all duration-300 hover:bg-slate-100/80 hover:translate-x-1 cursor-default"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug whitespace-pre-line group-hover:text-black transition-colors">
                    {exp.role}
                  </h3>
                  {exp.isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#C6F135] text-slate-950 shadow-xs">
                      PRESENT
                    </span>
                  )}
                </div>
                <div className="text-sm font-mono text-slate-500 flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-700">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span>·</span>
                      <span>{exp.location}</span>
                    </>
                  )}
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-400 group-hover:text-slate-600 self-start sm:self-center uppercase tracking-wider transition-colors">
                {exp.dates}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


