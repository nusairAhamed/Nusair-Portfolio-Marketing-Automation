import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/80 py-12 px-4 sm:px-6 lg:px-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div>
          <div className="text-base font-bold text-slate-900 tracking-tight mb-1">
            Nusair Ahamed
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Senior HubSpot Specialist · Marketing Hub · Email · Automation
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono font-semibold uppercase tracking-wider">
          <a
            href="https://www.linkedin.com/in/nusair-ahamed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:nus.ahamed@gmail.com"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Email ↗
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer ml-auto md:ml-4"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div>© {currentYear} Nusair Ahamed</div>
      </div>
    </footer>
  );
};

