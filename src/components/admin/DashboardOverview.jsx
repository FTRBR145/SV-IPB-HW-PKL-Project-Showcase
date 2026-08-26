import React, { useState } from 'react';
import {
  CheckCircle,
  FolderKanban,
  GraduationCap,
  RotateCcw,
  Search,
  ShieldCheck,
  XCircle
} from 'lucide-react';

function DonutChart({ approved, pending, rejected }) {
  const total = approved + pending + rejected || 1;
  const values = [approved, pending, rejected];
  const colors = ['#3b82f6', '#f59e0b', '#ef4444'];
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let accumulated = 0;

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <svg viewBox="0 0 180 180" className="w-40 h-40 -rotate-90">
        {values.map((value, index) => {
          const dash = (value / total) * circumference;
          const offset = -accumulated;
          accumulated += dash;
          return (
            <circle
              key={colors[index]}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={colors[index]}
              strokeWidth="22"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <strong className="text-xl font-extrabold text-slate-800">{Math.round((approved / total) * 100)}%</strong>
        <span className="text-[10px] text-slate-500 font-medium">Disetujui</span>
      </div>
    </div>
  );
}

const statusStyles = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-rose-100 text-rose-800'
};

const statusLabels = {
  pending: 'Menunggu',
  approved: 'Disetujui',
  rejected: 'Ditolak'
};

export default function DashboardOverview({
  projects,
  submissions,
  students,
  onApprove,
  onReject,
  onRestore
}) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const pendingCount = submissions.filter((item) => item.status === 'pending').length;
  const approvedCount = submissions.filter((item) => item.status === 'approved').length;
  const rejectedCount = submissions.filter((item) => item.status === 'rejected').length;

  const courseCounts = projects.reduce((result, project) => {
    result[project.course] = (result[project.course] || 0) + 1;
    return result;
  }, {});
  const courseChartData = Object.entries(courseCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const maxCourseCount = Math.max(...courseChartData.map((item) => item.count), 1);

  const filteredSubmissions = submissions.filter((submission) => {
    if (statusFilter !== 'all' && submission.status !== statusFilter) return false;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return [submission.student, submission.nim, submission.title, submission.course]
      .some((value) => value?.toLowerCase().includes(query));
  });

  const stats = [
    { label: 'Total Projek Aktif', value: projects.length, hint: 'Tampil di showcase', icon: FolderKanban, color: 'sky' },
    { label: 'Menunggu Moderasi', value: pendingCount, hint: 'Perlu tinjauan', icon: ShieldCheck, color: 'amber' },
    { label: 'Disetujui', value: approvedCount, hint: 'Histori pengajuan', icon: CheckCircle, color: 'emerald' },
    { label: 'Total Mahasiswa', value: students.length, hint: 'Berdasarkan data projek', icon: GraduationCap, color: 'indigo' }
  ];

  const colorClasses = {
    sky: 'bg-sky-50 text-sky-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, hint, icon: Icon, color }) => (
          <div key={label} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">{label}</span>
              <strong className="text-3xl font-black text-slate-900">{value}</strong>
              <span className="text-[10px] text-slate-500 block mt-1 font-semibold">{hint}</span>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
              <Icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-sm text-slate-900">Rasio Status Moderasi</h2>
            <span className="text-[10px] text-slate-400">Real-time</span>
          </div>
          <div className="flex justify-center py-2">
            <DonutChart approved={approvedCount} pending={pendingCount} rejected={rejectedCount} />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
            {[
              ['Disetujui', approvedCount, 'bg-blue-500'],
              ['Menunggu', pendingCount, 'bg-amber-500'],
              ['Ditolak', rejectedCount, 'bg-red-500']
            ].map(([label, value, color]) => (
              <div key={label}>
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} />
                <span className="block text-[10px] text-slate-500">{label}</span>
                <strong className="text-xs text-slate-800">{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-sm text-slate-900">Distribusi Mata Kuliah</h2>
            <span className="text-[10px] text-slate-400">{projects.length} projek</span>
          </div>
          <div className="space-y-4">
            {courseChartData.map((course) => (
              <div key={course.name} className="space-y-1">
                <div className="flex justify-between gap-4 text-xs font-semibold text-slate-700">
                  <span className="truncate">{course.name}</span>
                  <span className="font-mono text-slate-500 flex-shrink-0">{course.count} projek</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full"
                    style={{ width: `${Math.round((course.count / maxCourseCount) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 space-y-4">
          <div>
            <h2 className="font-heading font-bold text-sm text-slate-900">Antrean dan Histori Moderasi</h2>
            <p className="text-xs text-slate-500 mt-1">Setujui, tolak, atau kembalikan pengajuan ke antrean.</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari mahasiswa, NIM, atau projek..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
              {[
                ['all', 'Semua', submissions.length],
                ['pending', 'Pending', pendingCount],
                ['approved', 'Disetujui', approvedCount],
                ['rejected', 'Ditolak', rejectedCount]
              ].map(([value, label, count]) => (
                <button
                  key={value}
                  onClick={() => setStatusFilter(value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ${
                    statusFilter === value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-3.5">Mahasiswa</th>
                <th className="p-3.5">Projek</th>
                <th className="p-3.5">Mata Kuliah</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-slate-400">Tidak ada pengajuan yang cocok.</td></tr>
              ) : filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-slate-50">
                  <td className="p-3.5">
                    <strong className="block text-slate-900">{submission.student}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">{submission.nim}</span>
                  </td>
                  <td className="p-3.5 max-w-xs">
                    <strong className="block truncate text-slate-800">{submission.title}</strong>
                    <span className="block truncate text-[10px] text-slate-400">{submission.desc}</span>
                  </td>
                  <td className="p-3.5 text-slate-600 max-w-[220px] truncate">{submission.course}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${statusStyles[submission.status]}`}>
                      {statusLabels[submission.status]}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="flex justify-center gap-1.5">
                      {submission.status === 'pending' ? (
                        <>
                          <button onClick={() => onApprove(submission.id)} className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100" title="Setujui">
                            <CheckCircle size={16} />
                          </button>
                          <button onClick={() => onReject(submission.id)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100" title="Tolak">
                            <XCircle size={16} />
                          </button>
                        </>
                      ) : (
                        <button onClick={() => onRestore(submission.id)} className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100" title="Kembalikan ke antrean">
                          <RotateCcw size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
