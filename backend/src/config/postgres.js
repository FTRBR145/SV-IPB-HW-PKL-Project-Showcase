import pg from 'pg';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from './env.js';

export function createPostgresPool() {
  if (!env.databaseUrl) throw new Error('DATABASE_URL wajib diisi di backend/.env untuk Supabase/Postgres.');
  const url = new URL(env.databaseUrl);
  if (env.databaseCaFile) {
    // pg lets URL SSL parameters replace the explicit ssl object (including CA).
    for (const key of ['sslmode', 'sslrootcert', 'sslcert', 'sslkey']) url.searchParams.delete(key);
  }
  return new pg.Pool({
    connectionString: url.toString(),
    max: 5,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    statement_timeout: 15000,
    // Never disable TLS certificate verification for a remote database.
    ...(env.databaseCaFile ? { ssl: {
      ca: readFileSync(resolve(fileURLToPath(new URL('../../', import.meta.url)), env.databaseCaFile), 'utf8'),
      rejectUnauthorized: true
    } } : {})
  });
}
