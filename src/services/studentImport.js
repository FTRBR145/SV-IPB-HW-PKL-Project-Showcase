import Papa from 'papaparse';
export { downloadCsv } from './exportFiles.js';

export const studentHeaders = ['nama', 'nim', 'email', 'semester', 'angkatan'];

export function rowsToStudents(rows) {
  const nonempty = rows.filter(row => row.some(cell => String(cell ?? '').trim()));
  if (nonempty.length < 2) throw new Error('Dokumen belum berisi mahasiswa.');
  if (nonempty.length > 501) throw new Error('Maksimal 500 mahasiswa per dokumen.');
  const headers = nonempty[0].map(cell => String(cell ?? '').replace(/^\uFEFF/, '').trim().toLowerCase());
  if (new Set(headers).size !== headers.length || studentHeaders.some(key => !headers.includes(key))) {
    throw new Error('Gunakan kolom nama, nim, email, semester, dan angkatan tanpa judul kolom duplikat.');
  }
  return nonempty.slice(1).map((row, index) => {
    if (typeof row[headers.indexOf('nim')] === 'number') throw new Error(`Data ${index + 1}: format kolom NIM sebagai teks agar angka nol di depan tidak hilang.`);
    const entry = Object.fromEntries(studentHeaders.map(key => [key, String(row[headers.indexOf(key)] ?? '').trim()]));
    return { name: entry.nama, nim: entry.nim, email: entry.email, semester: entry.semester, angkatan: entry.angkatan };
  });
}

export async function parseStudentFile(file) {
  if (file.size > 5 * 1024 * 1024) throw new Error('Ukuran dokumen maksimal 5 MB.');
  if (/\.csv$/i.test(file.name)) {
    const text = (await file.text()).replace(/^\uFEFF/, '');
    const separator = /^sep=([;,])\r?\n/i.exec(text);
    const result = Papa.parse(separator ? text.slice(separator[0].length) : text, { skipEmptyLines: 'greedy', ...(separator ? { delimiter: separator[1] } : {}) });
    if (result.errors.length) throw new Error('CSV tidak valid. Periksa tanda kutip dan pemisah kolom.');
    return rowsToStudents(result.data);
  }
  if (!/\.xlsx$/i.test(file.name)) throw new Error('Pilih dokumen Excel (.xlsx) atau CSV.');
  const { default: ExcelJS } = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  try { await workbook.xlsx.load(await file.arrayBuffer()); }
  catch { throw new Error('Dokumen Excel tidak dapat dibaca. Gunakan file .xlsx yang tidak rusak atau dilindungi password.'); }
  const sheet = workbook.worksheets[0];
  if (!sheet) throw new Error('Dokumen tidak memiliki lembar kerja.');
  if (sheet.rowCount > 501) throw new Error('Maksimal 500 mahasiswa. Hapus baris kosong tambahan di Excel.');
  const rows = [];
  sheet.eachRow(row => {
    const values = [];
    row.eachCell({ includeEmpty: true }, cell => {
      if (cell.type === ExcelJS.ValueType.Formula || cell.type === ExcelJS.ValueType.Error) throw new Error('Gunakan nilai teks atau angka biasa, tanpa rumus atau error Excel.');
      values.push(typeof cell.value === 'number' ? cell.value : cell.text);
    });
    rows.push(values);
  });
  return rowsToStudents(rows);
}

export async function downloadStudentTemplate() {
  const { default: ExcelJS } = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Mahasiswa');
  sheet.addRow(studentHeaders);
  sheet.getRow(1).font = { bold: true };
  sheet.columns.forEach(column => { column.width = 25; column.numFmt = '@'; });
  const url = URL.createObjectURL(new Blob([await workbook.xlsx.writeBuffer()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  const link = document.createElement('a'); link.href = url; link.download = 'template-mahasiswa.xlsx'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
