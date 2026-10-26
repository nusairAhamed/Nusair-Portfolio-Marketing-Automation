import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface TactileButtonProps {
  children: React.ReactNode;
  variant?: 'lime' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  icon?: 'arrow-up-right' | 'arrow-right' | 'none';
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  children,
  variant = 'lime',
  size = 'md',
  href,
  onClick,
  icon = 'arrow-up-right',
  className = '',
  target,
  rel,
  ariaLabel,
}) => {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-medium tracking-tight rounded-full tactile-btn cursor-pointer select-none transition-all duration-200';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5 font-semibold',
  };

  const variantStyles = {
    lime: 'bg-[#C6F135] text-[#0F172A] font-semibold hover:bg-[#baf01f] shadow-[0_4px_14px_rgba(198,241,53,0.35)] hover:shadow-[0_6px_20px_rgba(198,241,53,0.5)] border border-[#b4e622]',
    secondary:
      'bg-white/90 text-slate-800 border border-slate-200/90 hover:bg-white hover:border-slate-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
    dark: 'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_4px_14px_rgba(15,23,42,0.25)] border border-slate-800',
    ghost: 'bg-transparent text-slate-700 hover:text-slate-900 hover:bg-black/[0.04]',
  };

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const renderIcon = () => {
    if (icon === 'arrow-up-right') {
      return (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      );
    }
    if (icon === 'arrow-right') {
      return (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      );
    }
    return null;
  };

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
      >
        <span>{children}</span>
        {renderIcon()}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClass} aria-label={ariaLabel}>
      <span>{children}</span>
      {renderIcon()}
    </button>
  );
};
