import React, { useState } from 'react';

interface AttendanceRecord {
  id: string;
  name: string;
  department: string;
  checkInTime: string;
  status: 'PUNCTUAL' | 'LATE';
  deviceId: string;
  ipAddress: string;
}

export const AdminAttendanceReview: React.FC = () => {
  const [records] = useState<AttendanceRecord[]>([
    { id: '1', name: 'Jean Paul', department: 'Human Resources', checkInTime: '08:12 AM', status: 'PUNCTUAL', deviceId: 'DEV-IPHONE-14-PRO', ipAddress: '197.243.16.88' },
    { id: '2', name: 'Aline Uwase', department: 'Reception / Front Desk', checkInTime: '08:28 AM', status: 'PUNCTUAL', deviceId: 'DEV-SAMSUNG-S23', ipAddress: '197.243.16.89' },
    { id: '3', name: 'Eric Mugisha', department: 'Operations', checkInTime: '08:42 AM', status: 'LATE', deviceId: 'DEV-PIXEL-7', ipAddress: '197.243.16.90' },
  ]);

  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ Admin Overview</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg font-bold cursor-pointer">📊 Attendance Audit Review</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">📄 RWF Invoicing</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🔐 Security Roles</div>
        </div>
      </div>

      {/* Main Review Console */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#303133]">Admin Attendance Review Vault</h1>
          <p className="text-sm text-gray-500">Click on any staff record below to inspect security fingerprints and check-in audit trails.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 uppercase text-xs">
              <tr>
                <th className="p-4">Colleague</th>
                <th className="p-4">Department</th>
                <th className="p-4">Check-In Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-purple-50/50 transition-colors cursor-pointer" onClick={() => setSelectedRecord(r)}>
                  <td className="p-4 font-bold text-gray-800">{r.name}</td>
                  <td className="p-4">{r.department}</td>
                  <td className="p-4 font-mono font-semibold">{r.checkInTime}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${r.status === 'PUNCTUAL' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-[#714b67] font-bold underline">Review Record →</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expanded Admin Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl relative border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Attendance Record Inspection</h3>
            <p className="text-xs text-gray-400 mb-4">Master Security Audit Log</p>

            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm font-mono">
              <div className="flex justify-between"><span className="text-gray-500">Staff Name:</span><span className="font-bold text-gray-800">{selectedRecord.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Department:</span><span>{selectedRecord.department}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Check-In Timestamp:</span><span className="text-purple-700 font-bold">{selectedRecord.checkInTime}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Bound Device Hardware:</span><span>{selectedRecord.deviceId}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Verified IP Hash:</span><span>{selectedRecord.ipAddress}</span></div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => setSelectedRecord(null)} className="px-5 py-2 bg-[#714b67] text-white font-bold text-xs rounded-lg shadow hover:bg-[#5b3c52]">
                CLOSE INSPECTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};