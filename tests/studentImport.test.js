import test from 'node:test';
import assert from 'node:assert/strict';
import ExcelJS from 'exceljs';
import { parseStudentFile, rowsToStudents, studentHeaders } from '../src/services/studentImport.js';

test('CSV supports BOM, quotes, semicolons, leading zero NIM, and hundreds of rows', async () => {
  const text = '\uFEFFnama;nim;email;semester;angkatan\r\n' + Array.from({length:300}, (_,i) => `"Nama, ${i}";00${i};student${i}@example.test;2;2026`).join('\r\n');
  const students = await parseStudentFile({name:'mahasiswa.csv',size:text.length,text:async()=>text});
  assert.equal(students.length,300);
  assert.equal(students[0].nim,'000');
  assert.equal(students[0].name,'Nama, 0');
});

test('rejects missing columns, duplicate headers, empty, oversized and malformed documents', async () => {
  assert.throws(()=>rowsToStudents([studentHeaders]),/belum berisi/);
  assert.throws(()=>rowsToStudents([['nama','nim'],['Nama','001']]),/kolom/);
  assert.throws(()=>rowsToStudents([[...studentHeaders,'nim'],['Nama','001','a@example.test',1,'2026','002']]),/duplikat/);
  assert.throws(()=>rowsToStudents([studentHeaders,...Array(501).fill(['Nama','001','a@example.test',1,'2026'])]),/500/);
  await assert.rejects(parseStudentFile({name:'data.pdf',size:10}),/Excel/);
  await assert.rejects(parseStudentFile({name:'data.csv',size:6000000}),/5 MB/);
  await assert.rejects(parseStudentFile({name:'data.csv',size:10,text:async()=> 'nama,nim,email,semester,angkatan\n"unfinished'}),/CSV tidak valid/);
});

test('XLSX preserves text identities and rejects formulas or numeric NIM', async () => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Mahasiswa');
  sheet.addRow(studentHeaders);
  sheet.addRow(['Mahasiswa','00123','student@example.test',2,2026]);
  const file = async () => { const buffer=await workbook.xlsx.writeBuffer(); return {name:'data.xlsx',size:buffer.byteLength,arrayBuffer:async()=>buffer}; };
  const students=await parseStudentFile(await file());
  assert.equal(students[0].nim,'00123');
  assert.equal(students[0].angkatan,'2026');
  sheet.getCell('B2').value=123;
  await assert.rejects(parseStudentFile(await file()),/format kolom NIM/);
  sheet.getCell('B2').value={formula:'1+1',result:2};
  await assert.rejects(parseStudentFile(await file()),/tanpa rumus/);
});
