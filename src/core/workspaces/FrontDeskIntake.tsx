import React, { useState } from 'react';
import { TelemetryBus } from '../TelemetryBus';
import { AIHealingCore } from '../AIHealingCore';
import { MeshSync } from '../MeshSync';

interface CandidateEntry {
  id: string;
  name: string;
  phone: string;
  position: string;
  feePaid: boolean;
  timestamp: string;
}

export const FrontDeskIntake: React.FC<{ username: string; protocolId: string; role?: string }> = ({ username, protocolId }) => {
  const [candidates, setCandidates] = useState<CandidateEntry[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('Software Engineer');
  const [feePaid, setFeePaid] = useState(true);
  const [activeRoom, setActiveRoom] = useState<'intake_form' | 'fee_ledger' | 'candidate_queue'>('intake_form');

  const handleRegisterCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newCandidate: CandidateEntry = {
      id: 'elr_cand_' + Math.random().toString(36).substring(2, 8),
      name,
      phone,
      position,
      feePaid,
      timestamp: new Date().toLocaleTimeString()
    };

    setCandidates([newCandidate, ...candidates]);
    TelemetryBus.emit({
      id: Math.random().toString(36).substring(2, 9),
      senderRole: 'FRONT_DESK',
      senderName: username,
      action: `REGISTERED_${name.toUpperCase()}_10000RWF`,
      timestamp: Date.now()
    });
    AIHealingCore.recordTransaction(protocolId, 'FRONT_DESK_INTAKE_FEE', newCandidate);
    MeshSync.broadcastMeshPacket('FRONT_DESK', 'NEW_CANDIDATE', newCandidate);

    setName('');
    setPhone('');
  };

  const totalFeesCollected = candidates.filter(c => c.feePaid).length * 10000;

  return (
    <div className="w-full h-screen bg-[#030f0a] text-[#f2fff9] flex flex-col overflow-hidden font-sans">
      <header className="h-16 w-full px-6 bg-[#041a12]/80 backdrop-blur-2xl border-b border-emerald-500/20 flex justify-between items-center z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center space-x-4">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <span className="text-sm font-black text-white">FD</span>
          </div>
          <div>
            <h1 className="flex items-center space-x-2 text-sm font-bold tracking-tight text-white">
              <span>Front Desk Intake</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Fee Protocol [{protocolId}]
              </span>
            </h1>
            <p className="text-[11px] text-emerald-400/70">Receptionist: <strong className="text-white">{username}</strong></p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-[#09261a] to-[#04140d] border border-emerald-500/40 px-5 py-1.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center space-x-2">
            <span className="text-[10px] uppercase text-emerald-300 font-bold">Total Cash Logged:</span>
            <span className="text-sm font-black text-emerald-400">{totalFeesCollected.toLocaleString()} RWF</span>
          </div>
          <div className="flex items-center justify-center text-xs font-bold border rounded-full w-9 h-9 bg-emerald-950/80 border-emerald-500/30 text-emerald-300">
            {username.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-[#041710]/90 backdrop-blur-xl border-r border-emerald-500/20 p-5 flex flex-col justify-between z-40">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/70 px-3 mb-3">Front Desk Rooms</p>
              <nav className="space-y-1.5">
                <button
                  onClick={() => setActiveRoom('intake_form')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'intake_form'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : 'text-emerald-300/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>📝 New Candidate Registration</span>
                </button>
                <button
                  onClick={() => setActiveRoom('candidate_queue')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'candidate_queue'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : 'text-emerald-300/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>📋 Walk-in Registry Queue</span>
                </button>
                <button
                  onClick={() => setActiveRoom('fee_ledger')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'fee_ledger'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : 'text-emerald-300/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>💰 10,000 RWF Fee Audit</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="p-4 border bg-emerald-950/40 border-emerald-500/20 rounded-2xl">
            <div className="flex items-center mb-1 space-x-2 text-xs font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Intake Terminal Active</span>
            </div>
            <p className="text-[10px] text-emerald-400/60">Candidate entries synced instantly across local mesh.</p>
          </div>
        </aside>

        <main className="flex-1 bg-[#020b07] p-8 overflow-y-auto">
          {activeRoom === 'intake_form' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">New Candidate Registration</h2>
                <p className="mt-1 text-xs text-emerald-300/70">Register physical walk-in candidates and verify payment of the mandatory 10,000 RWF fee.</p>
              </div>

              <div className="bg-gradient-to-br from-[#061f14]/90 to-[#03120b]/90 border border-emerald-500/30 p-6 rounded-3xl shadow-2xl backdrop-blur-xl max-w-xl">
                <form onSubmit={handleRegisterCandidate} className="space-y-4">
                  <div>
                    <label className="block mb-1 text-xs font-bold text-emerald-200/80">Candidate Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Jean Bosco"
                      className="w-full bg-[#020a06]/80 border border-emerald-500/30 rounded-2xl px-4 py-3 text-white placeholder-emerald-700/50 focus:outline-none focus:border-emerald-400 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs font-bold text-emerald-200/80">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., +250 780 000 000"
                      className="w-full bg-[#020a06]/80 border border-emerald-500/30 rounded-2xl px-4 py-3 text-white placeholder-emerald-700/50 focus:outline-none focus:border-emerald-400 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs font-bold text-emerald-200/80">Target Position</label>
                    <select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full bg-[#020a06]/80 border border-emerald-500/30 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400 text-sm"
                    >
                      <option value="Software Engineer">Software Engineer</option>
                      <option value="Call Center Agent">Call Center Agent</option>
                      <option value="Administrative Assistant">Administrative Assistant</option>
                      <option value="Operations Supervisor">Operations Supervisor</option>
                    </select>
                  </div>
                  <div className="flex items-center px-4 py-2 space-x-3 border bg-emerald-500/10 rounded-xl border-emerald-500/20">
                    <input
                      type="checkbox"
                      checked={feePaid}
                      onChange={(e) => setFeePaid(e.target.checked)}
                      className="w-5 h-5 rounded accent-emerald-500"
                    />
                    <span className="text-xs font-bold text-emerald-200">10,000 RWF Registration Fee Received & Verified</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all active:scale-[0.99]"
                  >
                    Register Candidate & Commit 10,000 RWF Log
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeRoom === 'candidate_queue' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Walk-in Registry Queue</h2>
                <p className="mt-1 text-xs text-emerald-300/70">Real-time candidate log feed.</p>
              </div>

              <div className="bg-gradient-to-br from-[#061f14]/90 to-[#03120b]/90 border border-emerald-500/30 p-6 rounded-3xl shadow-2xl backdrop-blur-xl">
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {candidates.length === 0 ? (
                    <p className="p-4 text-xs italic text-emerald-400/60">No candidates registered in this session yet.</p>
                  ) : (
                    candidates.map((c) => (
                      <div key={c.id} className="bg-[#020a06]/70 border border-emerald-500/20 hover:border-emerald-500/40 p-4 rounded-2xl flex justify-between items-center transition-all">
                        <div>
                          <h4 className="text-base font-bold text-white">{c.name}</h4>
                          <p className="text-xs text-emerald-300/70">{c.phone} | <span className="font-semibold text-emerald-400">{c.position}</span></p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 text-xs font-bold border rounded-full bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                            10,000 RWF Paid
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400/60 block mt-1">{c.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeRoom === 'fee_ledger' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">10,000 RWF Fee Audit Room</h2>
                <p className="mt-1 text-xs text-emerald-300/70">Financial reconciliation stats for front desk fee collection.</p>
              </div>

              <div className="bg-gradient-to-br from-[#061f14]/90 to-[#03120b]/90 border border-emerald-500/30 p-6 rounded-3xl shadow-2xl space-y-4">
                <h3 className="text-sm font-bold tracking-wider uppercase text-emerald-300">Session Total Revenue</h3>
                <p className="text-5xl font-black text-emerald-400">{totalFeesCollected.toLocaleString()} RWF</p>
                <p className="text-xs text-emerald-200/70">Total Candidates Processed: {candidates.length}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};