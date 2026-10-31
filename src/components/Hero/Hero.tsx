import React, { useEffect, useRef } from 'react';
import { TactileButton } from '../UI/TactileButton';
import { ChevronDown } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

import { platformsData } from '../../data/platforms';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitFrameRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Duplicate platforms for a perfectly seamless infinite loop
  const marqueeItems = [
    ...platformsData,
    ...platformsData,
    ...platformsData,
    ...platformsData,
  ];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.4'
        )
        .fromTo(
          portraitFrameRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power4.out',
          },
          '-=0.8'
        )
        .fromTo(
          sliderRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleScrollDown = () => {
    const target = document.querySelector('#interactive-emails');
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.1 });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-20 sm:pt-24 pb-2 sm:pb-3 hero-gradient-bg overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 right-10 w-[28rem] h-[28rem] bg-lime-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Unified Hero Flow (Grid in center) */}
      <div className="w-full flex-1 flex flex-col justify-center my-auto">
        {/* Main Hero Content */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-2 sm:py-3">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: Editorial Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Top Monospace Label with Lime Dot */}
              <div ref={eyebrowRef} className="mb-2.5 sm:mb-3">
                <span className="inline-flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#C6F135] shrink-0 shadow-[0_0_10px_rgba(198,241,53,0.8)]" />
                  SENIOR HUBSPOT SPECIALIST · MARKETING HUB · EMAIL · AUTOMATION
                </span>
              </div>

              {/* Dominant Headline */}
              <h1
                ref={headlineRef}
                className="text-4xl sm:text-5xl md:text-5xl lg:text-[clamp(2.5rem,3.6vw,4.25rem)] font-bold tracking-tight text-slate-900 leading-[1.08] mb-3 sm:mb-4"
              >
                Building email experiences <span className="block text-slate-400 font-normal italic">beyond the inbox.</span>
              </h1>

              {/* Exact Subtitle */}
              <p
                ref={textRef}
                className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-xl mb-5 sm:mb-6"
              >
                Senior HubSpot Specialist specializing in Marketing Hub, responsive email development, and marketing automation workflows.
              </p>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex flex-wrap items-center gap-3 sm:gap-4">
                <TactileButton
                  variant="lime"
                  size="lg"
                  href="#selected-work"
                  icon="arrow-right"
                  className="text-sm sm:text-base font-semibold"
                >
                  View Work
                </TactileButton>

                <TactileButton
                  variant="secondary"
                  size="lg"
                  href="#contact"
                  icon="arrow-up-right"
                  className="text-sm sm:text-base font-medium"
                >
                  Let's Talk
                </TactileButton>
              </div>
            </div>

            {/* Right Column: Clean Rounded Portrait (Centered in Column) */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div
                ref={portraitFrameRef}
                className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] xl:max-w-[350px] max-h-[30vh] sm:max-h-[34vh] lg:max-h-[38vh] aspect-[4/5] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80 group mx-auto"
              >
                <img
                  src="/assets/nusair.jpg"
                  alt="Nusair Ahamed - Senior HubSpot Specialist specializing in Marketing Hub, Email & Automation"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Moving Platform Logos Slider (Placed right below the image/content, close to the image) */}
        <div
          ref={sliderRef}
          className="w-full mt-3 sm:mt-5 lg:mt-6 py-2.5 sm:py-3.5 border-y border-slate-200/60 relative overflow-hidden group bg-[#FBFBFB]/60 backdrop-blur-xs"
        >
          {/* Left & Right Gradient Fade Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#FBFBFB] via-[#FBFBFB]/90 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#FBFBFB] via-[#FBFBFB]/90 to-transparent z-10" />

          {/* Continuous Marquee Track (Gentle Speed & Pause on Hover) */}
          <div
            className="flex w-max items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 animate-marquee hover:[animation-play-state:paused] will-change-transform"
            style={{ animationDuration: '65s' }}
          >
            {marqueeItems.map((platform, index) => (
              <div
                key={`${platform.id}-${index}`}
                className="flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105 h-[28px] sm:h-[32px] md:h-[38px]"
                title={`${platform.name} — ${platform.category}`}
              >
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className="h-[28px] sm:h-[32px] md:h-[38px] max-w-[110px] sm:max-w-[140px] md:max-w-[160px] w-auto object-contain filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator at the bottom */}
      <div
        ref={scrollIndicatorRef}
        className="w-full flex justify-center pb-2 sm:pb-3 pt-1 shrink-0"
      >
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll down to interactive emails"
          className="inline-flex flex-col items-center gap-1 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer group focus:outline-none"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-400 group-hover:text-slate-800 transition-colors">
              Scroll Down
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 group-hover:translate-y-0.5 transition-all" />
          </div>
          <div className="w-4 h-6 rounded-full border border-slate-300/90 group-hover:border-slate-500 flex items-start justify-center p-0.5 transition-colors">
            <div className="w-1 h-1.5 rounded-full bg-[#C6F135] shadow-[0_0_6px_rgba(198,241,53,0.8)] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
