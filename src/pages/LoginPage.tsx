import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { btnPrimary } from '../components/dashboard/ui';

export const LoginPage: React.FC = () => {
  const { configured, user, profile, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) {
      const target = location.state?.from || (profile?.role === 'admin' ? '/admin' : '/dashboard');
      navigate(target, { replace: true });
    }
  }, [user, profile, navigate, location.state]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err = await signIn(email.trim(), password);
    if (err) {
      setError(err);
      setBusy(false);
    } else {
      const target = location.state?.from || (profile?.role === 'admin' ? '/admin' : '/dashboard');
      navigate(target, { replace: true });
    }
  };

  return (
    <div className="bg-brand-gray-50 min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-md bg-white border border-brand-gray-200 rounded-3xl shadow-brand p-6 sm:p-10">
        <div className="text-[11px] uppercase tracking-widest text-brand-blue font-bold mb-2">BrandoraX Portal</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-1">Welcome back</h1>
        <p className="text-sm text-brand-gray-500 mb-6">Sign in to access your dashboard.</p>

        {!configured && (
          <div className="flex gap-3 p-3.5 mb-5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Supabase isn't connected yet. Add <code className="font-bold">VITE_SUPABASE_URL</code> and{' '}
              <code className="font-bold">VITE_SUPABASE_ANON_KEY</code> to the <code className="font-bold">.env</code> file, then restart the dev server.
            </span>
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-brand-gray-600 mb-1.5 font-bold">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email" required autoComplete="email" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com"
                className="w-full h-11 pl-10 pr-4 bg-brand-gray-50 border border-brand-gray-300 rounded-lg text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase text-brand-gray-600 mb-1.5 font-bold">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password" required autoComplete="current-password" value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full h-11 pl-10 pr-4 bg-brand-gray-50 border border-brand-gray-300 rounded-lg text-sm text-brand-navy focus:outline-none focus:border-brand-blue"
              />
            </div>
          </div>

          {error && <div className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

          <button type="submit" disabled={busy || !configured} className={`${btnPrimary} w-full`}>
            {busy ? 'Signing in…' : (<>Sign in <ArrowRight className="w-4 h-4" /></>)}
          </button>
        </form>

        <p className="text-xs text-brand-gray-500 text-center mt-6">
          New here?{' '}
          <Link to="/apply" className="font-bold text-brand-blue hover:underline">Apply to a programme</Link>
        </p>
      </div>
    </div>
  );
};
