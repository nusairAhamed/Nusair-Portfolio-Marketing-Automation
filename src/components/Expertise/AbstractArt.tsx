import React from 'react';

interface AbstractArtProps {
  type: 'build' | 'automate' | 'improve';
  className?: string;
}

export const AbstractArt: React.FC<AbstractArtProps> = ({ type, className = '' }) => {
  if (type === 'build') {
    // Mint/lime & icy-teal architectural glass curves (matching screenshot 4 card 1)
    return (
      <div className={`relative w-full h-48 overflow-hidden rounded-2xl bg-gradient-to-tr from-emerald-50 via-teal-50/50 to-white ${className}`}>
        {/* Soft atmospheric radial glow */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#C6F135]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 -left-6 w-36 h-36 bg-teal-200/50 rounded-full blur-xl pointer-events-none" />

        <svg viewBox="0 0 300 180" className="w-full h-full object-cover relative z-10" fill="none">
          {/* Glass curved plate 1 */}
          <path
            d="M 20 180 Q 80 80 180 60 L 260 90 Q 180 160 80 180 Z"
            fill="url(#glass-grad-1)"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.5"
          />
          {/* Layered translucent glass blade */}
          <path
            d="M 100 180 Q 170 60 270 40 L 300 80 Q 220 150 140 180 Z"
            fill="url(#glass-grad-2)"
            stroke="rgba(198,241,53,0.7)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="glass-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#C6F135" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="glass-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C6F135" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (type === 'automate') {
    // Glowing magenta/purple glass disc with prismatic refraction (matching screenshot 4 & 5 card 2)
    return (
      <div className={`relative w-full h-48 overflow-hidden rounded-2xl bg-gradient-to-tr from-purple-50 via-pink-50/40 to-white ${className}`}>
        <div className="absolute -top-12 -left-8 w-44 h-44 bg-purple-300/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-40 h-40 bg-fuchsia-300/30 rounded-full blur-2xl pointer-events-none" />

        <svg viewBox="0 0 300 180" className="w-full h-full object-cover relative z-10" fill="none">
          {/* Large Prismatic Disc */}
          <ellipse
            cx="170"
            cy="120"
            rx="95"
            ry="90"
            fill="url(#purple-glass-grad)"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
          />
          {/* Specular highlight rim */}
          <path
            d="M 90 120 A 90 85 0 0 1 240 70"
            stroke="url(#rainbow-specular)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <radialGradient id="purple-glass-grad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#C084FC" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#818CF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E879F9" stopOpacity="0.1" />
            </radialGradient>
            <linearGradient id="rainbow-specular" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Green / Emerald layered glass arches (matching screenshot 4 & 5 card 3)
  return (
    <div className={`relative w-full h-48 overflow-hidden rounded-2xl bg-gradient-to-tr from-emerald-50 via-teal-50 to-white ${className}`}>
      <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-200/50 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#C6F135]/40 rounded-full blur-2xl pointer-events-none" />

      <svg viewBox="0 0 300 180" className="w-full h-full object-cover relative z-10" fill="none">
        {/* Layered vertical glass arch */}
        <rect
          x="120"
          y="20"
          width="130"
          height="160"
          rx="50"
          fill="url(#green-glass-grad)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
        <rect
          x="160"
          y="40"
          width="110"
          height="140"
          rx="45"
          fill="url(#green-light-grad)"
          stroke="rgba(198,241,53,0.8)"
          strokeWidth="1.5"
        />
        {/* Specular edge flare */}
        <line x1="125" y1="70" x2="125" y2="170" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="green-glass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="green-light-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C6F135" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
