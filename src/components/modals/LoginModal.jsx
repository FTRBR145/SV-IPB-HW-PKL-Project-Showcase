import React, { useState } from 'react';
import { X, Lock, User, GraduationCap, ShieldCheck } from 'lucide-react';
import { DEFAULT_ADMIN_USER, DEFAULT_STUDENT_USER } from '../../data/users';
import useApp from '../../hooks/useApp';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { loginAsStudent, loginAsAdmin } = useApp();
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        if (role === 'admin') {
          loginAsAdmin();
        } else {
          loginAsStudent();
        }
        onClose();
        if (onLoginSuccess) {
          onLoginSuccess(role);
        }
      }, 700);
    }
  };

  const handleFillDemoCredentials = () => {
    if (role === 'student') {
      setUsername(DEFAULT_STUDENT_USER.nim);
      setPassword('password123');
    } else {
      setUsername(DEFAULT_ADMIN_USER.email);
      setPassword('admin123');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-sm sm:max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-100 transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10"
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
              <p className="text-slate-500 text-xs">
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
                <p className="text-slate-500 text-xs mt-1">
                  Pilih peran kamu untuk masuk ke sistem showcase projek SV IPB.
                </p>
              </div>

              {/* Dual Role Selector Tabs */}
              <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1.5 rounded-2xl mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setRole('student');
                    setUsername('');
                    setPassword('');
                  }}
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
                  }}
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
                    <label className="block text-[11px] font-bold text-slate-700">
                      {role === 'student' ? 'NIM / Email Mahasiswa IPB' : 'NIP / Email Dosen / Admin TRK'}
                    </label>
                    <button
                      type="button"
                      onClick={handleFillDemoCredentials}
                      className="text-[10px] text-sky-600 hover:text-sky-700 font-semibold underline"
                    >
                      Isi Demo Otomatis
                    </button>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder={role === 'student' ? 'J0304211015 / mhs@apps.ipb.ac.id' : 'admin.trk@apps.ipb.ac.id'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Password Akun IPB
                  </label>
                  <input
                    type="password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all mt-2"
                >
                  {role === 'admin' ? 'Masuk ke Dashboard Admin' : 'Masuk Portal Mahasiswa'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
