import React, { useState } from 'react';

export const AuthSlider: React.FC<{ onAuthenticated: () => void }> = ({ onAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('IT Support');
  const [inviteCode, setInviteCode] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('elite_session', JSON.stringify({ username, position }));
    onAuthenticated();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1b1e24] p-4">
      <div className="relative w-full max-w-[900px] h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#303133] mb-2">Sign In</h2>
          <p className="text-sm text-gray-400 mb-6">Access your department workspace</p>
          <form onSubmit={handleAuth} className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <button type="submit" className="w-full py-3 bg-[#714b67] text-white font-bold rounded-lg shadow-md hover:bg-[#5b3c52]">LOG IN TO WORKSPACE</button>
          </form>
        </div>
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#303133] mb-2">Create Account</h2>
          <p className="text-sm text-gray-400 mb-6">Register credentials & invite code</p>
          <form onSubmit={handleAuth} className="space-y-3">
            <input type="text" placeholder="Username" className="w-full px-4 py-2.5 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <input type="password" placeholder="Password" className="w-full px-4 py-2.5 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <select value={position} onChange={e => setPosition(e.target.value)} className="w-full px-4 py-2.5 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]">
              <option>IT Support</option>
              <option>HR Manager</option>
              <option>Operational Manager</option>
              <option>Receptionist / Customer Care</option>
              <option>Admin / Owner</option>
            </select>
            <input type="text" placeholder="IT Invite Code" value={inviteCode} onChange={e => setInviteCode(e.target.value)} className="w-full px-4 py-2.5 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <button type="submit" className="w-full py-3 bg-[#714b67] text-white font-bold rounded-lg shadow-md hover:bg-[#5b3c52]">REGISTER POSITION</button>
          </form>
        </div>
        <div className={bsolute top-0 bottom-0 w-1/2 bg-[#714b67] text-white p-12 flex flex-col items-center justify-center text-center transition-transform duration-500 ease-in-out z-20 }>
          <h2 className="text-3xl font-bold mb-4">{isSignUp ? "Already Registered?" : "New Colleague?"}</h2>
          <p className="text-sm text-gray-200 mb-8">{isSignUp ? "Slide back to Sign In and access your secure department workspace." : "Create your credentials using your company invite code."}</p>
          <button onClick={() => setIsSignUp(!isSignUp)} className="px-8 py-3 bg-white text-[#714b67] font-bold rounded-lg shadow-lg hover:bg-gray-100">{isSignUp ? "SIGN IN" : "CREATE ACCOUNT"}</button>
        </div>
      </div>
    </div>
  );
};
