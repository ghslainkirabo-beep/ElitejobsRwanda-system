import React, { useState } from 'react';

interface LeaveRequest {
  id: string;
  employeeName: string;
  department: string;
  leaveType: 'ANNUAL' | 'SICK' | 'MATERNITY' | 'EMERGENCY';
  startDate: string;
  endDate: string;
  days: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reason: string;
}

export const LeaveManagement: React.FC<{ userRole: 'ADMIN' | 'IT_SUPPORT' | 'STAFF' }> = ({ userRole }) => {
  const [requests, setRequests] = useState<LeaveRequest[]>([
    { id: 'LR-001', employeeName: 'Eric Manzi', department: 'Engineering', leaveType: 'ANNUAL', startDate: '2026-11-02', endDate: '2026-11-06', days: 5, status: 'PENDING', reason: 'Family vacation' },
    { id: 'LR-002', employeeName: 'Grace Keza', department: 'Marketing', leaveType: 'SICK', startDate: '2026-10-28', endDate: '2026-10-29', days: 2, status: 'APPROVED', reason: 'Medical appointment' },
    { id: 'LR-003', employeeName: 'Patrick Mugisha', department: 'IT Support', leaveType: 'EMERGENCY', startDate: '2026-11-10', endDate: '2026-11-11', days: 1, status: 'PENDING', reason: 'Home repair urgent' },
  ]);

  const [showNewModal, setShowNewModal] = useState(false);
  const [newRequest, setNewRequest] = useState({ leaveType: 'ANNUAL', startDate: '', endDate: '', reason: '' });

  const handleStatusChange = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleCreateRequest = () => {
    if (!newRequest.startDate || !newRequest.endDate) return;
    const req: LeaveRequest = {
      id: `LR-00${requests.length + 1}`,
      employeeName: 'Current User',
      department: 'IT Support',
      leaveType: newRequest.leaveType as any,
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      days: 3,
      status: 'PENDING',
      reason: newRequest.reason
    };
    setRequests([req, ...requests]);
    setShowNewModal(false);
    setNewRequest({ leaveType: 'ANNUAL', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight uppercase">
            Leave & <span className="text-[#CCFF00]">Absence Portal</span>
          </h1>
          <p className="text-gray-400 text-xs font-mono tracking-wider mt-1">
            Enterprise Time-Off Workflows & Departmental Approvals
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-[#CCFF00] text-black font-bold font-mono text-xs rounded-xl shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:bg-[#b3e600] transition-all"
        >
          + Request Leave
        </button>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 text-[11px] font-mono uppercase tracking-wider">
              <th className="p-4">Employee</th>
              <th className="p-4">Type</th>
              <th className="p-4">Dates & Duration</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
              {userRole === 'ADMIN' && <th className="p-4 text-right">Approval Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {requests.map(r => (
              <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white">{r.employeeName}</div>
                  <div className="text-xs font-mono text-gray-500">{r.department}</div>
                </td>
                <td className="p-4 text-xs font-mono text-gray-300">{r.leaveType}</td>
                <td className="p-4 text-xs font-mono text-gray-300">
                  {r.startDate} to {r.endDate} <span className="text-[#CCFF00]">({r.days}d)</span>
                </td>
                <td className="p-4 text-xs text-gray-400">{r.reason}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider ${
                    r.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                    r.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    {r.status}
                  </span>
                </td>
                {userRole === 'ADMIN' && (
                  <td className="p-4 text-right space-x-2">
                    {r.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(r.id, 'APPROVED')}
                          className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-lg border border-green-500/30 hover:bg-green-500/30"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(r.id, 'REJECTED')}
                          className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-lg border border-red-500/30 hover:bg-red-500/30"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B0E14] border border-white/20 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-black uppercase text-white">New Leave Request</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 uppercase">Leave Type</label>
                <select
                  value={newRequest.leaveType}
                  onChange={e => setNewRequest({ ...newRequest, leaveType: e.target.value })}
                  className="w-full mt-1 bg-[#090B11] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="ANNUAL">Annual Leave</option>
                  <option value="SICK">Sick Leave</option>
                  <option value="MATERNITY">Maternity / Paternity</option>
                  <option value="EMERGENCY">Emergency Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase">Start Date</label>
                  <input
                    type="date"
                    value={newRequest.startDate}
                    onChange={e => setNewRequest({ ...newRequest, startDate: e.target.value })}
                    className="w-full mt-1 bg-[#090B11] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase">End Date</label>
                  <input
                    type="date"
                    value={newRequest.endDate}
                    onChange={e => setNewRequest({ ...newRequest, endDate: e.target.value })}
                    className="w-full mt-1 bg-[#090B11] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-mono text-gray-400 uppercase">Reason</label>
                <textarea
                  value={newRequest.reason}
                  onChange={e => setNewRequest({ ...newRequest, reason: e.target.value })}
                  className="w-full mt-1 bg-[#090B11] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CCFF00]"
                  rows={3}
                  placeholder="Describe reason for leave..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button onClick={() => setShowNewModal(false)} className="px-4 py-2 text-xs font-mono uppercase text-gray-400">Cancel</button>
              <button onClick={handleCreateRequest} className="px-5 py-2 bg-[#CCFF00] text-black text-xs font-bold font-mono rounded-xl">Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};