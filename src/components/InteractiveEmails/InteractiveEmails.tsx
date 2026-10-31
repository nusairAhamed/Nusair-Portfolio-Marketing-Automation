import React, { useState, useEffect, useRef } from 'react';
import { emailProjects } from '../../data/emailProjects';
import { SectionBadge } from '../UI/SectionBadge';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const ROTATION_INTERVAL = 6000; // 6 seconds per project demo

export const InteractiveEmails: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const displayAreaRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const activeProject = emailProjects[activeProjectIndex];

  // Preload all GIF assets on mount so transitions are instant
  useEffect(() => {
    emailProjects.forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);

  // GSAP ScrollTrigger Entrance Animation for Section Header & Content
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            clearProps: 'transform',
          }
        );
      }

      if (displayAreaRef.current) {
        gsap.fromTo(
          displayAreaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: displayAreaRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            clearProps: 'transform',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Handle auto-rotation timer & progress bar
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) {
      return;
    }

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / ROTATION_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, prefersReducedMotion]);

  // When progress reaches 100%, advance to next project in exact sequential order
  useEffect(() => {
    if (progress >= 100) {
      setActiveProjectIndex((current) => (current + 1) % emailProjects.length);
      setProgress(0);
    }
  }, [progress]);

  const handleSelectProject = (idx: number) => {
    setActiveProjectIndex(idx);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveProjectIndex((current) => (current - 1 + emailProjects.length) % emailProjects.length);
    setProgress(0);
  };

  const handleNext = () => {
    setActiveProjectIndex((current) => (current + 1) % emailProjects.length);
    setProgress(0);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
    setProgress(0);
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      ref={sectionRef}
      id="interactive-emails"
      className="pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 bg-[#FBFBFB] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-6 sm:mb-8">
          <SectionBadge label="/ 02 — INTERACTIVE EMAIL" className="mb-2 sm:mb-2.5" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-1.5">
            When email doesn't have to be static.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Interactive email experiences built beyond traditional static campaigns.
          </p>
        </div>

        {/* Display Area: Left Minimal Details + Right Visual Preview */}
        <div
          ref={displayAreaRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch"
        >
          {/* Left Column: Visual-First Project Info & Quick Navigation */}
          <div className="lg:col-span-4 flex flex-col justify-between p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div>
              <div className="mb-2 sm:mb-3">
                <span className="text-3xl sm:text-4xl font-mono font-bold text-slate-300">
                  {activeProject.number}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 sm:mb-3">
                {activeProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Bottom Card Navigation: Progress line + Play/Pause + Prev/Next buttons */}
            <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              {/* Progress Line */}
              <div className="flex-1 flex items-center gap-2">
                <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#C6F135] transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  title={isPlaying ? 'Pause auto-cycle' : 'Resume auto-cycle'}
                  aria-label={isPlaying ? 'Pause auto-cycle' : 'Resume auto-cycle'}
                  className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-0.5 shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                </button>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  title="Previous demo"
                  aria-label="Previous demo"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  title="Next demo"
                  aria-label="Next demo"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Clean GIF Visual Preview with Direct Navigation Controls */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 p-2 sm:p-3 shadow-xl border border-slate-900/80 flex items-center justify-center">
              <div className="relative w-full rounded-xl overflow-hidden flex items-center justify-center min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] max-h-[380px] sm:max-h-[420px] lg:max-h-[460px] xl:max-h-[500px]">
                {!imageErrors[activeProject.id] ? (
                  <img
                    key={activeProject.id}
                    src={activeProject.image}
                    alt={activeProject.title}
                    onError={() => handleImageError(activeProject.id)}
                    className="w-full h-full object-contain max-h-[360px] sm:max-h-[400px] lg:max-h-[440px] xl:max-h-[480px] rounded-xl transition-opacity duration-300 select-none"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center">
                    <Play className="w-10 h-10 text-slate-600 mb-2" />
                  </div>
                )}

                {/* Direct On-Preview Prev / Next Arrow Controls */}
                <button
                  type="button"
                  onClick={handlePrev}
                  title="Previous preview"
                  aria-label="Previous preview"
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white/80 hover:text-white backdrop-blur-md border border-white/10 flex items-center justify-center opacity-70 group-hover:opacity-100 hover:scale-105 transition-all shadow-md cursor-pointer z-10"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  title="Next preview"
                  aria-label="Next preview"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white/80 hover:text-white backdrop-blur-md border border-white/10 flex items-center justify-center opacity-70 group-hover:opacity-100 hover:scale-105 transition-all shadow-md cursor-pointer z-10"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Bottom Overlay Indicator Dots */}
                <div className="absolute bottom-2 sm:bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 z-10">
                  {emailProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectProject(idx)}
                      title={`Go to ${p.title}`}
                      aria-label={`Go to ${p.title}`}
                      className={`transition-all rounded-full cursor-pointer ${
                        activeProjectIndex === idx
                          ? 'w-5 h-1.5 bg-[#C6F135]'
                          : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

