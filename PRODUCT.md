# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Mahasiswa Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB yang ingin menemukan referensi karya, mengunggah dokumentasi projek, dan mengelola portofolio projeknya.
- Pengunjung publik yang ingin menjelajahi karya, praktikum, dan projek akhir mahasiswa TRK.
- Admin atau dosen bertindak sebagai pengguna pendukung untuk memoderasi pengajuan dan mengelola data showcase.

## Product Purpose

Showcase Projek TRK SV IPB adalah platform web untuk menampilkan dokumentasi video projek praktikum dan projek akhir mahasiswa. Produk ini membantu mahasiswa mempublikasikan karya, memudahkan pengunjung menemukan inovasi TRK, serta menyediakan alur moderasi agar konten yang diterbitkan tetap terkelola.

Produk saat ini dikembangkan sebagai prototipe PKL. Jika kualitas dan kesiapan sistemnya memenuhi kebutuhan, produk berpotensi digunakan sebagai sistem nyata di lingkungan Sekolah Vokasi IPB.

## Positioning

Showcase berfokus khusus pada karya mahasiswa TRK dan menggunakan dokumentasi video sebagai media utama. Pengunggahan mahasiswa, eksplorasi publik, dan moderasi admin berada dalam satu alur produk yang sama.

## Operating Context

- Pengunjung dapat menjelajahi dan mencari projek tanpa masuk ke portal.
- Mahasiswa masuk ke portal untuk melihat referensi, mengunggah projek melalui halaman khusus, serta melihat projek miliknya.
- Pengajuan mahasiswa dapat masuk ke antrean moderasi sebelum dipublikasikan.
- Admin atau dosen meninjau pengajuan, mengelola projek terpublikasi, mahasiswa, moderator, mata kuliah, kategori, pengaturan, dan histori aktivitas.
- Antarmuka digunakan melalui browser desktop dan perangkat kecil.

## Capabilities and Constraints

- Aplikasi menggunakan React 19, Vite 8, React Router, Tailwind CSS, Lucide React, dan DataTables.
- Peran yang tersedia adalah pengunjung publik, mahasiswa, serta admin atau dosen.
- Rute portal mahasiswa dan panel admin dilindungi berdasarkan peran pengguna.
- Data prototipe saat ini disimpan di `localStorage`; autentikasi dan data pengguna masih berupa data demo.
- Projek berisi identitas mahasiswa, mata kuliah, semester, kategori, teknologi, deskripsi, pembimbing, thumbnail, dan tautan video.
- Istilah produk menggunakan bahasa Indonesia dan kata “projek” secara konsisten.
- Integrasi autentikasi, basis data, penyimpanan berkas, dan kebijakan produksi masih menjadi keputusan terbuka sebelum penggunaan resmi.

## Brand Commitments

- Nama dan konteks institusi “Teknologi Rekayasa Komputer (TRK) Sekolah Vokasi IPB University” harus dipertahankan.
- Logo resmi IPB University dan Sekolah Vokasi pada `public/sv_ipb_logo.png` serta `public/sv_ipb_navbar_logo.png` merupakan aset identitas utama.
- Struktur desain awal landing page harus dipertahankan. Perubahan berikutnya pada landing page bersifat refinement, bukan penggantian struktur atau redesign menyeluruh, kecuali pengguna mencabut batasan ini secara eksplisit.
- Bahasa antarmuka mengutamakan bahasa Indonesia yang jelas, ringkas, dan sesuai konteks akademik.

## Evidence on Hand

- Dataset projek demo tersedia di `src/data/projectsData.js`.
- Data pengajuan moderasi, moderator, kategori, dan pengaturan awal tersedia di `src/data/adminData.js`.
- Akun mahasiswa dan admin demo tersedia di `src/data/users.js`.
- Implementasi landing page, portal mahasiswa, halaman unggah, serta dashboard admin sudah tersedia dan dapat dijalankan secara lokal.
- Belum ada bukti penggunaan nyata, testimonial, angka adopsi terverifikasi, atau persetujuan resmi institusi; materi mendatang tidak boleh mengarang klaim tersebut.

## Product Principles

1. Karya mahasiswa menjadi pusat pengalaman, bukan dekorasi pendukung.
2. Penemuan projek harus mudah bagi pengunjung tanpa menghalangi akses dengan autentikasi yang tidak perlu.
3. Pengunggahan mahasiswa harus jelas, terarah, dan transparan mengenai status moderasi.
4. Pengelolaan admin harus fungsional, dapat dipindai dengan cepat, dan menjaga integritas data.
5. Setiap langkah menuju penggunaan nyata harus membedakan data demo dari data atau klaim institusional yang telah diverifikasi.

## Accessibility & Inclusion

Antarmuka harus responsif untuk desktop dan perangkat kecil, dapat digunakan dengan keyboard, memiliki fokus yang terlihat, serta menjaga label dan kontras yang dapat dibaca. Target standar aksesibilitas formal untuk penggunaan resmi masih menjadi keputusan terbuka.
