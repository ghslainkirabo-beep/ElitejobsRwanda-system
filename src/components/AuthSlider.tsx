import React, { useState } from 'react';

export const AuthSlider: React.FC<{ onAuthenticated: (position: string) => void }> = ({ onAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [position, setPosition] = useState('IT Support');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('elite_session', JSON.stringify({ username, position }));
    onAuthenticated(position);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B0F0E] p-4 font-sans">
      <div className="relative w-full max-w-[950px] h-[580px] bg-[#121816] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden flex border border-white/5">
        
        {/* Sign In Form Container */}
        <div className="w-1/2 p-14 flex flex-col justify-center text-white z-10">
          <div className="mb-6">
            <span className="text-[#CCFF00] font-mono text-xs tracking-widest uppercase">COMPONENT • 01</span>
            <h2 className="text-4xl font-black tracking-tight mt-1">Sign In</h2>
            <p className="text-sm text-gray-400 mt-1">Access your secure department workspace.</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1 font-medium">Username or email</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                className="w-full px-4 py-3.5 bg-[#1B2421] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CCFF00] transition-colors" 
                required 
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1 font-medium">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full px-4 py-3.5 bg-[#1B2421] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CCFF00] transition-colors" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-[#CCFF00] text-[#0B0F0E] font-bold rounded-xl shadow-lg hover:bg-[#b3e600] transition-all transform active:scale-[0.99] mt-2"
            >
              Sign in
            </button>
          </form>
        </div>

        {/* Create Account Form Container */}
        <div className="w-1/2 p-14 flex flex-col justify-center text-white z-10">
          <div className="mb-6">
            <span className="text-[#CCFF00] font-mono text-xs tracking-widest uppercase">COMPONENT • 02</span>
            <h2 className="text-4xl font-black tracking-tight mt-1">Create account</h2>
            <p className="text-sm text-gray-400 mt-1">Register credentials & position.</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-3">
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full px-4 py-3 bg-[#1B2421] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CCFF00]" 
              required 
            />
            <input 
              type="password" 
              placeholder="Password (min 8 chars)" 
              className="w-full px-4 py-3 bg-[#1B2421] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CCFF00]" 
              required 
            />
            <select 
              value={position} 
              onChange={e => setPosition(e.target.value)} 
              className="w-full px-4 py-3 bg-[#1B2421] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#CCFF00]"
            >
              <option value="IT Support">IT Support</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Receptionist / Customer Care">Receptionist / Front Desk</option>
              <option value="Admin / Owner">Admin / Owner</option>
            </select>
            <button 
              type="submit" 
              className="w-full py-3.5 bg-[#CCFF00] text-[#0B0F0E] font-bold rounded-xl shadow-lg hover:bg-[#b3e600] transition-all mt-1"
            >
              Create account
            </button>
          </form>
        </div>

        {/* Sliding Door Overlay Panel (Verso Motion Style) */}
        <div className={`absolute top-0 bottom-0 w-1/2 bg-[#1B2421] border-l border-white/10 p-14 flex flex-col justify-between transition-transform duration-700 ease-in-out z-30 ${isSignUp ? 'translate-x-0' : 'translate-x-full'}`}>
          <div>
            <span className="text-xs font-mono tracking-widest text-[#CCFF00]">ELITEJOBS RWANDA</span>
            <h1 className="text-4xl font-black text-white mt-3 leading-tight">
              {isSignUp ? "Start the first page." : "Welcome back."}
            </h1>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {isSignUp 
                ? "One account for every board, every draft and every device you own." 
                : "Your boards, your drafts and your people are exactly where you left them."}
            </p>
            <button 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-all border border-white/10"
            >
              {isSignUp ? "Already have an account? Sign in" : "New to EliteJobs? Create account"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};