import React, { useEffect, useState } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'blueprint' | 'solid' | 'fade'>('blueprint');

  useEffect(() => {
    // Snappy, fast 0.5s blueprint grid assemble
    const t1 = setTimeout(() => {
      setPhase('solid');
    }, 500);

    // Fast 1.4s solid lock-in
    const t2 = setTimeout(() => {
      setPhase('fade');
    }, 1400);

    // Complete transition at 1.8s total
    const t3 = setTimeout(() => {
      onComplete();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      className={`fixed inset-0 z-50 bg-[#0B0E14] flex flex-col items-center justify-center transition-all duration-400 select-none ${
        phase === 'fade' ? 'opacity-0 scale-105 filter blur-xs' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* EXACT PRIMARY LOGO SVG VECTOR */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* FAST BLUEPRINT GUIDES (0s - 0.5s) */}
          {phase === 'blueprint' && (
            <g className="transition-all duration-300">
              {/* Construction Grid Lines */}
              <line x1="10" y1="95" x2="60" y2="95" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
              <line x1="140" y1="95" x2="190" y2="95" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
              <line x1="95" y1="10" x2="95" y2="50" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
              <circle cx="115" cy="115" r="50" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />

              {/* Offset Blueprint Logo Segments */}
              <circle cx="72" cy="52" r="11" fill="#FFFFFF" opacity="0.8" />
              <path
                d="M 105 45 H 130 A 35 35 0 0 1 130 95 H 70 V 125 A 35 35 0 0 0 130 145 L 142 135"
                stroke="#FFFFFF"
                strokeWidth="18"
                strokeLinecap="square"
                opacity="0.75"
              />
            </g>
          )}

          {/* EXACT SOLID PRIMARY 'e' LOGO LOCK-IN (0.5s - 1.8s) */}
          {phase !== 'blueprint' && (
            <g
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              className="transition-all duration-400 transform scale-100"
            >
              {/* Floating Circular Dot */}
              <circle cx="75" cy="54" r="12" fill="#FFFFFF" />

              {/* Exact 'e' Monogram matching Primary logo@2x.png */}
              <path
                d="M 108 42
                   V 66
                   C 124 66 134 76 134 90
                   H 70
                   V 112
                   C 70 134 88 150 112 150
                   C 128 150 142 140 148 128
                   L 128 116
                   C 125 124 118 130 110 130
                   C 95 130 92 118 92 112
                   H 156
                   V 90
                   C 156 62 136 42 108 42 Z"
                fill="#FFFFFF"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Fast Brand Title Reveal */}
      <div
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        className={`mt-1 transition-all duration-300 transform ${
          phase !== 'blueprint' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <h1 className="text-white text-base font-bold tracking-[0.25em] uppercase font-mono">
          ELITEJOBS<span className="text-[#CCFF00]">.RW</span>
        </h1>
      </div>
    </div>
  );
};