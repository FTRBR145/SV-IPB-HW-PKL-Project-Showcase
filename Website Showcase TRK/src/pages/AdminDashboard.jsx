import React, { useState } from 'react';
import {
  LayoutDashboard, FolderKanban, Users, GraduationCap, BookOpen,
  Tag, Cpu, BarChart3, FileText, Settings, Activity,
  ArrowLeft, Search, Bell, ChevronDown, Eye, CheckCircle,
  XCircle, Edit, ChevronLeft, ChevronRight, ShieldCheck,
  Layers, TrendingUp
} from 'lucide-react';
import { initialProjects, SV_COURSES } from '../data/projectsData';
import './AdminDashboard.css';

// Sidebar menu config
const sidebarMenu = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: FolderKanban, label: 'Projek', id: 'projects', badge: 5 },
  { icon: Users, label: 'Moderator', id: 'moderators' },
  { icon: GraduationCap, label: 'Mahasiswa', id: 'students' },
  { icon: BookOpen, label: 'Mata Kuliah', id: 'courses' },
  { icon: Tag, label: 'Kategori', id: 'categories' },
  { icon: Cpu, label: 'Tech Stack', id: 'techstack' },
  { icon: BarChart3, label: 'Analitik', id: 'analytics' },
  { icon: FileText, label: 'Laporan', id: 'reports' },
  { icon: Settings, label: 'Pengaturan', id: 'settings' },
  { icon: Activity, label: 'Log Aktivitas', id: 'logs' },
];

// Mock submission data
const mockSubmissions = [
  { id: 'S00842', student: 'Ahmad Rizky P.', nim: 'J0304211088', title: 'Sistem IoT Smart Farming ESP32', desc: 'Projek IoT monitoring sensor ESP32...', course: 'Proyek Sistem IoT', date: '24 Okt 2025', time: '10:30', status: 'approved' },
  { id: 'S00841', student: 'Nabila Putri U.', nim: 'J0304211015', title: 'Smart Home & Monitoring Energi', desc: 'Aplikasi mobile kontrol sakelar listrik...', course: 'Aplikasi Mobile', date: '24 Okt 2025', time: '09:15', status: 'pending' },
  { id: 'S00840', student: 'David Chen', nim: 'J0304211029', title: 'Keamanan Akses Lab RFID', desc: 'Sistem pengontrol pintu lab RFID...', course: 'Sistem Tertanam', date: '23 Okt 2025', time: '16:45', status: 'rejected' },
  { id: 'S00839', student: 'Farhan Mahesa', nim: 'J0304211042', title: 'Infrastruktur Jaringan Server', desc: 'Perancangan topologi jaringan komputer...', course: 'Rangkaian Logika', date: '22 Okt 2025', time: '14:20', status: 'approved' },
  { id: 'S00838', student: 'Dewi Anggraini', nim: 'J0304211077', title: 'Dashboard Cloud Analytics', desc: 'Platform dashboard visualisasi telemetri...', course: 'Proyek Sistem IoT', date: '22 Okt 2025', time: '11:05', status: 'approved' },
  { id: 'S00837', student: 'Kevin Sanjaya', nim: 'J0304211102', title: 'Robotika Navigasi Cerdas', desc: 'Prototype robot otonom LIDAR...', course: 'Elektromekanik', date: '21 Okt 2025', time: '08:30', status: 'pending' },
  { id: 'S00836', student: 'Ade Riyan', nim: 'J0304211056', title: 'Monitoring Suhu Greenhouse', desc: 'Sensor DHT22 dengan dashboard web...', course: 'Proyek Sistem IoT', date: '20 Okt 2025', time: '15:40', status: 'approved' },
  { id: 'S00835', student: 'Fionando Emirs', nim: 'J0304211063', title: 'Drone Pemetaan Lahan', desc: 'Pengembangan drone agri mapping...', course: 'Sistem Tertanam', date: '19 Okt 2025', time: '13:00', status: 'pending' },
];

// 5 Mata Kuliah TRK distribution data
const courseChartData = [
  { name: 'Proyek Sistem IoT', count: 26 },
  { name: 'Sistem Tertanam', count: 20 },
  { name: 'Aplikasi Mobile', count: 18 },
  { name: 'Rangkaian Logika', count: 10 },
  { name: 'Elektromekanik', count: 8 },
];

// Donut chart SVG component
function DonutChart({ approved, pending, rejected }) {
  const total = approved + pending + rejected;
  const approvedPct = (approved / total) * 100;
  const pendingPct = (pending / total) * 100;
  const rejectedPct = (rejected / total) * 100;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const approvedDash = (approvedPct / 100) * circumference;
  const pendingDash = (pendingPct / 100) * circumference;
  const rejectedDash = (rejectedPct / 100) * circumference;

  const approvedOffset = 0;
  const pendingOffset = -(approvedDash);
  const rejectedOffset = -(approvedDash + pendingDash);

  return (
    <div style={{ position: 'relative', width: 160, height: 160 }}>
      <svg viewBox="0 0 180 180" width="160" height="160">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#3b82f6" strokeWidth="22"
          strokeDasharray={`${approvedDash} ${circumference - approvedDash}`}
          strokeDashoffset={approvedOffset}
          transform="rotate(-90 90 90)" strokeLinecap="round" />
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#f59e0b" strokeWidth="22"
          strokeDasharray={`${pendingDash} ${circumference - pendingDash}`}
          strokeDashoffset={pendingOffset}
          transform="rotate(-90 90 90)" />
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#ef4444" strokeWidth="22"
          strokeDasharray={`${rejectedDash} ${circumference - rejectedDash}`}
          strokeDashoffset={rejectedOffset}
          transform="rotate(-90 90 90)" />
      </svg>
      <div className="donut-center-text">
        <strong>{Math.round(approvedPct)}%</strong>
        <span>Disetujui</span>
      </div>
    </div>
  );
}

export default function AdminDashboard({ onBackToLanding }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalProjects = 250;
  const pendingCount = 18;
  const approvedCount = 220;
  const rejectedCount = 12;

  const maxBarValue = Math.max(...courseChartData.map(c => c.count));

  const filteredSubmissions = activeTab === 'all'
    ? mockSubmissions
    : mockSubmissions.filter(s => s.status === activeTab);

  return (
    <div className="admin-layout">
      <div
        className={`sidebar-mobile-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ===== SIDEBAR ===== */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <img src="/sv_ipb_navbar_logo.png" alt="IPB Vokasi" />
          <div className="sidebar-brand-text">
            <span>IPB University</span>
            <span>Sekolah Vokasi IPB</span>
          </div>
        </div>

        <div className="sidebar-label">MENU UTAMA</div>

        <nav className="sidebar-nav">
          {sidebarMenu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => { setActiveMenu(item.id); setSidebarOpen(false); }}
              >
                <Icon size={18} />
                {item.label}
                {item.badge && (
                  <span className="sidebar-item-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-admin-badge">
            <div className="sidebar-admin-avatar">A</div>
            <div className="sidebar-admin-info">
              <span>Mode Admin</span>
              <span>Administrator</span>
            </div>
          </div>
          <button className="sidebar-back-btn" onClick={onBackToLanding}>
            <ArrowLeft size={16} /> Kembali ke Website
          </button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="sidebar-mobile-toggle" onClick={() => setSidebarOpen(true)}>
              <Layers size={20} />
            </button>
            <div className="topbar-title">
              <span>TRK SV IPB</span>
              <span>Showcase Projek Mahasiswa</span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-search">
              <Search size={16} />
              <input type="text" placeholder="Cari sesuatu..." />
              <kbd>Ctrl+K</kbd>
            </div>

            <button className="topbar-notif-btn">
              <Bell size={20} />
              <span className="topbar-notif-badge">4</span>
            </button>

            <div className="topbar-user">
              <div className="topbar-user-avatar">A</div>
              <div className="topbar-user-info">
                <span>Admin</span>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="admin-content">
          <div className="dash-welcome">
            <h1>Dashboard</h1>
            <p>Selamat datang, Admin! Berikut ringkasan projek mahasiswa TRK.</p>
          </div>

          {/* ===== STAT CARDS ===== */}
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-icon blue"><Layers size={22} /></div>
              <div className="stat-info">
                <span className="stat-label">Total Projek</span>
                <span className="stat-value">{totalProjects}</span>
                <span className="stat-change up">+12 bulan ini</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange"><Activity size={22} /></div>
              <div className="stat-info">
                <span className="stat-label">Menunggu Moderasi</span>
                <span className="stat-value">{pendingCount}</span>
                <span className="stat-change up">+8 minggu ini</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green"><CheckCircle size={22} /></div>
              <div className="stat-info">
                <span className="stat-label">Projek Disetujui</span>
                <span className="stat-value">{approvedCount}</span>
                <span className="stat-change up">+20 bulan ini</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon red"><XCircle size={22} /></div>
              <div className="stat-info">
                <span className="stat-label">Projek Ditolak</span>
                <span className="stat-value">{rejectedCount}</span>
                <span className="stat-change down">+3 bulan ini</span>
              </div>
            </div>
          </div>

          {/* ===== CHARTS ROW ===== */}
          <div className="charts-row">
            {/* Bar Chart */}
            <div className="chart-card">
              <div className="chart-card-header">
                <h3>Distribusi Projek Per Mata Kuliah</h3>
                <a href="#">Lihat Semua</a>
              </div>
              <div className="bar-chart-container">
                {courseChartData.map((item, idx) => (
                  <div key={idx} className="bar-chart-item">
                    <span className="bar-value">{item.count}</span>
                    <div
                      className="bar-fill"
                      style={{ height: `${(item.count / maxBarValue) * 150}px` }}
                      title={item.name}
                    />
                    <span className="bar-label">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut Chart */}
            <div className="chart-card">
              <div className="chart-card-header">
                <h3>Status Pengajuan</h3>
                <a href="#">Lihat Semua</a>
              </div>
              <div className="donut-chart-wrapper">
                <DonutChart
                  approved={approvedCount}
                  pending={pendingCount}
                  rejected={rejectedCount}
                />
                <div className="donut-legend">
                  <div className="legend-item">
                    <span className="legend-dot approved" />
                    <div className="legend-text">
                      <strong>Disetujui {Math.round((approvedCount / totalProjects) * 100)}%</strong>
                      <span>({approvedCount})</span>
                    </div>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot pending" />
                    <div className="legend-text">
                      <strong>Menunggu {Math.round((pendingCount / totalProjects) * 100)}%</strong>
                      <span>({pendingCount})</span>
                    </div>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot rejected" />
                    <div className="legend-text">
                      <strong>Ditolak {Math.round((rejectedCount / totalProjects) * 100)}%</strong>
                      <span>({rejectedCount})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SUBMISSIONS TABLE ===== */}
          <div className="table-card">
            <div className="table-header">
              <h3>Pengajuan Projek Terbaru</h3>
              <a href="#">Lihat Semua Pengajuan →</a>
            </div>

            <div className="table-tabs">
              <button
                className={`table-tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >Semua</button>
              <button
                className={`table-tab pending-tab ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >Menunggu</button>
              <button
                className={`table-tab approved-tab ${activeTab === 'approved' ? 'active' : ''}`}
                onClick={() => setActiveTab('approved')}
              >Disetujui</button>
              <button
                className={`table-tab rejected-tab ${activeTab === 'rejected' ? 'active' : ''}`}
                onClick={() => setActiveTab('rejected')}
              >Ditolak</button>
            </div>

            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama Mahasiswa</th>
                    <th>Judul Projek</th>
                    <th>Mata Kuliah</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub.id}>
                      <td style={{ color: '#94a3b8', fontWeight: 600, fontSize: '0.8rem' }}>{sub.id}</td>
                      <td>
                        <div className="student-cell">
                          <div className="student-avatar">{sub.student.charAt(0)}</div>
                          <div className="student-name-col">
                            <strong>{sub.student}</strong>
                            <span>NIM. {sub.nim}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="project-title-col">
                          <strong>{sub.title}</strong>
                          <span>{sub.desc}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.82rem' }}>{sub.course}</td>
                      <td>
                        <div style={{ fontSize: '0.82rem' }}>
                          {sub.date}<br />
                          <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{sub.time}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${sub.status}`}>
                          {sub.status === 'approved' ? 'Disetujui' : sub.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn view"><Eye size={12} /> Lihat</button>
                          <button className="action-btn approve"><CheckCircle size={12} /> Setujui</button>
                          <button className="action-btn reject"><XCircle size={12} /> Tolak</button>
                          <button className="action-btn edit"><Edit size={12} /> Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="table-pagination">
              <span className="pagination-info">
                Menampilkan 1 sampai {filteredSubmissions.length} dari {filteredSubmissions.length} pengajuan
              </span>
              <div className="pagination-controls">
                <button className="page-btn" disabled><ChevronLeft size={16} /></button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">...</button>
                <button className="page-btn">13</button>
                <button className="page-btn"><ChevronRight size={16} /></button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
