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
    title: "Sistem IoT Smart Farming & Monitoring Sensor ESP32",
    student: "Ahmad Rizky Pratama",
    nim: "J0304211088",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "INTERNET OF THINGS & EMBEDDED SYSTEM",
    semester: 4,
    techStack: ["ESP32", "MQTT", "NodeJS", "Chart.js"],
    thumbnail: "https://img.youtube.com/vi/9KxU30uM3qM/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9KxU30uM3qM",
    likes: 198,
    views: 1840,
    supervisor: "Prof. Dr. Ir. Kudang Boro Seminar, M.Sc.",
    year: "2025/2026",
    description: "Projek IoT & embedded system karya mahasiswa TRK Sekolah Vokasi IPB untuk memantau kelembaban tanah, suhu lingkungan, dan intensitas cahaya secara otomatis pada green house Kebun Percobaan SV IPB Sukabumi menggunakan transmisi sensor ESP32.",
    comments: []
  },
  {
    id: 2,
    title: "Sistem Keamanan Akses Lab Komputer RFID & Biometrik",
    student: "David Chen",
    nim: "J0304211029",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "SISTEM KONTROL & MIKROKONTROLER",
    semester: 3,
    techStack: ["Arduino", "RFID RC522", "Raspberry Pi", "Python"],
    thumbnail: "https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    likes: 142,
    views: 1250,
    supervisor: "Dr. Ir. Irfan Syamsuddin, M.T.",
    year: "2025/2026",
    description: "Sistem pengontrol pintu laboratorium berbasis mikrokontroler Arduino dan pemindai RFID untuk mengamankan akses masuk laboratorium komputer SV IPB Cilibende.",
    comments: []
  },
  {
    id: 3,
    title: "Aplikasi Mobile Smart Home & Monitoring Energi",
    student: "Nabila Putri Utami",
    nim: "J0304211015",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "PEMROGRAMAN PERANGKAT TERHUBUNG",
    semester: 5,
    techStack: ["Flutter", "Firebase", "ESP8266", "REST API"],
    thumbnail: "https://img.youtube.com/vi/x0uinJvhNxI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/x0uinJvhNxI",
    likes: 215,
    views: 2100,
    supervisor: "Guji Syaikhurrahman, S.Kom., M.T.",
    year: "2025/2026",
    description: "Aplikasi mobile kontrol sakelar listrik pintar dan monitoring daya arus listrik secara real-time berbasis Flutter dan protokol Firebase buatan mahasiswa TRK SV IPB.",
    comments: []
  },
  {
    id: 4,
    title: "Infrastruktur Jaringan Komputer Server & Keamanan Siber",
    student: "Farhan Mahesa & Team",
    nim: "J0304211042",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "JARINGAN KOMPUTER & KEAMANAN SIBER",
    semester: 2,
    techStack: ["Cisco Packet Tracer", "MikroTik", "Linux Server", "Wireshark"],
    thumbnail: "https://img.youtube.com/vi/L_LUpnjgPso/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/L_LUpnjgPso",
    likes: 310,
    views: 3450,
    supervisor: "Dr. Reiza Mutia, M.Si.",
    year: "2025/2026",
    description: "Perancangan topologi jaringan komputer terdistribusi dan simulasi konfigurasi firewall keamanan siber pada gedung kuliah Sekolah Vokasi IPB.",
    comments: []
  },
  {
    id: 5,
    title: "Dashboard Cloud Computing Analytics & Monitoring Node",
    student: "Dewi Anggraini",
    nim: "J0304211077",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "APLIKASI WEB & CLOUD COMPUTING",
    semester: 6,
    techStack: ["Docker", "Kubernetes", "Grafana", "Node.js"],
    thumbnail: "https://img.youtube.com/vi/q1N8YfA9b0A/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/q1N8YfA9b0A",
    likes: 164,
    views: 1420,
    supervisor: "Dr. Ir. Arief Daryanto, Dip.Ag.Econ., M.Ec.",
    year: "2025/2026",
    description: "Platform dashboard visualisasi telemetri server cloud berbasis container Docker dan Prometheus untuk memantau performa jaringan kampus TRK SV IPB.",
    comments: []
  },
  {
    id: 6,
    title: "Robotika Navigasi Cerdas & Deteksi Rintangan Obstacle",
    student: "Kevin Sanjaya",
    nim: "J0304211102",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "SISTEM KONTROL & MIKROKONTROLER",
    semester: 1,
    techStack: ["ROS (Robot OS)", "C++", "Ultrasonic Sensor", "LIDAR"],
    thumbnail: "https://img.youtube.com/vi/j48LtUkZRjU/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/j48LtUkZRjU",
    likes: 275,
    views: 2900,
    supervisor: "Asep Rahmat, S.Kom., M.T.",
    year: "2025/2026",
    description: "Projek prototype robotika berkaki/berroda otomatis karya praktikum mahasiswa TRK SV IPB yang dilengkapi sensor pemindai jarak LIDAR untuk menghindari halangan secara otonom.",
    comments: []
  }
];

export const SV_COURSES = [
  "Semua Mata Kuliah",
  "RANGKAIAN LOGIKA DAN TEKNIK DIGITAL",
  "TEKNOLOGI BENGKEL ELEKTROMEKANIK",
  "APLIKASI MOBILE",
  "SISTEM TERTANAM (EMBEDDED SYSTEM)",
  "PROYEK SISTEM IOT (INTERNET OF THINGS)"
];
