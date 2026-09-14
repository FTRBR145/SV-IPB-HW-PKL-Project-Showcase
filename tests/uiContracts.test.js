import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readSource = (relativePath) => readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');

test('footer bersama tampil sekali di landing, admin, portal mahasiswa, dan upload', async () => {
  const [landing, admin, student, upload] = await Promise.all([
    readSource('src/pages/LandingPage.jsx'),
    readSource('src/pages/AdminDashboard.jsx'),
    readSource('src/pages/StudentHome.jsx'),
    readSource('src/pages/UploadProjectPage.jsx')
  ]);
  for (const source of [landing, admin, student, upload]) {
    assert.equal(source.match(/<Footer\s*\/>/g)?.length, 1);
    assert.ok(source.indexOf('<Footer />') > source.indexOf('</main>'));
  }
  for (const source of [admin, student, upload]) {
    assert.match(source, /<\/main>\s*<\/div>\s*<Footer\s*\/>\s*<\/div>/);
    assert.match(source, /pb-\[calc\(5rem\+env\(safe-area-inset-bottom\)\)\]/);
  }
});

test('DataTables memakai label dan aria berbahasa Indonesia', async () => {
  const source = await readSource('src/components/common/DataTable.jsx');
  assert.match(source, /search:\s*'Cari:'/);
  assert.match(source, /orderable:\s*': Urutkan kolom ini'/);
  assert.match(source, /previous:\s*'Halaman sebelumnya'/);
  assert.match(source, /number:\s*'Halaman '/);
});

test('tabel admin menyesuaikan panel dan menyediakan pengurutan mobile', async () => {
  const [source, css] = await Promise.all([
    readSource('src/components/common/DataTable.jsx'),
    readSource('src/components/common/DataTable.css')
  ]);
  assert.match(source, /scrollX:\s*false/);
  assert.match(source, /dt\(\)\?\.order\(\)/);
  assert.match(source, /Urutkan data/);
  assert.match(source, /currentColumn\.searchValue\(row\)/);
  assert.match(css, /table-layout:\s*fixed/);
  assert.match(css, /@container admin-table \(max-width: 760px\)/);
  assert.match(css, /white-space:\s*normal/);
  assert.doesNotMatch(css, /min-width:\s*720px|overflow-x:\s*auto/);
  assert.match(css, /\.table-cell-value > div\.justify-center/);
  assert.doesNotMatch(css, /\.table-cell-value \.justify-center/);
});

test('mobile sheet mahasiswa dan admin memakai dialog dengan focus management bersama', async () => {
  const [studentSidebar, adminSidebar, modalShell] = await Promise.all([
    readSource('src/components/student/StudentSidebar.jsx'),
    readSource('src/components/admin/AdminSidebar.jsx'),
    readSource('src/components/common/ModalShell.jsx')
  ]);
  assert.match(studentSidebar, /<ModalShell/);
  assert.match(adminSidebar, /<ModalShell/);
  assert.match(modalShell, /<Dialog open=\{isOpen\}/);
  assert.match(modalShell, /<DialogContent/);
  assert.doesNotMatch(modalShell, /addEventListener|FOCUSABLE_ELEMENTS|document\.body|onMouseDown/);
});

test('semua modal mempertahankan label Indonesia dan kontrol tutup primitive', async () => {
  const consumers = [
    ['modals/LoginModal.jsx', 'Masuk ke akun Showcase TRK', 'Tutup', 'max-w-md max-h-[90vh]'],
    ['modals/UploadModal.jsx', 'Unggah projek TRK', 'Tutup', 'max-w-2xl max-h-[90vh]'],
    ['modals/ProjectDetailModal.jsx', 'Detail projek ${project.title}', 'Tutup Modal', 'max-w-5xl max-h-[92vh]'],
    ['admin/EditProjectModal.jsx', 'Edit projek ${project.title}', 'Tutup modal edit projek', 'max-w-2xl max-h-[90vh]'],
    ['admin/AdminSidebar.jsx', 'Menu admin lainnya', 'Tutup menu lainnya', 'max-h-[70vh]'],
    ['student/StudentSidebar.jsx', 'Pilih mata kuliah', 'Tutup pilihan mata kuliah', 'max-h-[70vh]']
  ];
  for (const [file, label, closeLabel, sizing] of consumers) {
    const source = await readSource(`src/components/${file}`);
    assert.ok(source.includes(label), file);
    assert.ok(source.includes(`aria-label="${closeLabel}"`), file);
    assert.ok(source.includes(sizing), file);
    assert.match(source, /<DialogClose/);
    assert.doesNotMatch(source, /role="dialog"|aria-modal|addEventListener\(['"]keydown/);
    if (file.includes('Sidebar')) {
      assert.match(source, /backdropClassName="bg-slate-950\/45 md:hidden"/);
      assert.match(source, /overlayClassName="items-end p-3 pb-\[calc\(5rem\+env\(safe-area-inset-bottom\)\)\] md:hidden"/);
    }
  }
});

test('nilai statistik final tetap tersedia secara semantik selama animasi', async () => {
  const source = await readSource('src/components/landing/StatsBar.jsx');
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /<span className="sr-only">\{stat\.value\}/);
});

test('slideshow hero otomatis berhenti saat tidak terlihat atau reduced motion aktif', async () => {
  const source = await readSource('src/components/landing/HeroSection.jsx');
  assert.match(source, /prefersReducedMotion \|\| !isHeroVisible \|\| !isDocumentVisible/);
  assert.match(source, /setInterval/);
  assert.match(source, /clearInterval\(timer\)/);
  assert.match(source, /visibilitychange/);
  assert.doesNotMatch(source, /parallaxFrameRef|hero-controls/);
});
