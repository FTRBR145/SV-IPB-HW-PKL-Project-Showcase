import React, { useState } from 'react';
import { X, LogIn, UserCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [role, setRole] = useState('mahasiswa');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!identifier) {
      alert('Harap masukkan NIM/NIP!');
      return;
    }
    alert(`Selamat datang kembali! Login sebagai ${role === 'mahasiswa' ? 'Mahasiswa' : 'Dosen'} SV IPB (${identifier}) berhasil.`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-body" style={{ padding: '2.25rem 1.75rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'var(--accent-blue-light)',
              color: 'var(--ipb-navy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <LogIn size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--ipb-navy)', fontSize: '1.5rem', fontWeight: 800 }}>
              Masuk Portal SV IPB
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              Gunakan NIM / NIP akun Single Sign-On IPB University
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.3rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
            <button
              type="button"
              style={{
                flex: 1,
                padding: '0.45rem',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: role === 'mahasiswa' ? '#ffffff' : 'transparent',
                color: role === 'mahasiswa' ? 'var(--ipb-navy)' : 'var(--text-muted)',
                boxShadow: role === 'mahasiswa' ? 'var(--shadow-sm)' : 'none'
              }}
              onClick={() => setRole('mahasiswa')}
            >
              Mahasiswa
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                padding: '0.45rem',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: role === 'dosen' ? '#ffffff' : 'transparent',
                color: role === 'dosen' ? 'var(--ipb-navy)' : 'var(--text-muted)',
                boxShadow: role === 'dosen' ? 'var(--shadow-sm)' : 'none'
              }}
              onClick={() => setRole('dosen')}
            >
              Dosen / Staff
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>{role === 'mahasiswa' ? 'NIM Mahasiswa' : 'NIP Dosen'}</label>
              <input
                type="text"
                className="form-control"
                placeholder={role === 'mahasiswa' ? 'Contoh: J0304211088' : 'Contoh: 198503152010...'}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Kata Sandi (SSO IPB)</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
              <UserCheck size={18} /> Masuk Akun
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
