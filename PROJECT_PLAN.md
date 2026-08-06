# DOKUMEN PROJECT PLAN
## Praktik Kerja Lapangan (PKL) - Sekolah Vokasi IPB University

---

### 📋 Informasi Umum Proyek

* **Nama / Judul Proyek**: SV IPB Project Showcase (TRK Student Project Showcase)
* **Program Studi**: Teknik Komputer / Teknologi Rekayasa Komputer (TRK)
* **Instansi**: Sekolah Vokasi IPB University
* **Tim Penyusun / Anggota**:
  1. **Fatir Syaiful Bahri**
  2. **Fadillah Nurwahid Mursid**
* **Tanggal Penyusunan**: 5 Agustus 2026

---

### 1. Ringkasan Eksekutif

Karya dan proyek akhir mahasiswa Sekolah Vokasi IPB memiliki nilai edukasi dan potensi besar untuk dijadikan portofolio profesional. Saat ini, kebutuhan akan sebuah wadah digital yang terpusat untuk memamerkan video hasil karya tersebut sangat krusial. Tanpa adanya platform yang terintegrasi, karya-karya mahasiswa sulit diakses secara luas oleh publik, adik tingkat sebagai referensi pembelajaran, maupun oleh mitra industri yang mencari talenta potensial.

Sebagai solusi, proyek ini berfokus pada pengembangan **"SV IPB Project Showcase"** (TRK Student Project Showcase), sebuah platform website berbasis katalog yang dirancang khusus untuk menyimpan, menampilkan, dan mengapresiasi video proyek mahasiswa. Website ini memungkinkan pengunjung untuk mengeksplorasi karya berdasarkan program studi, semester, atau mata kuliah, sekaligus menyediakan sistem bagi mahasiswa dan admin untuk mengelola pengajuan video proyek secara terstruktur.

---

### 2. Cakupan Proyek dan Hasil Kerja (*Scope of Work*)

1. **Pengembangan Antarmuka Website (Frontend)**:
   * Membangun halaman landing page dan katalog proyek dengan desain visual yang selaras dengan identitas resmi Sekolah Vokasi IPB University (Biru IPB `#003366` & Magenta SV IPB `#e30613`).
   * Tampilan dirancang responsif agar dapat diakses dengan optimal melalui perangkat seluler (*mobile*), tablet, maupun komputer (*desktop*).

2. **Fitur Manajemen Katalog Proyek**:
   * Pengembangan sistem filter interaktif dan pencarian *real-time* untuk memudahkan pengunjung menemukan video proyek berdasarkan kategori mata kuliah, semester (1–8), prodi TRPL, atau nama mahasiswa.

3. **Sistem Pengajuan (*Submission*) Proyek**:
   * Pembuatan formulir digital yang memungkinkan mahasiswa mengirimkan data karya mereka secara mandiri.
   * Mengingat beban server, sistem menggunakan metode *embed link video* (YouTube/Vimeo) beserta detail metadata (judul, deskripsi, tim, prodi, semester, & *tech stack*).

4. **Backend & Pengelolaan Database (Admin)**:
   * Pembangunan sistem database relasional dengan MySQL/MongoDB/JSON store, perancangan RESTful API, dan integrasi sistem CRUD.
   * Sistem menyediakan dashboard untuk dosen/admin guna meninjau (*approve/reject*), mengedit, atau menghapus data proyek.

5. **Autentikasi & Keamanan Data**:
   * Implementasi fitur login SSO yang aman bagi pengelola situs (admin/dosen) untuk membatasi akses ke dashboard manajemen data.

---

### 3. Jadwal Pengerjaan (*Timeline 4 Minggu*)

| Minggu Ke- | Tahapan Kegiatan | Detail Output & Milestones |
| :---: | :--- | :--- |
| **Minggu 1** | **Inisiasi & Desain UI/UX** | Penyusunan Project Plan, analisis kebutuhan sistem, pembuatan wireframe & desain UI/UX di Figma sesuai identitas SV IPB. |
| **Minggu 2** | **Arsitektur Database & API** | Perancangan Entity Relationship Diagram (ERD), skema database MySQL, dan pengembangan RESTful API/sistem CRUD. |
| **Minggu 3** | **Slicing Frontend & Integrasi** | Slicing desain Figma ke kode React, integrasi antarmuka dengan API, dan penerapan fitur pemutar video YouTube & filter *real-time*. |
| **Minggu 4** | **Pengujian & Deployment** | Pengujian sistem menyeluruh (*debugging*), uji responsivitas lintas perangkat, revisi feedback pembimbing, dan deployment ke server daring. |

---

### 4. Uraian Rencana Penugasan (*Person in Charge - PIC*)

* **UI/UX Designer & Project Lead** (*Fatir Syaiful Bahri & Fadillah Nurwahid Mursid*):
  * Merancang jadwal kerja, komunikasi dengan pembimbing lapangan SV IPB, dan perancangan desain antarmuka Figma sesuai panduan visual SV IPB.
* **Frontend Developer**:
  * Eksekusi desain menjadi kode React responsif, mengelola sistem filter & pencarian *real-time*, optimasi lintas perangkat, serta integrasi pemutar video.
* **Backend & DB Admin**:
  * Merancang struktur database (ERD), membangun RESTful API, mengelola integrasi endpoints, serta memastikan keamanan sistem CRUD admin.

---

### 5. Sumber Daya Proyek (*Tools & Tech Stack*)

* **Tools & IDE**: Git, GitHub, Figma, Visual Studio Code, Postman, Node.js / npm.
* **Libraries & Frameworks**:
  * **Frontend**: React 19, Vite 8, Vanilla CSS Modern (CSS Variables, Flexbox, Grid, Glassmorphic, Keyframe Animations), Lucide React Icons.
  * **Backend & Database**: Node.js / Express.js, MySQL / Relational Database REST API.
* **Platform Deployment**: Vercel / Railway / GitHub Pages / Server Lokal Kampus SV IPB.

---

### 6. Rencana Manajemen Risiko dan Isu (*Risk Management Plan*)

| Potential Risk / Isu | Impact Level | Mitigation & Solution Plan |
| :--- | :---: | :--- |
| **Beban Server dari File Video** <br/> *Kinerja website melambat dan penyimpanan server cepat penuh jika video diunggah langsung.* | **Tinggi** | Sistem diwajibkan menggunakan integrasi *embed link* dari platform video pihak ketiga (seperti YouTube/Vimeo) dan thumbnail otomatis dari YouTube CDN. |
| **Inkonsistensi Format Data Masukan** <br/> *Terjadi error jika mahasiswa memasukkan format tautan video yang salah pada form submission.* | **Sedang** | Penerapan validasi form yang ketat di sisi frontend dan backend, serta pengubahan otomatis URL standar YouTube ke format embed (`embed/VIDEO_ID`). |
| **Kendala Integrasi Data** <br/> *Miskomunikasi alur data antara tampilan web dan database.* | **Sedang** | Pengerjaan kolaboratif (*pair programming*) antara PIC Frontend dan Backend saat menghubungkan endpoints API. |
| **Bugs pada Fitur Filter dan Pencarian** <br/> *Data gagal ditampilkan saat filter kategori bertumpuk.* | **Rendah** | Melakukan pengujian fungsional (*unit & integration testing*) dan optimasi query database sebelum perilisan. |
