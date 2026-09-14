// Local-only, repeatable fixture loader. The backend stores these records in memory.
import { env } from '../backend/src/config/env.js';

const base = `http://127.0.0.1:${env.port}${env.apiPrefix}`;
const prefix = '[Uji Performa]';
async function request(path, token, body) {
  const response = await fetch(`${base}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return (await response.json()).data;
}

if (env.nodeEnv === 'production') throw new Error('Data uji hanya untuk development lokal.');
const { accessToken } = await request('/auth/login', null, { identifier: env.adminEmail, password: env.adminPassword });
const settings = await request('/settings/public');
if (!settings.moderationRequired) throw new Error('Moderasi harus aktif agar data uji tidak terbit ke publik.');
const existing = await request('/submissions', accessToken);
const titles = new Set(existing.map(item => item.title));
const courses = await request('/courses');
const topics = ['Monitoring suhu ruang server', 'Kontrol irigasi otomatis', 'Pencatatan energi laboratorium', 'Pemantauan kualitas udara dengan notifikasi', 'Sistem sensor terdistribusi untuk pemantauan fasilitas kampus dan pelaporan kondisi perangkat secara berkala'];
let created = 0;
for (let index = 1; index <= 100; index++) {
  const number = String(index).padStart(3, '0');
  const title = `${prefix} ${number} — ${topics[(index - 1) % topics.length]}`;
  if (titles.has(title)) continue;
  const result = await request('/projects', accessToken, {
    title,
    student: `Mahasiswa Uji Performa ${number}`,
    nim: `TEST-PERF-${number}`,
    course: courses[(index - 1) % courses.length],
    category: 'Embedded System',
    semester: (index - 1) % 6 + 1,
    techStack: ['ESP32', 'MQTT', 'Node.js'],
    videoUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE',
    description: 'Data sintetis untuk menguji performa pencarian, pengurutan, pagination, dan tata letak responsif. Bukan karya mahasiswa nyata.',
    date: `${(index - 1) % 28 + 1} Agustus 2026`,
    year: '2025/2026'
  });
  if (result.type !== 'submission') throw new Error('Hentikan: API tidak membuat pengajuan moderasi.');
  created++;
}
const submissions = await request('/submissions', accessToken);
console.log(JSON.stringify({ created, testRecords: submissions.filter(item => item.title.startsWith(prefix)).length, totalSubmissions: submissions.length }));
