import React from 'react';
import { SelectedProject } from '../../types';
import { TactileButton } from '../UI/TactileButton';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface ProjectCardProps {
  project: SelectedProject;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const gradientClass = {
    blue: 'bg-gradient-to-br from-[#EEF4FB] via-[#F4F8FC] to-[#E9F1F9] border-blue-200/60',
    purple: 'bg-gradient-to-br from-[#F5F2FE] via-[#FAF8FF] to-[#EDE8FD] border-purple-200/60',
    green: 'bg-gradient-to-br from-[#F0FAF4] via-[#F6FCF8] to-[#E5F7EC] border-emerald-200/60',
    warm: 'bg-gradient-to-br from-[#FFF8F6] via-[#FFFDFD] to-[#FDF2EE] border-rose-200/60',
  }[project.bgGradient];

  return (
    <div
      className={`selected-project-card relative rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 border shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all ${gradientClass}`}
    >
      {/* Top Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl sm:text-2xl font-mono font-bold text-slate-400">
              {project.number}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-black/[0.05] text-slate-700 border border-black/[0.06]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Nissan Production Build
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-3">
            {project.title}
          </h3>

          <p className="text-sm font-mono font-semibold tracking-wider text-slate-500 uppercase mb-4">
            {project.category}
          </p>

          <p className="text-base text-slate-700 font-normal leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tools & Key Deliverables */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-block px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white/80 text-slate-800 border border-slate-200/70 shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>

            {project.deliverables && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-2">
                {project.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Live Build CTA Button */}
        <div className="shrink-0 flex sm:flex-row lg:flex-col gap-3">
          <TactileButton
            variant="dark"
            size="md"
            href={project.caseStudyUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon="arrow-up-right"
            className="w-full sm:w-auto"
          >
            Preview Live Build
          </TactileButton>
        </div>
      </div>

      {/* Dominant Visual Device Mockup Frame */}
      <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl group">
        {/* Email Client Top Bar */}
        <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex items-center justify-between text-xs text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="font-mono text-[11px] text-slate-400/90 bg-slate-950/80 px-4 py-1 rounded-full border border-slate-800/80 max-w-[280px] sm:max-w-md truncate">
            https://res4.privilege.nissan.co.th · {project.title}
          </div>
          <a
            href={project.caseStudyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs font-mono"
            title="Open HTML Email Template"
          >
            <span className="hidden sm:inline">Open Live</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Email Visual Preview Container */}
        <div className="relative p-4 sm:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-transform duration-700 ease-out group-hover:scale-[1.015]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[580px] object-cover object-top block"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
