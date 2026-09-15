import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import { authenticate, authorize } from '../middleware/auth.js';
import { ApiError, sendData } from '../utils/http.js';

const router = Router();
router.use(authenticate, authorize('admin'));
const studentSchema = z.object({
  name: z.string().trim().min(2).max(120),
  nim: z.string().trim().min(3).max(30).regex(/^[a-z0-9-]+$/i).transform(value => value.toUpperCase()),
  email: z.string().trim().pipe(z.email().max(160)).transform(value => value.toLowerCase()),
  semester: z.coerce.number().int().min(1).max(14),
  angkatan: z.string().trim().min(1).max(40)
});

async function inspect(repository, input) {
  if (!Array.isArray(input) || input.length < 1 || input.length > 500) {
    throw new ApiError(422, 'INVALID_STUDENTS', 'Isi 1–500 mahasiswa dalam satu impor.');
  }
  const existing = await repository.getUserIdentifiers();
  const emails = new Set(existing.map(user => user.email?.toLowerCase()));
  const nims = new Set(existing.map(user => user.nim?.toUpperCase()));
  return input.map((entry, index) => {
    const parsed = studentSchema.safeParse(entry);
    const errors = parsed.success ? [] : parsed.error.issues.map(issue => ({ name: 'Nama wajib diisi (2–120 karakter).', nim: 'NIM wajib 3–30 huruf, angka, atau tanda hubung.', email: 'Alamat email tidak valid.', semester: 'Semester harus angka bulat 1–14.', angkatan: 'Angkatan wajib diisi (maksimal 40 karakter).' }[issue.path[0]] || 'Data tidak valid.'));
    if (parsed.success) {
      if (emails.has(parsed.data.email)) errors.push('Email duplikat atau sudah terdaftar.');
      if (nims.has(parsed.data.nim)) errors.push('NIM duplikat atau sudah terdaftar.');
      emails.add(parsed.data.email); nims.add(parsed.data.nim);
    }
    return { row: index + 1, student: parsed.success ? parsed.data : entry, errors };
  });
}

router.get('/', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  sendData(res, await req.app.locals.repository.listStudents());
});

router.post('/preview', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  const rows = await inspect(req.app.locals.repository, req.body.students);
  sendData(res, { rows, valid: rows.every(row => row.errors.length === 0) });
});

router.post('/', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  const repository = req.app.locals.repository;
  const rows = await inspect(repository, req.body.students);
  if (rows.some(row => row.errors.length)) {
    throw new ApiError(422, 'INVALID_STUDENTS', 'Data belum disimpan. Perbaiki baris yang bermasalah.', rows.filter(row => row.errors.length));
  }
  const credentials = [];
  const users = [];
  for (const { student } of rows) {
    const password = `TRK-${randomBytes(18).toString('base64url')}`;
    credentials.push({ name: student.name, nim: student.nim, email: student.email, password });
    users.push({ ...student, role: 'student', roleName: 'Mahasiswa TRK SV IPB', passwordHash: await bcrypt.hash(password, 10) });
  }
  const students = await repository.createStudents(users, req.user.name);
  sendData(res, { students, credentials }, 201);
});

export default router;
