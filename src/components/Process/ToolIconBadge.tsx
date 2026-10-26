import React, { useState } from 'react';

interface ToolIconProps {
  name: string;
  iconKey: string;
}

export const ToolIconBadge: React.FC<ToolIconProps> = ({ name, iconKey }) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderIcon = () => {
    switch (iconKey) {
      case 'figma':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 38 57" fill="none">
            <path d="M19 28.5C13.7533 28.5 9.5 24.2467 9.5 19C9.5 13.7533 13.7533 9.5 19 9.5C24.2467 9.5 28.5 13.7533 28.5 19C28.5 24.2467 24.2467 28.5 19 28.5Z" fill="currentColor" />
            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="currentColor" />
            <path d="M19 0V19H28.5C33.7467 19 38 14.7533 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="currentColor" />
            <path d="M0 9.5C0 14.7533 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="currentColor" />
            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2467 0 28.5Z" fill="currentColor" />
          </svg>
        );

      case 'xd':
        return (
          <span className="font-mono text-[10px] font-bold tracking-tight text-slate-800">
            Xd
          </span>
        );

      case 'brief':
        return (
          <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        );

      case 'photoshop':
        return (
          <span className="font-mono text-[10px] font-bold tracking-tight text-slate-800">
            Ps
          </span>
        );

      case 'html5':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.6 4.7H4.9l.4 4.5h12.9l-.4 4.5-5.8 1.6-5.8-1.6-.2-2.7H3.9l.5 5.5 7.6 2.1 7.6-2.1 1-11.8z" />
          </svg>
        );

      case 'css3':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.6 4.7H4.9l.4 4.5h12.9l-.4 4.5-5.8 1.6-5.8-1.6-.2-2.7H3.9l.5 5.5 7.6 2.1 7.6-2.1 1-11.8z" />
          </svg>
        );

      case 'javascript':
        return (
          <span className="font-mono text-[10px] font-bold tracking-tight text-slate-900">
            JS
          </span>
        );

      case 'mjml':
        return (
          <span className="font-mono text-[9px] font-black tracking-tighter text-slate-800">
            &lt;M/&gt;
          </span>
        );

      case 'litmus':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.5a6.5 6.5 0 0 0-6.5 6.5c0 4.2 6.5 12.5 6.5 12.5s6.5-8.3 6.5-12.5a6.5 6.5 0 0 0-6.5-6.5zm0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
        );

      case 'emailonacid':
        return (
          <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
            <path d="M10 2v7.31L4 20h16l-6-10.69V2h-4z" />
            <line x1="8.5" y1="14" x2="15.5" y2="14" />
          </svg>
        );

      case 'outlook':
        return (
          <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
          </svg>
        );

      case 'hubspot':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3.5" />
            <path d="M19 10.5a2.5 2.5 0 1 0-1.8 4.2l-2.4-1.2a5.5 5.5 0 0 1-5.6 0l-2.4 1.2a2.5 2.5 0 1 0-.8 1.4l2.8-1.4a5.5 5.5 0 0 1 6.4 0l2.8 1.4a2.5 2.5 0 0 0 1-5.6z" />
            <circle cx="12" cy="4" r="2" />
          </svg>
        );

      case 'salesforce':
        return (
          <svg className="w-3.5 h-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        );

      case 'adobecampaign':
        return (
          <span className="font-mono text-[9px] font-bold tracking-tight text-slate-800">
            Ac
          </span>
        );

      default:
        return (
          <span className="font-mono text-[9px] font-bold tracking-tight text-slate-700">
            {name.slice(0, 2).toUpperCase()}
          </span>
        );
    }
  };

  return (
    <div
      className="relative group/tool"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-700 hover:text-slate-950 hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
        {renderIcon()}
      </div>

      {/* Subtle floating tooltip */}
      <div
        className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-mono whitespace-nowrap shadow-sm z-30 pointer-events-none transition-all duration-150 ${
          isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0'
        }`}
      >
        {name}
      </div>
    </div>
  );
};
