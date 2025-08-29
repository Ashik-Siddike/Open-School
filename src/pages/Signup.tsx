import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError('রেজিস্ট্রেশন ব্যর্থ! ইমেইল বা পাসওয়ার্ড ভুল।');
    else alert('রেজিস্ট্রেশন সফল! ইমেইল চেক করুন।');
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">রেজিস্ট্রেশন করুন</h2>
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
          {loading ? 'লোড হচ্ছে...' : 'রেজিস্ট্রেশন'}
        </button>
        {error && <div className="text-red-600 mt-2 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default Signup; 