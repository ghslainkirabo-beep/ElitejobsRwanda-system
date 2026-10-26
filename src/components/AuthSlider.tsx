import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export const AuthSlider: React.FC<{ onAuthenticated: (position: string) => void }> = ({ onAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('IT Support');
  const [inviteCode, setInviteCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*, positions(title)')
        .eq('username', username)
        .eq('password_hash', password)
        .single();

      if (error || !data) {
        setErrorMsg('Invalid username or password.');
        setLoading(false);
        return;
      }

      const assignedPos = data.positions?.title || 'IT Support';
      localStorage.setItem('elite_session', JSON.stringify({ username, position: assignedPos }));
      onAuthenticated(assignedPos);
    } catch (err) {
      setErrorMsg('Connection error to Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Verify Invite Code
      const { data: invite, error: inviteErr } = await supabase
        .from('invite_codes')
        .select('*')
        .eq('code', inviteCode)
        .eq('is_used', false)
        .single();

      if (inviteErr || !invite) {
        setErrorMsg('Invalid or already used IT Invite Code.');
        setLoading(false);
        return;
      }

      // 2. Register User
      const { error: regErr } = await supabase.from('users').insert([
        {
          username,
          password_hash: password,
          position_id: invite.assigned_position_id,
          status: 'ACTIVE'
        }
      ]);

      if (regErr) {
        setErrorMsg('Username already taken.');
        setLoading(false);
        return;
      }

      // 3. Mark Invite Code Used
      await supabase.from('invite_codes').update({ is_used: true }).eq('id', invite.id);

      alert('Account registered successfully! You can now sign in.');
      setIsSignUp(false);
    } catch (err) {
      setErrorMsg('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1b1e24] p-4">
      <div className="relative w-full max-w-[900px] h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        
        {/* Sign In Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#303133] mb-2">Sign In</h2>
          <p className="text-sm text-gray-400 mb-4">Access your department workspace</p>
          {errorMsg && <p className="text-xs text-red-500 mb-3 font-semibold">{errorMsg}</p>}
          <form onSubmit={handleSignIn} className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <button type="submit" disabled={loading} className="w-full py-3 bg-[#714b67] text-white font-bold rounded-lg shadow-md hover:bg-[#5b3c52]">
              {loading ? 'AUTHENTICATING...' : 'LOG IN TO WORKSPACE'}
            </button>
          </form>
        </div>

        {/* Create Account Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#303133] mb-2">Create Account</h2>
          <p className="text-sm text-gray-400 mb-4">Register credentials & invite code</p>
          <form onSubmit={handleSignUp} className="space-y-3">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2.5 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <input type="text" placeholder="IT Invite Code (e.g. ELITE-IT-2026)" value={inviteCode} onChange={e => setInviteCode(e.target.value)} className="w-full px-4 py-2.5 bg-[#f5f7fa] border border-gray-200 rounded-lg focus:outline-none focus:border-[#714b67]" required />
            <button type="submit" disabled={loading} className="w-full py-3 bg-[#714b67] text-white font-bold rounded-lg shadow-md hover:bg-[#5b3c52]">
              {loading ? 'REGISTERING...' : 'REGISTER POSITION'}
            </button>
          </form>
        </div>

        {/* Sliding Panel */}
        <div className={`absolute top-0 bottom-0 w-1/2 bg-[#714b67] text-white p-12 flex flex-col items-center justify-center text-center transition-transform duration-500 ease-in-out z-20 ${isSignUp ? 'translate-x-0' : 'translate-x-full'}`}>
          <h2 className="text-3xl font-bold mb-4">{isSignUp ? "Already Registered?" : "New Colleague?"}</h2>
          <p className="text-sm text-gray-200 mb-8">{isSignUp ? "Slide back to Sign In and access your secure department workspace." : "Create your credentials using your company invite code."}</p>
          <button onClick={() => setIsSignUp(!isSignUp)} className="px-8 py-3 bg-white text-[#714b67] font-bold rounded-lg shadow-lg hover:bg-gray-100">{isSignUp ? "SIGN IN" : "CREATE ACCOUNT"}</button>
        </div>
      </div>
    </div>
  );
};