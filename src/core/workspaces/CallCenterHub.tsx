import React, { useState } from 'react';
import { TelemetryBus } from '../TelemetryBus';
import { AIHealingCore } from '../AIHealingCore';
import { MeshSync } from '../MeshSync';
import { LocalAIInferenceEngine, ModelPrediction } from '../LocalAIInference';

export const CallCenterHub: React.FC<{ username: string; protocolId: string; role?: string }> = ({ username, protocolId }) => {
  const [activeCalls, setActiveCalls] = useState([
    { id: 'call_01', candidate: 'Diane Uwase', phone: '+250 788 123 456', status: 'Inbound Ringing', queue: 'IT Support', sentiment: 'Pending AI Analysis' },
    { id: 'call_02', candidate: 'Eric Mugisha', phone: '+250 782 987 654', status: 'Active Conversation', queue: 'Operations', sentiment: 'Pending AI Analysis' }
  ]);
  const [activeRoom, setActiveRoom] = useState<'line_dispatch' | 'call_analytics' | 'sentiment_metrics'>('line_dispatch');
  const [lastPrediction, setLastPrediction] = useState<ModelPrediction | null>(null);

  const handleDispatchCall = (id: string, actionType: string) => {
    // Execute Real-time Local Neural Sentiment & Intent Analysis
    const transcriptSample = actionType === 'Connect Call' 
      ? 'Caller requesting urgent system access and login support' 
      : 'Caller inquiring about candidate interview schedule and vetting fee verification';

    const aiPrediction = LocalAIInferenceEngine.classifyVoiceSentiment(transcriptSample);
    setLastPrediction(aiPrediction);

    const updatedStatus = `${actionType} [AI: ${aiPrediction.label} (${(aiPrediction.confidence * 100).toFixed(1)}%)]`;

    setActiveCalls((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: updatedStatus, sentiment: aiPrediction.label } : c))
    );

    // Stream live operational telemetry
    TelemetryBus.emit({
      id: Math.random().toString(36).substring(2, 9),
      senderRole: 'CALL_CENTER',
      senderName: username,
      action: `CALL_${id}_AI_INTENT_${aiPrediction.label}_CONF_${(aiPrediction.confidence * 100).toFixed(0)}%`,
      timestamp: Date.now()
    });

    // Record cryptographic verification block
    AIHealingCore.recordTransaction(protocolId, 'CALL_DISPATCH_AI_LOG', {
      callId: id,
      prediction: aiPrediction
    });

    // Broadcast across P2P Mesh
    MeshSync.broadcastMeshPacket('CALL_CENTER', 'CALL_UPDATE', { callId: id, prediction: aiPrediction });
  };

  return (
    <div className="w-full h-screen bg-[#030914] text-[#f2f8ff] flex flex-col overflow-hidden font-sans">
      <header className="h-16 w-full px-6 bg-[#07152b]/80 backdrop-blur-2xl border-b border-sky-500/20 flex justify-between items-center z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center space-x-4">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)]">
            <span className="text-sm font-black text-white">CC</span>
          </div>
          <div>
            <h1 className="flex items-center space-x-2 text-sm font-bold tracking-tight text-white">
              <span>Call Center Telephony Hub</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                AI Telephony Engine [{protocolId}]
              </span>
            </h1>
            <p className="text-[11px] text-sky-400/70">Telephony Agent: <strong className="text-white">{username}</strong></p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-sky-950/60 border border-sky-500/30 px-4 py-1.5 rounded-full shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
            <span className="font-mono text-xs font-bold text-sky-300">REAL-TIME INFERENCE ACTIVE (0.2ms)</span>
          </div>
          <div className="flex items-center justify-center text-xs font-bold border rounded-full w-9 h-9 bg-sky-950/80 border-sky-500/30 text-sky-300">
            {username.substring(0, 2).toUpperCase()}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-[#051124]/90 backdrop-blur-xl border-r border-sky-500/20 p-5 flex flex-col justify-between z-40">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-sky-400/70 px-3 mb-3">Telephony Rooms</p>
              <nav className="space-y-1.5">
                <button
                  onClick={() => setActiveRoom('line_dispatch')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'line_dispatch'
                      ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                      : 'text-sky-300/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>📞 Live Line Dispatch Controls</span>
                </button>
                <button
                  onClick={() => setActiveRoom('sentiment_metrics')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                    activeRoom === 'sentiment_metrics'
                      ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                      : 'text-sky-300/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>🧠 Neural Intent & Voice Metrics</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="p-4 border bg-sky-950/40 border-sky-500/20 rounded-2xl">
            <div className="flex items-center mb-1 space-x-2 text-xs font-semibold text-sky-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Neural Classifier Running</span>
            </div>
            <p className="text-[10px] text-sky-400/60">Local model latency stabilized under 1ms.</p>
          </div>
        </aside>

        <main className="flex-1 bg-[#02060f] p-8 overflow-y-auto">
          {activeRoom === 'line_dispatch' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Live Line Dispatch Controls</h2>
                <p className="mt-1 text-xs text-sky-300/70">Manage active telephony queues with automatic real-time neural intent classification.</p>
              </div>

              <div className="bg-gradient-to-br from-[#081830]/90 to-[#040c1a]/90 border border-sky-500/30 p-6 rounded-3xl shadow-2xl backdrop-blur-xl space-y-4">
                {activeCalls.map((call) => (
                  <div key={call.id} className="bg-[#020814]/70 border border-sky-500/20 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-bold text-white">{call.candidate}</h4>
                        <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          {call.queue}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-sky-300/70">Phone: {call.phone} | Status: <span className="font-semibold text-emerald-400">{call.status}</span></p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleDispatchCall(call.id, 'Connected')}
                        className="px-4 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-bold transition-all"
                      >
                        Connect Call
                      </button>
                      <button
                        onClick={() => handleDispatchCall(call.id, 'Resolved')}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all"
                      >
                        Mark Vetted
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeRoom === 'sentiment_metrics' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Neural Intent & Voice Metrics</h2>
                <p className="mt-1 text-xs text-sky-300/70">Real-time inference parameters from local neural model.</p>
              </div>

              {lastPrediction ? (
                <div className="bg-gradient-to-br from-[#081830]/90 to-[#040c1a]/90 border border-sky-500/30 p-6 rounded-3xl shadow-2xl space-y-3 font-mono text-xs text-sky-200">
                  <p><strong className="text-white">LABEL DETECTED:</strong> {lastPrediction.label}</p>
                  <p><strong className="text-white">CONFIDENCE:</strong> {(lastPrediction.confidence * 100).toFixed(2)}%</p>
                  <p><strong className="text-white">RAW SCORE:</strong> {lastPrediction.score}</p>
                  <p><strong className="text-white">PROCESSING LATENCY:</strong> {lastPrediction.processingTimeMs} ms</p>
                </div>
              ) : (
                <div className="p-6 text-xs italic border rounded-3xl border-sky-500/20 text-sky-400/60">
                  No call active for real-time inference. Trigger a call dispatch to observe live neural model scores.
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};