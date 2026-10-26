import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const session = localStorage.getItem('elite_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.position) {
          setUserPosition(parsed.position);
          setAuthenticated(true);
        }
      } catch (e) {
        // invalid session
      }
    }
  }, []);

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
      {/* Universal Top Bar for Role Awareness & Logout */}
      <div className="fixed top-3 right-5 z-50 bg-[#1b1e24] text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center space-x-3 shadow-xl border border-gray-700">
        <span className="text-amber-400 font-mono">ROLE: {userPosition.toUpperCase()}</span>
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 border-l border-gray-700 pl-3">Log Out</button>
      </div>

      {/* Strict Role-Based Workspace Routing */}
      {(() => {
        switch (userPosition) {
          case 'IT Support':
            return <ITAttendanceGenerator />;
          case 'HR Manager':
            return <RecruitmentCRM />;
          case 'Receptionist / Customer Care':
            return <AttendanceModule />;
          case 'Admin / Owner':
            return <ClientInvoicing />;
          default:
            return <AttendanceModule />;
        }
      })()}
    </div>
  );
}

export default App;