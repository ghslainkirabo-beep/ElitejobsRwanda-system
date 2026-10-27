import React, { useState } from 'react';

interface CompanyAsset {
  id: string;
  itemName: string;
  serialNumber: string;
  category: 'Laptop' | 'Mobile Device' | 'Access Card' | 'Networking';
  assignedTo: string;
  status: 'ASSIGNED' | 'IN_STOCK' | 'UNDER_MAINTENANCE' | 'SYSTEM_ERROR' | 'REPLACED_PURCHASED';
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
      itemName: 'Samsung Galaxy A32',
      serialNumber: 'SM-33920192',
      category: 'Mobile Device',
      assignedTo: 'Unassigned',
      status: 'IN_STOCK',
      condition: 'Good',
      lastAuditDate: '2026-10-22',
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

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);
  const [selectedDamagedAsset, setSelectedDamagedAsset] = useState<CompanyAsset | null>(null);

  const [itemName, setItemName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [category, setCategory] = useState<CompanyAsset['category']>('Laptop');
  const [assignedTo, setAssignedTo] = useState('Unassigned');

  const [newItemName, setNewItemName] = useState('');
  const [newSerialNumber, setNewSerialNumber] = useState('');

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
    setShowRegisterModal(false);
    setItemName('');
    setSerialNumber('');
  };

  const handleReplaceAssetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDamagedAsset) return;

    const assignedStaff = selectedDamagedAsset.assignedTo;

    const updatedAssets = assets.map((a) =>
      a.id === selectedDamagedAsset.id
        ? { ...a, status: 'REPLACED_PURCHASED' as const, condition: 'Critical' as const, assignedTo: `Decommissioned (${assignedStaff})` }
        : a
    );

    const newReplacementAsset: CompanyAsset = {
      id: `AST-00${updatedAssets.length + 1}`,
      itemName: newItemName,
      serialNumber: newSerialNumber,
      category: selectedDamagedAsset.category,
      assignedTo: assignedStaff,
      status: 'ASSIGNED',
      condition: 'Excellent',
      lastAuditDate: new Date().toISOString().split('T')[0],
    };

    setAssets([newReplacementAsset, ...updatedAssets]);
    setShowReplaceModal(false);
    setSelectedDamagedAsset(null);
    setNewItemName('');
    setNewSerialNumber('');
  };

  const handleUpdateStatus = (id: string, newStatus: CompanyAsset['status']) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="flex h-screen bg-[#0A0D0C] text-white font-sans overflow-hidden">
      {/* Apple Monochrome Frosted Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-9 h-9 bg-[#CCFF00] text-[#0B0F0E] rounded-xl flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(204,255,0,0.2)]">
              E
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wide text-white">EliteJobs</h2>
              <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Rwanda OS</p>
            </div>
          </div>

          <div className="space-y-1 text-xs font-semibold">
            <div className="px-3 py-2.5 bg-white/10 text-[#CCFF00] rounded-xl border border-white/10 flex items-center justify-between">
              <span>{isIT ? '💻 Equipment Control' : '📈 Executive Stats'}</span>
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]"></span>
            </div>
            {isIT && (
              <>
                <div className="px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                  📦 Vault (In Stock)
                </div>
                <div className="px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                  ⚠️ Error Queue
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[11px] text-gray-400 font-mono">
          <p className="text-white font-semibold mb-0.5">Standalone Engine</p>
          <p>Local Encryption Active</p>
        </div>
      </div>

      {/* Main Workspace with Frosted Backdrop */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto bg-gradient-to-br from-[#0A0D0C] via-[#0E1311] to-[#0A0D0C]">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[#CCFF00] font-mono text-xs uppercase tracking-widest">Enterprise System</span>
            <h1 className="text-3xl font-black text-white mt-1 tracking-tight">
              {isIT ? 'IT Master Equipment & Replacement Console' : 'Executive Hardware Usage & Health Statistics'}
            </h1>
          </div>
          {isIT && (
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-5 py-2.5 bg-[#CCFF00] text-[#0B0F0E] font-bold text-xs rounded-xl shadow-[0_0_25px_rgba(204,255,0,0.25)] hover:bg-[#b3e600] transition-all"
            >
              + REGISTER NEW ASSET
            </button>
          )}
        </div>

        {/* ADMIN FROSTED STATISTICAL CARDS */}
        {!isIT && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Health Score</p>
              <p className="text-3xl font-black text-[#CCFF00] mt-2">{healthPercentage}%</p>
              <p className="text-xs text-gray-400 mt-1">Working to standard</p>
            </div>
            <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Operational</p>
              <p className="text-3xl font-black text-white mt-2">{workingWell} Units</p>
              <p className="text-xs text-gray-400 mt-1">Active deployment</p>
            </div>
            <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Under Maintenance</p>
              <p className="text-3xl font-black text-amber-400 mt-2">{underMaintenance} Units</p>
              <p className="text-xs text-amber-400/70 mt-1">In IT repair shop</p>
            </div>
            <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">System Errors</p>
              <p className="text-3xl font-black text-red-400 mt-2">{systemErrors} Devices</p>
              <p className="text-xs text-red-400/70 mt-1">Requires IT review</p>
            </div>
          </div>
        )}

        {/* FROSTED GLASS ASSET TABLE */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-gray-400 font-mono uppercase text-[10px] border-b border-white/10">
              <tr>
                <th className="p-4">Asset ID</th>
                <th className="p-4">Item & Serial Number</th>
                <th className="p-4">Category</th>
                <th className="p-4">Assigned Colleague</th>
                <th className="p-4">Condition</th>
                <th className="p-4">Operational Status</th>
                {isIT && <th className="p-4">IT Controls</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {assets.map((a) => (
                <tr key={a.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#CCFF00]">{a.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{a.itemName}</div>
                    <div className="text-[10px] font-mono text-gray-400">S/N: {a.serialNumber}</div>
                  </td>
                  <td className="p-4 font-semibold text-gray-300">{a.category}</td>
                  <td className="p-4 font-medium text-white">{a.assignedTo}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-white/10 text-gray-200 border border-white/10">
                      {a.condition}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${
                        a.status === 'ASSIGNED'
                          ? 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/30'
                          : a.status === 'IN_STOCK'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : a.status === 'UNDER_MAINTENANCE'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : a.status === 'SYSTEM_ERROR'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30'
                          : 'bg-white/5 text-gray-400 border-white/10'
                      }`}
                    >
                      {a.status.replace('_', ' ')}
                    </span>
                  </td>

                  {isIT && (
                    <td className="p-4 flex items-center space-x-2">
                      <select
                        value={a.status}
                        onChange={(e) => handleUpdateStatus(a.id, e.target.value as CompanyAsset['status'])}
                        className="text-xs bg-[#121816] text-white border border-white/10 rounded-xl px-2.5 py-1.5 font-semibold focus:outline-none focus:border-[#CCFF00]"
                      >
                        <option value="ASSIGNED">Assigned / Active</option>
                        <option value="IN_STOCK">In Stock (Vault)</option>
                        <option value="UNDER_MAINTENANCE">Maintenance</option>
                        <option value="SYSTEM_ERROR">System Error</option>
                      </select>

                      {(a.status === 'SYSTEM_ERROR' || a.status === 'UNDER_MAINTENANCE') && (
                        <button
                          onClick={() => {
                            setSelectedDamagedAsset(a);
                            setShowReplaceModal(true);
                          }}
                          className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-bold text-xs rounded-xl transition-all"
                        >
                          Replace New 🔄
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* APPLE FROSTED MODALS */}
      {showRegisterModal && isIT && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#121816] border border-white/10 w-full max-w-md rounded-3xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <h2 className="text-xl font-black text-white mb-4">Register New Equipment</h2>
            <form onSubmit={handleCreateAsset} className="space-y-3">
              <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-4 py-3 bg-[#1B2421] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#CCFF00]"
                required
              />
              <input
                type="text"
                placeholder="Hardware Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                className="w-full px-4 py-3 bg-[#1B2421] border border-white/10 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#CCFF00]"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CompanyAsset['category'])}
                className="w-full px-4 py-3 bg-[#1B2421] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#CCFF00]"
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
                className="w-full px-4 py-3 bg-[#1B2421] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#CCFF00]"
                required
              />
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white rounded-xl"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-[#CCFF00] text-[#0B0F0E] rounded-xl shadow-lg hover:bg-[#b3e600]"
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