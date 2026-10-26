import React, { useState } from 'react';

interface Visitor {
  id: string;
  fullName: string;
  nationalId: string;
  phone: string;
  purpose: string;
  hostEmployee: string;
  checkInTime: string;
  status: 'CHECKED_IN' | 'COMPLETED';
}

export const ReceptionistVisitorDesk: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: 'VIS-101',
      fullName: 'Emmanuel Nshimiyimana',
      nationalId: '1199880012345678',
      phone: '+250 788 123 456',
      purpose: 'Recruitment Interview (IT)',
      hostEmployee: 'Jean Paul (HR)',
      checkInTime: '09:15 AM',
      status: 'CHECKED_IN',
    },
    {
      id: 'VIS-102',
      fullName: 'Grace Keza',
      nationalId: '1199580087654321',
      phone: '+250 783 987 654',
      purpose: 'Corporate Partnership Discussion',
      hostEmployee: 'Gael Rutagengwa',
      checkInTime: '10:30 AM',
      status: 'COMPLETED',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [hostEmployee, setHostEmployee] = useState('Jean Paul (HR)');

  const handleRegisterVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    const newVisitor: Visitor = {
      id: `VIS-${100 + visitors.length + 1}`,
      fullName,
      nationalId,
      phone,
      purpose,
      hostEmployee,
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'CHECKED_IN',
    };

    setVisitors([newVisitor, ...visitors]);
    setShowModal(false);
    setFullName('');
    setNationalId('');
    setPhone('');
    setPurpose('');
  };

  const handleCheckOut = (id: string) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'COMPLETED' } : v))
    );
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ Front Desk Console</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg font-bold cursor-pointer">🛎️ Daily Visitor Log</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🎟️ Digital Visitor Passes</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">📞 Customer Inquiries</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#303133]">Front Desk Visitor Management</h1>
            <p className="text-sm text-gray-500">Record client visits, issue digital entry passes, and dispatch host notifications.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#714b67] text-white font-bold text-xs rounded-lg shadow hover:bg-[#5b3c52]"
          >
            + REGISTER NEW VISITOR
          </button>
        </div>

        {/* Visitor Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 uppercase text-xs">
              <tr>
                <th className="p-4">Badge ID</th>
                <th className="p-4">Visitor Name</th>
                <th className="p-4">National ID / Phone</th>
                <th className="p-4">Purpose</th>
                <th className="p-4">Host Employee</th>
                <th className="p-4">Check-In</th>
                <th className="p-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visitors.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono font-bold text-[#714b67]">{v.id}</td>
                  <td className="p-4 font-bold text-gray-800">{v.fullName}</td>
                  <td className="p-4 text-xs font-mono">
                    <div>{v.nationalId}</div>
                    <div className="text-gray-400">{v.phone}</div>
                  </td>
                  <td className="p-4">{v.purpose}</td>
                  <td className="p-4 font-semibold text-gray-700">{v.hostEmployee}</td>
                  <td className="p-4 font-mono">{v.checkInTime}</td>
                  <td className="p-4">
                    {v.status === 'CHECKED_IN' ? (
                      <button
                        onClick={() => handleCheckOut(v.id)}
                        className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full hover:bg-amber-200"
                      >
                        CHECK OUT
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                        COMPLETED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visitor Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Register Front Desk Visitor</h2>
            <form onSubmit={handleRegisterVisitor} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                placeholder="National ID / Passport Number"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                placeholder="Phone Number (+250...)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                placeholder="Purpose of Visit"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <select
                value={hostEmployee}
                onChange={(e) => setHostEmployee(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
              >
                <option>Jean Paul (HR)</option>
                <option>Aline Uwase (Front Desk)</option>
                <option>Eric Mugisha (Operations)</option>
                <option>Diane Cyiza (Customer Care)</option>
              </select>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#714b67] text-white rounded-lg shadow hover:bg-[#5b3c52]"
                >
                  CHECK IN & NOTIFY HOST
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};