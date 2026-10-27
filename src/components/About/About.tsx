import React, { useEffect, useRef } from 'react';
import { Layers, Zap, CheckCircle2 } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  const capabilities = [
    {
      num: '01',
      title: 'HUBSPOT & MARKETING HUB',
      icon: Zap,
      items: [
        'Marketing Hub workflows',
        'HubL & dynamic content',
        'Smart lists & CRM automation',
      ],
    },
    {
      num: '02',
      title: 'EMAIL ENGINEERING',
      icon: Layers,
      items: [
        'Figma / XD → Responsive Code',
        'Modular email architecture',
        'Pixel-accurate implementation',
      ],
    },
    {
      num: '03',
      title: 'CROSS-CLIENT QA',
      icon: CheckCircle2,
      items: [
        'Litmus & Email on Acid',
        'Outlook / Gmail / Apple Mail',
        'Deliverability & dark mode',
      ],
    },
  ];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.capability-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 88%',
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
      id="about"
      className="pt-14 sm:pt-16 pb-20 sm:pb-28 bg-transparent relative overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Dark Navy Card matching Selected Work width and radius */}
        <div
          ref={contentRef}
          className="w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-7 sm:p-10 lg:p-14 relative overflow-hidden shadow-2xl border border-slate-800/80"
        >
          {/* Ambient Subtle Green Glow Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6F135]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl relative z-10">
            {/* Monospace Section Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C6F135] text-xs font-mono font-bold tracking-widest uppercase mb-6 border border-white/10">
              <span>04 / ABOUT ME</span>
            </div>

            {/* Dominant Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-7 max-w-4xl">
              I work where design, code and marketing meet.
            </h2>

            {/* Intro Copy (Compact & Focused) */}
            <div className="space-y-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-12 max-w-4xl">
              <p>
                I specialize in HubSpot Marketing Hub, automated nurture workflows, and responsive email development
                that connect CRM strategy, visual design, and real-world inbox delivery.
              </p>
              <p className="text-slate-400">
                My work combines HubSpot architecture (workflows, HubL dynamic templates, lead capture funnels, and behavioral segmentation)
                with bulletproof email engineering and cross-client QA across HubSpot, Salesforce Marketing Cloud, Adobe Campaign, and modern marketing platforms.
              </p>
            </div>

            {/* 3 Capability Cards */}
            <div
              ref={cardsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
            >
              {capabilities.map((cap) => {
                const IconComponent = cap.icon;
                return (
                  <div
                    key={cap.num}
                    className="capability-card rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300"
                  >
                    {/* Header with Technical Icon & Number */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#C6F135]/15 text-[#C6F135] flex items-center justify-center">
                        <IconComponent className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-400">
                        {cap.num} — {cap.title}
                      </span>
                    </div>

                    {/* Bullet Items */}
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                      {cap.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6F135]" />
                          <span className="font-medium text-slate-200">{item}</span>
                        </li>
                      ))}
                    </ul>
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
