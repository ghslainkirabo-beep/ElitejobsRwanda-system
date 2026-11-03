import React, { useState, useEffect } from 'react';
import { AdminHub } from './workspaces/AdminHub';
import { ITForgePortal } from './workspaces/ITForgePortal';
import { FrontDeskIntake } from './workspaces/FrontDeskIntake';
import { CallCenterHub } from './workspaces/CallCenterHub';
import { GeneralDepartmentView } from './workspaces/GeneralDepartmentView';
import { AIHealingCore } from './AIHealingCore';

interface SessionData {
  u: string; // username
  r: string; // role
  t: number; // timestamp
}

const STORAGE_KEY = 'elite_jobs_rwanda_bind_v1';
const ROLES = ['Receptionist', 'Admin', 'IT Support', 'Front Desk', 'Call Center', 'HR Manager', 'Operational Manager'];

export const AppEngine: React.FC = () => {
  const [boundSession, setBoundSession] = useState<SessionData | null>(null);
  const [stageState, setStageState] = useState<'splash' | 'onboarding' | 'island' | 'workspace'>('splash');
  
  // Onboarding form state
  const [usernameInput, setUsernameInput] = useState('');
  const [selectedRoleIn, setSelectedRoleIn] = useState<string | null>(null);
  const [selectedRoleUp, setSelectedRoleUp] = useState<string | null>(null);
  const [cardMode, setCardMode] = useState<'in' | 'up'>('in');
  const [errorMessage, setErrorMessage] = useState('');

  // Check persistent device binding on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: SessionData = JSON.parse(stored);
        setBoundSession(parsed);
      }
    } catch (e) {
      console.error('Failed to load device bind session:', e);
    }
  }, []);

  const handleStartInteraction = async () => {
    if (stageState !== 'splash') return;
    
    // Play startup sequence
    setStageState('island');
    
    const existingSession = localStorage.getItem(STORAGE_KEY);
    if (existingSession) {
      // Second time visit: skip form and go straight to welcome home state
      try {
        const parsed: SessionData = JSON.parse(existingSession);
        setBoundSession(parsed);
        setTimeout(() => {
          setStageState('workspace');
        }, 2200);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
        setStageState('onboarding');
      }
    } else {
      // First time visit: show setup onboarding form
      setTimeout(() => {
        setStageState('onboarding');
      }, 1200);
    }
  };

  const handleFirstFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim() || !selectedRoleIn) return;
    setCardMode('up');
  };

  const handleConfirmFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRoleUp !== selectedRoleIn) {
      setErrorMessage("That's not the position you chose. Choose it again.");
      setSelectedRoleUp(null);
      return;
    }

    // Save session binding permanently for future visits
    const newSession: SessionData = {
      u: usernameInput.trim(),
      r: selectedRoleIn,
      t: Date.now()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
    } catch (e) {
      console.error('Failed to save session:', e);
    }

    setBoundSession(newSession);
    setStageState('island');

    setTimeout(() => {
      setStageState('workspace');
    }, 2500);
  };

  const handleUnlinkDevice = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setBoundSession(null);
    setUsernameInput('');
    setSelectedRoleIn(null);
    setSelectedRoleUp(null);
    setCardMode('in');
    setStageState('splash');
  };

  // Render workspace based on assigned role
  const renderWorkspace = () => {
    if (!boundSession) return null;
    const protocolId = AIHealingCore.generateProtocolId();
    const roleLower = boundSession.r.toLowerCase();

    if (roleLower.includes('admin')) {
      return <AdminHub username={boundSession.u} protocolId={protocolId} />;
    }
    if (roleLower.includes('it')) {
      return <ITForgePortal username={boundSession.u} protocolId={protocolId} />;
    }
    if (roleLower.includes('front desk') || roleLower.includes('receptionist')) {
      return <FrontDeskIntake username={boundSession.u} protocolId={boundSession.u} />;
    }
    if (roleLower.includes('call')) {
      return <CallCenterHub username={boundSession.u} protocolId={protocolId} />;
    }
    return <GeneralDepartmentView username={boundSession.u} protocolId={protocolId} />;
  };

  if (stageState === 'workspace' && boundSession) {
    return (
      <div className="relative w-full h-screen">
        {renderWorkspace()}
        {/* Floating demo unlinker for testing second-time vs first-time transitions */}
        <button
          onClick={handleUnlinkDevice}
          className="fixed bottom-3 right-3 z-[9999] px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white/70 hover:text-white transition-all shadow-lg"
          title="Demo: Unlink this device to test first-time onboarding again"
        >
          Demo: Unlink Device
        </button>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-screen bg-[#07050e] text-[#f5f2ff] font-sans relative overflow-hidden flex items-center justify-center cursor-pointer select-none"
      onClick={stageState === 'splash' ? handleStartInteraction : undefined}
    >
      {/* Background Aurora Glows */}
      <div className="absolute inset-[-20%] filter blur-[80px] opacity-40 pointer-events-none">
        <div className="absolute w-[60vmax] h-[60vmax] rounded-full bg-[#5b3f9e] left-[-10%] top-[-10%] animate-pulse" />
        <div className="absolute w-[60vmax] h-[60vmax] rounded-full bg-[#3b6cf0] right-[-15%] bottom-[-20%] animate-pulse" />
      </div>

      {/* Splash Screen Tap Prompt */}
      {stageState === 'splash' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#7b5cc4] to-[#4a3187] flex items-center justify-center shadow-[0_20px_50px_rgba(110,70,220,0.55)] mb-6 animate-bounce">
            <span className="font-serif text-4xl font-black text-white">E</span>
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">Elite Jobs Rwanda</h1>
          <p className="text-sm text-[#9b94b5] animate-pulse">Touch anywhere to begin</p>
        </div>
      )}

      {/* Dynamic Island / Transition Loader */}
      {stageState === 'island' && (
        <div className="absolute inset-0 z-30 flex items-center justify-center transition-all bg-black/70 backdrop-blur-xl">
          <div className="w-[360px] h-[90px] rounded-[32px] bg-[#050505] border border-white/10 shadow-[0_26px_60px_rgba(0,0,0,0.6)] flex items-center justify-center px-6 space-x-4 animate-scaleUp">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7b5cc4] to-[#4a3187] flex items-center justify-center text-white font-bold">E</div>
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-[#8dffa6]">EliteJobsRwanda</p>
              <p className="text-sm font-semibold text-white">
                {boundSession ? `Welcome back, ${boundSession.u}` : 'Initializing Secure Ecosystem...'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* First-Time Onboarding Form Card */}
      {stageState === 'onboarding' && (
        <div 
          className="relative w-[min(920px,90%)] h-[min(520px,85%)] bg-[#14101f] rounded-[30px] border border-white/16 shadow-[0_40px_100px_rgba(40,20,100,0.35)] overflow-hidden z-20 flex"
          onClick={(e) => e.stopPropagation()}
        >
          {cardMode === 'in' ? (
            <form onSubmit={handleFirstFormSubmit} className="w-full md:w-[54%] p-8 md:p-12 flex flex-col justify-center space-y-4 overflow-y-auto">
              <h2 className="text-2xl font-bold tracking-tight text-white">Create account</h2>
              <p className="text-xs text-[#9b94b5]">Your name and your position. That's all.</p>
              
              <label className="text-xs font-semibold text-white/80">Username</label>
              <input
                type="text"
                maxlength={24}
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Type your username"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#8a63f0]"
                required
              />

              <label className="text-xs font-semibold text-white/80">Your position</label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRoleIn(r)}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      selectedRoleIn === r
                        ? 'bg-gradient-to-r from-[#8a63f0] to-[#5b3f9e] text-white border-transparent scale-105'
                        : 'bg-white/5 border-white/10 text-[#9b94b5] hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={!usernameInput.trim() || !selectedRoleIn}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8a63f0] to-[#5b3f9e] text-white font-semibold disabled:opacity-40 shadow-lg"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleConfirmFormSubmit} className="w-full md:w-[54%] p-8 md:p-12 flex flex-col justify-center space-y-4 overflow-y-auto">
              <h2 className="text-2xl font-bold tracking-tight text-white">Confirm</h2>
              <p className="text-xs text-[#9b94b5]">Choose your position again to confirm it's you.</p>

              <label className="text-xs font-semibold text-white/80">Your position</label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => { setSelectedRoleUp(r); setErrorMessage(''); }}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      selectedRoleUp === r
                        ? 'bg-gradient-to-r from-[#8a63f0] to-[#5b3f9e] text-white border-transparent scale-105'
                        : 'bg-white/5 border-white/10 text-[#9b94b5] hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}

              <button
                type="submit"
                disabled={!selectedRoleUp}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8a63f0] to-[#5b3f9e] text-white font-semibold disabled:opacity-40 shadow-lg"
              >
                We together
              </button>

              <button
                type="button"
                onClick={() => setCardMode('in')}
                className="text-xs text-[#9b94b5] underline underline-offset-4 text-center mt-2"
              >
                Change my details
              </button>
            </form>
          )}

          {/* Right decorative blade panel */}
          <div className="hidden md:flex flex-col justify-end p-10 w-[46%] bg-gradient-to-br from-[#3d2790] via-[#1e1245] to-[#120a2b] text-white">
            <h3 className="mb-2 text-3xl font-bold">Set up once.</h3>
            <p className="max-w-xs text-xs text-white/70">Your name and position. After this, no more sign-in on this device[cite: 1].</p>
          </div>
        </div>
      )}
    </div>
  );
};