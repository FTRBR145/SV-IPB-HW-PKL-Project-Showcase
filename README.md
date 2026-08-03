# Sekolah Vokasi IPB - Student Video Project Showcase 🎓📹

![Vite](https://img.shields.io/badge/Vite-8.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![IPB University](https://img.shields.io/badge/IPB_University-Sekolah_Vokasi-003366?style=for-the-badge)

Platform web **Showcase Video Project Semester dan Projek Akhir Mahasiswa Sekolah Vokasi (SV) IPB University**. Aplikasi ini dirancang untuk menampilkan hasil pembelajaran praktikum secara nyata, memamerkan karya inovatif mahasiswa, serta menghubungkan mahasiswa dengan dosen dan mitra industri.

---

## 📌 Fitur Utama

- **🎨 Identitas & Branding SV IPB**:
  - Desain visual berbasis skema warna resmi **Biru IPB** (`#003366`) dan **Magenta SV IPB** (`#e30613`).
  - Font modern *Outfit* & *Inter* dengan sentuhan *glassmorphism* dan animasi mikro.
- **🚀 Hero & Introduction Banner**:
  - Headline utama **"Preview Project Video Semester"** sesuai rancangan mockup rujukan.
  - Latar belakang foto visual Kampus Sekolah Vokasi IPB.
- **📊 Stats Counter Bar**:
  - Indikator pencapaian platform (250+ Projects, 450+ Students, 85+ Tutors, 32+ Industry).
- **🔍 Filter Semester & Program Studi Interaktif**:
  - Filter tab cepat **Semester 1 hingga Semester 8**.
  - Filter Program Studi (TRPL, KMN, INF, TEK, MAB, dll.).
  - Bilah pencarian real-time berdasarkan judul, mahasiswa, mata kuliah, atau tech stack.
- **🎬 Modal Pemutar Video & Detail Projek**:
  - Pemutar video terintegrasi (iframe YouTube / HTML5).
  - Rincian dosen pembimbing, mata kuliah, deskripsi & tujuan projek, tag teknologi.
  - Unduh Laporan PDF serta sistem interaktif **Suka & Komentar/Feedback**.
- **📤 Modal Unggah Projek Mahasiswa**:
  - Form interaktif bagi mahasiswa untuk menambah karya projek semester secara langsung.
- **🔐 Portal Login SSO IPB**:
  - Modal login autentikasi civitas akademika Mahasiswa & Dosen.

---

## 🛠️ Teknologi Yang Digunakan

- **Core Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS Modern (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Animations)
- **Icons**: Lucide React Icons
- **Typography**: Google Fonts (*Outfit* & *Inter*)

---

## 📁 Struktur Direktori Projek

```text
d:\PKL IPB\
├── public/                 # Static public assets
├── src/
│   ├── components/         # Modular React Components
│   │   ├── Navbar.jsx              # Navigation Bar & Branding
│   │   ├── HeroSection.jsx         # Main Hero Banner
│   │   ├── AboutSection.jsx        # SV IPB About & Mission
│   │   ├── StatsBar.jsx            # Platform Statistics Counter
│   │   ├── ProjectShowcase.jsx     # Filterable Projects Showcase
│   │   ├── ProjectCard.jsx         # Project Thumbnail & Info Card
│   │   ├── ProjectDetailModal.jsx  # Video Player & Comments Modal
│   │   ├── UploadModal.jsx         # New Project Submission Form
│   │   ├── LoginModal.jsx          # Student/Lecturer Auth Modal
│   │   └── Footer.jsx              # SV IPB Campus Footer
│   ├── data/
│   │   └── projectsData.js         # Mock Dataset & Course Metadata
│   ├── App.jsx             # Main Application Logic & States
│   ├── index.css           # Global Design System & Variables
│   └── main.jsx            # React Root Entrypoint
├── index.html              # HTML Root & SEO Meta Tags
├── package.json            # Project Dependencies & Scripts
└── README.md               # Documentation
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

## 📄 Lisensi & Kredit

Dikembangkan untuk memenuhi tugas Praktik Kerja Lapangan (PKL) di **Sekolah Vokasi IPB University**.
© 2026 Sekolah Vokasi IPB University.
