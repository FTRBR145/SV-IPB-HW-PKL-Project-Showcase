import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readSource = (relativePath) => readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');

test('footer publik hanya dirender oleh landing page', async () => {
  const [landing, admin, student, upload] = await Promise.all([
    readSource('src/pages/LandingPage.jsx'),
    readSource('src/pages/AdminDashboard.jsx'),
    readSource('src/pages/StudentHome.jsx'),
    readSource('src/pages/UploadProjectPage.jsx')
  ]);
  assert.match(landing, /<Footer\s*\/>/);
  for (const source of [admin, student, upload]) assert.doesNotMatch(source, /<Footer\s*\/>/);
});

test('DataTables memakai label dan aria berbahasa Indonesia', async () => {
  const source = await readSource('src/components/common/DataTable.jsx');
  assert.match(source, /search:\s*'Cari:'/);
  assert.match(source, /orderable:\s*'Urutkan kolom ini'/);
  assert.match(source, /previous:\s*'Halaman sebelumnya'/);
});

test('mobile sheet mahasiswa dan admin memakai dialog dengan focus management bersama', async () => {
  const [studentSidebar, adminSidebar, modalShell] = await Promise.all([
    readSource('src/components/student/StudentSidebar.jsx'),
    readSource('src/components/admin/AdminSidebar.jsx'),
    readSource('src/components/common/ModalShell.jsx')
  ]);
  assert.match(studentSidebar, /<ModalShell/);
  assert.match(adminSidebar, /<ModalShell/);
  assert.match(modalShell, /role="dialog"/);
  assert.match(modalShell, /event\.key === 'Escape'/);
});

test('nilai statistik final tetap tersedia secara semantik selama animasi', async () => {
  const source = await readSource('src/components/landing/StatsBar.jsx');
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /<span className="sr-only">\{stat\.value\}/);
});

test('parallax hero dijadwalkan melalui requestAnimationFrame', async () => {
  const source = await readSource('src/components/landing/HeroSection.jsx');
  assert.match(source, /parallaxFrameRef/);
  assert.match(source, /window\.requestAnimationFrame/);
  assert.match(source, /window\.cancelAnimationFrame/);
});
