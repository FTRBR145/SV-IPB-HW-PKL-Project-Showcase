import React from 'react';
import { ShieldCheck, ArrowLeft, CheckCircle, XCircle, Trash2, Edit } from 'lucide-react';

export default function AdminDashboard({ onBackToLanding }) {
  return (
    <div className="admin-dashboard-page" style={{ padding: '2rem 0', minHeight: '100vh', background: '#f8fafc' }}>
      <div className="container">
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={onBackToLanding}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <ArrowLeft size={16} /> Kembali ke Landing Page
            </button>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--ipb-navy)' }}>
              Dashboard Moderasi Admin TRK SV IPB
            </h1>
          </div>
          <span style={{ background: '#dbeafe', color: '#1e40af', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={16} /> Mode Admin Aktif
          </span>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>TOTAL PROJEK</span>
            <h2 style={{ fontSize: '2rem', color: 'var(--ipb-navy)', marginTop: '0.2rem' }}>250</h2>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>PENGAJUAN MENUNGGU</span>
            <h2 style={{ fontSize: '2rem', color: '#eab308', marginTop: '0.2rem' }}>5</h2>
          </div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>DISAPPROVED</span>
            <h2 style={{ fontSize: '2rem', color: '#ef4444', marginTop: '0.2rem' }}>12</h2>
          </div>
        </div>

        {/* Moderasi Table */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1e293b' }}>
            Daftar Pengajuan Projek Mahasiswa (Menunggu Moderasi)
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', color: '#475569' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Judul Projek</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Mahasiswa</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Mata Kuliah TRK</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Aksi Moderasi</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem' }}>Sistem IoT Smart Farming ESP32</td>
                  <td style={{ padding: '1rem' }}>Ahmad Rizky (J0304211088)</td>
                  <td style={{ padding: '1rem' }}>IoT & Embedded System</td>
                  <td style={{ padding: '1rem' }}>
                    <button className="btn btn-sm btn-primary" style={{ marginRight: '0.5rem' }}>
                      <CheckCircle size={14} /> Setujui
                    </button>
                    <button className="btn btn-sm btn-secondary">
                      <XCircle size={14} /> Tolak
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
