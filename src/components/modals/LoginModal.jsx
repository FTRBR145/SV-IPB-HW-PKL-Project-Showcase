import React, { useState } from 'react';
import { X, Lock, User, GraduationCap, ShieldCheck } from 'lucide-react';
import { demoCredentials } from '../../services/apiClient';
import useApp from '../../hooks/useApp';
import ModalShell from '../common/ModalShell';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { loginAsStudent, loginAsAdmin } = useApp();
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password || isSubmitting) return;
    setIsSubmitting(true);
    setLoginError('');
    try {
      const authenticatedUser = role === 'admin'
        ? await loginAsAdmin({ username, password })
        : await loginAsStudent({ username, password });
      onClose();
      onLoginSuccess?.(authenticatedUser.role);
    } catch (error) {
      setLoginError(error.message || 'Akun belum dapat diverifikasi. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemoCredentials = () => {
    const credential = demoCredentials[role];
    setUsername(credential.identifier);
    setPassword(credential.password);
    setLoginError('');
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Masuk ke akun Showcase TRK"
      panelClassName="max-w-md max-h-[90vh] flex flex-col overflow-hidden rounded-3xl"
    >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
          onClick={onClose}
          aria-label="Tutup"
        >
          <X size={16} />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSubmitting ? (
            <div className="text-center py-8 space-y-3 animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto shadow-inner animate-pulse">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-800">
                Memverifikasi Akun...
              </h3>
              <p className="text-sm text-slate-600" role="status" aria-live="polite">
                {role === 'admin'
                  ? 'Menghubungkan ke Portal Administrator TRK SV IPB...'
                  : 'Menghubungkan ke Portal Mahasiswa TRK SV IPB...'}
              </p>
            </div>
          ) : (
            <>
              {/* Header Title */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Lock size={22} />
                </div>
                <h2 className="font-heading text-xl font-extrabold text-slate-900">
                  Autentikasi Akun TRK
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Pilih peran kamu untuk masuk ke sistem showcase projek SV IPB.
                </p>
              </div>

              {/* Dual Role Selector Tabs */}
              <div className="mb-5 grid grid-cols-2 gap-1.5 rounded-2xl bg-slate-100 p-1.5" role="group" aria-label="Pilih jenis akun demo">
                <button
                  type="button"
                  onClick={() => {
                    setRole('student');
                    setUsername('');
                    setPassword('');
                    setLoginError('');
                  }}
                  aria-pressed={role === 'student'}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    role === 'student'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <GraduationCap size={15} className={role === 'student' ? 'text-sky-600' : ''} />
                  <span>Mahasiswa</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('admin');
                    setUsername('');
                    setPassword('');
                    setLoginError('');
                  }}
                  aria-pressed={role === 'admin'}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    role === 'admin'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <User size={15} className={role === 'admin' ? 'text-sky-600' : ''} />
                  <span>Dosen / Admin</span>
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="login-username" className="block text-xs font-bold text-slate-700">
                      {role === 'student' ? 'NIM / Email Mahasiswa IPB' : 'NIP / Email Dosen / Admin TRK'}
                    </label>
                    <button
                      type="button"
                      onClick={handleFillDemoCredentials}
                      className="min-h-11 text-xs font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900"
                    >
                      Isi Demo Otomatis
                    </button>
                  </div>
                  <input
                    id="login-username"
                    type="text"
                    autoComplete="username"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-3 text-base text-slate-800 placeholder-slate-500 transition-colors focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 sm:text-sm"
                    placeholder={role === 'student' ? 'J0304211015 / mhs@apps.ipb.ac.id' : 'admin.trk@apps.ipb.ac.id'}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setLoginError('');
                    }}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="mb-1.5 block text-xs font-bold text-slate-700">
                    Password Akun IPB
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-3 text-base text-slate-800 placeholder-slate-500 transition-colors focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 sm:text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setLoginError('');
                    }}
                    required
                  />
                </div>

                {loginError && (
                  <p className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-800" role="alert">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 min-h-11 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
                >
                  {role === 'admin' ? 'Masuk ke Dashboard Admin' : 'Masuk Portal Mahasiswa'}
                </button>
              </form>
            </>
          )}
        </div>
    </ModalShell>
  );
}
