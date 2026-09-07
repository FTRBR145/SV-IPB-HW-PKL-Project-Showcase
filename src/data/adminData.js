export const INITIAL_SUBMISSIONS = [
  {
    id: 101,
    title: 'Sistem Deteksi Suhu Otomatis Ruang Server TRK',
    student: 'Fajar Pratama',
    nim: 'J0304211099',
    course: 'SISTEM TERTANAM (EMBEDDED SYSTEM)',
    category: 'Embedded System',
    semester: 4,
    date: '24 Agustus 2026',
    status: 'pending',
    desc: 'Implementasi sensor DHT22 dan NodeMCU ESP8266 dengan alert Telegram bot.',
    techStack: ['DHT22', 'ESP8266', 'Telegram Bot']
  },
  {
    id: 102,
    title: 'Aplikasi Absensi Laboratorium RFID & Face Recog',
    student: 'Dina Lestari',
    nim: 'J0304211075',
    course: 'APLIKASI MOBILE',
    category: 'Aplikasi Mobile',
    semester: 5,
    date: '23 Agustus 2026',
    status: 'pending',
    desc: 'Aplikasi Flutter terintegrasi scanner RFID RC522 dan API Python FaceNet.',
    techStack: ['Flutter', 'RFID', 'FaceNet']
  }
];

export const DEFAULT_MODERATORS = [
  {
    id: 1,
    name: 'Administrator TRK',
    nip: '198503152010121002',
    email: 'admin.trk@apps.ipb.ac.id',
    status: 'active'
  },
  {
    id: 2,
    name: 'Guji Syaikhurrahman, S.Kom., M.T.',
    nip: '198901012019031001',
    email: 'guji.s@apps.ipb.ac.id',
    status: 'active'
  }
];

export const DEFAULT_CATEGORIES = [
  'Internet of Things',
  'Embedded System',
  'Aplikasi Mobile',
  'Jaringan Komputer',
  'Rangkaian Digital'
];

export const DEFAULT_ADMIN_SETTINGS = {
  siteName: 'Showcase Projek TRK SV IPB',
  academicYear: '2025/2026',
  moderationRequired: true,
  allowGuestUploads: true,
  maintenanceMode: false
};

export const INITIAL_ACTIVITY_LOGS = [
  {
    id: 1,
    type: 'system',
    message: 'Dashboard admin siap digunakan.',
    actor: 'Sistem',
    timestamp: '26 Agustus 2026, 08.00'
  }
];
