import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesStudentProject, isEmptyPortfolio, isUnavailableThumbnail } from '../src/utils/studentFeed.js';

const project = { title: 'Sensor Suhu', student: 'Nabila', nim: 'J0304211001', supervisor: 'Dr. Guji', course: 'SISTEM TERTANAM', semester: 3, techStack: ['ESP32'] };

test('pencarian mencakup dosen, NIM, mahasiswa, judul, mata kuliah dan teknologi', () => {
  for (const search of [' guji ', 'j0304211001', 'NABILA', 'sensor', 'tertanam', 'esp32']) {
    assert.equal(matchesStudentProject(project, { search }), true, search);
  }
  assert.equal(matchesStudentProject(project, { search: 'tidak ditemukan' }), false);
});
test('filter semester dan mata kuliah digabungkan dengan pencarian', () => {
  assert.equal(matchesStudentProject(project, { semester: '3', course: 'SISTEM TERTANAM', search: 'sensor' }), true);
  assert.equal(matchesStudentProject(project, { semester: '4' }), false);
  assert.equal(matchesStudentProject(project, { course: 'ESP32' }), false);
});
test('hasil filter kosong bukan portofolio kosong', () => {
  assert.equal(isEmptyPortfolio('my-projects', 1), false);
  assert.equal(isEmptyPortfolio('my-projects', 0), true);
  assert.equal(isEmptyPortfolio('home', 0), false);
});
test('thumbnail otomatis kecil dikenali sebagai placeholder tanpa menolak sampul khusus', () => {
  assert.equal(isUnavailableThumbnail({ automatic: true, width: 120, height: 90 }), true);
  assert.equal(isUnavailableThumbnail({ automatic: true, width: 480, height: 360 }), false);
  assert.equal(isUnavailableThumbnail({ automatic: false, width: 120, height: 90 }), false);
});
