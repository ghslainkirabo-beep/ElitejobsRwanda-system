import React, { useEffect, useState } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 700); // Wait for fade out transition
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-[#0B0F0E] flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative flex items-center justify-center">
        {/* Geometric Logo Emblem */}
        <div className="w-20 h-20 bg-[#CCFF00] rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(204,255,0,0.3)] transform rotate-6 animate-pulse">
          <span className="text-[#0B0F0E] font-black text-4xl tracking-tighter">E</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h1 className="text-white text-2xl font-bold tracking-widest uppercase">EliteJobs</h1>
        <p className="text-[#CCFF00] text-xs font-mono tracking-widest mt-1 uppercase">Rwanda Enterprise OS</p>
      </div>
    </div>
  );
};