export const initialProjects = [
  {
    id: 1,
    title: "Neural Network Graph & Analytics",
    student: "David Chen",
    nim: "J0304211029",
    prodi: "Teknologi Rekayasa Perangkat Lunak",
    prodiCode: "TRPL",
    course: "DATA SCIENCE FOUNDATION",
    semester: 3,
    techStack: ["Python", "D3.js", "TensorFlow", "React"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk", // Educational demo video
    likes: 142,
    views: 1250,
    supervisor: "Dr. Ir. Irfan Syamsuddin, M.T.",
    year: "2025/2026",
    description: "Sistem visualisasi grafik neural network interaktif yang dirancang untuk membantu mahasiswa Sekolah Vokasi IPB memahami alur propagasi data dan bobot model machine learning secara visual dan intuitif.",
    objectives: [
      "Mengvisualisasikan arsitektur Deep Neural Network secara real-time.",
      "Menyediakan pustaka D3.js kustom yang ringan untuk kebutuhan edukasi di Sekolah Vokasi IPB.",
      "Integrasi API model backend Python FastAPI dengan frontend React."
    ],
    comments: [
      { id: 1, name: "Dr. Irfan Syamsuddin", role: "Dosen Pembimbing", text: "Visualisasi node dan edge sangat jelas dan halus. Sangat berguna untuk bahan ajar praktikum Data Science!", date: "2 hari yang lalu" },
      { id: 2, name: "Siti Rahmawati (TRPL 59)", role: "Mahasiswa", text: "Keren banget mas David! D3.js nya smooth banget pas animasi forward pass.", date: "1 hari yang lalu" }
    ]
  },
  {
    id: 2,
    title: "Sistem Monitoring Pertanian Cerdas IoT",
    student: "Ahmad Rizky Pratama",
    nim: "J0304211088",
    prodi: "Teknik Komputer",
    prodiCode: "TEK",
    course: "INTERNET OF THINGS & EMBEDDED SYSTEM",
    semester: 4,
    techStack: ["ESP32", "MQTT", "NodeJS", "Chart.js"],
    thumbnail: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    likes: 198,
    views: 1840,
    supervisor: "Prof. Dr. Ir. Kudang Boro Seminar, M.Sc.",
    year: "2025/2026",
    description: "Projek IoT untuk memantau kelembaban tanah, suhu lingkungan, dan intensitas cahaya secara otomatis pada green house Kebun Percobaan SV IPB Sukabumi menggunakan transmisi sensor ESP32.",
    objectives: [
      "Otomatisasi penyiraman tanaman berdasarkan ambang batas sensor kelembaban.",
      "Dashboard monitoring real-time berbasis web dengan protokol komunikasi MQTT.",
      "Notifikasi otomatis ke WhatsApp petani saat kelembaban tanah kritis."
    ],
    comments: [
      { id: 1, name: "Budi Santoso", role: "Mahasiswa TEK", text: "Alatnya sudah diuji coba di lahan SV Sukabumi belum mas?", date: "3 hari yang lalu" }
    ]
  },
  {
    id: 3,
    title: "Aplikasi Mobile SV IPB Smart Campus",
    student: "Nabila Putri Utami",
    nim: "J0303211015",
    prodi: "Manajemen Informatika",
    prodiCode: "INF",
    course: "PEMROGRAMAN PERANGKAT BERGERAK",
    semester: 5,
    techStack: ["Flutter", "Firebase", "Dart", "REST API"],
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    likes: 215,
    views: 2100,
    supervisor: "Guji Syaikhurrahman, S.Kom., M.T.",
    year: "2025/2026",
    description: "Aplikasi mobile lintas platform untuk integrasi jadwal kuliah, reservasi laboratorium komputer SV IPB Cilibende, dan peminjaman peralatan audio visual secara digital.",
    objectives: [
      "Mengurangi antrean peminjaman lab secara manual.",
      "Integrasi sistem autentikasi single sign-on (SSO) IPB University.",
      "Fitur notifikasi push pengingat jadwal ujian dan responsif UI/UX."
    ],
    comments: [
      { id: 1, name: "Guji Syaikhurrahman", role: "Dosen Pembimbing", text: "Desain UI sangat clean dan fitur reservasi lab berjalan tanpa bug. Teruskan ke tahap pengujian pengguna!", date: "4 hari yang lalu" }
    ]
  },
  {
    id: 4,
    title: "Kampanye Media Digital Edukasi Sampah SV IPB",
    student: "Farhan Mahesa & Team",
    nim: "J0301211042",
    prodi: "Komunikasi Digital & Media",
    prodiCode: "KMN",
    course: "PRODUKSI AUDIO VISUAL & KAMPANYE DIGITAL",
    semester: 2,
    techStack: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    likes: 310,
    views: 3450,
    supervisor: "Dr. Reiza Mutia, M.Si.",
    year: "2025/2026",
    description: "Video kampanye kreatif cinematic berdurasi 3 menit yang mengedukasi civitas akademika SV IPB tentang pemilahan sampah organik dan anorganik di lingkungan kampus Baranangsiang.",
    objectives: [
      "Meningkatkan kesadaran pengelolaan sampah lingkungan kampus.",
      "Menggunakan teknik storytelling sinematik dengan color grading profesional.",
      "Dipublikasikan di kanal resmi YouTube & TikTok Sekolah Vokasi IPB."
    ],
    comments: [
      { id: 1, name: "Nisa Amalia", role: "Mahasiswa KMN", text: "Cinematography nya juara! Transisi video di menit 1:20 halus banget.", date: "5 hari yang lalu" }
    ]
  },
  {
    id: 5,
    title: "Sistem Manajemen Rantai Pasok Agribisnis Vokasi",
    student: "Dewi Anggraini",
    nim: "J0305211077",
    prodi: "Manajemen Agribisnis",
    prodiCode: "MAB",
    course: "MANAJEMEN RANTAI PASOK DIGITAL",
    semester: 6,
    techStack: ["Next.js", "TailwindCSS", "PostgreSQL"],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    likes: 164,
    views: 1420,
    supervisor: "Dr. Ir. Arief Daryanto, Dip.Ag.Econ., M.Ec.",
    year: "2025/2026",
    description: "Platform digital lacak balak (traceability) hasil panen Teaching Farm Sekolah Vokasi IPB menuju mitra industri retail dari kebun hingga konsumen akhir.",
    objectives: [
      "Transparansi data rantai pasok produk pertanian segar.",
      "Integrasi QR Code pada setiap kemasan produk sayuran hidroponik SV IPB.",
      "Dashboard analitik penjualan dan estimasi waktu kadaluarsa produk."
    ],
    comments: [
      { id: 1, name: "Dr. Arief Daryanto", role: "Dosen Pembimbing", text: "Solusi inovatif untuk menghubungkan Teaching Farm SV IPB dengan pasar swalayan.", date: "1 minggu yang lalu" }
    ]
  },
  {
    id: 6,
    title: "Game Edukasi 3D Pengenalan Satwa IPB Campus",
    student: "Kevin Sanjaya",
    nim: "J0304211102",
    prodi: "Teknologi Rekayasa Perangkat Lunak",
    prodiCode: "TRPL",
    course: "PENGEMBANGAN GIM & REALITAS VIRTUAL",
    semester: 1,
    techStack: ["Unity 3D", "C#", "Blender", "Spatial Audio"],
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    likes: 275,
    views: 2900,
    supervisor: "Asep Rahmat, S.Kom., M.T.",
    year: "2025/2026",
    description: "Game edukasi interaktif 3D petualangan menjelajahi Kampus IPB Dramaga dan SV IPB Cilibende untuk mengenali keanekaragaman hayati dan flora fauna unik IPB.",
    objectives: [
      "Simulasi lingkungan 3D Kampus IPB berbasis modeling low-poly.",
      "Kuis interaktif sains keanekaragaman hayati untuk siswa SMA/K binaan SV IPB.",
      "Dukungan kontroler PC dan Mobile Android."
    ],
    comments: [
      { id: 1, name: "Rian Hidayat", role: "Mahasiswa TRPL", text: "Grafik 3D-nya rapi banget bang Kevin! Rusa Kampus IPB-nya mirip banget asli.", date: "3 hari yang lalu" }
    ]
  }
];

export const SV_COURSES = [
  "Semua Mata Kuliah",
  "DATA SCIENCE FOUNDATION",
  "INTERNET OF THINGS & EMBEDDED SYSTEM",
  "PEMROGRAMAN PERANGKAT BERGERAK",
  "PRODUKSI AUDIO VISUAL & KAMPANYE DIGITAL",
  "MANAJEMEN RANTAI PASOK DIGITAL",
  "PENGEMBANGAN GIM & REALITAS VIRTUAL"
];

export const SV_PRODIS = [
  { code: "ALL", name: "Semua Program Studi" },
  { code: "TRPL", name: "Teknologi Rekayasa Perangkat Lunak" },
  { code: "KMN", name: "Komunikasi Digital & Media" },
  { code: "INF", name: "Manajemen Informatika" },
  { code: "TEK", name: "Teknik Komputer" },
  { code: "MAB", name: "Manajemen Agribisnis" }
];
