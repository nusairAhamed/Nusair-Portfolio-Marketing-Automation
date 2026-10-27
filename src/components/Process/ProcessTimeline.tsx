import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { processSteps } from '../../data/process';
import { SectionBadge } from '../UI/SectionBadge';
import { gsap, ScrollTrigger } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Check } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const desktopTrackWrapperRef = useRef<HTMLDivElement>(null);
  const mobileTrackWrapperRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const mobileProgressLineRef = useRef<HTMLDivElement>(null);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileStepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileNodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Exact vertical line geometry from Node 01 center to Node 05 center
  const [lineGeometry, setLineGeometry] = useState<{ top: number; height: number } | null>(null);
  const [mobileLineGeometry, setMobileLineGeometry] = useState<{ top: number; height: number } | null>(null);

  // State to track activated steps
  const [activeStepIndices, setActiveStepIndices] = useState<number[]>([0]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const currentActiveIndex = Math.max(...activeStepIndices);

  // Measure and align the vertical line precisely between Node 01 and Node 06
  const updateLineGeometry = () => {
    const lastIdx = processSteps.length - 1;

    // Desktop measurement
    if (desktopTrackWrapperRef.current && nodeRefs.current[0] && nodeRefs.current[lastIdx]) {
      const wrapperRect = desktopTrackWrapperRef.current.getBoundingClientRect();
      const firstRect = nodeRefs.current[0].getBoundingClientRect();
      const lastRect = nodeRefs.current[lastIdx].getBoundingClientRect();

      const top = firstRect.top - wrapperRect.top + firstRect.height / 2;
      const height = lastRect.top - wrapperRect.top + lastRect.height / 2 - top;

      if (height > 0) {
        setLineGeometry({ top, height });
      }
    }

    // Mobile measurement
    if (mobileTrackWrapperRef.current && mobileNodeRefs.current[0] && mobileNodeRefs.current[lastIdx]) {
      const wrapperRect = mobileTrackWrapperRef.current.getBoundingClientRect();
      const firstRect = mobileNodeRefs.current[0].getBoundingClientRect();
      const lastRect = mobileNodeRefs.current[lastIdx].getBoundingClientRect();

      const top = firstRect.top - wrapperRect.top + firstRect.height / 2;
      const height = lastRect.top - wrapperRect.top + lastRect.height / 2 - top;

      if (height > 0) {
        setMobileLineGeometry({ top, height });
      }
    }
  };

  useLayoutEffect(() => {
    updateLineGeometry();
  }, []);

  useEffect(() => {
    updateLineGeometry();

    const handleResize = () => {
      updateLineGeometry();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    if (document.fonts) {
      document.fonts.ready.then(handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveStepIndices(processSteps.map((_, i) => i));
      return;
    }

    const mm = gsap.matchMedia();

    // ============================================================
    // DESKTOP SCROLL ANIMATIONS (min-width: 1024px)
    // ============================================================
    mm.add('(min-width: 1024px)', () => {
      const lastIdx = processSteps.length - 1;
      const firstNode = nodeRefs.current[0];
      const lastNode = nodeRefs.current[lastIdx];

      if (!progressLineRef.current || !firstNode || !lastNode) return;

      // 1. Central lime progress line tracking scroll from Node 01 to Node 05
      const progressTrigger = ScrollTrigger.create({
        trigger: firstNode,
        start: 'center center',
        endTrigger: lastNode,
        end: 'center center',
        scrub: 0.2,
        onUpdate: (self) => {
          if (progressLineRef.current) {
            gsap.set(progressLineRef.current, {
              scaleY: self.progress,
              transformOrigin: 'top center',
            });
          }
        },
      });

      // 2. Individual step triggers for reveal & node activation
      const stepTriggers = stepRefs.current.map((stepEl, idx) => {
        if (!stepEl) return null;

        const content = stepEl.querySelector('.step-content');
        const nodeEl = nodeRefs.current[idx];

        // Initial state
        if (idx !== 0) {
          gsap.set(content, { opacity: 0.35, y: 14 });
        } else {
          gsap.set(content, { opacity: 1, y: 0 });
        }

        return ScrollTrigger.create({
          trigger: nodeEl || stepEl,
          start: 'center center+=60',
          end: 'bottom center',
          onEnter: () => {
            setActiveStepIndices((prev) => Array.from(new Set([...prev, idx])));
            gsap.to(content, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
            if (nodeEl) gsap.to(nodeEl, { scale: 1.15, duration: 0.3, ease: 'back.out(2)' });
          },
          onLeaveBack: () => {
            if (idx !== 0) {
              setActiveStepIndices((prev) => prev.filter((i) => i !== idx));
              gsap.to(content, { opacity: 0.35, y: 14, duration: 0.35, ease: 'power2.in' });
              if (nodeEl) gsap.to(nodeEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
            }
          },
        });
      });

      return () => {
        progressTrigger.kill();
        stepTriggers.forEach((t) => t?.kill());
      };
    });

    // ============================================================
    // MOBILE SCROLL ANIMATIONS (max-width: 1023px)
    // ============================================================
    mm.add('(max-width: 1023px)', () => {
      const lastIdx = processSteps.length - 1;
      const firstMobileNode = mobileNodeRefs.current[0];
      const lastMobileNode = mobileNodeRefs.current[lastIdx];

      if (!mobileProgressLineRef.current || !firstMobileNode || !lastMobileNode) return;

      const mobileProgressTrigger = ScrollTrigger.create({
        trigger: firstMobileNode,
        start: 'center center',
        endTrigger: lastMobileNode,
        end: 'center center',
        scrub: 0.2,
        onUpdate: (self) => {
          if (mobileProgressLineRef.current) {
            gsap.set(mobileProgressLineRef.current, {
              scaleY: self.progress,
              transformOrigin: 'top center',
            });
          }
        },
      });

      const mobileTriggers = mobileStepRefs.current.map((stepEl, idx) => {
        if (!stepEl) return null;

        const content = stepEl.querySelector('.mobile-step-content');
        const nodeEl = mobileNodeRefs.current[idx];

        if (idx !== 0) {
          gsap.set(content, { opacity: 0.4, y: 10 });
        } else {
          gsap.set(content, { opacity: 1, y: 0 });
        }

        return ScrollTrigger.create({
          trigger: nodeEl || stepEl,
          start: 'center center+=60',
          end: 'bottom center',
          onEnter: () => {
            setActiveStepIndices((prev) => Array.from(new Set([...prev, idx])));
            gsap.to(content, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
            if (nodeEl) gsap.to(nodeEl, { scale: 1.15, duration: 0.3, ease: 'back.out(2)' });
          },
          onLeaveBack: () => {
            if (idx !== 0) {
              setActiveStepIndices((prev) => prev.filter((i) => i !== idx));
              gsap.to(content, { opacity: 0.4, y: 10, duration: 0.3, ease: 'power2.in' });
              if (nodeEl) gsap.to(nodeEl, { scale: 1, duration: 0.3, ease: 'power2.out' });
            }
          },
        });
      });

      return () => {
        mobileProgressTrigger.kill();
        mobileTriggers.forEach((t) => t?.kill());
      };
    });

    return () => mm.revert();
  }, [prefersReducedMotion, lineGeometry, mobileLineGeometry]);

  return (
    <section
      ref={containerRef}
      id="process"
      className="pt-14 sm:pt-16 pb-20 sm:pb-24 bg-[#FBFBFB] border-t border-slate-200/70 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* ============================================================ */}
        {/* SECTION INTRO */}
        {/* ============================================================ */}
        <div className="max-w-4xl mb-14 sm:mb-16 lg:mb-20">
          <SectionBadge label="/ 05 — PROCESS" className="mb-4" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-4">
            How I turn marketing requirements into production-ready HubSpot campaigns
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl">
            A structured six-stage methodology connecting campaign discovery, architecture, HubL development, automation workflows, multi-client QA, and continuous performance optimization.
          </p>
        </div>

        {/* ============================================================ */}
        {/* VERTICAL TIMELINE CONTAINER */}
        {/* ============================================================ */}
        <div className="relative">
          {/* ---------------------------------------------------------- */}
          {/* DESKTOP ALTERNATING TIMELINE (lg:block) */}
          {/* ---------------------------------------------------------- */}
          <div ref={desktopTrackWrapperRef} className="hidden lg:block relative">
            {/* Central Timeline Vertical Track (starts at Node 01 center, ends at Node 05 center) */}
            {lineGeometry ? (
              <div
                className="absolute left-1/2 -translate-x-1/2 w-[1.5px] bg-slate-200 z-0 pointer-events-none"
                style={{
                  top: `${lineGeometry.top}px`,
                  height: `${lineGeometry.height}px`,
                }}
              >
                {/* Dynamic Lime Progress Line */}
                <div
                  ref={progressLineRef}
                  className="w-full h-full bg-[#C6F135] origin-top will-change-transform"
                  style={{ transform: prefersReducedMotion ? 'scaleY(1)' : 'scaleY(0)' }}
                />
              </div>
            ) : (
              <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-[1.5px] bg-slate-200 z-0 pointer-events-none">
                <div
                  ref={progressLineRef}
                  className="w-full h-full bg-[#C6F135] origin-top will-change-transform"
                  style={{ transform: prefersReducedMotion ? 'scaleY(1)' : 'scaleY(0)' }}
                />
              </div>
            )}

            {/* Alternating Steps */}
            <div className="relative z-10 space-y-16 lg:space-y-20">
              {processSteps.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                const isStepReached = activeStepIndices.includes(idx);
                const isCurrentActive = currentActiveIndex === idx;
                const isCompleted = currentActiveIndex > idx;

                return (
                  <div
                    key={step.step}
                    ref={(el) => {
                      stepRefs.current[idx] = el;
                    }}
                    className="grid grid-cols-12 items-center relative group py-2"
                  >
                    {/* Left Column (Content when isLeft, empty when !isLeft) */}
                    <div
                      className={`col-span-5 ${
                        isLeft
                          ? 'text-right pr-10 xl:pr-14 flex flex-col items-end'
                          : 'pointer-events-none'
                      }`}
                    >
                      {isLeft && (
                        <div className="step-content space-y-3 max-w-[520px]">
                          {/* Stage Micro Label */}
                          <div className="flex items-center justify-end gap-2">
                            <span
                              className={`text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 ${
                                isCurrentActive
                                  ? 'text-slate-950 font-black'
                                  : isStepReached
                                  ? 'text-[#617e04]'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step.step} / {step.microLabel}
                            </span>
                          </div>

                          {/* Large Prominent Step Heading */}
                          <h3
                            className={`font-bold tracking-tight leading-[1.08] transition-all duration-300 text-3xl sm:text-4xl xl:text-5xl ${
                              isCurrentActive
                                ? 'text-slate-950'
                                : isStepReached
                                ? 'text-slate-900'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.step} — {step.name}
                          </h3>

                          {/* Description */}
                          <p className="text-slate-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed ml-auto">
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center Column: Node Indicator on Timeline */}
                    <div className="col-span-2 flex justify-center relative">
                      <div
                        ref={(el) => {
                          nodeRefs.current[idx] = el;
                        }}
                        className={`step-node w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border-2 z-10 ${
                          isCurrentActive
                            ? 'bg-[#C6F135] border-slate-950 ring-4 ring-[#C6F135]/40 scale-110 shadow-sm'
                            : isCompleted
                            ? 'bg-[#C6F135] border-[#C6F135] scale-100'
                            : 'bg-white border-slate-300 scale-100'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-3 h-3 text-slate-950 stroke-[3]" />
                        ) : isCurrentActive ? (
                          <span className="w-2 h-2 rounded-full bg-slate-950" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-200" />
                        )}
                      </div>
                    </div>

                    {/* Right Column (Content when !isLeft, empty when isLeft) */}
                    <div
                      className={`col-span-5 ${
                        !isLeft
                          ? 'text-left pl-10 xl:pl-14 flex flex-col items-start'
                          : 'pointer-events-none'
                      }`}
                    >
                      {!isLeft && (
                        <div className="step-content space-y-3 max-w-[520px]">
                          {/* Stage Micro Label */}
                          <div className="flex items-center justify-start gap-2">
                            <span
                              className={`text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 ${
                                isCurrentActive
                                  ? 'text-slate-950 font-black'
                                  : isStepReached
                                  ? 'text-[#617e04]'
                                  : 'text-slate-400'
                              }`}
                            >
                              {step.step} / {step.microLabel}
                            </span>
                          </div>

                          {/* Large Prominent Step Heading */}
                          <h3
                            className={`font-bold tracking-tight leading-[1.08] transition-all duration-300 text-3xl sm:text-4xl xl:text-5xl ${
                              isCurrentActive
                                ? 'text-slate-950'
                                : isStepReached
                                ? 'text-slate-900'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.step} — {step.name}
                          </h3>

                          {/* Description */}
                          <p className="text-slate-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed mr-auto">
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* MOBILE TIMELINE (< 1024px: Left Track, Right Content) */}
          {/* ---------------------------------------------------------- */}
          <div ref={mobileTrackWrapperRef} className="block lg:hidden relative pl-10 sm:pl-14">
            {/* Left Vertical Line Track */}
            {mobileLineGeometry ? (
              <div
                className="absolute left-3 sm:left-4 -translate-x-1/2 w-[1.5px] bg-slate-200 z-0 pointer-events-none"
                style={{
                  top: `${mobileLineGeometry.top}px`,
                  height: `${mobileLineGeometry.height}px`,
                }}
              >
                {/* Mobile Lime Progress Line */}
                <div
                  ref={mobileProgressLineRef}
                  className="w-full h-full bg-[#C6F135] origin-top will-change-transform"
                  style={{ transform: prefersReducedMotion ? 'scaleY(1)' : 'scaleY(0)' }}
                />
              </div>
            ) : (
              <div className="absolute top-6 bottom-6 left-3 sm:left-4 -translate-x-1/2 w-[1.5px] bg-slate-200 z-0 pointer-events-none">
                <div
                  ref={mobileProgressLineRef}
                  className="w-full h-full bg-[#C6F135] origin-top will-change-transform"
                  style={{ transform: prefersReducedMotion ? 'scaleY(1)' : 'scaleY(0)' }}
                />
              </div>
            )}

            {/* Vertical Step Stack */}
            <div className="space-y-12 sm:space-y-14 relative z-10">
              {processSteps.map((step, idx) => {
                const isStepReached = activeStepIndices.includes(idx);
                const isCurrentActive = currentActiveIndex === idx;
                const isCompleted = currentActiveIndex > idx;

                return (
                  <div
                    key={step.step}
                    ref={(el) => {
                      mobileStepRefs.current[idx] = el;
                    }}
                    className="relative"
                  >
                    {/* Node Positioned Over Vertical Line */}
                    <div
                      ref={(el) => {
                        mobileNodeRefs.current[idx] = el;
                      }}
                      className={`mobile-step-node absolute -left-10 sm:-left-14 top-2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 border-2 z-10 ${
                        isCurrentActive
                          ? 'bg-[#C6F135] border-slate-950 ring-4 ring-[#C6F135]/40 shadow-xs'
                          : isCompleted
                          ? 'bg-[#C6F135] border-[#C6F135]'
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                      ) : isCurrentActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="mobile-step-content space-y-2">
                      {/* Stage Micro Label */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono font-bold uppercase tracking-widest ${
                            isCurrentActive
                              ? 'text-slate-950 font-black'
                              : isStepReached
                              ? 'text-[#617e04]'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.step} / {step.microLabel}
                        </span>
                      </div>

                      {/* Stage Headline */}
                      <h3
                        className={`font-bold tracking-tight text-2xl sm:text-3xl leading-snug transition-colors ${
                          isStepReached ? 'text-slate-950' : 'text-slate-400'
                        }`}
                      >
                        {step.step} — {step.name}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
