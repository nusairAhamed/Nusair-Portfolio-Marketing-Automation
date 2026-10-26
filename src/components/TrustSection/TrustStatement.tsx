import React, { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const TrustStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          ease: 'none',
          duration: 28,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const marqueeItems = [
    'HUBSPOT MARKETING HUB',
    'MARKETING AUTOMATION',
    'EMAIL DEVELOPMENT',
    'HUBL TEMPLATES',
    'WORKFLOWS',
    'RESPONSIVE HTML',
    'CROSS-CLIENT QA',
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 bg-white border-y border-slate-200/60 overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 md:mb-20">
        <h2
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]"
        >
          6+ years building digital experiences where design, code and marketing meet.
        </h2>
      </div>

      {/* Subtle Marquee Ribbon */}
      <div className="relative w-full overflow-hidden py-5 bg-slate-50/90 border-y border-slate-100 select-none">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform w-fit">
          <div className="flex items-center gap-10 px-6 text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
            {marqueeItems.map((item, idx) => (
              <React.Fragment key={`m1-${idx}`}>
                <span>{item}</span>
                <span className="text-[#C6F135] font-black">·</span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center gap-10 px-6 text-xs sm:text-sm font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
            {marqueeItems.map((item, idx) => (
              <React.Fragment key={`m2-${idx}`}>
                <span>{item}</span>
                <span className="text-[#C6F135] font-black">·</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

