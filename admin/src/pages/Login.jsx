import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/images/logo.png';

/**
 * ==========================================================
 * ADMIN LOGIN PAGE
 * ==========================================================
 * Standalone login page for Admin.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const publicWebsiteUrl = import.meta.env.VITE_PUBLIC_URL || 'http://localhost:5173';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/admin/videos');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Invalid login credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08060c] flex items-center justify-center p-5 relative overflow-hidden text-gray-200">
      {/* Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-gradient-to-b from-[#141024] to-[#0f0c1b] border border-purple-500/30 p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.15)]">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src={logoImg}
            alt="QubecloudHub Logo"
            className="h-14 w-auto object-contain mb-3"
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Portal</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign in to manage portfolio video reels
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5">
            <span className="material-symbols-outlined text-base text-red-400">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-2">
              Admin Email
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-gray-400 text-[18px]">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#08060c] border border-purple-500/25 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-purple-300 mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-gray-400 text-[18px] pointer-events-none">
                key
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#08060c] border border-purple-500/25 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 text-gray-400 hover:text-purple-300 hover:bg-purple-500/10 active:scale-95 transition-all p-1.5 rounded-lg flex items-center justify-center focus:outline-none focus:text-purple-300"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Return to Public Website */}
        <div className="mt-8 text-center">
          <a
            href={publicWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-purple-300 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            <span>Return to Public Website</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
