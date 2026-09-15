import { createSeedData } from '../src/data/seed.js';
import { createPostgresPool } from '../src/config/postgres.js';
import { createPostgresRepository } from '../src/repositories/postgresRepository.js';
import { env } from '../src/config/env.js';

if (env.nodeEnv === 'production' && (!process.env.ADMIN_PASSWORD || !process.env.STUDENT_PASSWORD)) {
  throw new Error('Tetapkan ADMIN_PASSWORD dan STUDENT_PASSWORD sebelum seed production.');
}
const repository = createPostgresRepository(createPostgresPool());
try {
  const seeded = await repository.seed(createSeedData());
  console.log(seeded ? 'Data awal berhasil disimpan.' : 'Database sudah berisi data; seed dilewati tanpa perubahan.');
} finally { await repository.close(); }
