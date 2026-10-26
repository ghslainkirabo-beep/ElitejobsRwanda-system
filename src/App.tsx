import React, { useState } from 'react';
import { SplashLoading } from './components/SplashLoading';
import { AuthSlider } from './components/AuthSlider';
import { AttendanceModule } from './components/AttendanceModule';
import { ITAttendanceGenerator } from './components/ITAttendanceGenerator';
import { RecruitmentCRM } from './components/RecruitmentCRM';

export function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userPosition, setUserPosition] = useState('IT Support');

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

  if (userPosition === 'IT Support') {
    return <ITAttendanceGenerator />;
  }

  if (userPosition === 'HR Manager' || userPosition === 'Admin / Owner') {
    return <RecruitmentCRM />;
  }

  return <AttendanceModule />;
}

export default App;