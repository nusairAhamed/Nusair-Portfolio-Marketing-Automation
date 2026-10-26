import React, { useEffect, useRef } from 'react';
import { services } from '../../data/services';
import { SectionBadge } from '../UI/SectionBadge';
import { AbstractArt } from './AbstractArt';
import { TactileButton } from '../UI/TactileButton';
import { Check, Sparkles } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const Expertise: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.expertise-card');

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="what-i-do"
      className="py-24 md:py-36 bg-[#FAFAFA] border-t border-slate-200/70 relative overflow-hidden"
    >
      {/* Anchor for backward compatibility with #expertise */}
      <span id="expertise" className="absolute top-0 left-0 -translate-y-24 opacity-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 md:mb-20">
          {/* Left Sub-statement */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <SectionBadge label="/ 05 — WHAT I DO" className="mb-4" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-4">
              What I do.
            </h2>
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs mb-3">
              <div className="w-8 h-8 rounded-full bg-[#C6F135] flex items-center justify-center text-slate-900 font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium text-slate-700">
                Crafted for long-term campaign deliverability &amp; reliability
              </span>
            </div>
          </div>

          {/* Right Main Headline & Subtitle */}
          <div className="lg:col-span-7 lg:pt-4">
            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3">
              Senior HubSpot Specialist. Complete Marketing Hub, email &amp; automation capability.
            </p>
            <p className="text-base text-slate-600 font-normal leading-relaxed">
              Specializing in HubSpot Marketing Hub architecture, automated nurture workflows, bulletproof responsive HTML email development, and cross-client QA — delivering high-converting campaigns that perform flawlessly across every inbox.
            </p>
          </div>
        </div>

        {/* 3 Detailed Service Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              className="expertise-card group relative rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                    {service.tagline}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#C6F135] transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Abstract Visual 3D Iridescent Artwork Panel */}
                <div className="mb-6">
                  <AbstractArt type={service.gradientType} />
                </div>

                {/* What's Included Checklist with custom lime badge ticks */}
                <div className="space-y-3 pt-2 mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block font-bold">
                    WHAT'S INCLUDED:
                  </span>
                  <ul className="space-y-2.5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-[#C6F135]/40 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Tactile Action */}
              <div className="pt-4 border-t border-slate-100">
                <TactileButton
                  variant="lime"
                  size="md"
                  href="#contact"
                  className="w-full justify-center text-xs"
                  icon="arrow-up-right"
                >
                  Discuss {service.title.split(' ')[0]}
                </TactileButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
