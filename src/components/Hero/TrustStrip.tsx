import React from 'react';
import { Award, Briefcase, Cpu, CheckCircle } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustPillars = [
    { label: '6+ YEARS EXPERIENCE', icon: Award, detail: 'Enterprise & Agency Delivery' },
    { label: 'ENTERPRISE CAMPAIGNS', icon: Briefcase, detail: 'Australian Teams & Global Brands' },
    { label: 'MARKETING HUB · EMAIL · AUTOMATION', icon: Cpu, detail: 'HubSpot Specialist & HubL' },
    { label: 'DESIGN → CODE → QA', icon: CheckCircle, detail: 'Pixel-Perfect Deliverability' },
  ];

  return (
    <div className="w-full pt-8 pb-4 border-t border-slate-200/60 mt-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {trustPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.label}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 transition-all hover:bg-white/90 hover:border-slate-300 shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900/5 text-slate-800 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-slate-800" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold tracking-wider text-slate-900 uppercase font-mono truncate">
                  {pillar.label}
                </span>
                <span className="text-[11px] text-slate-500 truncate">{pillar.detail}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
