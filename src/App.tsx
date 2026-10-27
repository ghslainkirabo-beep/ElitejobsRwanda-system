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
    <div className="min-h-screen bg-[#12151F] text-[#FFFFFF] flex flex-col font-sans">
      
      {/* HEADER BAR (#12151F & #1C2233 NAV) */}
      <header className="border-b border-[#E3E6EC]/10 bg-[#12151F] sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1C2233] border border-[#FAD201]/40 rounded-xl flex items-center justify-center text-[#FAD201] font-black text-xs font-mono">
            e
          </div>
          <span className="font-black tracking-tight uppercase text-sm text-[#FFFFFF]">
            EliteJobs <span className="text-[#FAD201]">Rwanda</span>
          </span>
        </div>

        {/* ACTIVE NAVIGATION TABS (#0B6FA4 ACTIVE) */}
        <nav className="flex items-center gap-1 bg-[#1C2233] p-1.5 rounded-2xl border border-[#E3E6EC]/10">
          <button
            onClick={() => setActiveTab('ASSETS')}
            className={`px-4 py-2 text-xs font-mono uppercase rounded-xl transition-all ${
              activeTab === 'ASSETS' ? 'bg-[#0B6FA4] text-[#FFFFFF] font-bold' : 'text-[#6B7280] hover:text-[#FFFFFF]'
            }`}
          >
            Assets Command
          </button>
          <button
            onClick={() => setActiveTab('LEAVE')}
            className={`px-4 py-2 text-xs font-mono uppercase rounded-xl transition-all ${
              activeTab === 'LEAVE' ? 'bg-[#0B6FA4] text-[#FFFFFF] font-bold' : 'text-[#6B7280] hover:text-[#FFFFFF]'
            }`}
          >
            Leave Portal
          </button>
          <button
            onClick={() => setActiveTab('DIRECTORY')}
            className={`px-4 py-2 text-xs font-mono uppercase rounded-xl transition-all ${
              activeTab === 'DIRECTORY' ? 'bg-[#0B6FA4] text-[#FFFFFF] font-bold' : 'text-[#6B7280] hover:text-[#FFFFFF]'
            }`}
          >
            Org Directory
          </button>
        </nav>

        {/* ROLE INDICATOR */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#6B7280] uppercase">Role:</span>
          <select
            value={userRole}
            onChange={e => setUserRole(e.target.value as any)}
            className="bg-[#1C2233] border border-[#E3E6EC]/20 text-xs text-[#FAD201] font-mono font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#0B6FA4]"
          >
            <option value="IT_SUPPORT">IT Support</option>
            <option value="ADMIN">Admin / Owner</option>
            <option value="STAFF">Staff</option>
          </select>
        </div>
      </header>

      {/* MAIN VIEW */}
      <main className="flex-1 bg-[#12151F]">
        {activeTab === 'ASSETS' && <AssetManagement userRole={userRole} />}
        {activeTab === 'LEAVE' && <LeaveManagement userRole={userRole} />}
        {activeTab === 'DIRECTORY' && <OrgDirectory />}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#E3E6EC]/10 bg-[#12151F] py-4 px-6 text-center text-[10px] font-mono text-[#6B7280]">
        EliteJobs Rwanda Enterprise Hyper-Platform • Multi-Platform Native Binary Target (EXE / APK / IPA)
      </footer>
    </div>
  );
};

export default App;