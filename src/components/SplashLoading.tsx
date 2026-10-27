import React, { useEffect, useState } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Fast GPU trigger on mount
    const mountFrame = requestAnimationFrame(() => {
      setMounted(true);
    });

    // Fast lock-in trigger for exit fade
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 900);

    // Complete transition at 1.2s total (responsive entrance)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => {
      cancelAnimationFrame(mountFrame);
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
      className={`fixed inset-0 z-50 bg-[#05070A] flex flex-col items-center justify-center transition-all duration-300 select-none overflow-hidden ${
        fading ? 'opacity-0 scale-105 filter blur-xs' : 'opacity-100 scale-100'
      }`}
    >
      {/* EXTREME CHROMATIC MULTI-LAYER GLOW (Electric Lime + Cyan + Hyper Magenta) */}
      <div className="absolute w-[550px] h-[550px] bg-gradient-to-tr from-[#CCFF00]/15 via-[#00F0FF]/20 to-[#FF007A]/15 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
      
      {/* SECONDARY ROTATING AURORA RING */}
      <div className="absolute w-[350px] h-[350px] bg-gradient-to-r from-[#00F0FF]/10 to-[#CCFF00]/10 rounded-full blur-[90px] pointer-events-none animate-spin" style={{ animationDuration: '6s' }}></div>

      <div className="relative w-60 h-60 flex items-center justify-center">
        {/* CHROMATIC DROP-SHADOW BEHIND LOGO */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-[#00F0FF] via-[#CCFF00] to-[#FF007A] opacity-30 rounded-full blur-2xl transition-all duration-500 transform ${
            mounted ? 'scale-100 opacity-40' : 'scale-75 opacity-0'
          }`}
        ></div>

        {/* PRIMARY 'e' LOGO SVG WITH PRISMATIC LIGHT RAYS */}
        <svg
          viewBox="0 0 200 200"
          className={`relative z-10 w-full h-full transition-all duration-500 transform ${
            mounted ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 -rotate-3'
          }`}
          style={{ 
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', 
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.4)) drop-shadow(0 0 45px rgba(204, 255, 0, 0.25))'
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* GRADIENT FOR PRISMATIC GLYPH EMBELLISHMENT */}
            <linearGradient id="electricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F0F9FF" />
              <stop offset="100%" stopColor="#CCFF00" />
            </linearGradient>
            
            <linearGradient id="dotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#CCFF00" />
            </linearGradient>
          </defs>

          {/* Floating Dot with Cyan-to-Lime Neon Fill */}
          <circle cx="75" cy="54" r="12" fill="url(#dotGrad)" className="shadow-[0_0_15px_#00F0FF]" />

          {/* Exact Primary 'e' Monogram with Electric Gradient */}
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
            fill="url(#electricGrad)"
          />
        </svg>
      </div>

      {/* BRAND TITLE WITH DYNAMIC CHROMATIC TEXT GRADIENT */}
      <div
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        className={`mt-2 transition-all duration-400 transform flex flex-col items-center z-10 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F0FF] to-[#CCFF00] text-sm font-black tracking-[0.35em] uppercase font-mono mb-4">
          ELITEJOBS<span className="text-[#CCFF00]">.RW</span>
        </h1>

        {/* HIGH-PRECISION DUAL-RING ELECTRIC SPINNER */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-transparent border-t-[#00F0FF] border-r-[#CCFF00] rounded-full animate-spin" style={{ animationDuration: '0.7s' }}></div>
          <div className="w-3 h-3 border-2 border-transparent border-b-[#FF007A] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.9s' }}></div>
        </div>
      </div>
    </div>
  );
};