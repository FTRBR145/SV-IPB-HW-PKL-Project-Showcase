import 'dotenv/config';

const parsedPort = Number.parseInt(process.env.PORT || '3000', 10);

if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
  throw new Error('PORT harus berupa angka antara 1 dan 65535.');
}

const jwtSecret = process.env.JWT_SECRET || 'development-only-secret-change-before-production';

if (process.env.NODE_ENV === 'production' && jwtSecret.length < 32) {
  throw new Error('JWT_SECRET production wajib memiliki minimal 32 karakter.');
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parsedPort,
  apiPrefix: process.env.API_PREFIX || '/api',
  frontendOrigins: (process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174,http://localhost:5175,http://127.0.0.1:5175')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  adminEmail: process.env.ADMIN_EMAIL || 'admin.trk@apps.ipb.ac.id',
  adminPassword: process.env.ADMIN_PASSWORD || 'AdminTRK123!',
  studentEmail: process.env.STUDENT_EMAIL || 'nabila.putri@apps.ipb.ac.id',
  studentPassword: process.env.STUDENT_PASSWORD || 'MahasiswaTRK123!'
});
