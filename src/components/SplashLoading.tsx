import React, { useEffect, useState } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Immediate GPU trigger on mount
    requestAnimationFrame(() => {
      setMounted(true);
    });

    // Fast 0.8s lock-in trigger for exit fade
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 800);

    // Complete transition at 1.1s total (instant & responsive)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform, filter',
      }}
      className={`fixed inset-0 z-50 bg-[#0B0E14] flex flex-col items-center justify-center transition-all duration-300 select-none ${
        fading ? 'opacity-0 scale-105 filter blur-xs' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Backdrop Blur Glow */}
      <div className="absolute w-[400px] h-[400px] bg-[#CCFF00]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* EXACT PRIMARY LOGO SVG WITH GPU-ACCELERATED APPLE MOTION */}
        <svg
          viewBox="0 0 200 200"
          className={`w-full h-full drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-500 transform ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform, opacity' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Floating Circular Dot */}
          <circle cx="75" cy="54" r="12" fill="#FFFFFF" />

          {/* Exact Primary 'e' Monogram matching Primary logo@2x.png */}
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
        </svg>
      </div>

      {/* Instant Sleek Brand Text Reveal */}
      <div
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        className={`mt-1 transition-all duration-400 transform ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <h1 className="text-white text-sm font-bold tracking-[0.3em] uppercase font-mono">
          ELITEJOBS<span className="text-[#CCFF00]">.RW</span>
        </h1>
      </div>
    </div>
  );
};