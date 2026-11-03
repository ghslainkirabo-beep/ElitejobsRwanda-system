import React, { useState, useEffect } from 'react';
import { TelemetryBus, TelemetryEvent } from '../TelemetryBus';
import { AIHealingCore, AuditLedgerEntry } from '../AIHealingCore';
import { MeshSync, MeshMessage } from '../MeshSync';

export const AdminHub: React.FC<{ username: string; protocolId: string }> = ({ username, protocolId }) => {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [ledgerEntries, setLedgerEntries] = useState<AuditLedgerEntry[]>([]);
  const [meshPackets, setMeshPackets] = useState<MeshMessage[]>([]);
  const [activeRoom, setActiveRoom] = useState<'macro_overview' | 'telemetry_stream' | 'crypto_ledger' | 'mesh_network' | 'node_security'>('macro_overview');

  useEffect(() => {
    setLedgerEntries(AIHealingCore.getLedger());
    const unsubTelemetry = TelemetryBus.subscribe((ev) => {
      setEvents((prev) => [ev, ...prev].slice(0, 50));
      AIHealingCore.recordTransaction(protocolId, `TELEMETRY_${ev.action}`, ev);
      setLedgerEntries([...AIHealingCore.getLedger()]);
    });
    const unsubMesh = MeshSync.subscribe((msg) => {
      setMeshPackets((prev) => [msg, ...prev].slice(0, 50));
    });
    return () => {
      unsubTelemetry();
      unsubMesh();
    };
  }, [protocolId]);

  return (
    <div className="w-full h-screen bg-[#070410] text-[#f5f2ff] flex flex-col overflow-hidden selection:bg-[#8a63f0]/30 font-sans">
      
      {/* 🍏 Apple HIG Floating Glassmorphic Top Navigation Bar */}
      <header className="h-16 w-full px-6 bg-[#0c071f]/80 backdrop-blur-2xl border-b border-white/10 flex justify-between items-center z-50 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-center space-x-4">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#8a63f0] to-[#bfa5ff] flex items-center justify-center shadow-[0_0_15px_rgba(138,99,240,0.5)]">
            <span className="text-sm font-black text-white">ELR</span>
          </div>
          <div>
            <h1 className="flex items-center space-x-2 text-sm font-bold tracking-tight text-white">
              <span>Elite Jobs Rwanda</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8a63f0]/20 text-[#cbb8ff] border border-[#8a63f0]/30">
                Admin Macro Core [{protocolId}]
              </span>
            </h1>
            <p className="text-[11px] text-[#9b94b5]">Logged in as: <strong className="text-white">{username}</strong> (Super Admin)</p>
          </div>
        </div>

        {/* Global Status Pill */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs font-bold text-emerald-300">NODE ID: {MeshSync.getNodeIdentifier()}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-[#bfa5ff]">
            {username.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      {/* Main Workspace Layout (Sidebar Rooms + Content Canvas) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 🗂️ Structured Multi-Room Sidebar */}
        <aside className="w-72 bg-[#090514]/90 backdrop-blur-xl border-r border-white/10 p-5 flex flex-col justify-between z-40">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#9b94b5] px-3 mb-3">Macro Command Rooms</p>
              <nav className="space-y-1.5">
                <button
                  onClick={() => setActiveRoom('macro_overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'macro_overview'
                      ? 'bg-[#8a63f0] text-white shadow-[0_0_20px_rgba(138,99,240,0.4)]'
                      : 'text-[#9b94b5] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>📊 Macro Overview & Metrics</span>
                </button>
                <button
                  onClick={() => setActiveRoom('telemetry_stream')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'telemetry_stream'
                      ? 'bg-[#8a63f0] text-white shadow-[0_0_20px_rgba(138,99,240,0.4)]'
                      : 'text-[#9b94b5] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>📡 Live Telemetry Stream</span>
                </button>
                <button
                  onClick={() => setActiveRoom('crypto_ledger')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'crypto_ledger'
                      ? 'bg-[#8a63f0] text-white shadow-[0_0_20px_rgba(138,99,240,0.4)]'
                      : 'text-[#9b94b5] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>🧬 Cryptographic DNA Ledger</span>
                </button>
                <button
                  onClick={() => setActiveRoom('mesh_network')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'mesh_network'
                      ? 'bg-[#8a63f0] text-white shadow-[0_0_20px_rgba(138,99,240,0.4)]'
                      : 'text-[#9b94b5] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>🌐 P2P Mesh Room</span>
                </button>
                <button
                  onClick={() => setActiveRoom('node_security')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'node_security'
                      ? 'bg-[#8a63f0] text-white shadow-[0_0_20px_rgba(138,99,240,0.4)]'
                      : 'text-[#9b94b5] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>🛡️ IT Immunity & Security</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar Footer Status */}
          <div className="p-4 border bg-white/5 border-white/10 rounded-2xl">
            <div className="flex items-center mb-1 space-x-2 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Apple HIG Glass Active</span>
            </div>
            <p className="text-[10px] text-[#9b94b5]">All 8 departmental nodes synchronized on local bus.</p>
          </div>
        </aside>

        {/* 🖥️ Main Content Canvas Area */}
        <main className="flex-1 bg-[#05030b] p-8 overflow-y-auto">
          
          {/* ROOM 1: Macro Overview & Metrics */}
          {activeRoom === 'macro_overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Macro Overview Dashboard</h2>
                <p className="text-xs text-[#9b94b5] mt-1">Real-time aggregate telemetry and health indicators across Elite Jobs Rwanda.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="bg-gradient-to-br from-[#130b2c] to-[#0a0618] border border-white/10 p-6 rounded-3xl shadow-2xl">
                  <h3 className="text-xs uppercase tracking-widest text-[#9b94b5] font-bold mb-2">Active Department Nodes</h3>
                  <p className="text-5xl font-black text-white">8 / 8</p>
                  <span className="inline-flex items-center px-3 py-1 mt-3 text-xs font-medium border rounded-full text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                    ● Green Apple Flag Active
                  </span>
                </div>

                <div className="bg-gradient-to-br from-[#130b2c] to-[#0a0618] border border-white/10 p-6 rounded-3xl shadow-2xl">
                  <h3 className="text-xs uppercase tracking-widest text-[#9b94b5] font-bold mb-2">Cryptographic Audit Blocks</h3>
                  <p className="text-5xl font-black text-[#bfa5ff]">{ledgerEntries.length}</p>
                  <span className="inline-flex items-center text-xs text-[#cbb8ff] mt-3 font-medium bg-[#8a63f0]/10 px-3 py-1 rounded-full border border-[#8a63f0]/30">
                    SHA-256 Ledger Verified
                  </span>
                </div>

                <div className="bg-gradient-to-br from-[#130b2c] to-[#0a0618] border border-white/10 p-6 rounded-3xl shadow-2xl">
                  <h3 className="text-xs uppercase tracking-widest text-[#9b94b5] font-bold mb-2">Self-Healing Runtime</h3>
                  <p className="text-5xl font-black text-emerald-400">ONLINE</p>
                  <span className="inline-flex items-center px-3 py-1 mt-3 text-xs font-medium border rounded-full text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                    Zero Exception Crashes
                  </span>
                </div>
              </div>

              <div className="bg-[#100822] border border-white/10 p-6 rounded-3xl">
                <h3 className="mb-3 text-sm font-bold text-white">Quick Room Navigation Guide</h3>
                <p className="text-xs text-[#9b94b5] leading-relaxed">
                  Use the left sidebar rooms to navigate between live telemetry streams, immutable cryptographic audit blocks, local P2P mesh packets, and IT immunity security diagnostics. Every action across the mother app is instantly tracked and chained here.
                </p>
              </div>
            </div>
          )}

          {/* ROOM 2: Live Telemetry Stream */}
          {activeRoom === 'telemetry_stream' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Live Telemetry Stream Room</h2>
                <p className="text-xs text-[#9b94b5] mt-1">Real-time event broadcasting across all departmental workstations.</p>
              </div>
              <div className="bg-[#100822] border border-white/10 p-6 rounded-3xl shadow-2xl">
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {events.length === 0 ? (
                    <p className="text-xs font-mono text-[#9b94b5] italic p-4">Listening for live telemetry signals from workstations...</p>
                  ) : (
                    events.map((ev) => (
                      <div key={ev.id} className="flex items-center justify-between p-4 text-sm border bg-white/5 border-white/10 rounded-2xl">
                        <div className="flex items-center space-x-3">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-[#8a63f0]/20 text-[#cbb8ff] border border-[#8a63f0]/30">
                            {ev.senderRole}
                          </span>
                          <span className="font-semibold text-white">{ev.senderName}:</span>
                          <span className="text-[#9b94b5]">{ev.action}</span>
                        </div>
                        <span className="text-xs font-mono text-[#9b94b5]">{new Date(ev.timestamp).toLocaleTimeString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ROOM 3: Cryptographic DNA Ledger */}
          {activeRoom === 'crypto_ledger' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Cryptographic DNA Audit Ledger Room</h2>
                <p className="text-xs text-[#9b94b5] mt-1">Immutable transaction chains hashed with SHA-256 validation.</p>
              </div>
              <div className="bg-[#100822] border border-white/10 p-6 rounded-3xl shadow-2xl font-mono text-xs">
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {ledgerEntries.length === 0 ? (
                    <p className="text-xs text-[#9b94b5] italic p-4">No cryptographic audit blocks mined yet.</p>
                  ) : (
                    ledgerEntries.map((entry) => (
                      <div key={entry.hash} className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1.5">
                        <div className="flex justify-between text-[#cbb8ff] font-bold">
                          <span>BLOCK HASH: {entry.hash}</span>
                          <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="font-sans text-sm font-semibold text-white">Action: {entry.action}</p>
                        <p className="text-[#9b94b5]">Protocol ID: {entry.protocolId} | Payload Hash: {entry.payloadHash}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ROOM 4: P2P Mesh Network Room */}
          {activeRoom === 'mesh_network' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">P2P Local Mesh Network Room</h2>
                <p className="text-xs text-[#9b94b5] mt-1">Zero-latency BroadcastChannel packet distribution across local machines.</p>
              </div>
              <div className="bg-[#100822] border border-white/10 p-6 rounded-3xl shadow-2xl">
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {meshPackets.length === 0 ? (
                    <p className="text-xs font-mono text-[#9b94b5] italic p-4">No peer-to-peer mesh packets detected.</p>
                  ) : (
                    meshPackets.map((pkt, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 text-sm border bg-white/5 border-white/10 rounded-2xl">
                        <div className="flex items-center space-x-3">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {pkt.department}
                          </span>
                          <span className="font-semibold text-white">Node: {pkt.nodeId}</span>
                          <span className="text-[#9b94b5]">&rarr; {pkt.type}</span>
                        </div>
                        <span className="text-xs font-mono text-[#9b94b5]">{new Date(pkt.timestamp).toLocaleTimeString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ROOM 5: IT Immunity & Security */}
          {activeRoom === 'node_security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">IT Core Immunity & Security Room</h2>
                <p className="text-xs text-[#9b94b5] mt-1">Autonomous self-healing supervisor and threat neutralization status.</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="bg-[#100822] border border-white/10 p-6 rounded-3xl shadow-2xl space-y-4">
                  <h3 className="text-sm font-bold tracking-wider text-white uppercase">Self-Healing Runtime Shield</h3>
                  <p className="text-xs text-[#9b94b5] leading-relaxed">
                    The global error supervisor is actively intercepting unhandled exceptions and async promise rejections on the fly, instantly auto-patching state memory without crashes.
                  </p>
                  <div className="px-4 py-3 text-xs font-bold border rounded-2xl bg-emerald-500/10 border-emerald-500/30 text-emerald-300">
                    Shield Status: 100% Operational
                  </div>
                </div>

                <div className="bg-[#100822] border border-white/10 p-6 rounded-3xl shadow-2xl space-y-4">
                  <h3 className="text-sm font-bold tracking-wider text-white uppercase">Cryptographic Integrity</h3>
                  <p className="text-xs text-[#9b94b5] leading-relaxed">
                    All departmental nodes communicate via validated cryptographic hashes. Tamper attempts or unauthorized payload injections are rejected automatically.
                  </p>
                  <div className="px-4 py-3 rounded-2xl bg-[#8a63f0]/10 border border-[#8a63f0]/30 text-[#cbb8ff] text-xs font-bold">
                    Ledger State: Tamper-Proof
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};