import React, { useState } from 'react';
import { SplashLoading } from './components/SplashLoading';
import { AuthSlider } from './components/AuthSlider';
import { AttendanceModule } from './components/AttendanceModule';
import { ITAttendanceGenerator } from './components/ITAttendanceGenerator';
import { RecruitmentCRM } from './components/RecruitmentCRM';
import { ClientInvoicing } from './components/ClientInvoicing';

export function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userPosition, setUserPosition] = useState('IT Support');
  const [activeTab, setActiveTab] = useState<'AUTO' | 'CRM' | 'INVOICING'>('AUTO');

  if (loading) {
    return <SplashLoading onComplete={() => setLoading(false)} />;
  }

  if (!authenticated) {
    return (
      <AuthSlider 
        onAuthenticated={(pos) => {
          setUserPosition(pos);
          setAuthenticated(true);
        }} 
      />
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Global Module Navigation Bar */}
      <div className="fixed top-3 right-5 z-50 bg-[#1b1e24] text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-3 shadow-xl border border-gray-700">
        <span className="text-gray-400 font-mono">ROLE: {userPosition}</span>
        <button onClick={() => setActiveTab('AUTO')} className={`hover:text-amber-400 ${activeTab === 'AUTO' ? 'text-amber-400 font-bold' : ''}`}>Workspace</button>
        <button onClick={() => setActiveTab('CRM')} className={`hover:text-amber-400 ${activeTab === 'CRM' ? 'text-amber-400 font-bold' : ''}`}>CRM</button>
        <button onClick={() => setActiveTab('INVOICING')} className={`hover:text-amber-400 ${activeTab === 'INVOICING' ? 'text-amber-400 font-bold' : ''}`}>Invoicing</button>
      </div>

      {activeTab === 'CRM' ? (
        <RecruitmentCRM />
      ) : activeTab === 'INVOICING' ? (
        <ClientInvoicing />
      ) : userPosition === 'IT Support' ? (
        <ITAttendanceGenerator />
      ) : userPosition === 'HR Manager' || userPosition === 'Admin / Owner' ? (
        <RecruitmentCRM />
      ) : (
        <AttendanceModule />
      )}
    </div>
  );
}

export default App;