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
    <div className="space-y-6 p-6 max-w-7xl mx-auto text-[#FFFFFF]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#E3E6EC]/10 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight uppercase text-[#FFFFFF]">
            Leave & <span className="text-[#FAD201]">Absence Portal</span>
          </h1>
          <p className="text-[#6B7280] text-xs font-mono tracking-wider mt-1">
            Enterprise Time-Off Workflows & Departmental Approvals
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 bg-[#FAD201] text-[#12151F] font-bold font-mono text-xs rounded-xl hover:bg-[#e6c200] transition-all shadow-sm"
        >
          + Request Leave
        </button>
      </div>

      <div className="bg-[#1C2233] border border-[#E3E6EC]/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E3E6EC]/10 bg-[#12151F] text-[#6B7280] text-[11px] font-mono uppercase tracking-wider">
              <th className="p-4">Employee</th>
              <th className="p-4">Type</th>
              <th className="p-4">Dates & Duration</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Status</th>
              {userRole === 'ADMIN' && <th className="p-4 text-right">Approval Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3E6EC]/10 text-sm">
            {requests.map(r => (
              <tr key={r.id} className="hover:bg-[#12151F]/50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-[#FFFFFF]">{r.employeeName}</div>
                  <div className="text-xs font-mono text-[#6B7280]">{r.department}</div>
                </td>
                <td className="p-4 text-xs font-mono text-[#6B7280]">{r.leaveType}</td>
                <td className="p-4 text-xs font-mono text-[#FFFFFF]">
                  {r.startDate} to {r.endDate} <span className="text-[#FAD201]">({r.days}d)</span>
                </td>
                <td className="p-4 text-xs text-[#6B7280]">{r.reason}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider ${
                    r.status === 'APPROVED' ? 'bg-[#1E9E5A]/15 text-[#1E9E5A] border border-[#1E9E5A]/30' :
                    r.status === 'PENDING' ? 'bg-[#E8A317]/15 text-[#E8A317] border border-[#E8A317]/30' :
                    'bg-[#D64545]/15 text-[#D64545] border border-[#D64545]/30'
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
                          className="px-3 py-1 bg-[#1E9E5A]/20 text-[#1E9E5A] text-xs font-bold rounded-lg border border-[#1E9E5A]/30 hover:bg-[#1E9E5A]/30"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(r.id, 'REJECTED')}
                          className="px-3 py-1 bg-[#D64545]/20 text-[#D64545] text-xs font-bold rounded-lg border border-[#D64545]/30 hover:bg-[#D64545]/30"
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
        <div className="fixed inset-0 z-50 bg-[#12151F]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1C2233] border border-[#E3E6EC]/20 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-black uppercase text-[#FFFFFF]">New Leave Request</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-[#6B7280] uppercase">Leave Type</label>
                <select
                  value={newRequest.leaveType}
                  onChange={e => setNewRequest({ ...newRequest, leaveType: e.target.value })}
                  className="w-full mt-1 bg-[#12151F] border border-[#E3E6EC]/20 rounded-xl px-3 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:border-[#0B6FA4]"
                >
                  <option value="ANNUAL">Annual Leave</option>
                  <option value="SICK">Sick Leave</option>
                  <option value="MATERNITY">Maternity / Paternity</option>
                  <option value="EMERGENCY">Emergency Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#6B7280] uppercase">Start Date</label>
                  <input
                    type="date"
                    value={newRequest.startDate}
                    onChange={e => setNewRequest({ ...newRequest, startDate: e.target.value })}
                    className="w-full mt-1 bg-[#12151F] border border-[#E3E6EC]/20 rounded-xl px-3 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:border-[#0B6FA4]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#6B7280] uppercase">End Date</label>
                  <input
                    type="date"
                    value={newRequest.endDate}
                    onChange={e => setNewRequest({ ...newRequest, endDate: e.target.value })}
                    className="w-full mt-1 bg-[#12151F] border border-[#E3E6EC]/20 rounded-xl px-3 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:border-[#0B6FA4]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-mono text-[#6B7280] uppercase">Reason</label>
                <textarea
                  value={newRequest.reason}
                  onChange={e => setNewRequest({ ...newRequest, reason: e.target.value })}
                  className="w-full mt-1 bg-[#12151F] border border-[#E3E6EC]/20 rounded-xl px-3 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:border-[#0B6FA4]"
                  rows={3}
                  placeholder="Describe reason..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E3E6EC]/10">
              <button onClick={() => setShowNewModal(false)} className="px-4 py-2 text-xs font-mono uppercase text-[#6B7280]">Cancel</button>
              <button onClick={handleCreateRequest} className="px-5 py-2 bg-[#FAD201] text-[#12151F] text-xs font-bold font-mono rounded-xl">Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};