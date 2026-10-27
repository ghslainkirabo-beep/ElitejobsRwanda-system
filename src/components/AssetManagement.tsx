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

  const totalAssets = assets.length;
  const errorCount = assets.filter(a => a.status === 'SYSTEM_ERROR').length;
  const maintenanceCount = assets.filter(a => a.status === 'UNDER_MAINTENANCE').length;
  const operationalHealthScore = Math.round(((totalAssets - (errorCount + maintenanceCount)) / totalAssets) * 100);

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto text-[#FFFFFF]">
      
      {/* HEADER & ROLE TOGGLE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#E3E6EC]/10 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight uppercase text-[#FFFFFF]">
            Hardware & <span className="text-[#FAD201]">Asset Command</span>
          </h1>
          <p className="text-[#6B7280] text-xs font-mono tracking-wider mt-1">
            {roleView === 'IT_SUPPORT' ? 'IT Support: Inventory Control & Direct Replacement Pipeline' : 'Admin / Owner: Executive Health & Hardware Metrics'}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#1C2233] p-1.5 rounded-xl border border-[#E3E6EC]/10">
          <button
            onClick={() => setRoleView('IT_SUPPORT')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
              roleView === 'IT_SUPPORT'
                ? 'bg-[#0B6FA4] text-[#FFFFFF] font-bold'
                : 'text-[#6B7280] hover:text-[#FFFFFF]'
            }`}
          >
            IT Support
          </button>
          <button
            onClick={() => setRoleView('ADMIN')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all ${
              roleView === 'ADMIN'
                ? 'bg-[#0B6FA4] text-[#FFFFFF] font-bold'
                : 'text-[#6B7280] hover:text-[#FFFFFF]'
            }`}
          >
            Executive Admin
          </button>
        </div>
      </div>

      {/* EXECUTIVE STATS (#1C2233 CARDS) */}
      {roleView === 'ADMIN' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#1C2233] border border-[#E3E6EC]/10 rounded-2xl p-5">
            <p className="text-[#6B7280] text-xs font-mono uppercase">Operational Health</p>
            <h3 className="text-3xl font-black text-[#FAD201] mt-2">{operationalHealthScore}%</h3>
            <p className="text-[10px] text-[#6B7280] font-mono mt-1">Fleet hardware capacity</p>
          </div>
          <div className="bg-[#1C2233] border border-[#E3E6EC]/10 rounded-2xl p-5">
            <p className="text-[#6B7280] text-xs font-mono uppercase">Total Devices</p>
            <h3 className="text-3xl font-black text-[#FFFFFF] mt-2">{totalAssets}</h3>
            <p className="text-[10px] text-[#6B7280] font-mono mt-1">Active inventory count</p>
          </div>
          <div className="bg-[#1C2233] border border-[#E3E6EC]/10 rounded-2xl p-5">
            <p className="text-[#6B7280] text-xs font-mono uppercase">System Errors</p>
            <h3 className="text-3xl font-black text-[#D64545] mt-2">{errorCount}</h3>
            <p className="text-[10px] text-[#6B7280] font-mono mt-1">Requires immediate order</p>
          </div>
          <div className="bg-[#1C2233] border border-[#E3E6EC]/10 rounded-2xl p-5">
            <p className="text-[#6B7280] text-xs font-mono uppercase">Maintenance</p>
            <h3 className="text-3xl font-black text-[#E8A317] mt-2">{maintenanceCount}</h3>
            <p className="text-[10px] text-[#6B7280] font-mono mt-1">Workshop servicing</p>
          </div>
        </div>
      )}

      {/* IT SUPPORT INVENTORY TABLE */}
      {roleView === 'IT_SUPPORT' && (
        <div className="space-y-4">
          
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['ALL', 'IN_STOCK', 'ASSIGNED', 'UNDER_MAINTENANCE', 'SYSTEM_ERROR'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                  filter === status
                    ? 'bg-[#0B6FA4] text-[#FFFFFF] font-bold'
                    : 'bg-[#1C2233] text-[#6B7280] hover:text-[#FFFFFF]'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="bg-[#1C2233] border border-[#E3E6EC]/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E3E6EC]/10 bg-[#12151F] text-[#6B7280] text-[11px] font-mono uppercase tracking-wider">
                  <th className="p-4">Asset & Serial</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Assigned Colleague</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">IT Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E6EC]/10 text-sm">
                {filteredAssets.map(asset => (
                  <tr key={asset.id} className="hover:bg-[#12151F]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#FFFFFF]">{asset.name}</div>
                      <div className="text-xs font-mono text-[#6B7280]">{asset.serialNumber}</div>
                    </td>
                    <td className="p-4 text-[#6B7280] font-mono text-xs">{asset.category}</td>
                    <td className="p-4 text-[#FFFFFF]">{asset.assignedTo}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider ${
                        asset.status === 'IN_STOCK' ? 'bg-[#1E9E5A]/15 text-[#1E9E5A] border border-[#1E9E5A]/30' :
                        asset.status === 'ASSIGNED' ? 'bg-[#0B6FA4]/15 text-[#0B6FA4] border border-[#0B6FA4]/30' :
                        asset.status === 'UNDER_MAINTENANCE' ? 'bg-[#E8A317]/15 text-[#E8A317] border border-[#E8A317]/30' :
                        'bg-[#D64545]/15 text-[#D64545] border border-[#D64545]/30'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <select
                        value={asset.status}
                        onChange={(e) => handleStatusChange(asset.id, e.target.value as Asset['status'])}
                        className="bg-[#12151F] border border-[#E3E6EC]/20 text-xs text-[#FFFFFF] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#0B6FA4]"
                      >
                        <option value="IN_STOCK">In Stock</option>
                        <option value="ASSIGNED">Assigned</option>
                        <option value="UNDER_MAINTENANCE">Maintenance</option>
                        <option value="SYSTEM_ERROR">System Error</option>
                      </select>

                      {(asset.status === 'SYSTEM_ERROR' || asset.status === 'UNDER_MAINTENANCE') && (
                        <button
                          onClick={() => triggerReplacementPurchase(asset)}
                          className="px-3 py-1.5 bg-[#FAD201] text-[#12151F] text-xs font-bold font-mono rounded-lg hover:bg-[#e6c200] transition-all shadow-sm"
                        >
                          Order Replace
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

      {/* MODAL (#1C2233 WITH #FAD201 BUTTON & DARK TEXT) */}
      {purchaseModal && selectedAsset && (
        <div className="fixed inset-0 z-50 bg-[#12151F]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1C2233] border border-[#E3E6EC]/20 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-black uppercase text-[#FFFFFF]">
              Hardware Replacement Order
            </h3>
            <p className="text-[#6B7280] text-xs">
              Initiate replacement procurement for damaged asset: <span className="text-[#FFFFFF] font-bold">{selectedAsset.name}</span> ({selectedAsset.serialNumber}) assigned to <span className="text-[#FAD201]">{selectedAsset.assignedTo}</span>.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[11px] font-mono text-[#6B7280] uppercase">Replacement Model</label>
                <input
                  type="text"
                  readOnly
                  value={`Direct Replacement for ${selectedAsset.name}`}
                  className="w-full mt-1 bg-[#12151F] border border-[#E3E6EC]/10 rounded-xl px-3 py-2 text-sm text-[#FFFFFF] font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#6B7280] uppercase">Procurement Priority</label>
                <select className="w-full mt-1 bg-[#12151F] border border-[#E3E6EC]/20 rounded-xl px-3 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:border-[#0B6FA4]">
                  <option>Urgent (Colleague Unblocked in 24h)</option>
                  <option>Standard Restock Cycle</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E3E6EC]/10">
              <button
                onClick={() => setPurchaseModal(false)}
                className="px-4 py-2 text-xs font-mono uppercase text-[#6B7280] hover:text-[#FFFFFF]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Replacement purchase order successfully dispatched for ${selectedAsset.name}!`);
                  setPurchaseModal(false);
                }}
                className="px-5 py-2 bg-[#FAD201] text-[#12151F] text-xs font-bold font-mono rounded-xl hover:bg-[#e6c200] transition-all"
              >
                Dispatch Order
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};