import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { TactileButton } from '../UI/TactileButton';
import { gsap } from '../../animations/gsapConfig';

interface FloatingNavProps {
  onContactClick?: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onContactClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Performant scroll progress tracking across the entire website using requestAnimationFrame
  useEffect(() => {
    let rafId: number;
    let lastScrolled = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const clientHeight = window.innerHeight || document.documentElement.clientHeight || 0;

      const totalScrollable = scrollHeight - clientHeight;
      const progress = totalScrollable > 0 ? Math.min(1, Math.max(0, scrollTop / totalScrollable)) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      const scrolled = scrollTop > 40;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial calculation
    updateScrollProgress();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Animate mobile drawer
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.35,
        ease: 'power3.out',
      });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -15,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power3.in',
      });
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'Interactive', href: '#interactive-emails' },
    { label: 'Work', href: '#selected-work' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Experience', href: '#experience' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '#contact' && onContactClick) {
      onContactClick();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target as HTMLElement, { offset: -60 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-6 transition-all duration-300 pointer-events-none">
        <nav
          ref={navRef}
          className={`pointer-events-auto relative overflow-hidden flex items-center justify-between transition-all duration-300 rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 ${
            isScrolled
              ? 'w-full max-w-5xl glass-nav shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-2 sm:py-2.5 scale-[0.98]'
              : 'w-full max-w-6xl bg-white/70 backdrop-blur-md border border-black/[0.06] shadow-sm'
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand / Name */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f135] rounded-full p-1"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200/80 bg-slate-900 flex items-center justify-center text-[#c6f135] font-bold text-xs shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img
                src="/assets/nusair.jpg"
                alt="Nusair Ahamed"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-black transition-colors">
                Nusair Ahamed
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-400 hidden sm:inline uppercase font-mono">
                Senior HubSpot Specialist
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="relative text-xs lg:text-sm font-medium text-slate-600 hover:text-slate-900 px-2.5 lg:px-3.5 py-1.5 rounded-full transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f135]"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#c6f135] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </button>
            ))}
          </div>

          {/* Right Action & Mobile Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <TactileButton
              variant="lime"
              size="sm"
              href="#contact"
              onClick={() => handleNavClick('#contact')}
              icon="arrow-up-right"
              className="hidden sm:inline-flex text-xs px-4 py-2"
            >
              Let's Talk
            </TactileButton>

            {/* Circular icon menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center hover:bg-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f135]"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Subtle Horizontal Scroll-Progress Line along the bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/[0.03] pointer-events-none overflow-hidden rounded-b-full">
            <div
              ref={progressBarRef}
              className="h-full bg-[#c6f135] origin-left will-change-transform rounded-full"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden opacity-0 pointer-events-none flex flex-col justify-between p-6 pt-24"
      >
        <div className="flex flex-col gap-4 mt-6">
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            NAVIGATION
          </span>
          {navItems.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-2xl font-bold tracking-tight text-slate-900 text-left py-2 border-b border-slate-100 flex items-center justify-between group"
            >
              <span>{item.label}</span>
              <span className="text-xs font-mono text-slate-400 group-hover:text-[#c6f135]">
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-100">
          <TactileButton
            variant="lime"
            size="lg"
            href="#contact"
            onClick={() => handleNavClick('#contact')}
            className="w-full justify-center"
            icon="arrow-up-right"
          >
            Let's Talk
          </TactileButton>
          <div className="text-center text-xs text-slate-400 font-mono">
            Nusair Ahamed · Senior HubSpot Specialist
          </div>
        </div>
      </div>
    </>
  );
};
