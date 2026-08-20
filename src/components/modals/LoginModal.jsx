import React, { useState } from 'react';
import { X, Lock, User, GraduationCap, ShieldCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
      setTimeout(() => {
        setIsLoggedIn(false);
        onClose();
        if (onLoginSuccess) {
          onLoginSuccess(role);
        }
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden border border-gray-100 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
          onClick={onClose}
        >
          <X size={16} />
        </button>

        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isLoggedIn ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-heading text-lg font-bold text-gray-800 mb-1.5">
                Login Berhasil!
              </h3>
              <p className="text-gray-500 text-xs">
                {role === 'admin'
                  ? 'Pengalihan otomatis ke Dashboard Admin TRK SV IPB...'
                  : 'Selamat datang kembali, Mahasiswa TRK SV IPB!'}
              </p>
            </div>
          ) : (
            <>
              {/* Header Title */}
              <div className="text-center mb-5 pr-4">
                <div className="w-11 h-11 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-2.5">
                  <Lock size={20} />
                </div>
                <h2 className="font-heading text-lg font-extrabold text-gray-800">
                  Autentikasi Pengguna TRK
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">
                  Pilih peran kamu untuk masuk ke platform SV IPB Showcase.
                </p>
              </div>

              {/* Dual Role Selector Tabs */}
              <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-bold text-xs transition-all ${
                    role === 'student'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <GraduationCap size={15} /> Mahasiswa
                </button>

                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg font-bold text-xs transition-all ${
                    role === 'admin'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <User size={15} /> Dosen / Admin
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    {role === 'student' ? 'NIM / Email Mahasiswa IPB' : 'NIP / Email Dosen / Admin TRK'}
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder={role === 'student' ? 'J0304211088 / mhs@apps.ipb.ac.id' : 'admin.trk@apps.ipb.ac.id'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Password Akun IPB</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="w-full py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs shadow-md transition-all pt-2.5 mt-2">
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
