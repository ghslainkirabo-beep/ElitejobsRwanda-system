import React, { useEffect, useState } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState<'blueprint' | 'reveal' | 'fade'>('blueprint');

  useEffect(() => {
    // Stage 1: Architectural Blueprint / Construction Grid phase
    const t1 = setTimeout(() => {
      setStage('reveal');
    }, 1800);

    // Stage 2: Final brand presentation
    const t2 = setTimeout(() => {
      setStage('fade');
    }, 3500);

    // Stage 3: Enter application
    const t3 = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-[#0A0D0C] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${stage === 'fade' ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Background Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] bg-[#CCFF00]/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* STAGE 1: ARCHITECTURAL BLUEPRINT / CONSTRUCTION GRID (Matches your reference video) */}
      {stage === 'blueprint' && (
        <div className="relative flex flex-col items-center justify-center animate-pulse space-y-6">
          <div className="relative w-36 h-36 bg-[#121816] border border-white/20 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(204,255,0,0.15)] overflow-hidden">
            {/* Grid Construction Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            
            {/* Geometric 'e' Blueprint Construction */}
            <div className="relative flex flex-col items-center">
              <div className="w-3 h-3 bg-[#CCFF00] rounded-full mb-1.5 shadow-[0_0_10px_#CCFF00]"></div>
              <div className="text-[#CCFF00] font-black text-6xl tracking-tighter select-none font-sans">
                e
              </div>
            </div>
          </div>
          <p className="text-[11px] font-mono text-gray-400 tracking-[0.35em] uppercase">
            CONSTRUCTING VECTOR GEOMETRY...
          </p>
        </div>
      )}

      {/* STAGE 2 & 3: FINAL GEOMETRIC 'e' BRAND REVEAL */}
      {stage !== 'blueprint' && (
        <div className="relative flex flex-col items-center justify-center animate-fade-in space-y-6">
          <div className="relative w-32 h-32 bg-[#121816] border border-[#CCFF00]/40 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_70px_rgba(204,255,0,0.25)]">
            <div className="w-3 h-3 bg-[#CCFF00] rounded-full mb-1 shadow-[0_0_15px_#CCFF00]"></div>
            <span className="text-white font-black text-6xl tracking-tighter select-none font-sans drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              e
            </span>
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-white text-3xl font-black tracking-tight uppercase">
              EliteJobs <span className="text-[#CCFF00]">Rwanda</span>
            </h1>
            <p className="text-gray-400 text-xs font-mono tracking-[0.3em] uppercase">
              Enterprise OS • Standalone Edition
            </p>
          </div>
        </div>
      )}

    </div>
  );
};