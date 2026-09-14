import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { projectSchema, projectUpdateSchema } from '../backend/src/schemas/index.js';

test('form tambah dan edit tidak lagi bergantung pada kategori', async () => {
  for (const path of ['../src/components/projects/ProjectForm.jsx', '../src/components/admin/EditProjectModal.jsx']) {
    const source = await readFile(new URL(path, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /category|categories|Kategori/);
    assert.match(source, /name="course"/);
  }
});

test('API menerima projek dan perubahan tanpa kategori serta tetap mendukung data lama', () => {
  const payload = { title: 'Projek sensor', course: 'Sistem Tertanam', semester: 3,
    videoUrl: 'https://www.youtube.com/watch?v=9KxU30uM3qM', description: 'Dokumentasi projek sensor mahasiswa.' };
  assert.equal(projectSchema.safeParse(payload).success, true);
  assert.equal(projectUpdateSchema.safeParse({ title: 'Judul diperbarui' }).success, true);
  assert.equal(projectSchema.safeParse({ ...payload, category: 'Embedded System' }).success, true);
});
