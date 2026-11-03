import React, { useState } from 'react';
import { AIHealingCore } from '../AIHealingCore';
import { MeshSync } from '../MeshSync';

export const ITForgePortal: React.FC<{ username: string; protocolId: string }> = ({ username, protocolId }) => {
  const [commandInput, setCommandInput] = useState('');
  const [activeRoom, setActiveRoom] = useState<'forge_synthesis' | 'rlhf_engine' | 'runtime_logs' | 'system_immunity'>('forge_synthesis');
  const [logs, setLogs] = useState<string[]>([
    'SYSTEM INITIALIZED: Master IT Creator Core immunity active.',
    'Neural intent parser online. Listening for system optimization commands.',
    'Autonomous Self-Healing Supervisor: ACTIVE (0 exceptions caught)'
  ]);

  const handleForgeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    MeshSync.broadcastMeshPacket('IT_SUPPORT', 'FORGE_COMMAND', { command: commandInput });
    setLogs((prev) => [
      `> ${commandInput}`,
      `[NEURAL SYNTHESIZER]: Hot-patching component layout across active nodes...`,
      `[DNA LEDGER]: Block transaction signed and distributed.`,
      ...prev
    ]);
    setCommandInput('');
  };

  return (
    <div className="w-full h-screen bg-[#050711] text-[#f5f2ff] flex flex-col overflow-hidden font-sans">
      
      {/* 🍏 Apple HIG Floating Top Glass Nav */}
      <header className="h-16 w-full px-6 bg-[#0a071a]/80 backdrop-blur-2xl border-b border-purple-500/20 flex justify-between items-center z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center space-x-4">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <span className="text-sm font-black text-white">IT</span>
          </div>
          <div>
            <h1 className="flex items-center space-x-2 text-sm font-bold tracking-tight text-white">
              <span>IT Support Forge Portal</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Creator Core [{protocolId}]
              </span>
            </h1>
            <p className="text-[11px] text-purple-300/70">Master Immunity Node | Operator: <strong className="text-white">{username}</strong></p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-purple-950/60 border border-purple-500/30 px-4 py-1.5 rounded-full shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            <span className="font-mono text-xs font-bold text-purple-300">CORE IMMUNITY: 100% PROTECTED</span>
          </div>
          <div className="flex items-center justify-center text-xs font-bold text-purple-300 border rounded-full w-9 h-9 bg-purple-950/80 border-purple-500/30">
            {username.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 🗂️ Structured Sidebar Rooms */}
        <aside className="w-72 bg-[#080417]/90 backdrop-blur-xl border-r border-purple-500/20 p-5 flex flex-col justify-between z-40">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-purple-300/70 px-3 mb-3">Forge Controller Rooms</p>
              <nav className="space-y-1.5">
                <button
                  onClick={() => setActiveRoom('forge_synthesis')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'forge_synthesis'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'text-purple-300/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>⚡ Neural Intent Parser</span>
                </button>
                <button
                  onClick={() => setActiveRoom('rlhf_engine')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'rlhf_engine'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'text-purple-300/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>🧠 RLHF + HITL Feedback</span>
                </button>
                <button
                  onClick={() => setActiveRoom('runtime_logs')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'runtime_logs'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'text-purple-300/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>📜 Self-Healing Terminal</span>
                </button>
                <button
                  onClick={() => setActiveRoom('system_immunity')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'system_immunity'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'text-purple-300/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>🛡️ Core Immunity Diagnostics</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="p-4 border bg-purple-950/40 border-purple-500/20 rounded-2xl">
            <div className="flex items-center mb-1 space-x-2 text-xs font-semibold text-purple-300">
              <span className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>Developer Matrix Online</span>
            </div>
            <p className="text-[10px] text-purple-300/60">Local storage state synced with DNA ledger.</p>
          </div>
        </aside>

        {/* 🖥️ Main Canvas Area */}
        <main className="flex-1 bg-[#04030a] p-8 overflow-y-auto">
          {activeRoom === 'forge_synthesis' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Neural Intent Forge Parser</h2>
                <p className="mt-1 text-xs text-purple-300/70">Execute natural language system updates and hot-patch component modules across connected nodes.</p>
              </div>

              <div className="bg-gradient-to-br from-[#120a2a]/90 to-[#090417]/90 border border-purple-500/30 p-6 rounded-3xl shadow-2xl backdrop-blur-xl">
                <form onSubmit={handleForgeCommand} className="space-y-4">
                  <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="e.g., Optimize Front Desk reception queue for low bandwidth..."
                    className="w-full px-5 py-4 font-mono text-sm text-white border shadow-inner bg-purple-950/30 border-purple-500/30 rounded-2xl placeholder-purple-400/40 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all active:scale-[0.99]"
                  >
                    Synthesize & Hot-Patch Component Layout
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeRoom === 'rlhf_engine' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">RLHF + HITL Feedback Loop</h2>
                <p className="mt-1 text-xs text-purple-300/70">Reinforcement learning controls to weight and approve dynamic user interface synthesis.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="bg-gradient-to-br from-[#120a2a]/90 to-[#090417]/90 border border-purple-500/30 p-6 rounded-3xl shadow-2xl space-y-4">
                  <h3 className="text-sm font-bold tracking-wider uppercase text-emerald-400">Approve UI Synthesis (+1)</h3>
                  <p className="text-xs text-purple-300/70">Increases reward weight for active component layout and records validation block to cryptographic chain.</p>
                  <button
                    onClick={() => {
                      AIHealingCore.recordTransaction(protocolId, 'RLHF_APPROVAL', { rating: +1 });
                      alert('Layout Approved (+1 reward weight logged to cryptographic ledger)');
                    }}
                    className="w-full py-3 text-sm font-bold transition-all border rounded-2xl bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300"
                  >
                    Commit Layout Approval (+1)
                  </button>
                </div>

                <div className="bg-gradient-to-br from-[#120a2a]/90 to-[#090417]/90 border border-purple-500/30 p-6 rounded-3xl shadow-2xl space-y-4">
                  <h3 className="text-sm font-bold tracking-wider uppercase text-rose-400">Reject / Revert Synthesis (-1)</h3>
                  <p className="text-xs text-purple-300/70">Reduces reward weight and instantly vanishes unapproved synthesized components from render tree.</p>
                  <button
                    onClick={() => {
                      AIHealingCore.recordTransaction(protocolId, 'RLHF_REJECTION', { rating: -1 });
                      alert('Component Vanished (-1 reward weight logged to cryptographic ledger)');
                    }}
                    className="w-full py-3 text-sm font-bold transition-all border rounded-2xl bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20 text-rose-300"
                  >
                    Vanish / Revert Component (-1)
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeRoom === 'runtime_logs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">System Runtime & Self-Healing Terminal</h2>
                <p className="mt-1 text-xs text-purple-300/70">Real-time log output from autonomous exception handlers and state auto-patchers.</p>
              </div>

              <div className="bg-[#090417]/90 border border-purple-500/30 p-6 rounded-3xl shadow-2xl font-mono text-xs backdrop-blur-xl">
                <div className="pr-2 space-y-2 overflow-y-auto text-purple-200/80 max-h-96">
                  {logs.map((log, idx) => (
                    <p key={idx} className={log.startsWith('>') ? 'text-emerald-300 font-bold' : ''}>{log}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeRoom === 'system_immunity' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">IT Core Immunity Diagnostics</h2>
                <p className="mt-1 text-xs text-purple-300/70">Master security state and protection parameters.</p>
              </div>

              <div className="bg-gradient-to-br from-[#120a2a]/90 to-[#090417]/90 border border-purple-500/30 p-6 rounded-3xl shadow-2xl space-y-4">
                <h3 className="text-sm font-bold tracking-wider text-white uppercase">Immunity Lock Status</h3>
                <p className="text-xs leading-relaxed text-purple-300/70">
                  System immunity is hardcoded to 100%. IT Creator Core protocol rules cannot be overridden or purged by unauthorized client connections.
                </p>
                <div className="px-4 py-3 font-mono text-xs font-bold text-purple-300 border rounded-2xl bg-purple-950/60 border-purple-500/40">
                  ENCRYPTION: RSA-4096 / SHA-256 DNA CHAIN
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};