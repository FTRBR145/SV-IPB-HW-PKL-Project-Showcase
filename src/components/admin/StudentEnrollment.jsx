import React, { useState } from 'react';
import { Plus, Upload, X, Download } from 'lucide-react';
import ModalShell from '../common/ModalShell';
import { DialogClose } from '../ui/dialog';
import DataTable from '../common/DataTable';
import useApp from '../../hooks/useApp';
import { apiRequest } from '../../services/apiClient';
import { parseStudentFile, downloadStudentTemplate, downloadCsv, studentHeaders } from '../../services/studentImport';

const emptyForm = { name: '', nim: '', email: '', semester: '1', angkatan: '' };
const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 disabled:opacity-50 disabled:cursor-wait';
const input = 'mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600';

export default function StudentEnrollment() {
  const { refreshStudents, showToast } = useApp();
  const [mode, setMode] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [filename, setFilename] = useState('');
  const open = selected => { setMode(selected); setForm(emptyForm); setPreview(null); setCredentials(null); setError(''); setFilename(''); };
  const close = () => { if (!busy) setMode(null); };

  const inspect = async students => {
    setPreview(await apiRequest('/students/preview', { method: 'POST', body: { students } }));
  };
  const checkSingle = async event => {
    event.preventDefault(); setBusy(true); setError('');
    try { await inspect([form]); } catch (failure) { setError(failure.message); } finally { setBusy(false); }
  };
  const selectFile = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true); setError(''); setPreview(null); setFilename(file.name);
    try { await inspect(await parseStudentFile(file)); }
    catch (failure) { setError(failure.message || 'Dokumen tidak dapat dibaca. Gunakan template yang tersedia.'); }
    finally { setBusy(false); event.target.value = ''; }
  };
  const save = async () => {
    if (busy || !preview?.valid) return;
    setBusy(true); setError('');
    try {
      const result = await apiRequest('/students', { method: 'POST', body: { students: preview.rows.map(row => row.student) }, timeout: 180000 });
      setCredentials(result.credentials);
      setPreview(null);
      try { await refreshStudents(); } catch { showToast('Akun tersimpan. Muat ulang halaman untuk memperbarui daftar.', 'info'); }
    } catch (failure) {
      setError(failure.message);
      if (failure.details) setPreview(previous => ({ ...previous, valid: false, rows: previous.rows.map(row => failure.details.find(item => item.row === row.row) || row) }));
    } finally { setBusy(false); }
  };
  const template = async () => {
    setBusy(true); setError('');
    try { await downloadStudentTemplate(); } catch { setError('Template Excel gagal diunduh. Gunakan template CSV.'); } finally { setBusy(false); }
  };
  const columns = [
    { key: 'row', label: 'No.', sortable: true },
    ...[['name','Nama'],['nim','NIM'],['email','Email'],['semester','Semester'],['angkatan','Angkatan']].map(([key,label]) => ({key,label,render: row => row.student[key]})),
    { key: 'errors', label: 'Pemeriksaan', render: row => <span className={row.errors.length ? 'text-rose-700' : 'text-emerald-700'}>{row.errors.length ? row.errors.join(' ') : 'Siap ditambahkan'}</span> }
  ];

  return <>
    <div className="flex flex-wrap gap-2">
      <button className={button} onClick={() => open('import')}><Upload size={16} /> Impor Mahasiswa</button>
      <button className={`${button} bg-slate-900 text-white`} onClick={() => open('single')}><Plus size={16} /> Tambah Mahasiswa</button>
    </div>
    <ModalShell isOpen={Boolean(mode)} onClose={close} ariaLabel={mode === 'import' ? 'Impor mahasiswa' : 'Tambah mahasiswa'} panelClassName={`${preview ? 'max-w-5xl' : 'max-w-xl'} max-h-[90dvh] overflow-y-auto rounded-2xl p-5 sm:p-7`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{credentials ? 'Akun mahasiswa berhasil dibuat' : mode === 'import' ? 'Impor Mahasiswa' : 'Tambah Mahasiswa'}</h2>
          <p className="mt-2 text-sm text-slate-600">{credentials ? `${credentials.length} akun siap digunakan. Password hanya ditampilkan pada hasil ini; unduh sebelum menutup.` : 'Mahasiswa dapat masuk menggunakan NIM atau email dan password yang dibuat otomatis.'}</p>
        </div>
        <DialogClose disabled={busy} aria-label="Tutup form mahasiswa" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-slate-100"><X size={20} /></DialogClose>
      </div>
      {error && <p role="alert" className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
      {busy && <p role="status" className="mb-4 text-sm text-slate-600">Memproses data, mohon tunggu…</p>}
      {credentials ? <div className="space-y-4">
        <p className="text-sm text-slate-700">File akun berisi password. Bagikan setiap akun hanya kepada mahasiswa yang bersangkutan.</p>
        {credentials.length === 1 && <dl className="space-y-2 rounded-xl bg-slate-50 p-4 text-sm"><dt>Email</dt><dd className="font-semibold">{credentials[0].email}</dd><dt>Password</dt><dd className="break-all font-mono select-all">{credentials[0].password}</dd></dl>}
        <button className={`${button} bg-slate-900 text-white`} onClick={() => downloadCsv('akun-mahasiswa.csv', credentials)}><Download size={16} /> Unduh Akun dan Password</button>
      </div> : <>
        {!preview && mode === 'single' && <form onSubmit={checkSingle} className="space-y-4">
          {[['name','Nama lengkap','text',120],['nim','NIM','text',30],['email','Email','email',160],['angkatan','Angkatan','text',40]].map(([key,label,type,maxLength]) => <label key={key} className="block text-sm font-semibold text-slate-700">{label} *<input className={input} type={type} maxLength={maxLength} required disabled={busy} value={form[key]} onChange={event => setForm(previous => ({...previous,[key]:event.target.value}))} /></label>)}
          <label className="block text-sm font-semibold text-slate-700">Semester *<input className={input} type="number" min="1" max="14" required disabled={busy} value={form.semester} onChange={event => setForm(previous => ({...previous,semester:event.target.value}))} /></label>
          <button disabled={busy} className={`${button} bg-slate-900 text-white`}>Periksa Data</button>
        </form>}
        {!preview && mode === 'import' && <div className="space-y-5">
          <p className="text-sm text-slate-700">Gunakan lembar pertama dengan kolom <strong>nama, nim, email, semester, angkatan</strong>. Format NIM sebagai teks. Maksimal 500 mahasiswa dan 5 MB per dokumen.</p>
          <div className="flex flex-wrap gap-2"><button disabled={busy} className={button} onClick={template}>Template Excel</button><button disabled={busy} className={button} onClick={() => downloadCsv('template-mahasiswa.csv', [studentHeaders])}>Template CSV</button></div>
          <label className="block text-sm font-semibold text-slate-700">Dokumen mahasiswa<input className={`${input} text-sm`} type="file" accept=".xlsx,.csv" disabled={busy} onChange={selectFile} /></label>
          <p className="text-sm text-slate-600">Dokumen diperiksa terlebih dahulu. Belum ada akun yang dibuat pada tahap ini.</p>
        </div>}
        {preview && <div className="space-y-4">
          <p className="text-sm text-slate-700">{filename && `${filename} · `}{preview.rows.length} mahasiswa · {preview.rows.filter(row => row.errors.length).length} baris bermasalah</p>
          {!preview.valid && <p role="alert" className="text-sm text-rose-700">Perbaiki semua baris bermasalah sebelum menyimpan. Akun yang sudah ada tidak akan ditimpa.</p>}
          <DataTable data={preview.rows.map(row => ({...row.student,...row}))} columns={columns} defaultPageSize={10} pageSizeOptions={[10,25,50]} emptyMessage="Tidak ada data." />
          <div className="flex flex-wrap justify-end gap-2"><button disabled={busy} className={button} onClick={() => {setPreview(null);setError('');}}>Kembali ke {mode === 'single' ? 'Form' : 'Dokumen'}</button><button disabled={busy || !preview.valid} className={`${button} bg-slate-900 text-white`} onClick={save}>{busy ? 'Menyimpan…' : `Buat ${preview.rows.length} Akun Mahasiswa`}</button></div>
        </div>}
      </>}
    </ModalShell>
  </>;
}
