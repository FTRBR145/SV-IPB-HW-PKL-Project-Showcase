import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { normalizeProjectVideo, projectContentErrors, configuredAcademicYear } from '../src/utils/projectInput.js';
import { projectSchema } from '../backend/src/schemas/index.js';

test('video kosong dan tautan tanpa ID tidak diganti video demo', () => {
  for (const value of ['', 'https://youtube.com/', 'https://youtube.com/watch?v=abc', 'https://youtube.com.evil.test/watch?v=abcdefghijk', 'ftp://youtu.be/abcdefghijk']) {
    assert.equal(normalizeProjectVideo(value), '');
  }
});
test('format YouTube umum dinormalisasi tanpa parameter pelacakan', () => {
  for (const value of ['https://youtube.com/watch?v=abcdefghijk&list=123', 'https://youtu.be/abcdefghijk?t=3', 'https://youtube.com/shorts/abcdefghijk', 'https://youtube.com/live/abcdefghijk', 'https://youtube.com/embed/abcdefghijk']) {
    assert.equal(normalizeProjectVideo(value), 'https://www.youtube.com/embed/abcdefghijk');
  }
});
test('video dan deskripsi wajib, data opsional kosong tetap valid pada API', () => {
  assert.deepEqual(Object.keys(projectContentErrors({ videoUrl: '', description: ' ' })), ['videoUrl', 'description']);
  const payload = { title: 'Projek mahasiswa', course: 'Aplikasi Mobile', semester: 5,
    videoUrl: normalizeProjectVideo('https://youtu.be/abcdefghijk'), description: 'Dokumentasi aplikasi mahasiswa.', supervisor: '', techStack: [] };
  assert.deepEqual(projectContentErrors(payload), {});
  assert.equal(projectSchema.safeParse(payload).success, true);
});
test('tahun ajaran mengikuti nilai pengaturan yang valid, bukan tahun hardcoded', () => {
  assert.equal(configuredAcademicYear('2027/2028'), '2027/2028');
  for (const value of [undefined, '', '2027/2030', '2027']) assert.equal(configuredAcademicYear(value), '');
});
test('form tidak memiliki fallback demo dan keterangan identitas hanya di form', async () => {
  const form = await readFile(new URL('../src/components/projects/ProjectForm.jsx', import.meta.url), 'utf8');
  const page = await readFile(new URL('../src/pages/UploadProjectPage.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(form, /9KxU30uM3qM|Dosen Pembimbing TRK SV IPB|2025\/2026|techStackStr: 'ESP32/);
  assert.match(form, /adminSettings\?\.academicYear/);
  assert.doesNotMatch(page, /Nama dan NIM diambil otomatis/);
});
