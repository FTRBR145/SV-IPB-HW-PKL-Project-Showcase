# Backend Showcase Projek TRK

REST API mandiri untuk landing showcase, portal mahasiswa, dan dashboard admin. Versi awal memakai repository **in-memory**, sehingga data akan kembali ke seed ketika server dimulai ulang. Struktur repository sengaja dipisahkan agar nanti dapat diganti dengan PostgreSQL atau MySQL tanpa mengubah kontrak route.

## Menjalankan backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

API tersedia di `http://localhost:3000/api` dan health check di `GET /api/health`.

## Akun demo

| Peran | Email | Password |
|---|---|---|
| Admin | `admin.trk@apps.ipb.ac.id` | `AdminTRK123!` |
| Mahasiswa | `nabila.putri@apps.ipb.ac.id` | `MahasiswaTRK123!` |

Ubah semua kredensial dan `JWT_SECRET` melalui `.env` sebelum deployment.

## Endpoint utama

| Method | Endpoint | Akses | Fungsi |
|---|---|---|---|
| `GET` | `/api/health` | Publik | Status server |
| `POST` | `/api/auth/login` | Publik | Mendapatkan JWT memakai email, NIM, atau NIP |
| `GET` | `/api/auth/me` | Login | Profil pengguna aktif |
| `GET` | `/api/projects` | Publik | Daftar, pencarian, filter, pagination projek |
| `GET` | `/api/projects/:id` | Publik | Detail projek |
| `POST` | `/api/projects` | Mahasiswa/Admin | Upload projek atau kirim ke moderasi |
| `PATCH` | `/api/projects/:id` | Admin | Edit projek |
| `DELETE` | `/api/projects/:id` | Admin | Hapus projek |
| `GET` | `/api/submissions/mine` | Mahasiswa | Riwayat pengajuan sendiri |
| `GET` | `/api/submissions` | Admin | Antrean dan histori moderasi |
| `POST` | `/api/submissions/:id/approve` | Admin | Setujui dan publikasikan |
| `POST` | `/api/submissions/:id/reject` | Admin | Tolak pengajuan |
| `POST` | `/api/submissions/:id/restore` | Admin | Kembalikan ke antrean |
| `GET/POST/DELETE` | `/api/courses` | Publik/Admin | Data mata kuliah |
| `GET/POST/PATCH/DELETE` | `/api/moderators` | Admin | Kelola moderator |
| `GET/PATCH` | `/api/settings` | Admin | Pengaturan sistem |
| `GET/DELETE` | `/api/activity-logs` | Admin | Log aktivitas |
| `POST` | `/api/system/reset` | Admin | Kembalikan repository ke data seed |

Kirim JWT melalui header:

```http
Authorization: Bearer <access-token>
```

## Format respons

Berhasil:

```json
{
  "success": true,
  "data": {}
}
```

Gagal:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Data yang dikirim belum valid.",
    "details": []
  }
}
```

## Pengujian

```bash
npm test
```
