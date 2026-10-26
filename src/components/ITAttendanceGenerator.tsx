import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Colleague {
  id: string;
  name: string;
  department: string;
  status: 'PENDING' | 'VERIFIED';
  scanTime?: string;
}

export const ITAttendanceGenerator: React.FC = () => {
  const [colleagues, setColleagues] = useState<Colleague[]>([
    { id: '1', name: 'Jean Paul', department: 'Human Resources', status: 'PENDING' },
    { id: '2', name: 'Aline Uwase', department: 'Reception / Front Desk', status: 'PENDING' },
    { id: '3', name: 'Eric Mugisha', department: 'Operations', status: 'PENDING' },
    { id: '4', name: 'Diane Cyiza', department: 'Customer Care', status: 'PENDING' },
  ]);

  const [selectedColleague, setSelectedColleague] = useState<Colleague | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [tokenCode, setTokenCode] = useState('');
  const [isScanned, setIsScanned] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // 1. Dynamic 15-second token timer
  useEffect(() => {
    if (!selectedColleague || isScanned) return;

    if (!tokenCode) {
      setTokenCode(`EJ-${selectedColleague.id}-${Math.floor(100000 + Math.random() * 900000)}`);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTokenCode(`EJ-${selectedColleague.id}-${Math.floor(100000 + Math.random() * 900000)}`);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedColleague, isScanned, tokenCode]);

  // 2. Real-Time Supabase Scan Listener (Triggers automatically without any buttons)
  useEffect(() => {
    if (!selectedColleague) return;

    // Listen to real-time attendance logs inserted from mobile device scans
    const subscription = supabase
      .channel('realtime_attendance')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'attendance_logs' },
        (payload) => {
          if (payload.new && payload.new.user_id === selectedColleague.id) {
            handleAutoScanSuccess();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [selectedColleague]);

  // Handler triggered automatically upon scan detection
  const handleAutoScanSuccess = () => {
    if (!selectedColleague) return;

    const scanTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setIsScanned(true);
    setNotification(`⚡ REALTIME ALERT: ${selectedColleague.name} (${selectedColleague.department}) verified check-in at ${scanTime}.`);

    setColleagues((prev) =>
      prev.map((c) =>
        c.id === selectedColleague.id ? { ...c, status: 'VERIFIED', scanTime } : c
      )
    );

    // Auto-clear QR card after 2 seconds green tick feedback
    setTimeout(() => {
      setSelectedColleague(null);
      setIsScanned(false);
      setTokenCode('');
      setNotification(null);
    }, 2000);
  };

  const handleSelectColleague = (colleague: Colleague) => {
    if (colleague.status === 'VERIFIED') return;
    setSelectedColleague(colleague);
    setIsScanned(false);
    setTimeLeft(15);
    setTokenCode(`EJ-${colleague.id}-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ IT Command Console</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg font-bold cursor-pointer">📡 QR Dispenser (IT Only)</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">👥 User Approvals</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🛡️ Device Binding Audit</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#303133]">IT Attendance QR Dispenser</h1>
            <p className="text-sm text-gray-500">Select a colleague to generate their secure 15-second QR. Scans trigger automatic verification.</p>
          </div>
          <div className="px-4 py-2 bg-purple-50 text-[#714b67] font-semibold text-xs rounded-lg border border-purple-200">
            🔒 Real-Time Scan Engine Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Queue List */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3 text-sm flex justify-between items-center">
              <span>Colleagues Queue</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                {colleagues.filter((c) => c.status === 'PENDING').length} Pending
              </span>
            </h3>

            <div className="space-y-2">
              {colleagues.map((c) => {
                const isSelected = selectedColleague?.id === c.id;
                const isVerified = c.status === 'VERIFIED';

                return (
                  <div
                    key={c.id}
                    onClick={() => handleSelectColleague(c)}
                    className={`p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      isVerified
                        ? 'bg-green-50/50 border-green-200 cursor-default opacity-80'
                        : isSelected
                        ? 'bg-[#714b67] text-white border-[#714b67] shadow-md cursor-pointer'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer'
                    }`}
                  >
                    <div>
                      <p className={`font-bold ${isSelected ? 'text-white' : 'text-gray-800'}`}>{c.name}</p>
                      <p className={`text-xs ${isSelected ? 'text-purple-200' : 'text-gray-400'}`}>{c.department}</p>
                    </div>

                    <div>
                      {isVerified ? (
                        <span className="inline-flex items-center text-xs font-bold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                          ✓ {c.scanTime}
                        </span>
                      ) : isSelected ? (
                        <span className="text-xs bg-white text-[#714b67] font-bold px-2 py-0.5 rounded-md animate-pulse">
                          AWAITING SCAN...
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Select</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QR Display Area */}
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-[420px] relative">
            {!selectedColleague ? (
              <div className="text-center p-8 max-w-sm">
                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  📱
                </div>
                <h3 className="text-lg font-bold text-gray-700">No Colleague Selected</h3>
                <p className="text-xs text-gray-400 mt-2">
                  Click on any colleague from the left queue to display their dynamic QR token.
                </p>
              </div>
            ) : (
              <div className="w-full max-w-sm bg-gradient-to-br from-[#1b1e24] to-[#303133] text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden text-center">
                <div className="absolute top-3 right-3 text-xs bg-[#714b67] text-white px-3 py-1 rounded-full font-mono font-bold shadow">
                  Expires in {timeLeft}s
                </div>

                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-left font-semibold">EliteJobs Pass</p>
                <h2 className="text-xl font-bold text-left mt-1 text-amber-400">{selectedColleague.name}</h2>
                <p className="text-xs text-gray-300 text-left">{selectedColleague.department}</p>

                {/* QR Container with Auto Green-Tick Overlay */}
                <div className="w-48 h-48 bg-white mx-auto my-5 rounded-xl flex items-center justify-center p-3 text-black shadow-inner relative overflow-hidden">
                  {isScanned ? (
                    <div className="absolute inset-0 bg-green-500 text-white flex flex-col items-center justify-center animate-fade-in">
                      <span className="text-6xl font-bold">✓</span>
                      <span className="text-xs font-bold mt-1 uppercase tracking-wider">Verified!</span>
                    </div>
                  ) : (
                    <div 
                      onClick={handleAutoScanSuccess} 
                      title="Click box to test real-time scan trigger"
                      className="w-full h-full border-4 border-black flex flex-col items-center justify-center font-mono text-[9px] bg-gray-50 p-2 text-center rounded cursor-pointer"
                    >
                      <span className="font-bold text-black text-xs">DYNAMIC_QR</span>
                      <span className="text-gray-500 mt-2 break-all font-mono">{tokenCode}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400">
                  {isScanned ? "Scan verified. Disappearing..." : "Awaiting colleague scan..."}
                </p>
              </div>
            )}

            {/* IT Notification Toast Below QR Section */}
            {notification && (
              <div className="mt-6 w-full max-w-sm bg-green-950 border border-green-700 text-green-200 px-4 py-3 rounded-xl text-xs font-semibold shadow-lg animate-bounce text-center">
                {notification}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};