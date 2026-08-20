import React, { useState } from 'react';
import {
  LayoutDashboard, FolderKanban, Users, GraduationCap, BookOpen,
  Tag, Cpu, BarChart3, FileText, Settings, Activity,
  ArrowLeft, Search, Bell, ChevronDown, Eye, CheckCircle,
  XCircle, Edit, ChevronLeft, ChevronRight, ShieldCheck,
  Layers, TrendingUp
} from 'lucide-react';
import { initialProjects, SV_COURSES } from '../data/projectsData';

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
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg viewBox="0 0 180 180" className="w-40 h-40 transform -rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#3b82f6" strokeWidth="22"
          strokeDasharray={`${approvedDash} ${circumference - approvedDash}`}
          strokeDashoffset={approvedOffset}
          strokeLinecap="round" />
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#f59e0b" strokeWidth="22"
          strokeDasharray={`${pendingDash} ${circumference - pendingDash}`}
          strokeDashoffset={pendingOffset} />
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#ef4444" strokeWidth="22"
          strokeDasharray={`${rejectedDash} ${circumference - rejectedDash}`}
          strokeDashoffset={rejectedOffset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <strong className="text-xl font-extrabold text-gray-800">{Math.round(approvedPct)}%</strong>
        <span className="text-[10px] text-gray-500 font-medium">Disetujui</span>
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
    <div className="flex min-h-screen bg-gray-100 font-body text-gray-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-950/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-56 bg-gradient-to-b from-gray-900 to-gray-800 
        text-gray-300 flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b border-gray-700/50 flex items-center gap-3">
          <img src="/sv_ipb_navbar_logo.png" alt="IPB Vokasi" className="h-8 max-w-[120px] object-contain flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-white text-xs">IPB University</span>
            <span className="text-[10px] text-gray-400 font-medium">Sekolah Vokasi IPB</span>
          </div>
        </div>

        <div className="px-4 pt-4 pb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          MENU UTAMA
        </div>

        <nav className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-none">
          {sidebarMenu.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all
                  ${isActive 
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                `}
                onClick={() => { setActiveMenu(item.id); setSidebarOpen(false); }}
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-700/50 space-y-2">
          <div className="flex items-center gap-2.5 p-2 bg-gray-800/80 rounded-xl border border-gray-700/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white">Mode Admin</span>
              <span className="text-[10px] text-sky-400 font-medium">Administrator</span>
            </div>
          </div>

          <button 
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700/60 text-gray-300 text-xs font-semibold transition-all"
            onClick={onBackToLanding}
          >
            <ArrowLeft size={15} /> Kembali ke Website
          </button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <div className="flex-1 md:ml-56 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-14 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1.5 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
              <Layers size={18} />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">TRK SV IPB</span>
              <span className="font-heading font-bold text-gray-800 text-sm">Showcase Projek Mahasiswa</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:flex items-center">
              <Search size={15} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari sesuatu..."
                className="w-48 pl-9 pr-12 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
              />
              <kbd className="absolute right-2 text-[10px] font-mono font-semibold bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded">Ctrl+K</kbd>
            </div>

            <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">4</span>
            </button>

            <div className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gray-700 text-white font-bold text-xs flex items-center justify-center">A</div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-gray-800">Admin</span>
                <span className="text-[10px] text-gray-500">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 text-xs mt-0.5">Selamat datang, Admin! Berikut ringkasan projek mahasiswa TRK.</p>
          </div>

          {/* ===== STAT CARDS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Layers size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">Total Projek</span>
                <span className="font-heading text-2xl font-extrabold text-gray-800">{totalProjects}</span>
                <span className="text-[11px] font-semibold text-emerald-600 mt-0.5">+12 bulan ini</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Activity size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">Menunggu Moderasi</span>
                <span className="font-heading text-2xl font-extrabold text-gray-800">{pendingCount}</span>
                <span className="text-[11px] font-semibold text-emerald-600 mt-0.5">+8 minggu ini</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">Projek Disetujui</span>
                <span className="font-heading text-2xl font-extrabold text-gray-800">{approvedCount}</span>
                <span className="text-[11px] font-semibold text-emerald-600 mt-0.5">+20 bulan ini</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <XCircle size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-500">Projek Ditolak</span>
                <span className="font-heading text-2xl font-extrabold text-gray-800">{rejectedCount}</span>
                <span className="text-[11px] font-semibold text-red-600 mt-0.5">+3 bulan ini</span>
              </div>
            </div>
          </div>

          {/* ===== CHARTS ROW ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Bar Chart */}
            <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-sm font-bold text-gray-800">Distribusi Projek Per Mata Kuliah</h3>
                <a href="#" className="text-xs font-semibold text-sky-600 hover:text-sky-700">Lihat Semua</a>
              </div>
              <div className="flex items-end gap-3 h-44 px-2">
                {courseChartData.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[11px] font-bold text-gray-700">{item.count}</span>
                    <div
                      className="w-full max-w-[36px] bg-gradient-to-t from-sky-600 to-sky-400 rounded-t-lg transition-all duration-300 group-hover:from-sky-500 group-hover:to-sky-300"
                      style={{ height: `${(item.count / maxBarValue) * 120}px` }}
                      title={item.name}
                    />
                    <span className="text-[10px] text-gray-500 font-medium text-center truncate w-full" title={item.name}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut Chart */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-sm font-bold text-gray-800">Status Pengajuan</h3>
                <a href="#" className="text-xs font-semibold text-sky-600 hover:text-sky-700">Lihat Semua</a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <DonutChart
                  approved={approvedCount}
                  pending={pendingCount}
                  rejected={rejectedCount}
                />
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
                    <div className="text-xs">
                      <strong className="text-gray-800 font-semibold block">Disetujui {Math.round((approvedCount / totalProjects) * 100)}%</strong>
                      <span className="text-gray-400 text-[11px]">({approvedCount})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0" />
                    <div className="text-xs">
                      <strong className="text-gray-800 font-semibold block">Menunggu {Math.round((pendingCount / totalProjects) * 100)}%</strong>
                      <span className="text-gray-400 text-[11px]">({pendingCount})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
                    <div className="text-xs">
                      <strong className="text-gray-800 font-semibold block">Ditolak {Math.round((rejectedCount / totalProjects) * 100)}%</strong>
                      <span className="text-gray-400 text-[11px]">({rejectedCount})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== SUBMISSIONS TABLE ===== */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="font-heading text-sm font-bold text-gray-800">Pengajuan Projek Terbaru</h3>
              <a href="#" className="text-xs font-semibold text-sky-600 hover:text-sky-700">Lihat Semua Pengajuan →</a>
            </div>

            <div className="flex border-b border-gray-200 mb-4 gap-2">
              <button
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors -mb-px ${activeTab === 'all' ? 'border-sky-600 text-sky-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setActiveTab('all')}
              >Semua</button>
              <button
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors -mb-px ${activeTab === 'pending' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setActiveTab('pending')}
              >Menunggu</button>
              <button
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors -mb-px ${activeTab === 'approved' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setActiveTab('approved')}
              >Disetujui</button>
              <button
                className={`py-2 px-3 text-xs font-semibold border-b-2 transition-colors -mb-px ${activeTab === 'rejected' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                onClick={() => setActiveTab('rejected')}
              >Ditolak</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase tracking-wider">
                    <th className="p-3">ID</th>
                    <th className="p-3">Nama Mahasiswa</th>
                    <th className="p-3">Judul Projek</th>
                    <th className="p-3">Mata Kuliah</th>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-3 text-gray-400 font-semibold">{sub.id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gray-600 text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                            {sub.student.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <strong className="text-gray-800 font-semibold">{sub.student}</strong>
                            <span className="text-[10px] text-gray-400">NIM. {sub.nim}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col max-w-[200px]">
                          <strong className="text-gray-800 font-semibold truncate">{sub.title}</strong>
                          <span className="text-[10px] text-gray-400 truncate">{sub.desc}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700">{sub.course}</td>
                      <td className="p-3 text-gray-600">
                        <div>{sub.date}</div>
                        <div className="text-[10px] text-gray-400">{sub.time}</div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          sub.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                          sub.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {sub.status === 'approved' ? 'Disetujui' : sub.status === 'pending' ? 'Menunggu' : 'Ditolak'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <button className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-[11px] flex items-center gap-1 transition-colors">
                            <Eye size={11} /> Lihat
                          </button>
                          <button className="px-2 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold text-[11px] flex items-center gap-1 transition-colors">
                            <CheckCircle size={11} /> Setujui
                          </button>
                          <button className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 font-semibold text-[11px] flex items-center gap-1 transition-colors">
                            <XCircle size={11} /> Tolak
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Menampilkan 1 sampai {filteredSubmissions.length} dari {filteredSubmissions.length} pengajuan
              </span>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-400 flex items-center justify-center opacity-50 cursor-not-allowed"><ChevronLeft size={14} /></button>
                <button className="w-7 h-7 rounded-lg bg-sky-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">1</button>
                <button className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-600 font-semibold text-xs flex items-center justify-center hover:bg-gray-50">2</button>
                <button className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-600 font-semibold text-xs flex items-center justify-center hover:bg-gray-50">3</button>
                <button className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-400 font-semibold text-xs flex items-center justify-center"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
