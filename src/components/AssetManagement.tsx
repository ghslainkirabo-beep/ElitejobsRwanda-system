import React, { useState } from 'react';

interface CompanyAsset {
  id: string;
  itemName: string;
  serialNumber: string;
  category: 'Laptop' | 'Mobile Device' | 'Access Card' | 'Networking';
  assignedTo: string;
  status: 'ASSIGNED' | 'IN_STOCK' | 'UNDER_MAINTENANCE' | 'SYSTEM_ERROR';
  condition: 'Excellent' | 'Good' | 'Fair' | 'Critical';
  lastAuditDate: string;
}

export const AssetManagement: React.FC<{ userRole: string }> = ({ userRole }) => {
  const isIT = userRole === 'IT Support';

  const [assets, setAssets] = useState<CompanyAsset[]>([
    {
      id: 'AST-001',
      itemName: 'MacBook Pro 16" (M2)',
      serialNumber: 'C02G80XZMD6M',
      category: 'Laptop',
      assignedTo: 'Jean Paul (HR)',
      status: 'ASSIGNED',
      condition: 'Excellent',
      lastAuditDate: '2026-10-15',
    },
    {
      id: 'AST-002',
      itemName: 'Dell Latitude 5420',
      serialNumber: 'DL-98234109',
      category: 'Laptop',
      assignedTo: 'Aline Uwase (Front Desk)',
      status: 'ASSIGNED',
      condition: 'Good',
      lastAuditDate: '2026-10-20',
    },
    {
      id: 'AST-003',
      itemName: 'Cisco Router AX-3000',
      serialNumber: 'CS-77192039',
      category: 'Networking',
      assignedTo: 'Unassigned',
      status: 'UNDER_MAINTENANCE',
      condition: 'Fair',
      lastAuditDate: '2026-10-25',
    },
    {
      id: 'AST-004',
      itemName: 'HP EliteBook 840',
      serialNumber: 'HP-55410928',
      category: 'Laptop',
      assignedTo: 'Eric Mugisha (Ops)',
      status: 'SYSTEM_ERROR',
      condition: 'Critical',
      lastAuditDate: '2026-10-26',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [category, setCategory] = useState<CompanyAsset['category']>('Laptop');
  const [assignedTo, setAssignedTo] = useState('Unassigned');

  // Admin Statistics Calculations
  const totalAssets = assets.length;
  const workingWell = assets.filter((a) => a.status === 'ASSIGNED' || a.status === 'IN_STOCK').length;
  const underMaintenance = assets.filter((a) => a.status === 'UNDER_MAINTENANCE').length;
  const systemErrors = assets.filter((a) => a.status === 'SYSTEM_ERROR').length;
  const healthPercentage = Math.round((workingWell / totalAssets) * 100);

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const newAsset: CompanyAsset = {
      id: `AST-00${assets.length + 1}`,
      itemName,
      serialNumber,
      category,
      assignedTo,
      status: assignedTo === 'Unassigned' ? 'IN_STOCK' : 'ASSIGNED',
      condition: 'Excellent',
      lastAuditDate: new Date().toISOString().split('T')[0],
    };

    setAssets([newAsset, ...assets]);
    setShowModal(false);
    setItemName('');
    setSerialNumber('');
  };

  const handleUpdateStatus = (id: string, newStatus: CompanyAsset['status']) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">
          {isIT ? '🛠️ IT Asset Command' : '📊 Admin Asset Audit'}
        </div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg font-bold cursor-pointer">
            {isIT ? '💻 Deep Equipment Control' : '📈 Executive Statistics'}
          </div>
          {isIT && (
            <>
              <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🔧 Maintenance Queue</div>
              <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">⚠️ Hardware System Errors</div>
            </>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#303133]">
              {isIT ? 'IT Master Equipment & Maintenance Console' : 'Executive Hardware Usage & Health Statistics'}
            </h1>
            <p className="text-sm text-gray-500">
              {isIT
                ? 'Full deep control over serial numbers, hardware diagnostics, and colleague device assignments.'
                : 'High-level overview of enterprise hardware integrity, maintenance rates, and error logs.'}
            </p>
          </div>
          {isIT && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-[#714b67] text-white font-bold text-xs rounded-lg shadow hover:bg-[#5b3c52]"
            >
              + REGISTER NEW ASSET
            </button>
          )}
        </div>

        {/* ADMIN STATISTICAL OVERVIEW CARDS */}
        {!isIT && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase">Hardware Health Score</p>
              <p className="text-3xl font-black text-green-600 mt-2">{healthPercentage}%</p>
              <p className="text-xs text-gray-500 mt-1">Working to company standard</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase">Working Operational</p>
              <p className="text-3xl font-black text-gray-800 mt-2">{workingWell} Units</p>
              <p className="text-xs text-green-600 mt-1">Active deployment</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase">Under Maintenance</p>
              <p className="text-3xl font-black text-amber-600 mt-2">{underMaintenance} Units</p>
              <p className="text-xs text-amber-600 mt-1">In IT repair shop</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase">System Errors Reported</p>
              <p className="text-3xl font-black text-red-600 mt-2">{systemErrors} Devices</p>
              <p className="text-xs text-red-500 mt-1">Action required by IT</p>
            </div>
          </div>
        )}

        {/* ASSET DATA TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 uppercase text-xs">
              <tr>
                <th className="p-4">Asset ID</th>
                <th className="p-4">Item & Serial Number</th>
                <th className="p-4">Category</th>
                <th className="p-4">Assigned Colleague</th>
                <th className="p-4">Condition</th>
                <th className="p-4">Operational Status</th>
                {isIT && <th className="p-4">IT Quick Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono font-bold text-[#714b67]">{a.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-gray-800">{a.itemName}</div>
                    <div className="text-xs font-mono text-gray-400">S/N: {a.serialNumber}</div>
                  </td>
                  <td className="p-4 font-semibold text-gray-700">{a.category}</td>
                  <td className="p-4 font-medium text-gray-800">{a.assignedTo}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        a.condition === 'Excellent'
                          ? 'bg-green-100 text-green-700'
                          : a.condition === 'Good'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {a.condition}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        a.status === 'ASSIGNED' || a.status === 'IN_STOCK'
                          ? 'bg-green-100 text-green-700'
                          : a.status === 'UNDER_MAINTENANCE'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {a.status.replace('_', ' ')}
                    </span>
                  </td>

                  {/* IT-ONLY DEEP ACTIONS */}
                  {isIT && (
                    <td className="p-4">
                      <select
                        value={a.status}
                        onChange={(e) => handleUpdateStatus(a.id, e.target.value as CompanyAsset['status'])}
                        className="text-xs bg-gray-100 border border-gray-300 rounded px-2 py-1 font-bold focus:outline-none"
                      >
                        <option value="ASSIGNED">Assigned / Working</option>
                        <option value="IN_STOCK">In Stock</option>
                        <option value="UNDER_MAINTENANCE">Set to Maintenance</option>
                        <option value="SYSTEM_ERROR">Flag System Error</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* IT Register Modal */}
      {showModal && isIT && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Register New Equipment (IT Master)</h2>
            <form onSubmit={handleCreateAsset} className="space-y-3">
              <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                placeholder="Hardware Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CompanyAsset['category'])}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
              >
                <option value="Laptop">Laptop</option>
                <option value="Mobile Device">Mobile Device</option>
                <option value="Access Card">Access Card</option>
                <option value="Networking">Networking</option>
              </select>
              <input
                type="text"
                placeholder="Assigned Staff (or 'Unassigned')"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
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
                  SAVE & REGISTER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};