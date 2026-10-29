import React, { useState, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import { FloatingNav } from './components/Navigation/FloatingNav';
import { Hero } from './components/Hero/Hero';
import { InteractiveEmails } from './components/InteractiveEmails/InteractiveEmails';
import { SelectedWork } from './components/SelectedWork/SelectedWork';
import { About } from './components/About/About';
import { ProcessTimeline } from './components/Process/ProcessTimeline';
import { Experience } from './components/Experience/Experience';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { PasswordGate } from './components/PasswordGate/PasswordGate';

const STORAGE_KEY = 'portfolio_preview_auth';

const checkInitialAuth = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return (
      localStorage.getItem(STORAGE_KEY) === 'granted' ||
      sessionStorage.getItem(STORAGE_KEY) === 'granted'
    );
  } catch {
    return false;
  }
};

/**
 * Main portfolio layout with Lenis smooth scrolling active
 */
const MainPortfolio: React.FC = () => {
  // Initialize smooth Lenis scrolling synced with GSAP ScrollTrigger
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFB] text-[#0F172A] selection:bg-[#C6F135] selection:text-[#0F172A]">
      {/* Minimal Floating Navigation */}
      <FloatingNav />

      {/* Main Portfolio Flow */}
      <main className="flex-1">
        {/* 01 — Hero (with embedded platform logos moving slider) */}
        <Hero />

        {/* 02 — Interactive Email Experiences */}
        <InteractiveEmails />

        {/* 03 — Selected Work (Large Editorial Visuals & Lightbox) */}
        <SelectedWork />

        {/* 04 — About & Philosophy */}
        <About />

        {/* 05 — Process Timeline (Vertical Editorial Steps) */}
        <ProcessTimeline />

        {/* 06 — Professional Experience */}
        <Experience />

        {/* 07 — Contact CTA */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkInitialAuth);

  const handleUnlock = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <PasswordGate onUnlock={handleUnlock} />;
  }

  return <MainPortfolio />;
};

export default App;
