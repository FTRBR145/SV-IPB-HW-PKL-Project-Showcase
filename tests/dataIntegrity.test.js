import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildStudentSummaries,
  getNextNumericId,
  isModeratorList,
  isProjectList,
  isStringList,
  isUser,
  parseStoredJson
} from '../src/utils/dataIntegrity.js';

test('parseStoredJson rejects malformed and unexpected storage values', () => {
  const fallback = ['DEFAULT'];

  assert.deepEqual(parseStoredJson('["IOT"]', fallback, isStringList), ['IOT']);
  assert.equal(parseStoredJson('{broken', fallback, isStringList), fallback);
  assert.equal(parseStoredJson('{"unexpected":true}', fallback, isStringList), fallback);
  assert.deepEqual(
    parseStoredJson('[{"id":1,"title":"Robot","student":"Ayu"}]', fallback, isProjectList),
    [{ id: 1, title: 'Robot', student: 'Ayu' }]
  );
  assert.equal(parseStoredJson('[{"id":1}]', fallback, isProjectList), fallback);
  assert.equal(parseStoredJson('[{"id":1,"name":"Admin"}]', fallback, isModeratorList), fallback);
});

test('isUser only accepts known frontend roles with a display name', () => {
  assert.equal(isUser({ name: 'Admin TRK', role: 'admin' }), true);
  assert.equal(isUser({ name: 'Mahasiswa', role: 'student' }), true);
  assert.equal(isUser({ name: 'Penyusup', role: 'owner' }), false);
  assert.equal(isUser({ role: 'admin' }), false);
});

test('getNextNumericId ignores corrupt identifiers', () => {
  assert.equal(getNextNumericId([{ id: 2 }, { id: '7' }, { id: 'rusak' }]), 8);
  assert.equal(getNextNumericId([]), 1);
});

test('student summaries never count a submission as a published project', () => {
  const projects = [{ id: 1, nim: 'J0301', student: 'Ayu', semester: 4 }];
  const submissions = [
    { id: 1, nim: 'J0301', student: 'Ayu', semester: 4 },
    { id: 2, nim: 'J0302', student: 'Bima', semester: 2 }
  ];

  assert.deepEqual(buildStudentSummaries(projects, submissions), [
    { nim: 'J0301', name: 'Ayu', semester: 4, projectCount: 1 },
    { nim: 'J0302', name: 'Bima', semester: 2, projectCount: 0 }
  ]);
});
