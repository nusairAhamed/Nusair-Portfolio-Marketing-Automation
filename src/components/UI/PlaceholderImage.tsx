import React, { useState } from 'react';
import { Mail, CheckCircle2, Layers, Monitor, Smartphone, Palette } from 'lucide-react';

interface PlaceholderImageProps {
  src: string;
  alt: string;
  className?: string;
  type?: 'profile' | 'email-colour' | 'email-hotspot' | 'email-responsive' | 'project-blue' | 'project-purple' | 'project-green' | 'project-warm';
  title?: string;
  badge?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  src,
  alt,
  className = '',
  type = 'project-blue',
  title = '',
  badge = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // If user has provided a real image and it hasn't errored
  if (!hasError && src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    );
  }

  // Graceful, editorial fallback visual representation
  return (
    <div className={`relative overflow-hidden flex flex-col justify-between select-none ${className}`}>
      {type === 'profile' && (
        <div className="w-full h-full min-h-[460px] bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200/90 flex flex-col items-center justify-between p-8 text-center relative">
          {/* Subtle lighting rings */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,241,53,0.18)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="w-full flex justify-between items-center z-10">
            <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase bg-white/70 px-2.5 py-1 rounded-full border border-black/[0.04]">
              PORTRAIT PLACEHOLDER
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6F135] ring-4 ring-[#C6F135]/20 animate-pulse" />
          </div>

          <div className="flex flex-col items-center justify-center my-auto z-10">
            {/* Elegant stylized avatar outline */}
            <div className="relative w-36 h-36 rounded-full bg-white shadow-xl shadow-slate-200/50 border border-slate-200/70 flex items-center justify-center mb-6 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-white" />
              <svg className="w-20 h-20 text-slate-300 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold tracking-tight text-slate-900">Nusair Ahamed</h4>
            <p className="text-xs font-medium text-slate-500 mt-1 tracking-wide">
              Senior HubSpot Specialist · Marketing Hub · Email · Automation
            </p>
          </div>

          <div className="w-full bg-white/85 backdrop-blur-md rounded-2xl p-4 border border-slate-200/60 text-left z-10 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1.5">
              <span>Replace with photograph:</span>
              <span className="text-slate-700 font-semibold">/assets/profile-placeholder.jpg</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#C6F135] w-2/3 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {type === 'email-colour' && (
        <div className="w-full h-full min-h-[380px] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 md:p-8 flex flex-col justify-between relative rounded-2xl">
          {/* Email chrome bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[11px] font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
              <Palette className="w-3 h-3 text-[#C6F135]" />
              <span>NISSAN CAROUSEL · COLOUR PICKER</span>
            </div>
          </div>

          {/* Stylized Vehicle Silhouette & Swatches */}
          <div className="my-auto py-6 flex flex-col items-center">
            <div className="relative w-full max-w-sm h-36 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,241,53,0.15),transparent_70%)]" />
              <svg className="w-56 h-28 text-white/80" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 70 Q 35 70 45 70 C 50 55 70 55 75 70 L 125 70 C 130 55 150 55 155 70 L 180 70 L 170 50 L 140 40 L 60 40 L 35 55 Z" stroke="currentColor" fill="rgba(255,255,255,0.05)" />
                <circle cx="60" cy="70" r="12" stroke="#C6F135" strokeWidth="3" />
                <circle cx="140" cy="70" r="12" stroke="#C6F135" strokeWidth="3" />
              </svg>
            </div>

            {/* Email Swatches Preview */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
              <span className="text-[11px] font-medium text-slate-300">Select Colour:</span>
              <div className="w-5 h-5 rounded-full bg-white ring-2 ring-[#C6F135] ring-offset-2 ring-offset-slate-900 cursor-pointer" />
              <div className="w-5 h-5 rounded-full bg-slate-500 cursor-pointer" />
              <div className="w-5 h-5 rounded-full bg-blue-600 cursor-pointer" />
              <div className="w-5 h-5 rounded-full bg-red-600 cursor-pointer" />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 font-mono border-t border-white/10 pt-3">
            <span>Client: Nissan Campaign</span>
            <span className="text-[#C6F135]">Interactive Carousel CSS</span>
          </div>
        </div>
      )}

      {type === 'email-hotspot' && (
        <div className="w-full h-full min-h-[380px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 md:p-8 flex flex-col justify-between relative rounded-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6F135] animate-ping" />
              <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">EXPLORE VEHICLE FEATURES</span>
            </div>
            <span className="text-[10px] font-mono text-[#C6F135] bg-[#C6F135]/10 px-2.5 py-1 rounded-full border border-[#C6F135]/20">
              PROGRESSIVE ENHANCEMENT
            </span>
          </div>

          <div className="relative my-auto py-8 flex items-center justify-center">
            <div className="w-full max-w-sm h-40 border border-dashed border-white/20 rounded-2xl relative flex items-center justify-center bg-white/[0.02]">
              <span className="text-xs text-slate-400 font-mono">Interactive Hotspot Grid</span>
              
              {/* Hotspot Pins */}
              <div className="absolute top-6 left-12 group cursor-pointer">
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6F135] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C6F135]" />
                </span>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  LED Matrix Headlights
                </div>
              </div>

              <div className="absolute bottom-8 right-16 group cursor-pointer">
                <span className="relative flex h-6 w-6 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6F135] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C6F135]" />
                </span>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  19" Alloy Wheels
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 font-mono border-t border-white/10 pt-3">
            <span>Hover / tap hotspots to explore</span>
            <span className="text-slate-300">Nissan Campaign Work</span>
          </div>
        </div>
      )}

      {type === 'email-responsive' && (
        <div className="w-full h-full min-h-[380px] bg-gradient-to-br from-slate-100 to-slate-200/80 p-6 md:p-8 flex flex-col justify-between relative rounded-2xl border border-slate-300/40">
          <div className="flex items-center justify-between border-b border-slate-300/60 pb-3">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-700">Desktop View</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-700">Mobile Fluid View</span>
            </div>
          </div>

          {/* Visual comparison frame */}
          <div className="my-auto grid grid-cols-12 gap-4 items-center py-4">
            {/* Desktop Mock */}
            <div className="col-span-7 bg-white rounded-xl shadow-md border border-slate-200/80 p-3">
              <div className="h-3 w-24 bg-slate-200 rounded mb-2" />
              <div className="h-16 w-full bg-slate-100 rounded-lg flex items-center justify-center text-[10px] text-slate-400 font-mono">
                Full-width 600px Hero Banner
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="h-8 bg-slate-50 rounded border border-slate-100" />
                <div className="h-8 bg-slate-50 rounded border border-slate-100" />
              </div>
            </div>

            {/* Mobile Mock */}
            <div className="col-span-5 bg-white rounded-2xl shadow-lg border-2 border-slate-300 p-2 max-w-[130px] mx-auto">
              <div className="w-8 h-1 bg-slate-300 rounded-full mx-auto mb-2" />
              <div className="h-12 w-full bg-slate-100 rounded mb-1.5 flex items-center justify-center text-[8px] text-slate-400">
                Stacked Mobile
              </div>
              <div className="h-4 w-full bg-slate-50 rounded mb-1" />
              <div className="h-4 w-full bg-slate-50 rounded" />
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono border-t border-slate-300/60 pt-3 flex justify-between">
            <span>Dynamic image swapping</span>
            <span className="font-semibold text-slate-700">Optimized Readability</span>
          </div>
        </div>
      )}

      {type?.startsWith('project') && (
        <div className="w-full h-full min-h-[360px] bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 md:p-8 flex flex-col justify-between relative rounded-2xl border border-slate-200/70 shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
              {badge || 'PRODUCTION CAMPAIGN ASSET'}
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono text-slate-500">READY TO SHIP</span>
            </div>
          </div>

          <div className="my-auto py-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm max-w-md mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
                  {title.charAt(0)}
                </div>
                <div className="text-sm font-bold text-slate-900 truncate">{title}</div>
              </div>
              <div className="space-y-2">
                <div className="h-2.5 bg-slate-100 rounded w-full" />
                <div className="h-2.5 bg-slate-100 rounded w-5/6" />
                <div className="h-2.5 bg-slate-100 rounded w-4/6" />
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Tested across 70+ clients
                </span>
                <span className="font-mono text-slate-400">100% QA pass</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 font-mono border-t border-slate-200/70 pt-3">
            <span>Asset placeholder: {src}</span>
            <span className="text-slate-600 font-semibold">Nusair Ahamed</span>
          </div>
        </div>
      )}
    </div>
  );
};
