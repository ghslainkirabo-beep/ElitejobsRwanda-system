import React, { useEffect } from 'react';

export const SplashLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#1b1e24] flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 rounded-full bg-[#714b67] flex items-center justify-center animate-orb shadow-2xl">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-white text-2xl font-bold tracking-[0.3em] mt-8">ELITEJOBS RWANDA</h1>
      <p className="text-gray-400 text-xs tracking-[0.2em] mt-2 uppercase font-medium">Enterprise Hyper-Platform OS</p>
    </div>
  );
};
