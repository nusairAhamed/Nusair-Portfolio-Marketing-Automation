import React, { useEffect, useRef } from 'react';
import { TactileButton } from '../UI/TactileButton';
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
        );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[88vh] flex flex-col justify-center pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 hero-gradient-bg overflow-hidden"
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 right-10 w-[28rem] h-[28rem] bg-lime-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Top Monospace Label with Lime Dot */}
          <div ref={eyebrowRef} className="mb-6">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#C6F135] shrink-0 shadow-[0_0_10px_rgba(198,241,53,0.8)]" />
              SENIOR HUBSPOT SPECIALIST · MARKETING HUB · EMAIL · AUTOMATION
            </span>
          </div>

          {/* Dominant Headline */}
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-slate-900 leading-[1.05] mb-6"
          >
            Building email experiences <span className="block text-slate-400 font-normal italic">beyond the inbox.</span>
          </h1>

          {/* Exact Subtitle */}
          <p
            ref={textRef}
            className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-xl mb-10"
          >
            Senior HubSpot Specialist specializing in Marketing Hub, responsive email development, and marketing automation workflows.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <TactileButton
              variant="lime"
              size="lg"
              href="#selected-work"
              icon="arrow-right"
              className="text-base font-semibold"
            >
              View Work
            </TactileButton>

            <TactileButton
              variant="secondary"
              size="lg"
              href="#contact"
              icon="arrow-up-right"
              className="text-base font-medium"
            >
              Let's Talk
            </TactileButton>
          </div>
        </div>

        {/* Right Column: Clean Rounded Portrait */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={portraitFrameRef}
            className="relative w-full max-w-md lg:max-w-none aspect-[4/5] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)] border border-slate-200/80 group"
          >
            <img
              src="/assets/nusair.jpg"
              alt="Nusair Ahamed - Senior HubSpot Specialist specializing in Marketing Hub, Email & Automation"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Moving Platform Logos Slider (Pause on Hover) */}
      <div
        ref={sliderRef}
        className="w-full mt-12 sm:mt-16 py-6 sm:py-8 border-y border-slate-200/60 relative overflow-hidden group"
      >
        {/* Left & Right Gradient Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#FBFBFB] via-[#FBFBFB]/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#FBFBFB] via-[#FBFBFB]/90 to-transparent z-10" />

        {/* Continuous Marquee Track (Gentle Speed & Pause on Hover) */}
        <div
          className="flex w-max items-center gap-16 sm:gap-24 md:gap-28 animate-marquee hover:[animation-play-state:paused] will-change-transform"
          style={{ animationDuration: '65s' }}
        >
          {marqueeItems.map((platform, index) => (
            <div
              key={`${platform.id}-${index}`}
              className="flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105 h-[36px] sm:h-[44px] md:h-[60px]"
              title={`${platform.name} — ${platform.category}`}
            >
              <img
                src={platform.logo}
                alt={`${platform.name} logo`}
                className="h-[36px] sm:h-[44px] md:h-[60px] max-w-[140px] sm:max-w-[180px] md:max-w-[210px] w-auto object-contain filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
