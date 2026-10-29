import React, { useRef, useState, useEffect } from 'react';
import { useTransform, motion, useScroll, useMotionValue, MotionValue } from 'motion/react';
import { clientProjects, allEmailBuilds, ClientProject, EmailBuild } from '../../data/projects';
import { ProjectLightbox } from './ProjectLightbox';
import { SectionBadge } from '../UI/SectionBadge';
import { Eye } from 'lucide-react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface CardProps {
  i: number;
  clientProject: ClientProject;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onSelectBuild: (build: EmailBuild) => void;
  prefersReducedMotion?: boolean;
  outerRef?: React.Ref<HTMLDivElement>;
  isLast?: boolean;
}

export const Card: React.FC<CardProps> = ({
  i,
  clientProject,
  progress,
  range,
  targetScale,
  onSelectBuild,
  prefersReducedMotion = false,
  outerRef,
  isLast = false,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const transformedScale = useTransform(progress, range, [1, targetScale]);
  const scale = prefersReducedMotion ? 1 : transformedScale;

  const hasFourBuilds = clientProject.builds.length === 4;
  const hasTwoBuilds = clientProject.builds.length === 2;

  return (
    <div
      ref={(el) => {
        container.current = el;
        if (typeof outerRef === 'function') {
          outerRef(el);
        } else if (outerRef) {
          (outerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
      }}
      className="h-screen flex items-start justify-center sticky top-0 px-4 sm:px-6 lg:px-8"
      style={{ zIndex: i + 10 }}
    >
      <motion.div
        style={{
          backgroundColor: clientProject.cardTheme.bgColor,
          scale,
          top: `calc(304px + ${i * 44}px)`,
        }}
        className={`flex flex-col relative w-full max-w-6xl rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] border ${clientProject.cardTheme.border} pt-3.5 sm:pt-4 lg:pt-4 px-5 sm:px-7 lg:px-8 pb-5 sm:pb-6 lg:pb-7 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.12),0_8px_20px_-4px_rgba(15,23,42,0.05)] origin-top will-change-transform`}
      >
        {/* Eyebrow Label & Metrics Pill — stepped top 38px strip remains cleanly visible across the whole stack */}
        <div className="flex items-center justify-between gap-4 mb-1.5 sm:mb-2">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-slate-800 uppercase">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: clientProject.cardTheme.brandColor || '#C6F135' }}
            />
            0{i + 1} · {clientProject.client}
          </span>
          <span className="px-3 py-0.5 sm:py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/90 border border-slate-200/80 text-slate-800 shadow-xs">
            {clientProject.metrics[0].value} {clientProject.metrics[0].label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-1.5">
          {clientProject.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-3xl leading-relaxed mb-3.5 sm:mb-4 line-clamp-2 sm:line-clamp-none font-normal">
          {clientProject.description}
        </p>

        {/* Visual Cards Grid */}
        <div
          className={`grid gap-3 sm:gap-4 ${hasFourBuilds
              ? 'grid-cols-2 lg:grid-cols-4'
              : hasTwoBuilds
                ? 'grid-cols-1 sm:grid-cols-2 max-w-[1240px]'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
        >
          {clientProject.builds.map((build: EmailBuild) => {
            // Placeholder card
            if (build.isPlaceholder || !build.image) {
              return (
                <div
                  key={build.id}
                  className="rounded-2xl sm:rounded-3xl bg-white/40 border border-slate-300/30 h-[260px] sm:h-[300px] lg:h-[360px] w-full transition-all duration-300 hover:bg-white/60"
                />
              );
            }

            // Interactive preview card
            return (
              <div
                key={build.id}
                onClick={() => onSelectBuild(build)}
                className={`build-preview-card group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/60 shadow-xs cursor-pointer ${hasTwoBuilds
                    ? 'h-[280px] sm:h-[330px] lg:h-[400px]'
                    : 'h-[260px] sm:h-[300px] lg:h-[360px]'
                  } w-full transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(15,23,42,0.18)]`}
              >
                {/* Preview Image with Parallax & Hover Zoom */}
                <div className="w-full h-full overflow-hidden">
                  <motion.img
                    src={build.image}
                    alt={build.title}
                    style={{ scale: imageScale }}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Subtle Gradient Scrim on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Floating Inspect Pill */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0 pointer-events-none">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/90 text-white backdrop-blur-md shadow-lg border border-white/20 text-[10px] font-mono font-medium">
                    <Eye className="w-3 h-3 text-[#C6F135]" />
                    <span>View Build</span>
                  </div>
                </div>

                {/* Bottom Title Label on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 pointer-events-none flex items-end">
                  <span className="text-[10px] font-mono text-white/95 font-medium truncate drop-shadow-sm bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 max-w-full">
                    {build.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export const SelectedWork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);
  const [activeBuild, setActiveBuild] = useState<EmailBuild | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll tracking across the cards stack for individual card scaling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track the exact exit moment: when the last card finishes sticking and starts moving up,
  // the heading moves up in exact 1:1 lockstep, keeping the distance constant
  const headingY = useMotionValue(0);

  useEffect(() => {
    const updateHeadingY = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // When all cards are sticking at top: 0, rect.bottom is >= window.innerHeight.
      // As the user scrolls past the last card, rect.bottom becomes < window.innerHeight,
      // which causes all sticky cards to be pushed upwards by exactly (rect.bottom - window.innerHeight).
      // We translate the heading by that EXACT negative offset to move in 1:1 lockstep with the cards.
      const offset = rect.bottom - window.innerHeight;
      headingY.set(Math.min(0, offset));
    };

    updateHeadingY();

    window.addEventListener('scroll', updateHeadingY, { passive: true });
    window.addEventListener('resize', updateHeadingY);

    let unsubscribeLenis: (() => void) | undefined;
    const rafId = requestAnimationFrame(() => {
      if (window.__lenis) {
        unsubscribeLenis = window.__lenis.on('scroll', updateHeadingY);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateHeadingY);
      window.removeEventListener('resize', updateHeadingY);
      if (unsubscribeLenis) unsubscribeLenis();
    };
  }, [headingY]);

  const currentIndex = activeBuild
    ? allEmailBuilds.findIndex((b) => b.id === activeBuild.id)
    : 0;

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allEmailBuilds.length;
    setActiveBuild(allEmailBuilds[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx =
      (currentIndex - 1 + allEmailBuilds.length) % allEmailBuilds.length;
    setActiveBuild(allEmailBuilds[prevIdx]);
  };

  // Stepped scale calculations matching UI Layouts for 4 cards:
  // Card 0 (Nissan): 0.85
  // Card 1 (Officeworks): 0.90
  // Card 2 (KFC Australia): 0.95
  // Card 3 (Drinky): 1.00
  const targetScales = [0.85, 0.90, 0.95, 1.0];

  return (
    <section id="selected-work" className="pt-14 sm:pt-16 pb-20 sm:pb-28 bg-white relative">
      {/* Sticky Section Heading — main heading and sub heading */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : headingY }}
        className="sticky top-[136px] z-20 bg-white pt-1 pb-3"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionBadge label="/ 03 — SELECTED WORK" className="mb-2 sm:mb-2.5" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-2 sm:mb-2.5">
            Real projects. Real impact.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-3xl">
            A few products, workflows and interfaces I&apos;ve helped make clearer.
          </p>
        </div>
      </motion.div>

      {/* UI-Layouts Stacking Cards Container */}
      <div ref={containerRef} className="relative pb-0 -mt-[304px]">
        {clientProjects.map((clientProject: ClientProject, i: number) => {
          const isLast = i === clientProjects.length - 1;
          const targetScale = targetScales[i] ?? 1;
          const range: [number, number] = [i * (1 / clientProjects.length), 1];

          return (
            <Card
              key={clientProject.id}
              i={i}
              clientProject={clientProject}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
              onSelectBuild={setActiveBuild}
              prefersReducedMotion={prefersReducedMotion}
              outerRef={isLast ? lastCardRef : undefined}
              isLast={isLast}
            />
          );
        })}
      </div>

      {/* Full Image Lightbox */}
      <ProjectLightbox
        project={activeBuild}
        currentIndex={currentIndex}
        totalCount={allEmailBuilds.length}
        onClose={() => setActiveBuild(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
