import React, { useState } from 'react';

interface Asset {
  id: string;
  name: string;
  category: 'Laptop' | 'Peripherals' | 'Mobile' | 'Server';
  assignedTo: string;
  status: 'IN_STOCK' | 'ASSIGNED' | 'UNDER_MAINTENANCE' | 'SYSTEM_ERROR';
  serialNumber: string;
  lastChecked: string;
}

export const AssetManagement: React.FC<{ userRole: 'IT_SUPPORT' | 'ADMIN' | 'STAFF' }> = ({ userRole }) => {
  const [roleView, setRoleView] = useState<'IT_SUPPORT' | 'ADMIN'>(userRole === 'ADMIN' ? 'ADMIN' : 'IT_SUPPORT');
  
  const [assets, setAssets] = useState<Asset[]>([
    { id: 'AST-001', name: 'MacBook Pro 16" M3 Max', category: 'Laptop', assignedTo: 'Jean Bosco (Engineering)', status: 'ASSIGNED', serialNumber: 'C02G901NMD6R', lastChecked: '2026-10-26' },
    { id: 'AST-002', name: 'Dell UltraSharp 32 4K Monitor', category: 'Peripherals', assignedTo: 'Aline Uwase (Design)', status: 'SYSTEM_ERROR', serialNumber: 'DL-99281-X', lastChecked: '2026-10-27' },
    { id: 'AST-003', name: 'ThinkPad X1 Carbon Gen 11', category: 'Laptop', assignedTo: 'Unassigned', status: 'IN_STOCK', serialNumber: 'TP-88372-GH', lastChecked: '2026-10-25' },
    { id: 'AST-004', name: 'Logitech MX Master 3S', category: 'Peripherals', assignedTo: 'Patrick Mugisha (IT)', status: 'UNDER_MAINTENANCE', serialNumber: 'LG-44219-MX', lastChecked: '2026-10-27' },
  ]);

  const [filter, setFilter] = useState<string>('ALL');
  const [purchaseModal, setPurchaseModal] = useState<boolean>(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleStatusChange = (id: string, newStatus: Asset['status']) => {
    setAssets(assets.map(a => a.id === id ? { ...a, status: newStatus, lastChecked: new Date().toISOString().split('T')[0] } : a));
  };

  const triggerReplacementPurchase = (asset: Asset) => {
    setSelectedAsset(asset);
    setPurchaseModal(true);
  };

  const filteredAssets = filter === 'ALL' ? assets : assets.filter(a => a.status === filter);

  // Executive metrics for Admin view
  const totalAssets = assets.length;
  const errorCount = assets.filter(a => a.status === 'SYSTEM_ERROR').length;
  const maintenanceCount = assets.filter(a => a.status === 'UNDER_MAINTENANCE').length;
  const operationalHealthScore = Math.round(((totalAssets - (errorCount + maintenanceCount)) / totalAssets) * 100);

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto text-white">
      
      {/* MODULE HEADER & ROLE SWITCHER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight uppercase">
            Hardware & <span className="text-[#CCFF00]">Asset Command</span>
          </h1>
          <p className="text-gray-400 text-xs font-mono tracking-wider mt-1">
            {roleView === 'IT_SUPPORT' ? 'IT Support: Deep Inventory Control & Replacement Pipeline' : 'Admin / Owner: Executive Intelligence & Usage Health'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRoleView('IT_SUPPORT')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-all ${
              roleView === 'IT_SUPPORT'
                ? 'bg-[#CCFF00] text-black font-bold shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            IT Support View
          </button>
          <button
            onClick={() => setRoleView('ADMIN')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-all ${
              roleView === 'ADMIN'
                ? 'bg-[#CCFF00] text-black font-bold shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Executive Admin View
          </button>
        </div>
      </div>

      {/* ADMIN VIEW: EXECUTIVE INTELLIGENCE STATISTICS */}
      {roleView === 'ADMIN' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <p className="text-gray-400 text-xs font-mono uppercase">Hardware Health Score</p>
            <h3 className="text-3xl font-black text-[#CCFF00] mt-2">{operationalHealthScore}%</h3>
            <p className="text-[10px] text-gray-500 font-mono mt-1">Optimal operational capacity</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <p className="text-gray-400 text-xs font-mono uppercase">Total Fleet Devices</p>
            <h3 className="text-3xl font-black text-white mt-2">{totalAssets}</h3>
            <p className="text-[10px] text-gray-500 font-mono mt-1">Active corporate inventory</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <p className="text-gray-400 text-xs font-mono uppercase">System Errors / Damaged</p>
            <h3 className="text-3xl font-black text-red-400 mt-2">{errorCount}</h3>
            <p className="text-[10px] text-gray-500 font-mono mt-1">Requires immediate IT replacement</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
            <p className="text-gray-400 text-xs font-mono uppercase">Under Maintenance</p>
            <h3 className="text-3xl font-black text-yellow-400 mt-2">{maintenanceCount}</h3>
            <p className="text-[10px] text-gray-500 font-mono mt-1">Bench workshop servicing</p>
          </div>
        </div>
      )}

      {/* IT SUPPORT VIEW: HARDWARE INVENTORY COMMAND */}
      {roleView === 'IT_SUPPORT' && (
        <div className="space-y-4 animate-fade-in">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['ALL', 'IN_STOCK', 'ASSIGNED', 'UNDER_MAINTENANCE', 'SYSTEM_ERROR'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                  filter === status
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Assets Table */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 text-[11px] font-mono uppercase tracking-wider">
                  <th className="p-4">Asset & Serial</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Assigned Colleague</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">IT Command Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredAssets.map(asset => (
                  <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white">{asset.name}</div>
                      <div className="text-xs font-mono text-gray-500">{asset.serialNumber}</div>
                    </td>
                    <td className="p-4 text-gray-300 font-mono text-xs">{asset.category}</td>
                    <td className="p-4 text-gray-300">{asset.assignedTo}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider ${
                        asset.status === 'IN_STOCK' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                        asset.status === 'ASSIGNED' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                        asset.status === 'UNDER_MAINTENANCE' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <select
                        value={asset.status}
                        onChange={(e) => handleStatusChange(asset.id, e.target.value as Asset['status'])}
                        className="bg-[#090B11] border border-white/20 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#CCFF00]"
                      >
                        <option value="IN_STOCK">In Stock</option>
                        <option value="ASSIGNED">Assigned</option>
                        <option value="UNDER_MAINTENANCE">Maintenance</option>
                        <option value="SYSTEM_ERROR">System Error</option>
                      </select>

                      {(asset.status === 'SYSTEM_ERROR' || asset.status === 'UNDER_MAINTENANCE') && (
                        <button
                          onClick={() => triggerReplacementPurchase(asset)}
                          className="px-3 py-1.5 bg-[#CCFF00] text-black text-xs font-bold font-mono rounded-lg hover:bg-[#b3e600] transition-all shadow-[0_0_10px_rgba(204,255,0,0.2)]"
                        >
                          Replace Order
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPLACEMENT PURCHASE WORKFLOW MODAL */}
      {purchaseModal && selectedAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B0E14] border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-4">
            <h3 className="text-lg font-black uppercase text-white">
              Hardware Replacement Purchase
            </h3>
            <p className="text-gray-400 text-xs">
              Initiate zero-budget procurement review for damaged colleague asset: <span className="text-white font-bold">{selectedAsset.name}</span> ({selectedAsset.serialNumber}) currently assigned to <span className="text-[#CCFF00]">{selectedAsset.assignedTo}</span>.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 uppercase">Replacement Model Specification</label>
                <input
                  type="text"
                  readOnly
                  value={`Direct Replacement for ${selectedAsset.name}`}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-400 uppercase">Procurement Priority</label>
                <select className="w-full mt-1 bg-[#090B11] border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#CCFF00]">
                  <option>Urgent (Colleague Unblocked in 24h)</option>
                  <option>Standard Restock Cycle</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setPurchaseModal(false)}
                className="px-4 py-2 text-xs font-mono uppercase text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Replacement purchase order successfully dispatched for ${selectedAsset.name}!`);
                  setPurchaseModal(false);
                }}
                className="px-5 py-2 bg-[#CCFF00] text-black text-xs font-bold font-mono rounded-xl hover:bg-[#b3e600] transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)]"
              >
                Dispatch Purchase Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};