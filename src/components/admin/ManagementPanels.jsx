import React, { useState } from 'react';
import {
  Eye,
  Pencil,
  Plus,
  Power,
  Search,
  Trash2,
  UserCheck,
  UserRound,
  Users
} from 'lucide-react';

const searchInputClass = 'w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500';

export function ProjectsPanel({ projects, searchQuery, onSearchChange, onEdit, onDelete, onView }) {
  const query = searchQuery.trim().toLowerCase();
  const filtered = projects.filter((project) =>
    [project.title, project.student, project.nim, project.course, project.category, project.techStack?.join(' ')]
      .some((value) => value?.toLowerCase().includes(query))
  );

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">Manajemen Projek</h2>
          <p className="text-xs text-slate-500 mt-1">Edit, lihat, dan hapus projek yang sudah dipublikasikan.</p>
        </div>
        <div className="relative w-full sm:max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Cari projek..." className={searchInputClass} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-[10px] uppercase text-slate-500 font-bold">
            <tr>
              <th className="p-3.5">Projek</th>
              <th className="p-3.5">Mahasiswa</th>
              <th className="p-3.5">Semester</th>
              <th className="p-3.5">Interaksi</th>
              <th className="p-3.5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="p-10 text-center text-slate-400">Projek tidak ditemukan.</td></tr>
            ) : filtered.map((project) => (
              <tr key={project.id} className="hover:bg-slate-50">
                <td className="p-3.5 max-w-sm">
                  <strong className="block truncate text-slate-900">{project.title}</strong>
                  <span className="block truncate text-[10px] text-slate-500 mt-0.5">{project.course}</span>
                </td>
                <td className="p-3.5">
                  <span className="block font-semibold text-slate-700">{project.student}</span>
                  <span className="text-[10px] font-mono text-slate-400">{project.nim}</span>
                </td>
                <td className="p-3.5"><span className="px-2 py-1 rounded-lg bg-slate-100 font-bold">{project.semester}</span></td>
                <td className="p-3.5 text-slate-500">{project.views || 0} views · {project.likes || 0} suka</td>
                <td className="p-3.5">
                  <div className="flex justify-center gap-1.5">
                    <button onClick={() => onView(project)} className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100" title="Lihat"><Eye size={15} /></button>
                    <button onClick={() => onEdit(project)} className="p-2 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100" title="Edit"><Pencil size={15} /></button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Hapus projek “${project.title}”?`)) onDelete(project.id);
                      }}
                      className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                      title="Hapus"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ModeratorsPanel({ moderators, onAdd, onToggle, onDelete }) {
  const [formData, setFormData] = useState({ name: '', nip: '', email: '' });

  const submit = (event) => {
    event.preventDefault();
    if (onAdd(formData)) setFormData({ name: '', nip: '', email: '' });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)] gap-6 items-start">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">Tambah Moderator</h2>
          <p className="text-xs text-slate-500 mt-1">Daftarkan dosen atau admin baru.</p>
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
              className="mt-1.5 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </label>
        ))}
        <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800">
          <Plus size={16} /> Tambah Moderator
        </button>
      </form>

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-heading font-bold text-base text-slate-900">Daftar Moderator ({moderators.length})</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {moderators.map((moderator) => (
            <div key={moderator.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0"><UserCheck size={19} /></div>
                <div className="min-w-0">
                  <strong className="text-sm text-slate-900 block truncate">{moderator.name}</strong>
                  <span className="text-xs text-slate-500 block truncate">{moderator.email} {moderator.nip && `· ${moderator.nip}`}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${moderator.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {moderator.status === 'active' ? 'Aktif' : 'Nonaktif'}
                </span>
                <button onClick={() => onToggle(moderator.id)} className="p-2 rounded-lg bg-amber-50 text-amber-600" title="Ubah status"><Power size={15} /></button>
                <button
                  onClick={() => window.confirm(`Hapus moderator ${moderator.name}?`) && onDelete(moderator.id)}
                  className="p-2 rounded-lg bg-rose-50 text-rose-600"
                  title="Hapus"
                ><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function StudentsPanel({ students, onViewProjects }) {
  const [query, setQuery] = useState('');
  const filtered = students.filter((student) =>
    [student.name, student.nim].some((value) => value?.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">Data Mahasiswa</h2>
          <p className="text-xs text-slate-500 mt-1">Dihimpun otomatis dari projek dan pengajuan.</p>
        </div>
        <div className="relative w-full sm:max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau NIM..." className={searchInputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-4">
        {filtered.map((student) => (
          <article key={student.nim} className="border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-sky-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0"><UserRound size={19} /></div>
              <div className="min-w-0">
                <strong className="block text-sm text-slate-900 truncate">{student.name}</strong>
                <span className="block text-[11px] text-slate-500 font-mono">{student.nim}</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Semester {student.semester || '-'} · {student.projectCount} projek</span>
              </div>
            </div>
            <button onClick={() => onViewProjects(student.nim)} className="px-3 py-2 rounded-lg bg-sky-50 text-sky-700 text-xs font-bold hover:bg-sky-100">Lihat Projek</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TaxonomyPanel({ title, description, items, getCount, onAdd, onDelete }) {
  const [newItem, setNewItem] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (onAdd(newItem)) setNewItem('');
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <h2 className="font-heading font-bold text-base text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 mt-4 max-w-2xl">
          <input value={newItem} onChange={(event) => setNewItem(event.target.value)} placeholder={`Nama ${title.toLowerCase()} baru`} className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20" required />
          <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold"><Plus size={16} /> Tambah</button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-4">
        {items.map((item) => {
          const count = getCount(item);
          return (
            <div key={item} className="border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <strong className="text-sm text-slate-800 block truncate">{item}</strong>
                <span className="text-[11px] text-slate-500">{count} penggunaan</span>
              </div>
              <button
                onClick={() => window.confirm(`Hapus “${item}”?`) && onDelete(item)}
                className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex-shrink-0"
                title="Hapus"
              ><Trash2 size={15} /></button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function TechStackPanel({ projects, onFilterProjects }) {
  const techCounts = projects.reduce((result, project) => {
    project.techStack?.forEach((tech) => { result[tech] = (result[tech] || 0) + 1; });
    return result;
  }, {});
  const stacks = Object.entries(techCounts).sort((a, b) => b[1] - a[1]);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center"><Users size={20} /></div>
        <div>
          <h2 className="font-heading font-bold text-base text-slate-900">Pemetaan Tech Stack</h2>
          <p className="text-xs text-slate-500">Klik teknologi untuk memfilter projek terkait.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {stacks.map(([tech, count]) => (
          <button key={tech} onClick={() => onFilterProjects(tech)} className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 text-sm font-semibold text-slate-700 transition-colors">
            {tech} <span className="ml-1.5 text-[10px] bg-white px-1.5 py-0.5 rounded-full text-slate-500">{count}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
