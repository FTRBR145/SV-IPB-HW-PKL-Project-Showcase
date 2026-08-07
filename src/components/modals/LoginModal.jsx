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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-body" style={{ padding: '2rem 1.75rem' }}>
          {isLoggedIn ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <ShieldCheck size={54} color="var(--accent-blue)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ipb-navy)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                Login Berhasil!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {role === 'admin'
                  ? 'Pengalihan otomatis ke Dashboard Admin TRK SV IPB...'
                  : 'Selamat datang kembali, Mahasiswa TRK SV IPB!'}
              </p>
            </div>
          ) : (
            <>
              {/* Header Title */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: 'var(--accent-blue)' }}>
                  <Lock size={24} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--ipb-navy)' }}>
                  Autentikasi Pengguna TRK
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Pilih peran kamu untuk masuk ke platform SV IPB Showcase.
                </p>
              </div>

              {/* Dual Role Selector Tabs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: '#f1f5f9', padding: '0.35rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    background: role === 'student' ? '#ffffff' : 'transparent',
                    color: role === 'student' ? 'var(--ipb-navy)' : '#64748b',
                    boxShadow: role === 'student' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <GraduationCap size={16} /> Mahasiswa
                </button>

                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    background: role === 'admin' ? '#ffffff' : 'transparent',
                    color: role === 'admin' ? 'var(--ipb-navy)' : '#64748b',
                    boxShadow: role === 'admin' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <User size={16} /> Dosen / Admin
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    {role === 'student' ? 'NIM / Email Mahasiswa IPB' : 'NIP / Email Dosen / Admin TRK'}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={role === 'student' ? 'J0304211088 / mhs@apps.ipb.ac.id' : 'admin.trk@apps.ipb.ac.id'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password Akun IPB</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1.25rem', padding: '0.75rem' }}>
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
