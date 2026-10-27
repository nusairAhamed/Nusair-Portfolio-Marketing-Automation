import React, { useState, useEffect, useRef } from 'react';
import { emailProjects } from '../../data/emailProjects';
import { SectionBadge } from '../UI/SectionBadge';
import { Play, Pause } from 'lucide-react';
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
  const tabsRef = useRef<HTMLDivElement>(null);
  const displayAreaRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const activeProject = emailProjects[activeProjectIndex];

  // Preload all GIF assets on mount so tab transitions are instant
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

      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (displayAreaRef.current) {
        gsap.fromTo(
          displayAreaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: displayAreaRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
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

  // When progress reaches 100%, advance to next project in exact 1 -> 2 -> 3 sequential order
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
      className="pt-24 md:pt-36 pb-24 md:pb-36 bg-[#FBFBFB] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-16">
          <SectionBadge label="/ 02 — INTERACTIVE EMAIL" className="mb-4" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-4 whitespace-pre-line">
            When email doesn't have{"\n"}to be static.
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Interactive email experiences built beyond traditional static campaigns.
          </p>
        </div>

        {/* Project Selector Tabs with Auto-Play & Progress Bar */}
        <div
          ref={tabsRef}
          className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-4 border-b border-slate-200/80"
        >
          <div className="flex flex-wrap items-center gap-2">
            {emailProjects.map((project, idx) => {
              const isActive = activeProjectIndex === idx;

              return (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(idx)}
                  className={`relative overflow-hidden flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isActive ? 'bg-[#C6F135]' : 'bg-slate-300'
                    }`}
                  />
                  <span>
                    {project.number} — {project.title}
                  </span>

                  {/* Active tab auto-play progress bar */}
                  {isActive && isPlaying && !prefersReducedMotion && (
                    <span
                      className="absolute bottom-0 left-0 h-[2.5px] bg-[#C6F135] transition-all duration-75 ease-linear pointer-events-none"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Auto-Play Pause / Resume Button */}
          <button
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause auto-cycle' : 'Resume auto-cycle'}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200/70 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-mono font-medium transition-all shadow-xs cursor-pointer select-none"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-slate-700" />
                <span className="hidden sm:inline">Auto-play on</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-slate-700 fill-slate-700" />
                <span className="hidden sm:inline">Auto-play paused</span>
              </>
            )}
          </button>
        </div>

        {/* Display Area: Left Minimal Details + Right Large Visual */}
        <div
          ref={displayAreaRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Left Column: Visual-First Project Info */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 sm:p-10 rounded-[32px] bg-white border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)]">
            <div>
              <span className="text-4xl font-mono font-bold text-slate-300 block mb-3">
                {activeProject.number}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3 sm:mb-4">
                {activeProject.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeProject.description}
              </p>
            </div>
          </div>

          {/* Right Column: Clean Large GIF Visual */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center rounded-[32px] overflow-hidden bg-slate-950 p-2 sm:p-4 shadow-2xl relative min-h-[460px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
              {!imageErrors[activeProject.id] ? (
                <img
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.title}
                  onError={() => handleImageError(activeProject.id)}
                  className="w-full h-full object-contain max-h-[600px] rounded-2xl transition-opacity duration-300"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center">
                  <Play className="w-10 h-10 text-slate-600 mb-2" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

