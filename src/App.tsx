import React, { useState } from 'react';
import { SplashLoading } from './components/SplashLoading';
import { AssetManagement } from './components/AssetManagement';
import { LeaveManagement } from './components/LeaveManagement';
import { OrgDirectory } from './components/OrgDirectory';

export const App: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<'ASSETS' | 'LEAVE' | 'DIRECTORY'>('ASSETS');
  const [userRole, setUserRole] = useState<'IT_SUPPORT' | 'ADMIN' | 'STAFF'>('IT_SUPPORT');

  if (!loadingComplete) {
    return <SplashLoading onComplete={() => setLoadingComplete(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col selection:bg-[#CCFF00] selection:text-black">
      {/* Top Navigation */}
      <header className="border-b border-white/10 bg-[#0A0D14]/80 backdrop-blur-2xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#121816] border border-[#CCFF00]/40 rounded-xl flex items-center justify-center text-[#CCFF00] font-black text-xs font-mono">
            e
          </div>
          <span className="font-black tracking-tight uppercase text-sm">
            EliteJobs <span className="text-[#CCFF00]">Rwanda</span>
          </span>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('ASSETS')}
            className={`px-4 py-2 text-xs font-mono uppercase rounded-xl transition-all ${
              activeTab === 'ASSETS' ? 'bg-[#CCFF00] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Assets Command
          </button>
          <button
            onClick={() => setActiveTab('LEAVE')}
            className={`px-4 py-2 text-xs font-mono uppercase rounded-xl transition-all ${
              activeTab === 'LEAVE' ? 'bg-[#CCFF00] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Leave Portal
          </button>
          <button
            onClick={() => setActiveTab('DIRECTORY')}
            className={`px-4 py-2 text-xs font-mono uppercase rounded-xl transition-all ${
              activeTab === 'DIRECTORY' ? 'bg-[#CCFF00] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Org Directory
          </button>
        </nav>

        {/* Role Switcher Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-500 uppercase">Role:</span>
          <select
            value={userRole}
            onChange={e => setUserRole(e.target.value as any)}
            className="bg-[#090B11] border border-white/20 text-xs text-[#CCFF00] font-mono font-bold rounded-xl px-3 py-1.5 focus:outline-none"
          >
            <option value="IT_SUPPORT">IT Support</option>
            <option value="ADMIN">Admin / Owner</option>
            <option value="STAFF">Staff</option>
          </select>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'ASSETS' && <AssetManagement userRole={userRole} />}
        {activeTab === 'LEAVE' && <LeaveManagement userRole={userRole} />}
        {activeTab === 'DIRECTORY' && <OrgDirectory />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 px-6 text-center text-[10px] font-mono text-gray-500">
        EliteJobs Rwanda Enterprise OS • Cross-Platform Native Target (EXE / APK / IPA)
      </footer>
    </div>
  );
};

export default App;