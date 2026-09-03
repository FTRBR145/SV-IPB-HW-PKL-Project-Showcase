import React, { useState, useMemo } from 'react';
import {
  Eye,
  Pencil,
  Plus,
  Power,
  Trash2,
  UserCheck
} from 'lucide-react';
import DataTable from '../common/DataTable';

// ============================================================================
// 1. PROJECTS PANEL (WITH DATATABLE)
// ============================================================================
export function ProjectsPanel({ projects, onEdit, onDelete, onView }) {
  const [semesterFilter, setSemesterFilter] = useState('ALL');

  const filteredProjects = useMemo(() => {
    if (semesterFilter === 'ALL') return projects;
    return projects.filter((p) => String(p.semester) === String(semesterFilter));
  }, [projects, semesterFilter]);

  const columns = [
    {
      key: 'title',
      label: 'Projek & Video',
      sortable: true,
      render: (row) => (
        <div className="max-w-md">
          <strong className="block text-slate-900 font-bold leading-snug truncate">
            {row.title}
          </strong>
          <span className="mt-0.5 block truncate text-xs text-slate-600">
            {row.course}
          </span>
          {row.techStack && row.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {row.techStack.slice(0, 3).map((t, idx) => (
                <span
                  key={idx}
                  className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-600"
                >
                  {t}
                </span>
              ))}
              {row.techStack.length > 3 && (
                <span className="text-xs text-slate-600">+{row.techStack.length - 3}</span>
              )}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'student',
      label: 'Mahasiswa',
      sortable: true,
      render: (row) => (
        <div>
          <span className="block font-bold text-slate-800">{row.student}</span>
          <span className="text-xs font-medium text-slate-600">NIM. {row.nim}</span>
        </div>
      )
    },
    {
      key: 'semester',
      label: 'Sem',
      sortable: true,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (row) => (
        <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-bold font-mono text-xs border border-sky-100">
          Sem {row.semester}
        </span>
      )
    },
    {
      key: 'year',
      label: 'Tahun',
      sortable: true,
      render: (row) => (
        <span className="text-xs font-mono text-slate-600">
          {row.year || '2026'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Aksi',
      sortable: false,
      searchable: false,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (row) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => onView(row)}
            className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors shadow-2xs"
            title="Lihat Detail Projek"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => onEdit(row)}
            className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors shadow-2xs"
            title="Edit Data Projek"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Hapus projek “${row.title}”?`)) onDelete(row.id);
            }}
            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors shadow-2xs"
            title="Hapus Projek"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ];

  const semesterFilterButtons = (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
      <button
        onClick={() => setSemesterFilter('ALL')}
        className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all ${
          semesterFilter === 'ALL' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Semua Sem
      </button>
      {[1, 2, 3, 4, 5, 6].map((sem) => (
        <button
          key={sem}
          onClick={() => setSemesterFilter(String(sem))}
          className={`px-2 py-1 rounded-lg font-bold text-xs transition-all ${
            semesterFilter === String(sem)
              ? 'bg-sky-600 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-white'
          }`}
        >
          Sem {sem}
        </button>
      ))}
    </div>
  );

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">
            Manajemen Seluruh Projek ({projects.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cari, sortir kolom, dan kelola projek yang aktif terpublikasi di showcase.
          </p>
        </div>
      </div>

      <DataTable
        data={filteredProjects}
        columns={columns}
        searchPlaceholder="Cari judul projek, nama mahasiswa, NIM, atau mata kuliah..."
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        defaultSortKey="title"
        defaultSortDirection="asc"
        extraHeaderActions={semesterFilterButtons}
        showExportCsv={true}
        exportFileName="data-projek-mahasiswa-trk.csv"
        emptyMessage="Tidak ada projek yang cocok dengan filter saat ini."
      />
    </section>
  );
}

// ============================================================================
// 2. STUDENTS PANEL (WITH DATATABLE)
// ============================================================================
export function StudentsPanel({ students, onViewProjects }) {
  const columns = [
    {
      key: 'nim',
      label: 'NIM Mahasiswa',
      sortable: true,
      render: (row) => (
        <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-bold text-slate-900">
          {row.nim}
        </span>
      )
    },
    {
      key: 'name',
      label: 'Nama Lengkap',
      sortable: true,
      render: (row) => (
        <div>
          <strong className="block text-slate-900 font-bold">{row.name}</strong>
          <span className="text-xs text-slate-600">Mahasiswa TRK SV IPB</span>
        </div>
      )
    },
    {
      key: 'semester',
      label: 'Semester',
      sortable: true,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (row) => (
        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-xs">
          Semester {row.semester || '-'}
        </span>
      )
    },
    {
      key: 'projectCount',
      label: 'Jumlah Projek',
      sortable: true,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 font-bold text-xs border border-sky-100">
          {row.projectCount} Projek
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Aksi',
      sortable: false,
      searchable: false,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (row) => (
        <button
          onClick={() => onViewProjects(row.nim)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs"
        >
          <Eye size={13} />
          <span>Lihat Projek</span>
        </button>
      )
    }
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">
            Direktori Mahasiswa TRK ({students.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar mahasiswa terdaftar berdasarkan riwayat pengajuan dan karya projek.
          </p>
        </div>
      </div>

      <DataTable
        data={students}
        columns={columns}
        searchPlaceholder="Cari mahasiswa berdasarkan nama atau NIM..."
        defaultPageSize={10}
        pageSizeOptions={[5, 10, 25, 50]}
        defaultSortKey="name"
        defaultSortDirection="asc"
        showExportCsv={true}
        exportFileName="direktori-mahasiswa-trk.csv"
        emptyMessage="Mahasiswa tidak ditemukan."
      />
    </section>
  );
}

// ============================================================================
// 3. MODERATORS PANEL (WITH DATATABLE)
// ============================================================================
export function ModeratorsPanel({ moderators, onAdd, onToggle, onDelete }) {
  const [formData, setFormData] = useState({ name: '', nip: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const added = await onAdd(formData);
    setIsSubmitting(false);
    if (added) setFormData({ name: '', nip: '', email: '' });
  };

  const columns = [
    {
      key: 'name',
      label: 'Nama Moderator / Dosen',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
            <UserCheck size={16} />
          </div>
          <div>
            <strong className="text-slate-900 font-bold block">{row.name}</strong>
            <span className="text-xs font-mono text-slate-600">
              {row.nip ? `NIP. ${row.nip}` : 'Admin'}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email Akun',
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs text-slate-600">{row.email}</span>
      )
    },
    {
      key: 'status',
      label: 'Status Akses',
      sortable: true,
      render: (row) => (
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${
            row.status === 'active'
              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}
        >
          {row.status === 'active' ? 'Aktif' : 'Nonaktif'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Aksi',
      sortable: false,
      searchable: false,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (row) => (
        <div className="flex items-center justify-center gap-1.5">
          <button
            onClick={() => onToggle(row.id)}
            className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors shadow-2xs"
            title="Ubah status akses"
          >
            <Power size={14} />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Hapus moderator ${row.name}?`)) onDelete(row.id);
            }}
            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors shadow-2xs"
            title="Hapus moderator"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)] gap-6 items-start">
      {/* Form Tambah */}
      <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">Tambah Moderator</h2>
          <p className="text-xs text-slate-500 mt-1">Daftarkan dosen pembimbing atau admin baru.</p>
        </div>
        {[
          ['name', 'Nama lengkap', 'Nama dosen / admin'],
          ['nip', 'NIP', 'Nomor induk pegawai'],
          ['email', 'Email', 'nama@apps.ipb.ac.id']
        ].map(([name, label, placeholder]) => (
          <label key={name} className="block text-xs font-bold text-slate-700">
            {label}{name !== 'nip' && ' *'}
            <input
              type={name === 'email' ? 'email' : 'text'}
              value={formData[name]}
              onChange={(event) => setFormData((previous) => ({ ...previous, [name]: event.target.value }))}
              placeholder={placeholder}
              required={name !== 'nip'}
              className="mt-1.5 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </label>
        ))}
        <button disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-2xs transition-all disabled:cursor-wait disabled:opacity-60">
          <Plus size={15} /> {isSubmitting ? 'Menambahkan...' : 'Tambah Moderator'}
        </button>
      </form>

      {/* DataTable List */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">
            Daftar Moderator ({moderators.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola hak akses moderasi dan manajemen sistem showcase.
          </p>
        </div>

        <DataTable
          data={moderators}
          columns={columns}
          searchPlaceholder="Cari moderator atau NIP..."
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 25]}
          defaultSortKey="name"
          defaultSortDirection="asc"
          showExportCsv={true}
          exportFileName="data-moderator-trk.csv"
          emptyMessage="Moderator tidak ditemukan."
        />
      </section>
    </div>
  );
}

// ============================================================================
// 4. TAXONOMY PANEL (COURSES & CATEGORIES WITH DATATABLE)
// ============================================================================
export function TaxonomyPanel({ title, description, items, getCount, onAdd, onDelete }) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const added = await onAdd(name);
    setIsSubmitting(false);
    if (added) setName('');
  };

  // Normalize items to objects if they are strings
  const normalizedData = useMemo(() => {
    return items.map((item, idx) => {
      if (typeof item === 'string') {
        const count = getCount ? getCount(item) : 0;
        return { id: idx, name: item, projectCount: count };
      }
      return {
        id: item.id || idx,
        name: item.name,
        projectCount: getCount ? getCount(item.name) : (item.projectCount || 0)
      };
    });
  }, [items, getCount]);

  const columns = [
    {
      key: 'name',
      label: `Nama ${title}`,
      sortable: true,
      render: (row) => (
        <div>
          <strong className="block text-slate-900 font-bold text-xs">{row.name}</strong>
        </div>
      )
    },
    {
      key: 'projectCount',
      label: 'Projek Terkait',
      sortable: true,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs font-mono">
          {row.projectCount || 0} Projek
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Aksi',
      sortable: false,
      searchable: false,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (row) => (
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              if (row.projectCount > 0) {
                alert(`Tidak dapat menghapus “${row.name}” karena masih digunakan oleh ${row.projectCount} projek.`);
                return;
              }
              if (window.confirm(`Hapus ${title.toLowerCase()} “${row.name}”?`)) onDelete(row.name);
            }}
            disabled={row.projectCount > 0}
            className={`p-1.5 rounded-lg transition-colors ${
              row.projectCount > 0
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-rose-50 text-rose-600 hover:bg-rose-100 shadow-2xs'
            }`}
            title={row.projectCount > 0 ? 'Masih digunakan oleh projek' : 'Hapus item'}
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)] gap-6 items-start">
      {/* Form Input */}
      <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">Tambah {title}</h2>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        </div>
        <label className="block text-xs font-bold text-slate-700">
          Nama {title} *
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={`Masukkan nama ${title.toLowerCase()}...`}
            required
            className="mt-1.5 w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </label>
        <button disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-2xs transition-all disabled:cursor-wait disabled:opacity-60">
          <Plus size={15} /> {isSubmitting ? 'Menambahkan...' : `Tambah ${title}`}
        </button>
      </form>

      {/* DataTable List */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">
            Daftar {title} ({normalizedData.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Item yang sedang terikat dengan projek tidak dapat dihapus demi integritas data.
          </p>
        </div>

        <DataTable
          data={normalizedData}
          columns={columns}
          searchPlaceholder={`Cari ${title.toLowerCase()}...`}
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 25]}
          defaultSortKey="name"
          defaultSortDirection="asc"
          showExportCsv={true}
          exportFileName={`data-${title.toLowerCase().replace(/\s+/g, '-')}.csv`}
          emptyMessage={`${title} tidak ditemukan.`}
        />
      </section>
    </div>
  );
}
