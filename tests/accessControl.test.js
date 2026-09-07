import test from 'node:test';
import assert from 'node:assert/strict';
import { isAdminAccount, isStudentAccount, ROUTE_ACCESS } from '../src/utils/accessControl.js';

test('akses upload hanya diberikan kepada mahasiswa', () => {
  assert.deepEqual(ROUTE_ACCESS.studentUpload, ['student']);
  assert.equal(ROUTE_ACCESS.studentUpload.includes('admin'), false);
});

test('admin dapat membuka pratinjau portal tetapi tidak dianggap mahasiswa', () => {
  const admin = { role: 'admin' };
  assert.equal(ROUTE_ACCESS.studentPortal.includes(admin.role), true);
  assert.equal(isAdminAccount(admin), true);
  assert.equal(isStudentAccount(admin), false);
});

test('helper identitas role menolak data kosong dan role lain', () => {
  assert.equal(isStudentAccount(null), false);
  assert.equal(isAdminAccount({ role: 'student' }), false);
});
