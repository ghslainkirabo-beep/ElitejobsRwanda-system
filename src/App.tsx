import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { SplashLoading } from './components/SplashLoading';
import { AuthSlider } from './components/AuthSlider';
import { AttendanceModule } from './components/AttendanceModule';
import { ITAttendanceGenerator } from './components/ITAttendanceGenerator';
import { RecruitmentCRM } from './components/RecruitmentCRM';
import { AdminAttendanceReview } from './components/AdminAttendanceReview';
import { ReceptionistVisitorDesk } from './components/ReceptionistVisitorDesk';
import { PayrollModule } from './components/PayrollModule';
import { AssetManagement } from './components/AssetManagement';

export function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userPosition, setUserPosition] = useState('IT Support');
  const [activeTab, setActiveTab] = useState<'WORKSPACE' | 'PAYROLL' | 'ASSETS'>('WORKSPACE');

  useEffect(() => {
    const session = localStorage.getItem('elite_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.position) {
          setUserPosition(parsed.position);
          setUsername(parsed.username || '');
          setAuthenticated(true);
        }
      } catch (e) {
        // invalid session
      }
    }
  }, []);

  useEffect(() => {
    if (!authenticated || !username) return;

    const channel = supabase.channel('user_revocation');
    channel
      .on('broadcast', { event: 'REVOKE_USER' }, (payload) => {
        if (payload.payload && payload.payload.username === username) {
          alert('⚠️ YOUR EMPLOYMENT ACCESS HAS BEEN REVOKED BY IT / ADMIN.\nLogging out immediately.');
          handleLogout();
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authenticated, username]);

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

  const handleLogout = () => {
    localStorage.removeItem('elite_session');
    setAuthenticated(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Top Status & Navigation Bar */}
      <div className="fixed top-3 right-5 z-50 bg-[#0B0F0E] text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-3 shadow-xl border border-white/10">
        <span className="text-[#CCFF00] font-mono">ROLE: {userPosition.toUpperCase()}</span>
        <button onClick={() => setActiveTab('WORKSPACE')} className={`hover:text-[#CCFF00] ${activeTab === 'WORKSPACE' ? 'text-[#CCFF00] font-bold' : ''}`}>Workspace</button>
        {(userPosition === 'Admin / Owner' || userPosition === 'HR Manager') && (
          <button onClick={() => setActiveTab('PAYROLL')} className={`hover:text-[#CCFF00] ${activeTab === 'PAYROLL' ? 'text-[#CCFF00] font-bold' : ''}`}>Payroll</button>
        )}
        {(userPosition === 'IT Support' || userPosition === 'Admin / Owner') && (
          <button onClick={() => setActiveTab('ASSETS')} className={`hover:text-[#CCFF00] ${activeTab === 'ASSETS' ? 'text-[#CCFF00] font-bold' : ''}`}>Assets</button>
        )}
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 border-l border-white/10 pl-3">Log Out</button>
      </div>

      {/* Dynamic Role Views */}
      {activeTab === 'PAYROLL' && (userPosition === 'Admin / Owner' || userPosition === 'HR Manager') ? (
        <PayrollModule />
      ) : activeTab === 'ASSETS' && (userPosition === 'IT Support' || userPosition === 'Admin / Owner') ? (
        <AssetManagement />
      ) : (
        (() => {
          switch (userPosition) {
            case 'IT Support':
              return <ITAttendanceGenerator />;
            case 'Admin / Owner':
              return <AdminAttendanceReview />;
            case 'HR Manager':
              return <RecruitmentCRM />;
            case 'Receptionist / Customer Care':
              return <ReceptionistVisitorDesk />;
            default:
              return <AttendanceModule />;
          }
        })()
      )}
    </div>
  );
}

export default App;