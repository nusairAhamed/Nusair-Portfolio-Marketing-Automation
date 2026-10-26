import React from 'react';
import { ClientWork, ClientEmailBuild } from '../../types';
import { Maximize2, CheckCircle2, ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface ClientCardProps {
  client: ClientWork;
  onSelectBuild: (build: ClientEmailBuild, client: ClientWork) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onSelectBuild }) => {
  return (
    <div className="selected-client-card relative rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 lg:p-12 border border-slate-200/90 bg-gradient-to-b from-[#FAFBFD] via-[#F6F8FB] to-[#EEF2F6] shadow-[0_20px_60px_rgba(15,23,42,0.04)] transition-all">
      {/* Client Header Section */}
      <div className="mb-10 sm:mb-12 pb-8 sm:pb-10 border-b border-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-400">
              {client.number}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-black/[0.05] text-slate-800 border border-black/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15A9DD] animate-pulse" />
              {client.clientBadge}
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500 px-2.5 py-1 rounded-full bg-white/80 border border-slate-200">
              {client.region}
            </span>
          </div>

          <div className="text-xs sm:text-sm font-mono text-slate-600 bg-white/80 px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
            {client.timeframe}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight mb-3">
              {client.clientName}
            </h3>
            <p className="text-sm font-mono font-semibold tracking-wider text-slate-500 uppercase mb-4">
              {client.role}
            </p>
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
              {client.description}
            </p>

            {/* Core Capability Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {client.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white text-slate-800 border border-slate-200/80 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Metrics & Quality Guarantees */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3 bg-white/90 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
            {client.metrics?.map((metric, i) => (
              <div key={i} className="text-center p-2">
                <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono">
                  {metric.value}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-tight">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-slate-700" />
            Email Builds &amp; Campaigns
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Click any email preview to expand the full-height email image.
          </p>
        </div>

        <span className="text-xs font-mono text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 self-start sm:self-auto">
          {client.builds.length} Production Campaigns
        </span>
      </div>

      {/* Inside Card: Email Screenshots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {client.builds.map((build, index) => (
          <div
            key={build.id}
            onClick={() => onSelectBuild(build, client)}
            className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Window Chrome Header Bar */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <div className="font-mono text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                {build.title}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expand</span>
              </div>
            </div>

            {/* Email Image Thumbnail with Hover Expansion Overlay */}
            <div className="relative w-full h-72 sm:h-80 md:h-96 bg-slate-950 overflow-hidden flex items-center justify-center p-3 sm:p-5">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-xl ring-1 ring-white/10 relative">
                <img
                  src={build.thumbnail}
                  alt={build.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover Overlay Hint */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/95 text-slate-950 font-mono text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4 text-slate-800" />
                    <span>Expand Full Email</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Content & Details */}
            <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                    {build.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">0{index + 1}</span>
                </div>

                <h5 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                  {build.title}
                </h5>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {build.subtitle}
                </p>

                {/* Highlights List */}
                <ul className="space-y-1.5 mb-5">
                  {build.highlights.slice(0, 2).map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills & Expand Trigger */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {build.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBuild(build, client);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-blue-600 transition-colors select-none ml-auto"
                >
                  <span>Expand Image</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
