import React, { useState } from 'react';
import { SplashLoading } from './components/SplashLoading';
import { AuthSlider } from './components/AuthSlider';
import { AttendanceModule } from './components/AttendanceModule';
import { ITAttendanceGenerator } from './components/ITAttendanceGenerator';

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

  // Route to IT QR Generator if position is IT Support, otherwise regular attendance scanner
  if (userPosition === 'IT Support') {
    return <ITAttendanceGenerator />;
  }

  return <AttendanceModule />;
}

export default App;