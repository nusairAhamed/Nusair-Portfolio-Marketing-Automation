import React, { useEffect, useRef } from 'react';
import { TactileButton } from '../UI/TactileButton';
import { SectionBadge } from '../UI/SectionBadge';
import { gsap } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (contentRef.current) {
        const elements = contentRef.current.children;
        gsap.fromTo(
          elements,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 82%',
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
      id="contact"
      className="pt-14 sm:pt-16 pb-20 sm:pb-28 bg-[#FBFBFB] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          ref={cardRef}
          className="relative rounded-[40px] bg-gradient-to-br from-[#E2F89A]/30 via-[#F7FEE7]/60 to-[#ECFCCB]/40 p-8 sm:p-14 lg:p-20 border border-[#C6F135]/60 shadow-[0_20px_50px_rgba(198,241,53,0.12)] overflow-hidden"
        >
          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#C6F135]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-lime-200/40 rounded-full blur-3xl pointer-events-none" />

          <div ref={contentRef} className="max-w-3xl relative z-10">
            <SectionBadge label="/ 07 — GET IN TOUCH" className="mb-6 text-slate-800" />

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08] mb-6">
              Have something to build?
            </h2>

            <p className="text-base sm:text-xl text-slate-700 font-normal leading-relaxed mb-10 max-w-xl">
              Let's talk about HubSpot Marketing Hub, email development, or marketing automation.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <TactileButton
                variant="dark"
                size="lg"
                href="mailto:nus.ahamed@gmail.com?subject=Campaign%20Development%20Inquiry"
                icon="arrow-right"
                className="text-base font-semibold"
              >
                Let's Talk
              </TactileButton>

              <TactileButton
                variant="secondary"
                size="lg"
                href="https://www.linkedin.com/in/nusair-ahamed/"
                target="_blank"
                rel="noopener noreferrer"
                icon="arrow-up-right"
                className="text-base bg-white/95"
              >
                LinkedIn
              </TactileButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

