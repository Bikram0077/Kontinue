import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/admin/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#A60000] to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl">
        <div className="text-center mb-8">
          <img 
            src="https://i.postimg.cc/N0GQ5wL4/continuewhite.png"
            alt="Kontinue Creations Logo"
            className="w-24 h-auto mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A60000] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full bg-white/5 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A60000] focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-[#A60000] text-white py-2 px-4 rounded-md hover:bg-[#8a0000] focus:outline-none focus:ring-2 focus:ring-[#A60000] focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;