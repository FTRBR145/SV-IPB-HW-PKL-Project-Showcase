import React, { useState, useMemo } from 'react';
import {
  CheckCircle,
  FolderKanban,
  GraduationCap,
  RotateCcw,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import DataTable from '../common/DataTable';

function DonutChart({ approved, pending, rejected }) {
  const total = approved + pending + rejected || 1;
  const values = [approved, pending, rejected];
  const colors = ['#059669', '#d97706', '#e11d48'];
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
          <span className="text-xs font-medium text-slate-600">Disetujui</span>
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
  const [activeAction, setActiveAction] = useState('');

  const runModerationAction = async (action, submissionId) => {
    const actionKey = `${action}-${submissionId}`;
    if (activeAction) return;
    setActiveAction(actionKey);
    try {
      if (action === 'approve') await onApprove(submissionId);
      if (action === 'reject') await onReject(submissionId);
      if (action === 'restore') await onRestore(submissionId);
    } finally {
      setActiveAction('');
    }
  };

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
    { label: 'Total Projek Aktif', value: projects.length, hint: 'Tampil di showcase', icon: FolderKanban, color: 'slate' },
    { label: 'Menunggu Moderasi', value: pendingCount, hint: 'Perlu tinjauan', icon: ShieldCheck, color: 'amber', alert: pendingCount > 0 },
    { label: 'Disetujui', value: approvedCount, hint: 'Histori pengajuan', icon: CheckCircle, color: 'emerald' },
    { label: 'Total Mahasiswa', value: students.length, hint: 'Berdasarkan data projek', icon: GraduationCap, color: 'slate' }
  ];

  const colorClasses = {
    slate: 'bg-slate-100 text-slate-700',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
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
          <span className="text-xs font-mono text-slate-600">NIM. {row.nim}</span>
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
          <span className="block truncate text-xs text-slate-600">{row.desc}</span>
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
        <span className="text-xs font-mono text-slate-600">
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
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-bold ${
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
                onClick={() => runModerationAction('approve', row.id)}
                disabled={Boolean(activeAction)}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 shadow-2xs transition-colors hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              title="Setujui dan Terbitkan"
              aria-label={`Setujui projek ${row.title}`}
              >
                <CheckCircle size={15} />
              </button>
              <button
                onClick={() => runModerationAction('reject', row.id)}
                disabled={Boolean(activeAction)}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-rose-50 text-rose-700 shadow-2xs transition-colors hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
              title="Tolak Pengajuan"
              aria-label={`Tolak projek ${row.title}`}
              >
                <XCircle size={15} />
              </button>
            </>
          ) : (
            <button
              onClick={() => runModerationAction('restore', row.id)}
              disabled={Boolean(activeAction)}
              className="flex min-h-11 items-center gap-1 rounded-lg bg-sky-50 px-2.5 text-xs font-bold text-sky-700 shadow-2xs transition-colors hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
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
    <div className="min-w-0 space-y-6">
      {/* 4 Top KPI Stat Cards */}
      <div className="motion-dashboard-list grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, hint, icon: Icon, color, alert }, index) => (
          <div
            key={label}
            className={`motion-dashboard-item p-5 rounded-2xl border shadow-2xs flex items-center justify-between transition-[background-color,border-color,box-shadow,transform] ${
              alert
                ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-200'
                : 'bg-white border-slate-200/80'
            }`}
            style={{ '--motion-index': index }}
          >
            <div>
              <span className={`mb-1 block text-xs font-bold uppercase ${alert ? 'text-amber-800' : 'text-slate-600'}`}>{label}</span>
              <strong className={`text-3xl font-black ${alert ? 'text-amber-950' : 'text-slate-900'}`}>{value}</strong>
              <span className={`mt-1 block text-xs font-semibold ${alert ? 'text-amber-800' : 'text-slate-600'}`}>{hint}</span>
            </div>
            <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
              <Icon size={24} />
              {alert && (
                <span
                  className="motion-attention-once absolute right-0 top-0 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-red-600 px-1.5 text-xs font-black text-white shadow-sm"
                  aria-label={`${value} pengajuan menunggu moderasi`}
                  role="status"
                >
                  {value > 99 ? '99+' : value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Donut & Bar Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-sm text-slate-900">Rasio Status Moderasi</h2>
            <span className="text-xs font-medium text-slate-600">Diperbarui langsung</span>
          </div>
          <div className="flex justify-center py-2">
            <DonutChart approved={approvedCount} pending={pendingCount} rejected={rejectedCount} />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
            {[
              ['Disetujui', approvedCount, 'bg-emerald-600'],
              ['Menunggu', pendingCount, 'bg-amber-500'],
              ['Ditolak', rejectedCount, 'bg-red-500']
            ].map(([label, value, color]) => (
              <div key={label}>
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} />
                <span className="block text-xs text-slate-600">{label}</span>
                <strong className="text-xs text-slate-800">{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-sm text-slate-900">Distribusi Mata Kuliah</h2>
            <span className="text-xs text-slate-600">{projects.length} projek terdaftar</span>
          </div>
          <div className="space-y-4">
            {courseChartData.map((course, index) => (
              <div key={course.name} className="space-y-1">
                <div className="flex justify-between gap-4 text-xs font-semibold text-slate-700">
                  <span className="truncate">{course.name}</span>
                  <span className="font-mono text-slate-500 flex-shrink-0">{course.count} projek</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="motion-chart-bar h-full rounded-full bg-slate-700"
                    style={{
                      width: `${Math.round((course.count / maxCourseCount) * 100)}%`,
                      '--motion-index': index
                    }}
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
          <div className="flex max-w-full gap-1 self-start overflow-x-auto rounded-xl bg-slate-100 p-1 select-none sm:self-auto">
            {[
              ['all', 'Semua', submissions.length],
              ['pending', 'Pending', pendingCount],
              ['approved', 'Disetujui', approvedCount],
              ['rejected', 'Ditolak', rejectedCount]
            ].map(([value, label, count]) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`min-h-11 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
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
          key={activeAction ? 'moderation-busy' : 'moderation-idle'}
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
