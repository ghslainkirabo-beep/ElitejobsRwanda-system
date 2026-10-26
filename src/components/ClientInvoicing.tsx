import React, { useState } from 'react';

interface Invoice {
  id: string;
  clientName: string;
  candidateName: string;
  positionPlaced: string;
  placementFeeRWF: number;
  vatRWF: number;
  totalRWF: number;
  status: 'Draft' | 'Sent' | 'Paid';
  date: string;
}

export const ClientInvoicing: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-2026-001',
      clientName: 'Bank of Kigali',
      candidateName: 'Gael Rutagengwa',
      positionPlaced: 'Operations Lead',
      placementFeeRWF: 1500000,
      vatRWF: 270000,
      totalRWF: 1770000,
      status: 'Paid',
      date: '2026-10-24',
    },
    {
      id: 'INV-2026-002',
      clientName: 'MTN Rwanda',
      candidateName: 'Divine Kwizera',
      positionPlaced: 'Senior Systems Engineer',
      placementFeeRWF: 2000000,
      vatRWF: 360000,
      totalRWF: 2360000,
      status: 'Sent',
      date: '2026-10-26',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [positionPlaced, setPositionPlaced] = useState('');
  const [fee, setFee] = useState<number>(0);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const placementFeeRWF = Number(fee);
    const vatRWF = placementFeeRWF * 0.18;
    const totalRWF = placementFeeRWF + vatRWF;

    const newInv: Invoice = {
      id: `INV-2026-0${invoices.length + 1}`,
      clientName,
      candidateName,
      positionPlaced,
      placementFeeRWF,
      vatRWF,
      totalRWF,
      status: 'Draft',
      date: new Date().toISOString().split('T')[0],
    };

    setInvoices([newInv, ...invoices]);
    setShowModal(false);
    setClientName('');
    setCandidateName('');
    setPositionPlaced('');
    setFee(0);
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ EliteJobs Finance</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg font-bold cursor-pointer">📄 Client Invoices (RWF)</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🏢 Corporate Accounts</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">📊 Revenue Vault</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#303133]">Client Invoicing & Billing</h1>
            <p className="text-sm text-gray-500">Manage placement fees, RWF invoices, and 18% VAT breakdown.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#714b67] text-white font-bold text-xs rounded-lg shadow hover:bg-[#5b3c52]"
          >
            + GENERATE RWF INVOICE
          </button>
        </div>

        {/* Invoice Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 uppercase text-xs">
              <tr>
                <th className="p-4">Invoice ID</th>
                <th className="p-4">Client</th>
                <th className="p-4">Candidate Placed</th>
                <th className="p-4">Fee (RWF)</th>
                <th className="p-4">VAT (18%)</th>
                <th className="p-4">Total (RWF)</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono font-bold text-[#714b67]">{inv.id}</td>
                  <td className="p-4 font-semibold text-gray-800">{inv.clientName}</td>
                  <td className="p-4">{inv.candidateName} <span className="text-xs text-gray-400">({inv.positionPlaced})</span></td>
                  <td className="p-4 font-mono">{inv.placementFeeRWF.toLocaleString()} RWF</td>
                  <td className="p-4 font-mono text-gray-400">{inv.vatRWF.toLocaleString()} RWF</td>
                  <td className="p-4 font-mono font-bold text-gray-900">{inv.totalRWF.toLocaleString()} RWF</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        inv.status === 'Paid'
                          ? 'bg-green-100 text-green-700'
                          : inv.status === 'Sent'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Generate Placement Invoice</h2>
            <form onSubmit={handleCreateInvoice} className="space-y-3">
              <input
                type="text"
                placeholder="Client Name (e.g. Bk Techouse)"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                placeholder="Placed Candidate Name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                placeholder="Position Placed"
                value={positionPlaced}
                onChange={(e) => setPositionPlaced(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <input
                type="number"
                placeholder="Placement Fee (RWF)"
                value={fee || ''}
                onChange={(e) => setFee(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
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
                  SAVE & ISSUE INVOICE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};