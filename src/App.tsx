import React, { useState } from 'react';
import { SplashLoading } from './components/SplashLoading';
import { AuthSlider } from './components/AuthSlider';
import { AttendanceModule } from './components/AttendanceModule';

export function App() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  if (loading) return <SplashLoading onComplete={() => setLoading(false)} />;
  if (!authenticated) return <AuthSlider onAuthenticated={() => setAuthenticated(true)} />;
  return <AttendanceModule />;
}
export default App;
