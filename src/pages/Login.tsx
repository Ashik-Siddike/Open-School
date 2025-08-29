import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError('Google লগইন ব্যর্থ!');
    setLoading(false);
  };

  // Email/Password Login or Signup
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError('সাইনআপ ব্যর্থ!');
      else setError('সাইনআপ সফল! ইমেইল চেক করুন।');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError('লগইন ব্যর্থ! ইউজারনেম বা পাসওয়ার্ড ভুল।');
      else navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleAuth} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">{isSignup ? 'একাউন্ট খুলুন' : 'লগইন করুন'}</h2>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded font-semibold mb-4 flex items-center justify-center gap-2"
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.64 2.7 30.18 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.2C12.13 13.13 17.57 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.7 16.36 0 20.06 0 24c0 3.94.7 7.64 2.69 12.24l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.15-5.57l-7.19-5.6c-2.01 1.35-4.59 2.15-7.96 2.15-6.43 0-11.87-3.63-14.33-8.79l-7.98 6.2C6.73 42.18 14.82 48 24 48z"/></g></svg>
          Google দিয়ে {isSignup ? 'সাইনআপ' : 'লগইন'}
        </button>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="mx-2 text-gray-400 text-xs">অথবা</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>
        <input
          type="email"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? 'লোড হচ্ছে...' : isSignup ? 'সাইনআপ' : 'লগইন'}
        </button>
        {error && <div className="text-red-600 mt-2 text-center">{error}</div>}
        <div className="text-xs text-gray-500 mt-4 text-center">
          {isSignup ? 'ইতিমধ্যে একাউন্ট আছে?' : 'নতুন একাউন্ট খুলতে চান?'}{' '}
          <button
            type="button"
            className="text-blue-600 underline ml-1"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'লগইন করুন' : 'সাইনআপ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login; 