import React, { useState, useEffect } from 'react';

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

  // Rotate QR Token every 15 seconds ONLY when a user is selected
  useEffect(() => {
    if (!selectedColleague || isScanned) return;

    // Generate initial token on selection
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

  // Handle clicking a colleague from the queue
  const handleSelectColleague = (colleague: Colleague) => {
    if (colleague.status === 'VERIFIED') return;
    setSelectedColleague(colleague);
    setIsScanned(false);
    setTimeLeft(15);
    setTokenCode(`EJ-${colleague.id}-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  // Simulate scanning action by the colleague
  const handleCompleteScan = () => {
    if (!selectedColleague) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Update colleague status to VERIFIED
    setColleagues((prev) =>
      prev.map((c) =>
        c.id === selectedColleague.id
          ? { ...c, status: 'VERIFIED', scanTime: currentTime }
          : c
      )
    );

    setIsScanned(true);

    // Auto-clear QR code after 2.5 seconds green tick feedback
    setTimeout(() => {
      setSelectedColleague(null);
      setIsScanned(false);
      setTokenCode('');
    }, 2500);
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ IT Command Console</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg font-bold cursor-pointer">📡 Dynamic QR Attendance Pass</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">👥 User Approvals</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🛡️ Device Binding Audit</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#303133]">IT Attendance QR Dispenser</h1>
            <p className="text-sm text-gray-500">Select a colleague below to display their single-use 15-second secure attendance QR card.</p>
          </div>
          <div className="px-4 py-2 bg-purple-50 text-[#714b67] font-semibold text-xs rounded-lg border border-purple-200">
            🔒 Single-Session Security Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colleague Selection List */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3 text-sm flex justify-between items-center">
              <span>Colleagues Queue</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                {colleagues.filter((c) => c.status === 'PENDING').length} Remaining
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
                        ? 'bg-green-50/50 border-green-200 cursor-not-allowed opacity-80'
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
                        <span className="text-xs bg-white text-[#714b67] font-bold px-2 py-0.5 rounded-md">
                          SCANNING...
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">Click to Select</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QR Display Card Area */}
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-[420px]">
            {!selectedColleague ? (
              /* No User Selected Placeholder State */
              <div className="text-center p-8 max-w-sm">
                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  📱
                </div>
                <h3 className="text-lg font-bold text-gray-700">No Colleague Selected</h3>
                <p className="text-xs text-gray-400 mt-2">
                  Click on any colleague from the left queue to generate their secure 15-second dynamic QR code.
                </p>
              </div>
            ) : isScanned ? (
              /* Success Scan Feedback State */
              <div className="text-center p-8 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg border-2 border-green-300">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedColleague.name} Verified!</h3>
                <p className="text-sm text-green-600 font-medium mt-1">Attendance logged successfully. Authorized to start shift.</p>
                <p className="text-xs text-gray-400 mt-6">Clearing QR session for next colleague...</p>
              </div>
            ) : (
              /* Active QR Session Card State */
              <div className="w-full max-w-sm bg-gradient-to-br from-[#1b1e24] to-[#303133] text-white p-6 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-3 right-3 text-xs bg-[#714b67] text-white px-3 py-1 rounded-full font-mono font-bold shadow">
                  Expires in {timeLeft}s
                </div>
                
                <p className="text-[10px] text-gray-400 uppercase tracking-widest text-left font-semibold">EliteJobs Rwanda Pass</p>
                <h2 className="text-xl font-bold text-left mt-1 text-amber-400">{selectedColleague.name}</h2>
                <p className="text-xs text-gray-300 text-left">{selectedColleague.department}</p>

                {/* Simulated QR Viewport */}
                <div className="w-48 h-48 bg-white mx-auto my-5 rounded-xl flex flex-col items-center justify-center p-3 text-black shadow-inner relative">
                  <div className="w-full h-full border-4 border-black flex flex-col items-center justify-center font-mono text-[9px] bg-gray-50 p-2 text-center rounded">
                    <span className="font-bold text-black text-xs">DYNAMIC_QR</span>
                    <span className="text-gray-500 mt-2 break-all font-mono">{tokenCode}</span>
                  </div>
                </div>

                <button
                  onClick={handleCompleteScan}
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-lg shadow transition-colors"
                >
                  SIMULATE SCAN BY {selectedColleague.name.toUpperCase()}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};