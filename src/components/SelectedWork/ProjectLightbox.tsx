import React, { useEffect, useRef } from 'react';
import { EmailBuild } from '../../data/projects';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { stopLenis, startLenis } from '../../hooks/useLenis';

interface ProjectLightboxProps {
  project: EmailBuild | null;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  currentIndex,
  totalCount,
  onClose,
  onNext,
  onPrev,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Stop Lenis smooth scroll and lock background document scroll
  useEffect(() => {
    if (!project) return;

    // Pause Lenis smooth scroll engine
    stopLenis();

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && totalCount > 1) onNext();
      if (e.key === 'ArrowLeft' && totalCount > 1) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Resume Lenis smooth scroll engine
      startLenis();
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, totalCount, onClose, onNext, onPrev]);

  // Reset scroll position on project change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [project]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-slate-950/55 backdrop-blur-sm animate-in fade-in duration-200"
      style={{ overscrollBehavior: 'contain' }}
    >
      {/* Centered Minimal Portfolio Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        className="relative w-full max-w-[648px] h-[88vh] max-h-[88vh] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.3)] flex flex-col overflow-hidden mx-auto"
      >
        {/* Minimal Clean Header Bar (No title text) */}
        <div className="shrink-0 px-4 sm:px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-end z-10 select-none">
          <div className="flex items-center gap-2">
            {/* Minimal Prev/Next buttons if multiple images exist */}
            {totalCount > 1 && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  type="button"
                  onClick={onPrev}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Previous (Left Arrow)"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-slate-400 select-none px-1">
                  {currentIndex + 1}/{totalCount}
                </span>
                <button
                  type="button"
                  onClick={onNext}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Next (Right Arrow)"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Simple Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:px-3 sm:py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
              title="Close (ESC)"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Email Image Area - Strict Lenis Prevention & Native Scroll */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#FBFBFB] focus:outline-hidden"
          style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
        >
          <div className="w-full max-w-[600px] bg-white rounded-xl sm:rounded-2xl border border-slate-200/70 shadow-xs overflow-hidden mx-auto">
            <img
              src={project.fullImage}
              alt={project.title}
              className="w-full max-w-[600px] h-auto block select-text mx-auto"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
