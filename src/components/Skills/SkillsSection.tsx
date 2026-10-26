import React, { useState, useRef, useEffect } from 'react';
import { SectionBadge } from '../UI/SectionBadge';
import { SkillLogo } from './SkillLogos';
import { skillsGrouped, allSkillsList, skillCategories, SkillItem } from '../../data/skillsData';
import { Sparkles, Layers } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const displayedGroups =
    activeCategory === 'all'
      ? skillsGrouped
      : skillsGrouped.filter((g) => g.category === activeCategory);

  // Entrance animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-tile',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, activeCategory]);

  return (
    <section
      ref={containerRef}
      id="skills"
      className="py-20 sm:py-28 bg-[#FAFAFA] border-t border-slate-200/70 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="max-w-3xl">
            <SectionBadge label="/ 06 — SKILLS & TECHNOLOGIES" className="mb-4" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-3">
              Tools &amp; technologies.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal">
              Production-tested platforms, cross-client email engines, and web technologies.
            </p>
          </div>

          {/* Quick Count Badge */}
          <div className="flex items-center gap-2 bg-white border border-slate-200/90 rounded-full px-4 py-2 shadow-xs shrink-0 self-start md:self-auto text-xs font-mono font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-[#C6F135]" />
            <span>{allSkillsList.length} Verified Platforms &amp; Tools</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'all'
                ? allSkillsList.length
                : allSkillsList.filter((s) => s.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                type="button"
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clean Icon-First Grouped Layout */}
        <div ref={gridRef} className="space-y-10 sm:space-y-12">
          {displayedGroups.map((group) => (
            <div key={group.category} className="space-y-4">
              {/* Category Group Header */}
              {activeCategory === 'all' && (
                <div className="flex items-center gap-3">
                  <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                    {group.categoryTitle}
                  </h3>
                  <div className="h-px bg-slate-200 flex-1" />
                </div>
              )}

              {/* Grid of Clean Icon Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
                {group.skills.map((skill: SkillItem) => (
                  <div
                    key={skill.id}
                    className="skill-tile group bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-200 cursor-default"
                  >
                    {/* Actual Full-Color Brand Logo */}
                    <div className="w-12 h-12 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-center mb-3.5 transition-transform duration-300 group-hover:scale-110">
                      <SkillLogo id={skill.id} size={32} className="w-8 h-8" />
                    </div>

                    {/* Product Name */}
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight mb-1">
                      {skill.name}
                    </span>

                    {/* Subtle Tag */}
                    <span className="text-[10px] font-mono text-slate-400 font-medium line-clamp-1">
                      {skill.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
