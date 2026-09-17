import Papa from 'papaparse';

const cellValue = value => value == null ? '' : Array.isArray(value) ? value.join(', ') : typeof value === 'object' ? JSON.stringify(value) : value;

export function createCsv(rows) {
  const values = rows.map(row => Array.isArray(row)
    ? row.map(cellValue)
    : Object.fromEntries(Object.entries(row).map(([key, value]) => [key, cellValue(value)])));
  // Excel reads the separator declaration regardless of the Windows region.
  return '\uFEFFsep=;\r\n' + Papa.unparse(values, { delimiter: ';', newline: '\r\n', quotes: true, escapeFormulae: true });
}

export function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadCsv(filename, rows) {
  if (!rows.length) return;
  downloadBlob(filename, new Blob([createCsv(rows)], { type: 'text/csv;charset=utf-8' }));
}

export const accountColumns = [
  { header: 'Nama Lengkap', key: 'name', width: 32 },
  { header: 'NIM', key: 'nim', width: 24 },
  { header: 'Email', key: 'email', width: 42 },
  { header: 'Password', key: 'password', width: 44 }
];

export function accountCsvRows(accounts) {
  return [accountColumns.map(column => column.header), ...accounts.map(account => accountColumns.map(column => String(account[column.key] ?? '')))];
}

export async function createAccountWorkbook(accounts) {
  const { default: ExcelJS } = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Akun Mahasiswa', { views: [{ state: 'frozen', ySplit: 1 }] });
  sheet.columns = accountColumns.map(column => ({ ...column, style: { numFmt: '@' } }));
  accounts.forEach(account => sheet.addRow(Object.fromEntries(accountColumns.map(({ key }) => [key, String(account[key] ?? '')]))));
  sheet.autoFilter = { from: 'A1', to: 'D1' };
  sheet.eachRow((row, index) => {
    row.height = index === 1 ? 28 : 32;
    row.eachCell(cell => {
      cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      cell.font = { name: 'Calibri', size: 11, ...(index === 1 ? { bold: true, color: { argb: 'FFFFFFFF' } } : {}) };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: index === 1 ? 'FF0F172A' : index % 2 === 0 ? 'FFF1F5F9' : 'FFFFFFFF' } };
    });
  });
  return workbook.xlsx.writeBuffer();
}

export async function downloadAccountWorkbook(accounts) {
  downloadBlob('akun-mahasiswa.xlsx', new Blob([await createAccountWorkbook(accounts)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
}
