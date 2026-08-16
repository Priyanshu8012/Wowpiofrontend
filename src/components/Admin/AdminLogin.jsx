import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '../BrandLogo';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setError('Please enter username and password.');
      return;
    }

    setLoading(true);
    try {
      const { loginAdmin } = await import('../../api/auth.api.js');
      const data = await loginAdmin(cleanUsername, cleanPassword);
      localStorage.setItem('wowpio_admin_token', data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0C0C0C]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#C9A259]/12 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#1E4D6B]/35 blur-3xl" />
      </div>

      {/* Brand panel */}
      <div className="relative hidden w-[46%] flex-col justify-between border-r border-white/10 p-10 lg:flex xl:p-14">
        <BrandLogo size="md" asLink={false} />

        <div>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A259]">
            WOWPIO Admin
          </p>
          <h1 className="mt-4 max-w-md font-heading text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
            Run the brand from one calm dashboard
          </h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/50">
            Banners, products, announcements, and enquiries — managed with the same clarity customers feel on the site.
          </p>

          <ul className="mt-10 space-y-3">
            {['Secure staff access', 'Live site content control', 'Inbox & partner leads'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/65">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#C9A259]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/30">© {new Date().getFullYear()} WOWPIO · Authorized access only</p>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-1 items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px]"
        >
          <div className="mb-8 lg:hidden">
            <BrandLogo size="md" asLink={false} />
          </div>

          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.28em] text-[#C9A259]">
            Sign in
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-white/45">Use your admin credentials to continue.</p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl md:p-8"
          >
            <div>
              <label htmlFor="username" className="mb-2 block font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#121212] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#C9A259]/45 focus:ring-1 focus:ring-[#C9A259]/30"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#121212] py-3 pl-10 pr-11 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#C9A259]/45 focus:ring-1 focus:ring-[#C9A259]/30"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-3 py-2.5 text-xs text-red-300"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A259] py-3.5 font-heading text-sm font-bold uppercase tracking-[0.14em] text-[#0C0C0C] transition-colors hover:bg-[#A8893F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/35">
            <Link to="/" className="text-white/55 underline-offset-2 hover:text-[#C9A259] hover:underline">
              ← Back to website
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
