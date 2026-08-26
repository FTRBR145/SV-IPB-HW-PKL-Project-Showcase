import React, { useState, useMemo } from 'react';
import {
  CheckCircle,
  FolderKanban,
  GraduationCap,
  RotateCcw,
  ShieldCheck,
  XCircle,
  Calendar,
  Layers
} from 'lucide-react';
import DataTable from '../common/DataTable';

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
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-800 border-rose-200'
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

  // Filter submissions by status tab
  const statusFilteredData = useMemo(() => {
    if (statusFilter === 'all') return submissions;
    return submissions.filter((s) => s.status === statusFilter);
  }, [submissions, statusFilter]);

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

  // DataTable Column Definitions for Submissions
  const columns = [
    {
      key: 'student',
      label: 'Mahasiswa',
      sortable: true,
      render: (row) => (
        <div>
          <strong className="block text-slate-900 font-bold">{row.student}</strong>
          <span className="text-[10px] text-slate-400 font-mono">NIM. {row.nim}</span>
        </div>
      )
    },
    {
      key: 'title',
      label: 'Judul Projek',
      sortable: true,
      render: (row) => (
        <div className="max-w-xs">
          <strong className="block truncate text-slate-800 font-semibold">{row.title}</strong>
          <span className="block truncate text-[10px] text-slate-400">{row.desc}</span>
        </div>
      )
    },
    {
      key: 'course',
      label: 'Mata Kuliah',
      sortable: true,
      render: (row) => (
        <span className="text-slate-600 font-medium max-w-[200px] truncate block">
          {row.course}
        </span>
      )
    },
    {
      key: 'date',
      label: 'Tanggal',
      sortable: true,
      render: (row) => (
        <span className="text-[11px] text-slate-500 font-mono">
          {row.date || '2026'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${
            statusStyles[row.status] || 'bg-slate-100 text-slate-700'
          }`}
        >
          {statusLabels[row.status] || row.status}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Aksi Moderasi',
      sortable: false,
      searchable: false,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (row) => (
        <div className="flex items-center justify-center gap-1.5">
          {row.status === 'pending' ? (
            <>
              <button
                onClick={() => onApprove(row.id)}
                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors shadow-2xs"
                title="Setujui dan Terbitkan"
              >
                <CheckCircle size={15} />
              </button>
              <button
                onClick={() => onReject(row.id)}
                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors shadow-2xs"
                title="Tolak Pengajuan"
              >
                <XCircle size={15} />
              </button>
            </>
          ) : (
            <button
              onClick={() => onRestore(row.id)}
              className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors shadow-2xs flex items-center gap-1 text-[11px] font-bold"
              title="Kembalikan ke antrean pending"
            >
              <RotateCcw size={13} />
              <span>Pulihkan</span>
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* 4 Top KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, hint, icon: Icon, color }) => (
          <div key={label} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
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

      {/* Donut & Bar Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-sm text-slate-900">Rasio Status Moderasi</h2>
            <span className="text-[10px] text-slate-400 font-mono">Real-time</span>
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

        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-sm text-slate-900">Distribusi Mata Kuliah</h2>
            <span className="text-[10px] text-slate-400">{projects.length} projek terdaftar</span>
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

      {/* =================================================================== */}
      {/* DATATABLE: ANTREAN DAN HISTORI MODERASI */}
      {/* =================================================================== */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="font-heading font-bold text-base text-slate-900">
              Antrean dan Histori Moderasi
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Gunakan DataTables untuk menyortir, mencari, dan memfilter pengajuan projek mahasiswa.
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto self-start sm:self-auto select-none">
            {[
              ['all', 'Semua', submissions.length],
              ['pending', 'Pending', pendingCount],
              ['approved', 'Disetujui', approvedCount],
              ['rejected', 'Ditolak', rejectedCount]
            ].map(([value, label, count]) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  statusFilter === value ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Integrated DataTable */}
        <DataTable
          data={statusFilteredData}
          columns={columns}
          searchPlaceholder="Cari pengajuan, nama mahasiswa, NIM, atau projek..."
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          defaultSortKey="date"
          defaultSortDirection="desc"
          showExportCsv={true}
          exportFileName={`histori-moderasi-${statusFilter}.csv`}
          emptyMessage="Tidak ada pengajuan yang cocok dengan filter saat ini."
        />
      </section>
    </div>
  );
}
