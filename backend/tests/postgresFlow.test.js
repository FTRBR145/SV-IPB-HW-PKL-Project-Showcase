import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { createPostgresRepository } from '../src/repositories/postgresRepository.js';
import { createSeedData } from '../src/data/seed.js';
import { env } from '../src/config/env.js';

// PGlite executes real Postgres SQL in a single connection. Serialize leases to
// model pg.Pool transactions without interleaving requests on that connection.
function poolFor(db) {
  let tail = Promise.resolve();
  const connect = async () => {
    const previous = tail;
    let release; tail = new Promise(resolve => { release = resolve; });
    await previous;
    return {query:(sql, values)=>db.query(sql,values),release};
  };
  return { connect, async query(sql, values) { const client=await connect(); try {return await client.query(sql,values);} finally {client.release();} }, end:()=>db.close() };
}
let directory, db, pool, repository, api, studentToken, adminToken;
const seed = createSeedData();
const prefix=env.apiPrefix;
const auth = token => ({Authorization:`Bearer ${token}`});
const project = {title:'Projek integrasi',course:seed.courses[0],semester:3,
  videoUrl:'https://www.youtube.com/embed/M7lc1UVf-VE',description:'Deskripsi projek untuk pengujian integrasi.'};

before(async () => {
  directory=await mkdtemp(join(tmpdir(),'trk-postgres-test-'));
  db=new PGlite(directory); pool=poolFor(db);
  await db.exec(await readFile(new URL('../../supabase/migrations/20260915025603_showcase_persistence.sql',import.meta.url),'utf8'));
  repository=createPostgresRepository(pool);
  await repository.seed(seed);
  api=request(createApp({repository}));
  studentToken=(await api.post(prefix+'/auth/login').send({identifier:env.studentEmail,password:env.studentPassword}).expect(200)).body.data.accessToken;
  adminToken=(await api.post(prefix+'/auth/login').send({identifier:env.adminEmail,password:env.adminPassword}).expect(200)).body.data.accessToken;
});
after(async () => { await repository?.close(); if(directory) await rm(directory,{recursive:true,force:true}); });

test('login/session and role guards work with asynchronous Postgres lookups', async () => {
  const me=await api.get(prefix+'/auth/me').set(auth(studentToken)).expect(200);
  assert.equal(me.body.data.role,'student');
  assert.equal(me.body.data.passwordHash,undefined);
  await api.get(prefix+'/submissions').expect(401);
  await api.get(prefix+'/submissions').set(auth(studentToken)).expect(403);
  await api.post(prefix+'/auth/login').send({identifier:env.studentEmail,password:'incorrect-password'}).expect(401);
  await api.post(prefix+'/projects').send(project).expect(401);
  await api.post(prefix+'/projects').set(auth(studentToken)).send({...project,description:''}).expect(422);
});

test('upload -> pending -> approve -> public -> edit -> delete is atomic and private', async () => {
  const created=(await api.post(prefix+'/projects').set(auth(studentToken)).send({...project,student:'Palsu',nim:'OTHER'}).expect(202)).body.data;
  assert.equal(created.type,'submission');
  assert.equal(created.item.nim,seed.users.find(user=>user.role==='student').nim);
  assert.equal((await repository.listProjects({search:project.title})).total,0);
  const mine=(await api.get(prefix+'/submissions/mine').set(auth(studentToken)).expect(200)).body.data;
  assert.ok(mine.some(item=>item.id===created.item.id));
  assert.ok(mine.every(item=>item.nim===created.item.nim));
  const path=`${prefix}/submissions/${created.item.id}/approve`;
  const approvals=await Promise.all([api.post(path).set(auth(adminToken)),api.post(path).set(auth(adminToken))]);
  assert.deepEqual(approvals.map(result=>result.status).sort(),[200,409]);
  const approved=approvals.find(result=>result.status===200).body.data;
  assert.equal((await repository.listProjects({search:project.title})).total,1);
  await api.post(`${prefix}/submissions/${created.item.id}/restore`).set(auth(adminToken)).expect(409);
  const id=approved.project.id;
  await api.get(`${prefix}/projects/${id}`).expect(200);
  await api.patch(`${prefix}/projects/${id}`).set(auth(studentToken)).send({title:'Tidak boleh'}).expect(403);
  await api.patch(`${prefix}/projects/${id}`).set(auth(adminToken)).send({title:'Projek diperbarui'}).expect(200);
  await api.delete(`${prefix}/projects/${id}`).set(auth(adminToken)).expect(200);
  await api.get(`${prefix}/projects/${id}`).expect(404);
  assert.ok((await repository.getActivityLogs()).some(log=>log.message.includes('diperbarui')));
});

test('reject/restore transitions and maintenance rules remain enforced', async () => {
  const submission=await repository.createSubmission(project,'Penguji');
  await api.post(`${prefix}/submissions/${submission.id}/reject`).set(auth(adminToken)).expect(200);
  await api.post(`${prefix}/submissions/${submission.id}/restore`).set(auth(adminToken)).expect(200);
  await api.post(`${prefix}/submissions/${submission.id}/restore`).set(auth(adminToken)).expect(409);
  await repository.updateSettings({maintenanceMode:true},'Penguji');
  await api.post(prefix+'/projects').set(auth(studentToken)).send(project).expect(503);
  await repository.updateSettings({maintenanceMode:false},'Penguji');
  await api.post(prefix+'/system/reset').set(auth(adminToken)).expect(403);
});

test('pagination, search, exact filters, and direct detail cover records beyond page one', async () => {
  for(let index=0;index<103;index++) await repository.createProject({...project,title:`Pagination ${index}`,nim:'PAGING',supervisor:'Dosen Penguji',techStack:['ESP32']});
  const first=(await api.get(prefix+'/projects?limit=100&nim=PAGING').expect(200)).body;
  const second=(await api.get(prefix+'/projects?limit=100&page=2&nim=PAGING').expect(200)).body;
  assert.equal(first.data.length,100); assert.equal(second.data.length,3);
  assert.equal(first.meta.total,103); assert.equal(first.meta.totalPages,2);
  assert.equal(new Set([...first.data,...second.data].map(item=>item.id)).size,103);
  await api.get(`${prefix}/projects/${second.data.at(-1).id}`).expect(200);
  assert.equal((await repository.listProjects({search:'Dosen Penguji',nim:'PAGING'})).total,103);
  assert.equal((await repository.listProjects({search:'ESP32',nim:'PAGING'})).total,103);
  assert.equal((await repository.listProjects({search:"' OR 1=1 --",nim:'PAGING'})).total,0);
  assert.equal((await repository.listProjects({nim:'PAGING',semester:8})).total,0);
});

test('failed moderation rolls back publication, status, and activity together', async () => {
  const submission=await repository.createSubmission({...project,title:'Rollback check'},'Penguji');
  const before=await repository.getActivityLogs();
  // Force a real database constraint failure after project creation.
  await pool.query("alter table showcase.submissions add constraint test_fail_approve check (data->>'title' <> 'Rollback check' or data->>'status' <> 'approved')");
  await assert.rejects(repository.approveSubmission(submission.id,'Penguji'));
  assert.equal((await repository.listProjects({search:'Rollback check'})).total,0);
  assert.equal((await repository.findSubmissionById(submission.id)).status,'pending');
  assert.deepEqual(await repository.getActivityLogs(),before);
  await pool.query('alter table showcase.submissions drop constraint test_fail_approve');
});

test('settings, moderation, and projects survive database/repository restart; seeding is idempotent', async () => {
  await repository.updateSettings({siteName:'Nama yang tersimpan'},'Penguji');
  const submission=await repository.createSubmission({...project,title:'Persisten'},'Penguji');
  const approved=await repository.approveSubmission(submission.id,'Penguji');
  await repository.close();
  db=new PGlite(directory); pool=poolFor(db); repository=createPostgresRepository(pool);
  api=request(createApp({repository}));
  assert.equal(await repository.seed(seed),false);
  assert.equal((await repository.getSettings()).siteName,'Nama yang tersimpan');
  assert.equal((await repository.findSubmissionById(submission.id)).status,'approved');
  assert.equal((await repository.findProjectById(approved.project.id)).title,'Persisten');
});

test('private schema denies untrusted database roles and all application tables have RLS', async () => {
  const tables=await pool.query("select relname,relrowsecurity from pg_class where relnamespace='showcase'::regnamespace and relkind='r'");
  assert.equal(tables.rows.length,8);
  assert.ok(tables.rows.every(row=>row.relrowsecurity));
  await pool.query('create role trk_browser_test');
  await pool.query('set role trk_browser_test');
  try { await assert.rejects(pool.query('select * from showcase.users'),/permission denied/); }
  finally { await pool.query('reset role'); }
});


test('admin adds students, previews hundreds, prevents duplicates and new accounts can log in', async () => {
  const students = Array.from({length:120}, (_,index) => ({name:`Mahasiswa Impor ${index}`,nim:`IMPORT${index}`,email:`import${index}@example.test`,semester:2,angkatan:'2026'}));
  await api.get(prefix+'/students').expect(401);
  await api.get(prefix+'/students').set(auth(studentToken)).expect(403);
  await api.post(prefix+'/students').set(auth(studentToken)).send({students:[students[0]]}).expect(403);
  const before=(await repository.listStudents()).length;
  const preview=(await api.post(prefix+'/students/preview').set(auth(adminToken)).send({students}).expect(200)).body.data;
  assert.equal(preview.valid,true);
  assert.equal(preview.rows.length,120);
  assert.equal((await repository.listStudents()).length,before, 'preview must not write');
  const duplicate=(await api.post(prefix+'/students/preview').set(auth(adminToken)).send({students:[students[0],students[0]]}).expect(200)).body.data;
  assert.equal(duplicate.valid,false);
  await api.post(prefix+'/students').set(auth(adminToken)).send({students:[students[0],{...students[1],email:'invalid'}]}).expect(422);
  assert.equal((await repository.listStudents()).length,before, 'invalid batch must not partially persist');
  await api.post(prefix+'/students/preview').set(auth(adminToken)).send({students:Array(501).fill(students[0])}).expect(422);
  const result=(await api.post(prefix+'/students').set(auth(adminToken)).send({students}).expect(201));
  assert.equal(result.headers['cache-control'],'no-store');
  assert.equal(result.body.data.credentials.length,120);
  assert.equal(new Set(result.body.data.credentials.map(row=>row.password)).size,120);
  assert.ok(result.body.data.students.every(student=>student.role==='student' && !student.passwordHash));
  const first=result.body.data.credentials[0];
  const login=(await api.post(prefix+'/auth/login').send({identifier:first.nim,password:first.password}).expect(200)).body.data;
  assert.equal(login.user.email,first.email);
  const list=(await api.get(prefix+'/students').set(auth(adminToken)).expect(200)).body.data;
  assert.equal(list.length,before+120);
  assert.ok(list.every(student=>!student.passwordHash && !student.password));
  await api.post(prefix+'/students').set(auth(adminToken)).send({students:[students[0]]}).expect(422);
  // Repository recheck protects against a stale preview, including mixed-case NIM.
  await assert.rejects(repository.createStudents([{...students[0],nim:'IMPORT0',passwordHash:'unused'}],'Test'),error=>error.status===409);
});
