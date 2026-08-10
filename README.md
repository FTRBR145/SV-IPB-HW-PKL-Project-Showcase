# TRK Student Project Showcase - Sekolah Vokasi IPB 🎓💻

![Vite](https://img.shields.io/badge/Vite-8.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![IPB University](https://img.shields.io/badge/IPB_University-Sekolah_Vokasi-003366?style=for-the-badge)
![Prodi TRK](https://img.shields.io/badge/Prodi-Teknologi_Rekayasa_Komputer-0d59c6?style=for-the-badge)

Platform web **Katalog Digital & Showcase Karya Projek Mahasiswa Program Studi Teknologi Rekayasa Komputer (TRK) / Teknik Komputer Sekolah Vokasi IPB University**. 

Aplikasi ini dirancang sebagai wadah digital terpusat untuk menyimpan, memamerkan, dan menyebarluaskan karya hasil praktikum, sistem tertanam (*embedded system*), Internet of Things (IoT), jaringan komputer, pemodelan 3D, serta video perancangan projek akhir mahasiswa TRK SV IPB.

---

## 👥 Tim Pengembang (PKL IPB)

- **Fatir Syaiful Bahri**
- **Fadillah Nurwahid Mursid**
- **Program Studi**: Teknologi Rekayasa Komputer (TRK), Sekolah Vokasi IPB University

---

## 📌 Fitur Utama

- **🎨 Identitas Visual Visual Branding IPB**:
  - Menggunakan skema warna resmi **Biru IPB** (`#003366`), **Blue Accent** (`#0d59c6`), dan **Magenta SV IPB** (`#e30613`).
  - Font modern *Outfit* & *Inter* dengan sentuhan micro-animation dan visual clean.
- **🏆 Prestasi Stats Bar**:
  - Tampilan kartu statistik dengan indikator utama: **250+ Project Mahasiswa**, **18 Mata Kuliah**, **450+ Mahasiswa**, dan **85+ Dosen Pembimbing**.
- **📚 Carousel Mata Kuliah TRK (Infinite Loop Scroll)**:
  - Seksi carousel horizontal interaktif yang menampilkan mata kuliah utama TRK (*Internet of Things*, *Mikrokontroler*, *Jaringan Komputer & Keamanan Siber*, *Cloud Computing*, *Hardware*, *Embedded Systems*).
  - Dilengkapi animasi marquee scroll otomatis secara seamless (*infinite loop*) serta tombol navigasi panah manual (`<` & `>`).
  - Terintegrasi langsung dengan menu navigasi Navbar (`#matakuliah`).
- **🔍 Filter Catalog & Real-time Search**:
  - Filter tab cepat **Semester 1 hingga Semester 8**.
  - Filter Program Studi TRK & seluruh prodi Sekolah Vokasi IPB.
  - Bilah pencarian *real-time* berdasarkan judul projek, nama mahasiswa, mata kuliah, maupun *tech stack*.
- **🎬 Modal Detail Projek & Pemutar Multimedia**:
  - Pemutar video YouTube / dokumentasi 3D perancangan alat yang interaktif.
  - Rincian dosen pembimbing, deskripsi projek, spesifikasi perangkat keras/lunak, serta tag teknologi.
- **📤 Modal Unggah Projek Mahasiswa**:
  - Form interaktif bagi mahasiswa TRK untuk mengunggah judul projek, tautan video, mata kuliah, dan *tech stack* secara langsung.
- **🔐 Portal Autentikasi Dual Role (SSO IPB)**:
  - **🎓 Mahasiswa**: Portal login NIM/Email IPB untuk unggah & kelola karya projek.
  - **🔑 Dosen / Admin**: Portal login NIP/Email Dosen TRK yang otomatis mengarahkan ke **Dashboard Moderasi Admin**.
- **🛡️ Dashboard Moderasi Admin (`AdminDashboard.jsx`)**:
  - Halaman khusus Dosen & Admin TRK untuk meninjau, menyetujui (*Approve*), atau menolak (*Reject*) pengajuan projek mahasiswa sebelum dipublikasikan ke katalog publik.

---

## 🛠️ Teknologi Yang Digunakan

- **Core Framework**: React 19 + Vite 8
- **Styling System**: Vanilla CSS Modern (CSS Design Tokens, Flexbox, CSS Grid, Responsive Breakpoints, Custom Animations)
- **Icons**: Lucide React Icons
- **Typography**: Google Fonts (*Outfit* & *Inter*)
- **Version Control**: Git & GitHub (`main` branch)

---

## 📁 Struktur Kode & Folder Clean Architecture

Kategori komponen disusun secara modular berdasarkan fungsinya:

```text
d:\PKL IPB\
├── public/                     # Asset statis resmi IPB (Logo, Hero Banner, Favicon)
│   ├── sv_ipb_navbar_logo.png
│   ├── sv_ipb_logo.png
│   └── sv_ipb_hero.png
├── src/
│   ├── assets/                 # Gambar & Asset internal
│   ├── components/             # Reusable React Components
│   │   ├── common/             # Komponen umum platform
│   │   │   ├── Navbar.jsx      # Navigation Bar & Anchor Links
│   │   │   └── Footer.jsx      # IPB Campus Footer & Contact
│   │   ├── landing/            # Komponen khusus Landing Page
│   │   │   ├── HeroSection.jsx # Banner Utama Headline
│   │   │   ├── AboutSection.jsx# Informasi Prodi TRK SV IPB
│   │   │   ├── StatsBar.jsx    # Kartu Statistik Prestasi
│   │   │   ├── MataKuliahSection.jsx # Carousel Infinite Loop Mata Kuliah
│   │   │   └── ProjectShowcase.jsx   # Katalog & Filter Projek
│   │   ├── projects/           # Komponen Kartu Projek
│   │   │   └── ProjectCard.jsx # Kartu Thumbnail & Rincian Projek
│   │   └── modals/             # Komponen Overlays & Modals
│   │       ├── LoginModal.jsx  # Auth Modal Dual Role (Mhs & Admin)
│   │       ├── ProjectDetailModal.jsx # Video Player & Detail Specs
│   │       └── UploadModal.jsx # Form Submission Projek
│   ├── data/
│   │   └── projectsData.js     # Mock Datasets & Master Metadata Mata Kuliah
│   ├── pages/                  # Halaman Aplikasi Main Views
│   │   ├── LandingPage.jsx     # Master Landing Page TRK Showcase
│   │   └── AdminDashboard.jsx  # Moderation Dashboard Dosen & Admin
│   ├── App.jsx                 # Application Entrypoint & Page Router
│   ├── index.css               # Design System & Global Styles
│   └── main.jsx                # React DOM Mount
├── PERANCANGAN_SISTEM_TRK.md   # Dokumen Kebutuhan Fungsional & Flowchart System
├── index.html                  # Entrypoint HTML & Meta SEO
├── package.json                # Dependencies & Build Scripts
└── README.md                   # Dokumentasi Utama Projek
```

---

## 💻 Panduan Menjalankan Secara Lokal

### 1. Prasyarat
Pastikan kamu telah menginstall [Node.js](https://nodejs.org/) (versi >= 18).

### 2. Instalasi Dependency
```bash
# Clone repositori
git clone https://github.com/FTRBR145/SV-IPB-HW-PKL-Project-Showcase.git

# Masuk ke direktori projek
cd SV-IPB-HW-PKL-Project-Showcase

# Install dependency
npm install
```

### 3. Menjalankan Server Pengembang (Dev Mode)
```bash
npm run dev
```
Akses aplikasi melalui peramban web di `http://localhost:5173/`.

### 4. Build Untuk Produksi
```bash
npm run build
```

---

## 📑 Perancangan & Dokumentasi Sistem

Dokumen rancangan sistem komprehensif dapat diakses pada file [PERANCANGAN_SISTEM_TRK.md](./PERANCANGAN_SISTEM_TRK.md), mencakup:
- Daftar Kebutuhan Fungsional (FR-01 s.d. FR-08) & Non-Fungsional.
- Diagram Flowchart Sistem (Mermaid Flowchart).
- Wireframe UI/UX & Spesifikasi Modul Moderasi Admin.

---

## 📍 Kontak & Alamat Resmi Kampus

**Sekolah Vokasi IPB University**
- **Kampus Bogor**: Jl. Kumbang No.14, Kel. Babakan, Kec. Bogor Tengah, Kota Bogor, Jawa Barat 16128
- **Kampus Sukabumi**: Jl. Sarasa No. 45, Babakan, Kec. Cibeureum, Kota Sukabumi, Jawa Barat 43142
- **Telepon**: (0251) 8348007
- **Email**: sv@apps.ipb.ac.id
- **Website**: [sv.ipb.ac.id](https://sv.ipb.ac.id)

---

© 2026 **Program Studi Teknologi Rekayasa Komputer (TRK)** — Sekolah Vokasi IPB University.
