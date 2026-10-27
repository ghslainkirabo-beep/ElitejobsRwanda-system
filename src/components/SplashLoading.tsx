import React, { useEffect, useState } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState<'fisheye' | 'forge' | 'fade'>('fisheye');

  useEffect(() => {
    // Stage 1: Extreme Fisheye warp motion (matches video 1)
    const t1 = setTimeout(() => {
      setStage('forge');
    }, 1500);

    // Stage 2: Brand logo forge & reveal (matches video 2 geometry)
    const t2 = setTimeout(() => {
      setStage('fade');
    }, 3200);

    // Stage 3: Complete and enter app
    const t3 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-[#0A0D0C] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${stage === 'fade' ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-[#CCFF00]/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      {/* STAGE 1: EXTREME FISHEYE WARP MOTION */}
      {stage === 'fisheye' && (
        <div className="relative flex flex-col items-center justify-center animate-scale-up">
          <div className="relative px-12 py-6 rounded-full bg-[#121816]/80 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(204,255,0,0.15)] transform scale-125 rotate-[-3deg] transition-transform duration-700">
            <span className="text-4xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CCFF00] to-white uppercase font-mono">
              ELITEJOBS RWANDA
            </span>
          </div>
          <p className="text-[11px] font-mono text-gray-400 tracking-[0.3em] uppercase mt-6 animate-pulse">
            INITIALIZING ENTERPRISE KERNEL...
          </p>
        </div>
      )}

      {/* STAGE 2: GEOMETRIC LOGO FORGE (Arangon/EliteJobs Style) */}
      {stage !== 'fisheye' && (
        <div className="relative flex flex-col items-center justify-center animate-fade-in">
          {/* Geometric Custom Monogram Emblem */}
          <div className="relative w-28 h-28 bg-[#121816] border border-[#CCFF00]/40 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(204,255,0,0.25)] transform rotate-[-6deg] hover:rotate-0 transition-all duration-500">
            <div className="absolute inset-2 border border-white/10 rounded-2xl"></div>
            {/* Precision Forged Geometric 'E' / 'A' Glyph */}
            <span className="text-[#CCFF00] font-black text-6xl tracking-tighter select-none drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">
              E
            </span>
          </div>

          <div className="mt-8 text-center space-y-2">
            <h1 className="text-white text-3xl font-black tracking-tight uppercase">
              EliteJobs <span className="text-[#CCFF00]">Rwanda</span>
            </h1>
            <p className="text-gray-400 text-xs font-mono tracking-[0.25em] uppercase">
              Enterprise OS • Zero-Cost Standalone Edition
            </p>
          </div>
        </div>
      )}

    </div>
  );
};