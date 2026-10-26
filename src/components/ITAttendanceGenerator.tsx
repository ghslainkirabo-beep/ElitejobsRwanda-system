import React, { useState, useEffect } from 'react';

export const ITAttendanceGenerator: React.FC = () => {
  const [selectedColleague, setSelectedColleague] = useState('Jean Paul (HR)');
  const [timeLeft, setTimeLeft] = useState(15);
  const [tokenCode, setTokenCode] = useState('EJ-SECURE-TOKEN-8941');

  // Simulate 15-second QR rotation for security
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTokenCode('EJ-SECURE-TOKEN-' + Math.floor(1000 + Math.random() * 9000));
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const colleagues = [
    'Jean Paul (HR Manager)',
    'Aline Uwase (Receptionist)',
    'Eric Mugisha (Operations)',
    'Diane Cyiza (Customer Care)'
  ];

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ IT Command Console</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg cursor-pointer">📡 QR Generator (PC Only)</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">👥 User Approvals</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🚀 Release Console</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🛡️ Audit Logs</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#303133]">IT Attendance QR Generator</h1>
            <p className="text-sm text-gray-500">Select a colleague below to generate a single-use, 15-second secure attendance QR card.</p>
          </div>
          <div className="px-4 py-2 bg-red-50 text-red-600 font-semibold text-xs rounded-lg border border-red-200">
            🔒 IT Insider-Risk Protected (Device Scan Required)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colleague Selection List */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Colleagues List</h3>
            <div className="space-y-2">
              {colleagues.map((c) => (
                <div 
                  key={c}
                  onClick={() => setSelectedColleague(c)}
                  className={`p-3 rounded-lg text-sm cursor-pointer transition-colors ${
                    selectedColleague === c ? 'bg-[#714b67] text-white font-semibold' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Apple-Wallet Style Reactive QR Card */}
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-sm bg-gradient-to-br from-[#1b1e24] to-[#303133] text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-3 right-3 text-xs bg-[#714b67] px-2.5 py-1 rounded-full font-mono">
                Expires in {timeLeft}s
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-widest text-left">EliteJobs Verified Pass</p>
              <h2 className="text-xl font-bold text-left mt-1">{selectedColleague}</h2>
              
              {/* QR Mockup Box */}
              <div className="w-48 h-48 bg-white mx-auto my-6 rounded-xl flex flex-col items-center justify-center p-4 text-black shadow-inner">
                <div className="w-full h-full border-4 border-black flex flex-col items-center justify-center font-mono text-[10px] bg-gray-100 p-2 text-center">
                  <span className="font-bold">QR_SIGNATURE</span>
                  <span className="text-gray-600 mt-2 break-all">{tokenCode}</span>
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-400 border-t border-gray-700 pt-3">
                <span>Server Time: 08:12 AM</span>
                <span className="text-green-400 font-semibold">● Active Session</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 mt-6">
              Colleague must open their mobile app and scan this screen before the token rotates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};