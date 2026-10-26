import React from 'react';

interface SectionBadgeProps {
  label: string;
  className?: string;
}

export const SectionBadge: React.FC<SectionBadgeProps> = ({ label, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase ${className}`}>
      <span>{label}</span>
    </div>
  );
};
