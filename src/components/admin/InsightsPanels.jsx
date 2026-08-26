import React, { useEffect, useState } from 'react';
import {
  Activity,
  BarChart3,
  Download,
  Eye,
  FileSpreadsheet,
  Heart,
  Printer,
  Save,
  Trash2,
  TrendingUp
} from 'lucide-react';

export function AnalyticsPanel({ projects }) {
  const totalViews = projects.reduce((sum, project) => sum + (project.views || 0), 0);
  const totalLikes = projects.reduce((sum, project) => sum + (project.likes || 0), 0);
  const averageViews = projects.length ? Math.round(totalViews / projects.length) : 0;
  const topProjects = [...projects].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
  const semesterCounts = [1, 2, 3, 4, 5, 6].map((semester) => ({
    semester,
    count: projects.filter((project) => project.semester === semester).length
  }));
  const maxSemester = Math.max(...semesterCounts.map((item) => item.count), 1);

  const cards = [
    { label: 'Total Tayangan', value: totalViews.toLocaleString('id-ID'), icon: Eye, color: 'text-sky-600 bg-sky-50' },
    { label: 'Total Suka', value: totalLikes.toLocaleString('id-ID'), icon: Heart, color: 'text-rose-600 bg-rose-50' },
    { label: 'Rata-rata Tayangan', value: averageViews.toLocaleString('id-ID'), icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Projek Terpublikasi', value: projects.length, icon: BarChart3, color: 'text-indigo-600 bg-indigo-50' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div><span className="text-[11px] font-bold uppercase text-slate-500">{label}</span><strong className="block text-2xl font-black text-slate-900 mt-1">{value}</strong></div>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}><Icon size={21} /></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-5">Distribusi per Semester</h2>
          <div className="space-y-4">
            {semesterCounts.map(({ semester, count }) => (
              <div key={semester}>
                <div className="flex justify-between text-xs font-semibold mb-1"><span>Semester {semester}</span><span>{count} projek</span></div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600" style={{ width: `${(count / maxSemester) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <h2 className="font-heading font-bold text-base text-slate-900 mb-4">Projek Paling Banyak Dilihat</h2>
          <div className="space-y-3">
            {topProjects.map((project, index) => (
              <div key={project.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{index + 1}</span>
                <div className="min-w-0 flex-1"><strong className="text-xs text-slate-900 block truncate">{project.title}</strong><span className="text-[10px] text-slate-500">{project.student}</span></div>
                <span className="text-xs font-bold text-sky-700 flex-shrink-0">{(project.views || 0).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function ReportsPanel({ projects, submissions, students, logs, onExportProjects, onExportSubmissions, onExportLogs }) {
  const reportItems = [
    { title: 'Data Projek', description: `${projects.length} projek terpublikasi`, action: onExportProjects },
    { title: 'Data Moderasi', description: `${submissions.length} histori pengajuan`, action: onExportSubmissions },
    { title: 'Log Aktivitas', description: `${logs.length} aktivitas terbaru`, action: onExportLogs }
  ];

  return (
    <div className="space-y-6">
      <section className="bg-gradient-to-r from-slate-900 to-sky-900 text-white rounded-2xl p-6 shadow-sm">
        <FileSpreadsheet size={28} className="text-sky-300 mb-3" />
        <h2 className="font-heading font-bold text-xl">Pusat Laporan TRK</h2>
        <p className="text-sm text-slate-300 mt-1">Unduh data CSV atau cetak ringkasan dashboard untuk dokumentasi.</p>
        <button onClick={() => window.print()} className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-slate-100"><Printer size={16} /> Cetak Ringkasan</button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportItems.map((item) => (
          <article key={item.title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <Download size={22} className="text-sky-600 mb-3" />
            <h3 className="font-heading font-bold text-sm text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">{item.description}</p>
            <button onClick={item.action} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800">Unduh CSV</button>
          </article>
        ))}
      </div>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <h2 className="font-heading font-bold text-base text-slate-900 mb-4">Ringkasan Data Saat Ini</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[
            ['Projek', projects.length],
            ['Mahasiswa', students.length],
            ['Pending', submissions.filter((item) => item.status === 'pending').length],
            ['Ditolak', submissions.filter((item) => item.status === 'rejected').length]
          ].map(([label, value]) => (
            <div key={label} className="p-4 rounded-xl bg-slate-50"><strong className="block text-2xl font-black text-slate-900">{value}</strong><span className="text-xs text-slate-500">{label}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function SettingsPanel({ settings, onSave, onReset }) {
  const [formData, setFormData] = useState(settings);
  useEffect(() => setFormData(settings), [settings]);

  const submit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
        <div><h2 className="font-heading font-bold text-base text-slate-900">Pengaturan Sistem</h2><p className="text-xs text-slate-500 mt-1">Perubahan disimpan pada perangkat ini.</p></div>
        <label className="block text-xs font-bold text-slate-700">Nama platform
          <input value={formData.siteName} onChange={(event) => setFormData((previous) => ({ ...previous, siteName: event.target.value }))} className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm" required />
        </label>
        <label className="block text-xs font-bold text-slate-700">Tahun ajaran aktif
          <input value={formData.academicYear} onChange={(event) => setFormData((previous) => ({ ...previous, academicYear: event.target.value }))} className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm" required />
        </label>
        <div className="space-y-3">
          {[
            ['moderationRequired', 'Wajib moderasi', 'Upload mahasiswa masuk ke antrean sebelum dipublikasikan.'],
            ['allowGuestUploads', 'Izinkan upload tamu', 'Pengunjung landing dapat membuka form upload.'],
            ['maintenanceMode', 'Mode pemeliharaan', 'Tandai sistem sedang dalam pemeliharaan.']
          ].map(([key, label, description]) => (
            <label key={key} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200 cursor-pointer">
              <span><strong className="block text-sm text-slate-800">{label}</strong><span className="block text-xs text-slate-500 mt-0.5">{description}</span></span>
              <input type="checkbox" checked={formData[key]} onChange={(event) => setFormData((previous) => ({ ...previous, [key]: event.target.checked }))} className="mt-1 w-4 h-4 accent-sky-600" />
            </label>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800"><Save size={16} /> Simpan Pengaturan</button>
      </form>

      <aside className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
        <h2 className="font-heading font-bold text-sm text-rose-900">Zona Reset</h2>
        <p className="text-xs text-rose-700 mt-1 mb-4">Mengembalikan seluruh data projek, moderasi, moderator, kategori, dan pengaturan ke data demo awal.</p>
        <button onClick={onReset} className="w-full px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700">Reset Seluruh Data Demo</button>
      </aside>
    </div>
  );
}

export function ActivityLogsPanel({ logs, onClear }) {
  const [filter, setFilter] = useState('all');
  const types = ['all', ...new Set(logs.map((log) => log.type))];
  const filtered = filter === 'all' ? logs : logs.filter((log) => log.type === filter);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h2 className="font-heading font-bold text-base text-slate-900">Log Aktivitas</h2><p className="text-xs text-slate-500 mt-1">Mencatat hingga 100 aktivitas terbaru.</p></div>
        <div className="flex gap-2">
          <select value={filter} onChange={(event) => setFilter(event.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white">
            {types.map((type) => <option key={type} value={type}>{type === 'all' ? 'Semua aktivitas' : type}</option>)}
          </select>
          <button onClick={() => window.confirm('Bersihkan seluruh log aktivitas?') && onClear()} className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100" title="Bersihkan log"><Trash2 size={16} /></button>
        </div>
      </div>
      <div className="divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">Belum ada aktivitas.</div>
        ) : filtered.map((log) => (
          <div key={log.id} className="p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0"><Activity size={17} /></div>
            <div className="min-w-0 flex-1"><strong className="text-sm text-slate-800 block">{log.message}</strong><span className="text-[11px] text-slate-500">{log.actor} · {log.timestamp}</span></div>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-500">{log.type}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
