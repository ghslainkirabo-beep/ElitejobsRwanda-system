import React, { useState } from 'react';

interface CompanyAsset {
  id: string;
  itemName: string;
  serialNumber: string;
  category: 'Laptop' | 'Mobile Device' | 'Access Card' | 'Networking';
  assignedTo: string;
  status: 'ASSIGNED' | 'IN_STOCK' | 'MAINTENANCE';
  condition: 'Excellent' | 'Good' | 'Fair';
}

export const AssetManagement: React.FC = () => {
  const [assets, setAssets] = useState<CompanyAsset[]>([
    {
      id: 'AST-001',
      itemName: 'MacBook Pro 16" (M2)',
      serialNumber: 'C02G80XZMD6M',
      category: 'Laptop',
      assignedTo: 'Jean Paul (HR)',
      status: 'ASSIGNED',
      condition: 'Excellent',
    },
    {
      id: 'AST-002',
      itemName: 'Dell Latitude 5420',
      serialNumber: 'DL-98234109',
      category: 'Laptop',
      assignedTo: 'Aline Uwase (Front Desk)',
      status: 'ASSIGNED',
      condition: 'Good',
    },
    {
      id: 'AST-003',
      itemName: 'Samsung Galaxy A32',
      serialNumber: 'SM-33920192',
      category: 'Mobile Device',
      assignedTo: 'Unassigned',
      status: 'IN_STOCK',
      condition: 'Good',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [category, setCategory] = useState<CompanyAsset['category']>('Laptop');
  const [assignedTo, setAssignedTo] = useState('Unassigned');

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
    };

    setAssets([newAsset, ...assets]);
    setShowModal(false);
    setItemName('');
    setSerialNumber('');
  };

  return (
    <div className="flex h-screen bg-[#f4f6f9] font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 font-bold text-[#714b67] text-lg border-b border-gray-100">🗂️ IT Asset Register</div>
        <div className="p-4 space-y-2 text-sm font-medium text-gray-600">
          <div className="p-2.5 bg-[#f0f2f5] text-[#714b67] rounded-lg font-bold cursor-pointer">💻 Hardware & Laptops</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🔑 Access Cards & Keys</div>
          <div className="p-2.5 hover:bg-gray-50 rounded-lg cursor-pointer">🛠️ Maintenance Logs</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#303133]">Company Asset & Equipment Tracking</h1>
            <p className="text-sm text-gray-500">Monitor hardware assignments, serial numbers, and equipment conditions.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#714b67] text-white font-bold text-xs rounded-lg shadow hover:bg-[#5b3c52]"
          >
            + REGISTER NEW ASSET
          </button>
        </div>

        {/* Asset Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200 uppercase text-xs">
              <tr>
                <th className="p-4">Asset ID</th>
                <th className="p-4">Item & Serial Number</th>
                <th className="p-4">Category</th>
                <th className="p-4">Assigned Staff</th>
                <th className="p-4">Condition</th>
                <th className="p-4">Status</th>
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
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                      {a.condition}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        a.status === 'ASSIGNED'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Asset Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Register New Company Asset</h2>
            <form onSubmit={handleCreateAsset} className="space-y-3">
              <input
                type="text"
                placeholder="Item Name (e.g. Dell XPS 15)"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                placeholder="Serial Number"
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
                  SAVE ASSET
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};