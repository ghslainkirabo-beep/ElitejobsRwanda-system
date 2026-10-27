import React, { useEffect, useState } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'blueprint' | 'solid' | 'fade'>('blueprint');

  useEffect(() => {
    // 0s to 1.5s: Technical vector & blueprint assembly phase
    const t1 = setTimeout(() => {
      setPhase('solid');
    }, 1500);

    // 1.5s to 3.8s: Solid geometric logo lock-in
    const t2 = setTimeout(() => {
      setPhase('fade');
    }, 3800);

    // 3.8s to 4.5s: Complete transition into app
    const t3 = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0B0E14] flex flex-col items-center justify-center transition-opacity duration-700 select-none ${
        phase === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* PURE VECTOR SVG MOTION MATCHING YOUR VIDEO CLIP */}
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full drop-shadow-[0_0_35px_rgba(255,255,255,0.08)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TECHNICAL BLUEPRINT GUIDE LINES & DASHED ARCS (Phase 1) */}
          {phase === 'blueprint' && (
            <g className="animate-pulse">
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
                className="transition-all duration-500"
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
          )}

          {/* SOLID GEOMETRIC LOGO LOCK-IN (Phase 2 & 3 - Matches Video Frame 00:02-00:03) */}
          {phase !== 'blueprint' && (
            <g className="transition-all duration-700 transform scale-100">
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
          )}
        </svg>
      </div>

      {/* Subtle Sleek Text Reveal */}
      <div className={`mt-2 transition-all duration-500 text-center ${phase === 'solid' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <h1 className="text-white text-xl font-bold tracking-widest uppercase font-mono">
          ELITEJOBS<span className="text-[#CCFF00]">.RW</span>
        </h1>
      </div>
    </div>
  );
};