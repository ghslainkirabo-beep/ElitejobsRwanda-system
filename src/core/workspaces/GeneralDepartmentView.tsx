import React, { useState } from 'react';
import { TelemetryBus } from '../TelemetryBus';
import { AIHealingCore } from '../AIHealingCore';

export const GeneralDepartmentView: React.FC<{ username: string; protocolId: string; role?: string }> = ({ username, protocolId }) => {
  const [departmentNotes, setDepartmentNotes] = useState<string[]>([
    'HR Department: 14 new employment contracts ready for sign-off.',
    'Operations: Kigali central office workspace hardware synchronized.',
    'Vetting Officers: Background checks verified for recruitment batch 04.'
  ]);
  const [newNote, setNewNote] = useState('');
  const [activeRoom, setActiveRoom] = useState<'broadcast_memos' | 'vetting_status' | 'policy_board'>('broadcast_memos');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setDepartmentNotes([newNote, ...departmentNotes]);
    TelemetryBus.emit({
      id: Math.random().toString(36).substring(2, 9),
      senderRole: 'GENERAL_DEPT',
      senderName: username,
      action: `BROADCAST_MEMO_${newNote.substring(0, 15).toUpperCase()}`,
      timestamp: Date.now()
    });
    AIHealingCore.recordTransaction(protocolId, 'DEPT_MEMO', { note: newNote });
    setNewNote('');
  };

  return (
    <div className="w-full h-screen bg-[#090710] text-[#f8fafc] flex flex-col overflow-hidden font-sans">
      <header className="h-16 w-full px-6 bg-[#120e1f]/80 backdrop-blur-2xl border-b border-slate-700/40 flex justify-between items-center z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center space-x-4">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-slate-600 to-slate-400 flex items-center justify-center shadow-[0_0_15px_rgba(203,213,225,0.3)]">
            <span className="text-sm font-black text-white">HR</span>
          </div>
          <div>
            <h1 className="flex items-center space-x-2 text-sm font-bold tracking-tight text-white">
              <span>General Department Hub (HR & Vetting)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-700/40 text-slate-300 border border-slate-600/40">
                Policy Sync [{protocolId}]
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Officer: <strong className="text-white">{username}</strong></p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="px-4 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs font-mono font-bold">
            PROTOCOL STATUS: ACTIVE
          </div>
          <div className="flex items-center justify-center text-xs font-bold border rounded-full w-9 h-9 bg-slate-800 border-slate-700 text-slate-300">
            {username.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-[#0d0a17]/90 backdrop-blur-xl border-r border-slate-700/40 p-5 flex flex-col justify-between z-40">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 mb-3">Department Rooms</p>
              <nav className="space-y-1.5">
                <button
                  onClick={() => setActiveRoom('broadcast_memos')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'broadcast_memos'
                      ? 'bg-slate-700 text-white shadow-lg'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>📢 Broadcast Department Memos</span>
                </button>
                <button
                  onClick={() => setActiveRoom('policy_board')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'policy_board'
                      ? 'bg-slate-700 text-white shadow-lg'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>📋 Active Policy Stream</span>
                </button>
                <button
                  onClick={() => setActiveRoom('vetting_status')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'vetting_status'
                      ? 'bg-slate-700 text-white shadow-lg'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>🛡️ Vetting & Background Checks</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="p-4 border bg-slate-800/40 border-slate-700/40 rounded-2xl">
            <div className="flex items-center mb-1 space-x-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span>Cross-Sync Active</span>
            </div>
            <p className="text-[10px] text-slate-400">Policy memos synced across local network.</p>
          </div>
        </aside>

        <main className="flex-1 bg-[#05040a] p-8 overflow-y-auto">
          {activeRoom === 'broadcast_memos' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Broadcast Department Memo</h2>
                <p className="mt-1 text-xs text-slate-400">Publish cross-department memos to all connected workstations.</p>
              </div>

              <div className="bg-gradient-to-br from-[#13101c]/90 to-[#0b0914]/90 border border-slate-700/40 p-6 rounded-3xl shadow-2xl backdrop-blur-xl max-w-xl">
                <form onSubmit={handleAddNote} className="space-y-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Type cross-department policy update or broadcast memo..."
                    className="w-full bg-[#05040a]/80 border border-slate-700/40 rounded-2xl p-4 text-white placeholder-slate-500/50 focus:outline-none focus:border-slate-400 text-sm h-36 resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-900 font-bold text-white shadow-xl hover:bg-slate-800 transition-all active:scale-[0.99]"
                  >
                    Broadcast Memo to Mesh
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeRoom === 'policy_board' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Active Policy Stream</h2>
                <p className="mt-1 text-xs text-slate-400">Live synchronized policy notes feed.</p>
              </div>

              <div className="bg-gradient-to-br from-[#13101c]/90 to-[#0b0914]/90 border border-slate-700/40 p-6 rounded-3xl shadow-2xl backdrop-blur-xl">
                <div className="pr-2 space-y-3 overflow-y-auto max-h-96">
                  {departmentNotes.map((note, idx) => (
                    <div key={idx} className="bg-[#05040a]/70 border border-slate-700/30 p-4 rounded-2xl text-sm text-slate-200 flex items-center justify-between">
                      <span>{note}</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
                        Synced
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeRoom === 'vetting_status' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Vetting & Background Checks</h2>
                <p className="mt-1 text-xs text-slate-400">Background check audit metrics.</p>
              </div>

              <div className="bg-gradient-to-br from-[#13101c]/90 to-[#0b0914]/90 border border-slate-700/40 p-6 rounded-3xl shadow-2xl space-y-4">
                <h3 className="text-sm font-bold tracking-wider uppercase text-slate-300">Vetting Officer Status</h3>
                <p className="text-3xl font-black text-emerald-400">100% VERIFIED</p>
                <p className="text-xs text-slate-400">All background check records cryptographically chained.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};