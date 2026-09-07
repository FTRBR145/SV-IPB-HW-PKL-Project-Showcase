export function getYouTubeThumbnail(videoUrl) {
  if (!videoUrl) return "";

  let videoId = "";

  try {
    if (videoUrl.includes("youtube.com/embed/")) {
      videoId = videoUrl.split("youtube.com/embed/")[1]?.split(/[?&]/)[0];
    } else if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("youtu.be/")[1]?.split(/[?&]/)[0];
    } else if (videoUrl.includes("youtube.com/watch")) {
      const url = new URL(videoUrl);
      videoId = url.searchParams.get("v");
    }
  } catch {
    return "";
  }

  return videoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : "";
}

export function getYouTubeEmbedUrl(videoUrl) {
  if (!videoUrl) return "";
  const trimmed = videoUrl.trim();
  try {
    if (trimmed.includes("youtube.com/embed/")) {
      return trimmed;
    }
    if (trimmed.includes("youtu.be/")) {
      const videoId = trimmed.split("youtu.be/")[1]?.split(/[?&]/)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : trimmed;
    }
    if (trimmed.includes("youtube.com/watch")) {
      const url = new URL(trimmed);
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : trimmed;
    }
  } catch {
    return trimmed;
  }
  return trimmed;
}

export const SV_COURSES = [
  "Semua Mata Kuliah",
  "RANGKAIAN LOGIKA DAN TEKNIK DIGITAL",
  "TEKNOLOGI BENGKEL ELEKTROMEKANIK",
  "APLIKASI MOBILE",
  "SISTEM TERTANAM (EMBEDDED SYSTEM)",
  "PROYEK SISTEM IOT (INTERNET OF THINGS)"
];

export const initialProjects = [
  {
    id: 1,
    title: "Sistem IoT Smart Farming & Monitoring Sensor ESP32",
    student: "Ahmad Rizky Pratama",
    nim: "J0304211088",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "PROYEK SISTEM IOT (INTERNET OF THINGS)",
    semester: 4,
    techStack: ["ESP32", "MQTT", "NodeJS", "Chart.js"],
    videoUrl: "https://www.youtube.com/embed/9KxU30uM3qM",
    supervisor: "Prof. Dr. Ir. Kudang Boro Seminar, M.Sc.",
    year: "2025/2026",
    date: "18 Agustus 2026",
    description: "Monitoring kelembaban tanah, suhu, dan intensitas cahaya pada greenhouse menggunakan ESP32.",
    comments: []
  },
  {
    id: 2,
    title: "Sistem Keamanan Akses Lab Komputer RFID & Biometrik",
    student: "David Chen",
    nim: "J0304211029",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "SISTEM TERTANAM (EMBEDDED SYSTEM)",
    semester: 3,
    techStack: ["Arduino", "RFID", "Raspberry Pi", "Python"],
    videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    supervisor: "Dr. Ir. Irfan Syamsuddin, M.T.",
    year: "2025/2026",
    date: "14 Agustus 2026",
    description: "Sistem kontrol akses laboratorium menggunakan RFID dan autentikasi biometrik.",
    comments: []
  },
  {
    id: 3,
    title: "Aplikasi Mobile Smart Home & Monitoring Energi",
    student: "Nabila Putri Utami",
    nim: "J0304211015",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "APLIKASI MOBILE",
    semester: 5,
    techStack: ["Flutter", "Firebase", "ESP8266", "REST API"],
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    supervisor: "Guji Syaikhurrahman, S.Kom., M.T.",
    year: "2025/2026",
    date: "10 Agustus 2026",
    description: "Kontrol perangkat rumah pintar dan monitoring konsumsi energi berbasis Flutter.",
    comments: []
  },
  {
    id: 4,
    title: "Infrastruktur Jaringan Komputer Server & Keamanan Siber",
    student: "Farhan Mahesa & Team",
    nim: "J0304211042",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "TEKNOLOGI BENGKEL ELEKTROMEKANIK",
    semester: 2,
    techStack: ["Cisco", "MikroTik", "Linux", "Wireshark"],
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    supervisor: "Dr. Reiza Mutia, M.Si.",
    year: "2025/2026",
    date: "05 Agustus 2026",
    description: "Perancangan dan simulasi keamanan jaringan komputer kampus.",
    comments: []
  },
  {
    id: 5,
    title: "Dashboard Cloud Computing Analytics & Monitoring Node",
    student: "Dewi Anggraini",
    nim: "J0304211077",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "RANGKAIAN LOGIKA DAN TEKNIK DIGITAL",
    semester: 6,
    techStack: ["Docker", "Kubernetes", "Grafana", "Node.js"],
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    supervisor: "Dr. Ir. Arief Daryanto, Dip.Ag.Econ., M.Ec.",
    year: "2025/2026",
    date: "28 Juli 2026",
    description: "Dashboard monitoring performa server berbasis container.",
    comments: []
  },
  {
    id: 6,
    title: "Robotika Navigasi Cerdas & Deteksi Rintangan",
    student: "Kevin Sanjaya",
    nim: "J0304211102",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "SISTEM TERTANAM (EMBEDDED SYSTEM)",
    semester: 1,
    techStack: ["ROS", "C++", "Ultrasonic", "LIDAR"],
    videoUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
    supervisor: "Asep Rahmat, S.Kom., M.T.",
    year: "2025/2026",
    date: "20 Juli 2026",
    description: "Robot otonom dengan navigasi berbasis sensor LIDAR.",
    comments: []
  },
  {
    id: 7,
    title: "Smart Parking System Berbasis Computer Vision",
    student: "Fajar Nugraha",
    nim: "J0304211111",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "APLIKASI MOBILE",
    semester: 5,
    techStack: ["Python", "OpenCV", "YOLO", "Firebase"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    supervisor: "Dr. Reiza Mutia, M.Si.",
    year: "2025/2026",
    date: "22 Agustus 2026",
    description: "Deteksi slot parkir kosong menggunakan computer vision.",
    comments: []
  },
  {
    id: 8,
    title: "Monitoring Kualitas Udara Berbasis LoRaWAN",
    student: "Muhammad Alif",
    nim: "J0304211112",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "PROYEK SISTEM IOT (INTERNET OF THINGS)",
    semester: 4,
    techStack: ["ESP32", "LoRa", "MQTT", "NodeRED"],
    videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
    supervisor: "Prof. Dr. Ir. Kudang Boro Seminar, M.Sc.",
    year: "2025/2026",
    date: "20 Agustus 2026",
    description: "Monitoring kualitas udara berbasis jaringan LoRaWAN.",
    comments: []
  },
  {
    id: 9,
    title: "Smart Attendance dengan Face Recognition",
    student: "Rina Maharani",
    nim: "J0304211113",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "SISTEM TERTANAM (EMBEDDED SYSTEM)",
    semester: 4,
    techStack: ["Python", "OpenCV", "FaceNet", "Raspberry Pi"],
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    supervisor: "Guji Syaikhurrahman, S.Kom., M.T.",
    year: "2025/2026",
    date: "18 Agustus 2026",
    description: "Sistem absensi otomatis menggunakan pengenalan wajah.",
    comments: []
  },
  {
    id: 10,
    title: "Robot Pemilah Sampah Otomatis",
    student: "Andi Saputra",
    nim: "J0304211114",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "SISTEM TERTANAM (EMBEDDED SYSTEM)",
    semester: 3,
    techStack: ["Arduino", "Servo", "TensorFlow Lite", "ESP32"],
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    supervisor: "Asep Rahmat, S.Kom., M.T.",
    year: "2025/2026",
    date: "16 Agustus 2026",
    description: "Robot pemilah sampah berbasis AI dan sensor.",
    comments: []
  },
  {
    id: 11,
    title: "Sistem Monitoring Panel Surya Kampus",
    student: "Siti Rahma",
    nim: "J0304211115",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "PROYEK SISTEM IOT (INTERNET OF THINGS)",
    semester: 6,
    techStack: ["ESP32", "InfluxDB", "Grafana"],
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    supervisor: "Dr. Ir. Arief Daryanto, Dip.Ag.Econ., M.Ec.",
    year: "2025/2026",
    date: "14 Agustus 2026",
    description: "Monitoring performa panel surya kampus secara real-time.",
    comments: []
  },
  {
    id: 12,
    title: "Drone Monitoring Area Pertanian",
    student: "Bagas Firmansyah",
    nim: "J0304211116",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "APLIKASI MOBILE",
    semester: 5,
    techStack: ["Flutter", "DJI SDK", "Firebase"],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    supervisor: "Dr. Reiza Mutia, M.Si.",
    year: "2025/2026",
    date: "12 Agustus 2026",
    description: "Monitoring lahan pertanian menggunakan drone dan GPS.",
    comments: []
  },
  {
    id: 13,
    title: "Sistem Smart Classroom Berbasis IoT",
    student: "Rizal Hidayat",
    nim: "J0304211117",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "PROYEK SISTEM IOT (INTERNET OF THINGS)",
    semester: 4,
    techStack: ["ESP32", "Firebase", "Relay"],
    videoUrl: "https://www.youtube.com/embed/e-ORhEE9VVg",
    supervisor: "Prof. Dr. Ir. Kudang Boro Seminar, M.Sc.",
    year: "2025/2026",
    date: "08 Agustus 2026",
    description: "Kontrol perangkat kelas pintar berbasis IoT.",
    comments: []
  },
  {
    id: 14,
    title: "Analisis Trafik Jaringan Menggunakan AI",
    student: "Yusuf Maulana",
    nim: "J0304211118",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "TEKNOLOGI BENGKEL ELEKTROMEKANIK",
    semester: 6,
    techStack: ["Python", "Wireshark", "Scikit-Learn"],
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    supervisor: "Dr. Ir. Irfan Syamsuddin, M.T.",
    year: "2025/2026",
    date: "08 Agustus 2026",
    description: "Deteksi anomali jaringan menggunakan machine learning.",
    comments: []
  },
  {
    id: 15,
    title: "Smart Aquaponic Monitoring System",
    student: "Nanda Putra",
    nim: "J0304211119",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "PROYEK SISTEM IOT (INTERNET OF THINGS)",
    semester: 5,
    techStack: ["ESP32", "MQTT", "Blynk"],
    videoUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
    supervisor: "Guji Syaikhurrahman, S.Kom., M.T.",
    year: "2025/2026",
    date: "05 Agustus 2026",
    description: "Monitoring kualitas air dan pemberian pakan otomatis.",
    comments: []
  },
  {
    id: 16,
    title: "Digital Twin Laboratorium Komputer",
    student: "Dimas Prakoso",
    nim: "J0304211120",
    prodi: "Teknik Komputer / Teknologi Rekayasa Komputer",
    prodiCode: "TRK",
    course: "RANGKAIAN LOGIKA DAN TEKNIK DIGITAL",
    semester: 6,
    techStack: ["Unity", "NodeJS", "MQTT", "WebSocket"],
    videoUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
    supervisor: "Dr. Ir. Arief Daryanto, Dip.Ag.Econ., M.Ec.",
    year: "2025/2026",
    date: "01 Agustus 2026",
    description: "Implementasi digital twin laboratorium untuk monitoring real-time.",
    comments: []
  }
].map(project => ({
  ...project,
  thumbnail: getYouTubeThumbnail(project.videoUrl)
}));
