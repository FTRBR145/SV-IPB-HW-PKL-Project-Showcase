import React, { useState } from 'react';
import { Plus, Upload, X, Download, Copy, Check } from 'lucide-react';
import ModalShell from '../common/ModalShell';
import { DialogClose } from '../ui/dialog';
import DataTable from '../common/DataTable';
import useApp from '../../hooks/useApp';
import { apiRequest } from '../../services/apiClient';
import { parseStudentFile, downloadStudentTemplate, downloadCsv, studentHeaders } from '../../services/studentImport';
import { accountCsvRows, downloadAccountWorkbook } from '../../services/exportFiles';

const emptyForm = { name: '', nim: '', email: '', semester: '1', angkatan: '' };
const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 disabled:opacity-50 disabled:cursor-wait';
const input = 'mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600';

export default function StudentEnrollment() {
  const { refreshStudents, showToast } = useApp();
  const [mode, setMode] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);
  const [onlyErrors, setOnlyErrors] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [filename, setFilename] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const copyCredential = async (value, label) => {
    setCopiedField('');
    setCopyMessage('');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setCopyMessage(`${label} berhasil disalin.`);
    } catch {
      setCopyMessage(`Tidak dapat menyalin ${label.toLowerCase()} otomatis. Pilih teksnya lalu salin secara manual.`);
    }
  };
  const open = selected => { setMode(selected); setForm(emptyForm); setPreview(null); setCredentials(null); setError(''); setFilename(''); setCopiedField(''); setCopyMessage(''); };
  const close = () => { if (!busy) setMode(null); };

  const inspect = async students => {
    setOnlyErrors(false);
    setPreview(await apiRequest('/students/preview', { method: 'POST', body: { students } }));
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
    if (busy || (mode === 'import' && !preview?.valid)) return;
    setBusy(true); setError('');
    try {
      const students = mode === 'single' ? [form] : preview.rows.map(row => row.student);
      const result = await apiRequest('/students', { method: 'POST', body: { students }, timeout: 180000 });
      setCredentials(result.credentials);
      setPreview(null);
      try { await refreshStudents(); } catch { showToast('Akun tersimpan. Muat ulang halaman untuk memperbarui daftar.', 'info'); }
    } catch (failure) {
      const details = Array.isArray(failure.details) ? failure.details : [];
      const messages = details.flatMap(row => Array.isArray(row.errors) ? row.errors : []);
      setError(mode === 'single' && messages.length ? messages.join(' ') : failure.message);
      if (mode === 'import' && details.length) setPreview(previous => previous && ({ ...previous, valid: false, rows: previous.rows.map(row => details.find(item => item.row === row.row) || row) }));
    } finally { setBusy(false); }
  };
  const template = async () => {
    setBusy(true); setError('');
    try { await downloadStudentTemplate(); } catch { setError('Template Excel gagal diunduh. Gunakan template CSV.'); } finally { setBusy(false); }
  };
  const exportExcel = async () => {
    if (busy) return;
    setBusy(true); setError('');
    try { await downloadAccountWorkbook(credentials); }
    catch { setError('File Excel gagal dibuat. Coba lagi atau unduh CSV.'); }
    finally { setBusy(false); }
  };
  const columns = [
    { key: 'row', label: 'No.', sortable: true, render: row => <span>{row.row}{row.errors.length > 0 && <strong className="block text-xs text-rose-800">Perlu diperbaiki</strong>}</span> },
    ...[['name','Nama'],['nim','NIM'],['email','Email'],['semester','Semester'],['angkatan','Angkatan']].map(([key,label]) => ({key,label,render: row => row.fieldErrors?.[key]
      ? <div className="import-field-invalid"><strong>{row.student?.[key] || 'Kosong'}</strong><span className="mt-1 block text-xs">{row.fieldErrors[key]}</span></div>
      : row.student?.[key]})),
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
          <p className="mt-2 text-sm text-slate-600">{credentials ? `${credentials.length} akun siap digunakan. Password hanya ditampilkan pada hasil ini; salin atau unduh sebelum menutup.` : 'Mahasiswa dapat masuk menggunakan NIM atau email dan password yang dibuat otomatis.'}</p>
        </div>
        <DialogClose disabled={busy} aria-label="Tutup form mahasiswa" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg hover:bg-slate-100"><X size={20} /></DialogClose>
      </div>
      {error && <p role="alert" className="mb-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
      {busy && <p role="status" className="mb-4 text-sm text-slate-600">Memproses data, mohon tunggu…</p>}
      {credentials ? <div className="space-y-4">
        <p className="text-sm text-slate-700">File akun berisi password. Bagikan setiap akun hanya kepada mahasiswa yang bersangkutan.</p>
        {credentials.length === 1 && <dl className="space-y-4 rounded-xl bg-slate-50 p-4 text-sm">
          {[['Email', credentials[0].email], ['Password', credentials[0].password]].map(([label, value]) => <div key={label}>
            <dt className="mb-1 text-slate-600">{label}</dt>
            <dd className="flex flex-wrap items-center justify-between gap-2">
              <span className={`min-w-0 break-all select-all ${label === 'Password' ? 'font-mono' : 'font-semibold'}`}>{value}</span>
              <button type="button" className={`${button} shrink-0 bg-white`} aria-label={`Salin ${label.toLowerCase()}`} onClick={() => copyCredential(value, label)}>
                {copiedField === label ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                {copiedField === label ? 'Tersalin' : 'Salin'}
              </button>
            </dd>
          </div>)}
        </dl>}
        <p role="status" aria-live="polite" className="text-sm text-slate-700">{copyMessage}</p>
        <div className="flex flex-wrap gap-2">
          <button disabled={busy} className={`${button} bg-slate-900 text-white`} onClick={exportExcel}><Download size={16} /> Unduh Excel (.xlsx)</button>
          <button disabled={busy} className={button} onClick={() => downloadCsv('akun-mahasiswa.csv', accountCsvRows(credentials))}><Download size={16} /> Unduh CSV</button>
        </div>
        <p className="text-sm text-slate-600">Pilih Excel agar kolom tertata dan NIM tetap utuh, termasuk angka nol di depan.</p>
      </div> : <>
        {!preview && mode === 'single' && <form onSubmit={event => { event.preventDefault(); save(); }} className="space-y-4">
          {[['name','Nama lengkap','text',120],['nim','NIM','text',30],['email','Email','email',160],['angkatan','Angkatan','text',40]].map(([key,label,type,maxLength]) => <label key={key} className="block text-sm font-semibold text-slate-700">{label} *<input className={input} type={type} maxLength={maxLength} required disabled={busy} value={form[key]} onChange={event => setForm(previous => ({...previous,[key]:event.target.value}))} /></label>)}
          <label className="block text-sm font-semibold text-slate-700">Semester *<input className={input} type="number" min="1" max="14" required disabled={busy} value={form.semester} onChange={event => setForm(previous => ({...previous,semester:event.target.value}))} /></label>
          <button disabled={busy} className={`${button} bg-slate-900 text-white`}>{busy ? 'Menyimpan…' : 'Tambah Mahasiswa'}</button>
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
          <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={onlyErrors} onChange={event => setOnlyErrors(event.target.checked)} className="h-4 w-4 accent-rose-700" />Hanya baris bermasalah ({preview.rows.filter(row => row.errors.length).length})</label>
          <DataTable key={onlyErrors ? 'errors' : 'all'} data={preview.rows.filter(row => !onlyErrors || row.errors.length).map(row => ({...row.student,...row}))} columns={columns} isRowInvalid={row => row.errors.length > 0} defaultPageSize={10} pageSizeOptions={[10,25,50]} emptyMessage="Tidak ada baris yang cocok." />
          <div className="flex flex-wrap justify-end gap-2"><button disabled={busy} className={button} onClick={() => {setPreview(null);setError('');}}>Kembali ke {mode === 'single' ? 'Form' : 'Dokumen'}</button><button disabled={busy || !preview.valid} className={`${button} bg-slate-900 text-white`} onClick={save}>{busy ? 'Menyimpan…' : `Buat ${preview.rows.length} Akun Mahasiswa`}</button></div>
        </div>}
      </>}
    </ModalShell>
  </>;
}
