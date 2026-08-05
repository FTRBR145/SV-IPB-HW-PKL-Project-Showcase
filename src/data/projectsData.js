export function getYouTubeThumbnail(videoUrl) {
  if (!videoUrl) return '';
  let videoId = '';
  if (videoUrl.includes('youtube.com/embed/')) {
    videoId = videoUrl.split('youtube.com/embed/')[1]?.split('?')[0];
  } else if (videoUrl.includes('youtu.be/')) {
    videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
  } else if (videoUrl.includes('v=')) {
    videoId = videoUrl.split('v=')[1]?.split('&')[0];
  }
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return '';
}

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
    thumbnail: "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
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
    comments: []
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
    thumbnail: "https://img.youtube.com/vi/9KxU30uM3qM/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9KxU30uM3qM",
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
    comments: []
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
    thumbnail: "https://img.youtube.com/vi/x0uinJvhNxI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/x0uinJvhNxI",
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
    comments: []
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
    thumbnail: "https://img.youtube.com/vi/L_LUpnjgPso/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/L_LUpnjgPso",
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
    comments: []
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
    thumbnail: "https://img.youtube.com/vi/q1N8YfA9b0A/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/q1N8YfA9b0A",
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
    comments: []
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
    thumbnail: "https://img.youtube.com/vi/j48LtUkZRjU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/j48LtUkZRjU",
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
    comments: []
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
