import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setTimeout(() => {
        setIsLoggedIn(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
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
                Selamat datang kembali, Admin/Dosen TRK SV IPB.
              </p>
            </div>
          ) : (
            <>
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: 'var(--accent-blue)' }}>
                  <Lock size={24} />
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--ipb-navy)' }}>
                  Login Admin / Dosen TRK
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Masuk ke dashboard pengelola mata kuliah & moderasi projek mahasiswa.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email / Username IPB</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="admin.trk@apps.ipb.ac.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
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
                  Masuk Sesi Admin
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
