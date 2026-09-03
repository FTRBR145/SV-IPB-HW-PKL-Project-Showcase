import assert from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { env } from '../src/config/env.js';
import { createMemoryRepository } from '../src/repositories/memoryRepository.js';

let app;

beforeEach(() => {
  app = createApp({ repository: createMemoryRepository() });
});

async function login(email, password) {
  const response = await request(app)
    .post('/api/auth/login')
    .send({ email, password })
    .expect(200);
  return response.body.data.accessToken;
}

describe('Showcase TRK API', () => {
  test('health endpoint tersedia', async () => {
    const response = await request(app).get('/api/health').expect(200);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.status, 'ok');
  });

  test('kredensial salah ditolak', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: env.adminEmail, password: 'password-salah' })
      .expect(401);
    assert.equal(response.body.error.code, 'INVALID_CREDENTIALS');
  });

  test('mahasiswa dapat login menggunakan NIM', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ identifier: 'J0304211015', password: env.studentPassword })
      .expect(200);
    assert.equal(response.body.data.user.role, 'student');
  });

  test('endpoint admin membutuhkan token admin', async () => {
    await request(app).get('/api/moderators').expect(401);
    const studentToken = await login(env.studentEmail, env.studentPassword);
    await request(app)
      .get('/api/moderators')
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(403);
  });

  test('mahasiswa mengirim projek ke antrean moderasi', async () => {
    const token = await login(env.studentEmail, env.studentPassword);
    const response = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Monitoring Kualitas Udara Laboratorium',
        course: 'SISTEM TERTANAM (EMBEDDED SYSTEM)',
        category: 'Embedded System',
        semester: 5,
        techStack: ['ESP32', 'MQTT'],
        videoUrl: 'https://www.youtube.com/embed/9KxU30uM3qM',
        description: 'Sistem monitoring kualitas udara laboratorium secara real-time.'
      })
      .expect(202);

    assert.equal(response.body.data.type, 'submission');
    assert.equal(response.body.data.item.status, 'pending');
    assert.equal(response.body.data.item.nim, 'J0304211015');
  });

  test('admin menyetujui pengajuan dan menerbitkan projek', async () => {
    const token = await login(env.adminEmail, env.adminPassword);
    const moderation = await request(app)
      .post('/api/submissions/101/approve')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    assert.equal(moderation.body.data.submission.status, 'approved');
    assert.equal(moderation.body.data.project.title, 'Sistem Deteksi Suhu Otomatis Ruang Server TRK');

    const projects = await request(app).get('/api/projects?search=Deteksi%20Suhu').expect(200);
    assert.equal(projects.body.data.length, 1);
  });

  test('payload projek yang tidak lengkap menghasilkan validasi 422', async () => {
    const token = await login(env.studentEmail, env.studentPassword);
    const response = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'X' })
      .expect(422);
    assert.equal(response.body.error.code, 'VALIDATION_ERROR');
    assert.ok(response.body.error.details.length > 0);
  });
});
