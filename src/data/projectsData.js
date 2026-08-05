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
    title: "Neural Network Graph & Analytics System",
    student: "David Chen",
    nim: "J0304211029",
    prodi: "Teknologi Rekayasa Perangkat Lunak",
    prodiCode: "TRPL",
    course: "DATA SCIENCE & MACHINE LEARNING",
    semester: 3,
    techStack: ["Python", "D3.js", "TensorFlow", "React"],
    thumbnail: "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    likes: 142,
    views: 1250,
    supervisor: "Dr. Ir. Irfan Syamsuddin, M.T.",
    year: "2025/2026",
    description: "Sistem visualisasi grafik neural network interaktif berbasis web yang dikembangkan oleh mahasiswa TRPL Sekolah Vokasi IPB untuk menganalisis alur propagasi data dan bobot model machine learning.",
    comments: []
  },
  {
    id: 2,
    title: "Sistem IoT Smart Farming & Monitoring Dashboard",
    student: "Ahmad Rizky Pratama",
    nim: "J0304211088",
    prodi: "Teknologi Rekayasa Perangkat Lunak",
    prodiCode: "TRPL",
    course: "BASIS DATA & SISTEM TERDISTRIBUSI",
    semester: 4,
    techStack: ["ESP32", "MQTT", "NodeJS", "Chart.js"],
    thumbnail: "https://img.youtube.com/vi/9KxU30uM3qM/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9KxU30uM3qM",
    likes: 198,
    views: 1840,
    supervisor: "Prof. Dr. Ir. Kudang Boro Seminar, M.Sc.",
    year: "2025/2026",
    description: "Aplikasi web fullstack monitoring IoT pertanian cerdas hasil praktikum mahasiswa TRPL SV IPB untuk memantau kelembaban tanah dan temperatur green house secara real-time.",
    comments: []
  },
  {
    id: 3,
    title: "Aplikasi Mobile SV IPB Smart Campus",
    student: "Nabila Putri Utami",
    nim: "J0304211015",
    prodi: "Teknologi Rekayasa Perangkat Lunak",
    prodiCode: "TRPL",
    course: "PEMROGRAMAN PERANGKAT BERGERAK (MOBILE)",
    semester: 5,
    techStack: ["Flutter", "Firebase", "Dart", "REST API"],
    thumbnail: "https://img.youtube.com/vi/x0uinJvhNxI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/x0uinJvhNxI",
    likes: 215,
    views: 2100,
    supervisor: "Guji Syaikhurrahman, S.Kom., M.T.",
    year: "2025/2026",
    description: "Aplikasi mobile Android & iOS hasil projek tugas akhir TRPL SV IPB untuk reservasi laboratorium komputer Cilibende dan peminjaman inventaris akademik.",
    comments: []
  },
  {
    id: 4,
    title: "Platform Web Portfolio & E-Learning TRPL",
    student: "Farhan Mahesa & Team",
    nim: "J0304211042",
    prodi: "Teknologi Rekayasa Perangkat Lunak",
    prodiCode: "TRPL",
    course: "REKAYASA PERANGKAT LUNAK (RPL)",
    semester: 2,
    techStack: ["React.js", "Node.js", "Express", "MongoDB"],
    thumbnail: "https://img.youtube.com/vi/L_LUpnjgPso/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/L_LUpnjgPso",
    likes: 310,
    views: 3450,
    supervisor: "Dr. Reiza Mutia, M.Si.",
    year: "2025/2026",
    description: "Platform web e-learning interaktif berbasis React dan Node.js yang dikembangkan mahasiswa TRPL SV IPB untuk mendokumentasikan tugas praktikum koding.",
    comments: []
  },
  {
    id: 5,
    title: "Sistem Informasi Rantai Pasok Agribisnis Digital",
    student: "Dewi Anggraini",
    nim: "J0304211077",
    prodi: "Teknologi Rekayasa Perangkat Lunak",
    prodiCode: "TRPL",
    course: "BASIS DATA & SISTEM TERDISTRIBUSI",
    semester: 6,
    techStack: ["Next.js", "TailwindCSS", "PostgreSQL"],
    thumbnail: "https://img.youtube.com/vi/q1N8YfA9b0A/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/q1N8YfA9b0A",
    likes: 164,
    views: 1420,
    supervisor: "Dr. Ir. Arief Daryanto, Dip.Ag.Econ., M.Ec.",
    year: "2025/2026",
    description: "Sistem informasi web enterprise lacak balak (traceability) hasil panen Teaching Farm SV IPB berbasis arsitektur microservices dan basis data PostgreSQL.",
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
    description: "Projek pengembang gim 3D edukasi karya mahasiswa TRPL SV IPB yang menayangkan peta virtual Kampus IPB Dramaga dan Cilibende dalam dunia 3D interaktif.",
    comments: []
  }
];

export const SV_COURSES = [
  "Semua Mata Kuliah",
  "REKAYASA PERANGKAT LUNAK (RPL)",
  "PEMROGRAMAN PERANGKAT BERGERAK (MOBILE)",
  "DATA SCIENCE & MACHINE LEARNING",
  "DESAIN & ANTARMUKA PENGGUNA (UI/UX)",
  "BASIS DATA & SISTEM TERDISTRIBUSI",
  "PENGEMBANGAN GIM & REALITAS VIRTUAL"
];

export const SV_PRODIS = [
  { code: "ALL", name: "Teknologi Rekayasa Perangkat Lunak (TRPL)" },
  { code: "TRPL", name: "Teknologi Rekayasa Perangkat Lunak" }
];
