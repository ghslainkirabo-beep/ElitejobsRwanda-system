import React, { useEffect, useState } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'blueprint' | 'solid' | 'fade'>('blueprint');

  useEffect(() => {
    // Phase 1: Blueprint assembly
    const t1 = setTimeout(() => {
      setPhase('solid');
    }, 1600);

    // Phase 2: Smooth transition
    const t2 = setTimeout(() => {
      setPhase('fade');
    }, 3800);

    // Phase 3: Complete
    const t3 = setTimeout(() => {
      onComplete();
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      className={`fixed inset-0 z-50 bg-[#0A0D0C] flex flex-col items-center justify-center transition-all duration-1000 select-none ${
        phase === 'fade' ? 'opacity-0 scale-105 filter blur-sm' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Glow with Smooth Pulse */}
      <div className="absolute w-[500px] h-[500px] bg-[#CCFF00]/5 rounded-full blur-[140px] pointer-events-none transition-all duration-1000"></div>

      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* PURE APPLE-SMOOTH VECTOR SVG MOTION */}
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full drop-shadow-[0_0_40px_rgba(255,255,255,0.06)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* PHASE 1: BLUEPRINT CONSTRUCTION */}
          <g
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            className={`transition-all duration-1000 transform ${
              phase === 'blueprint' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-95 -rotate-3'
            }`}
          >
            {/* Horizontal guide lines */}
            <line x1="10" y1="140" x2="80" y2="140" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="220" y1="140" x2="290" y2="140" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="10" y1="160" x2="60" y2="160" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.5" />
            
            {/* Concentric construction circles */}
            <circle cx="150" cy="165" r="75" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.25" />
            <circle cx="150" cy="165" r="45" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.2" />

            {/* Offset animated top curve arc */}
            <path
              d="M 120 115 A 55 55 0 0 1 225 145"
              stroke="#FFFFFF"
              strokeWidth="24"
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />

            {/* Offset lower curve arc */}
            <path
              d="M 105 160 Q 105 220 170 220 Q 220 220 225 185"
              stroke="#FFFFFF"
              strokeWidth="22"
              strokeDasharray="4 4"
              strokeOpacity="0.75"
            />

            {/* Displaced Circle Dot */}
            <circle cx="108" cy="95" r="14" fill="#FFFFFF" fillOpacity="0.9" />
          </g>

          {/* PHASE 2: SOLID GEOMETRY LOCK-IN */}
          <g
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            className={`absolute inset-0 transition-all duration-1000 transform ${
              phase !== 'blueprint' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-105 rotate-3'
            }`}
          >
            {/* Signature Top Left Circular Dot */}
            <circle cx="115" cy="98" r="15" fill="#FFFFFF" />

            {/* Geometric Curved 'e' Monogram */}
            <path
              d="M 115 142 
                 H 220 
                 A 52 52 0 0 0 116 142 
                 C 100 170 102 218 152 220 
                 C 192 222 215 200 222 175
                 L 190 175
                 C 185 190 172 200 152 198
                 C 128 196 126 168 140 152 Z"
              fill="#FFFFFF"
              fillRule="evenodd"
            />
          </g>
        </svg>
      </div>

      {/* Sleek Brand Title Fade-In */}
      <div
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        className={`mt-3 transition-all duration-1000 text-center transform ${
          phase !== 'blueprint' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
        }`}
      >
        <h1 className="text-white text-lg font-bold tracking-[0.2em] uppercase font-mono">
          ELITEJOBS<span className="text-[#CCFF00]">.RW</span>
        </h1>
      </div>
    </div>
  );
};