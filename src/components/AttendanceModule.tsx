import React, { useState } from 'react';

export const AttendanceModule: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ EliteJobs ERP</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg cursor-pointer">📍 Daily Attendance</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">👥 Candidates & CRM</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">📊 Reports & Vault</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-8">
        <h1 className="text-2xl font-bold text-[#303133] mb-1">Daily Attendance Verification</h1>
        <p className="text-sm text-gray-500 mb-8">Scan the secure dynamic IT Support QR code to register your daily arrival.</p>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-md mx-auto text-center">
          {!scanned ? (
            <div>
              <div className="w-64 h-64 bg-gray-100 mx-auto rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-6">
                <p className="text-xs text-gray-400 font-mono">[Camera Viewfinder Active]</p>
              </div>
              <button onClick={() => setScanned(true)} className="w-full py-3 bg-[#714b67] text-white font-bold rounded-lg shadow hover:bg-[#5b3c52]">SIMULATE QR SCAN (5s Verify)</button>
            </div>
          ) : (
            <div className="py-10">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
              <h3 className="text-xl font-bold text-gray-800">Welcome, Colleague!</h3>
              <p className="text-sm text-gray-500 mt-2">Attendance logged successfully (On Time).</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
